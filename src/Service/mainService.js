const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const moduleWithMenu = async (params) => {
  try {
    
    const formattedParams = {...params}

    if(formattedParams.id) {
      formattedParams.id = parseInt(formattedParams.id, 10)
    }

    const users = await prisma.user.findMany({
      where: {
        ...formattedParams,
      },
      select: {
        id: true,
        name: true,
        role_id: true,
      },
    });

    if (users.length === 0) {
      return []; // No users found
    }

    const roleId = users[0].role_id;

    // Fetch permissions for the user's role
    const permissions = await prisma.permission.findMany({
      where: {
        role_id: roleId,
      },
    });

    if (permissions.length === 0) {
      return []; // No permissions found
    }

    // Extract module IDs and menu IDs from permissions
    const moduleIDs = permissions.map(p => p.module_id);
    const menuIds = permissions.map(p => p.menu_id).filter(id => id !== null);

    // Fetch modules based on the extracted module IDs
    const modules = await prisma.module.findMany({
      where: {
        id: {
          in: moduleIDs,
        },
      },
    });

    // Fetch menus based on the extracted menu IDs
    let menus = [];
    if (menuIds.length > 0) {
      menus = await prisma.menu.findMany({
        where: {
          id: {
            in: menuIds,
          },
        },
      });
    }

    // Create a structured response
    const result = modules.map(module => {
      const menusForModule = menus.filter(menu => menu.module_id === module.id);

      // Create the base object
      const moduleResponse = {
        id: module.id,
        module_name: module.module_name,
        module_url: module.url,
        module_element: module.element,
      };

      // Only add the menus property if it's not empty
      if (menusForModule.length > 0) {
        moduleResponse.menus = menusForModule.map(menu => ({
          id: menu.id,
          module_id: menu.module_id,
          menu_name: menu.menu_name,
          url: menu.url,
          element: menu.element,
        }));
      }

      return moduleResponse;
    });

    return result;

  } catch (error) {
    console.error('Error fetching modules and menus:', error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
};

module.exports = {
  moduleWithMenu
}
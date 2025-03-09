const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getMenu = async (params) => {
  try {
    const formattedParams = {...params}

    const parseIntIfExists = (key) => {
      if (formattedParams[key]) {
        formattedParams[key] = parseInt(formattedParams[key], 10);
      }
    };

    parseIntIfExists('id')
    parseIntIfExists('module_id')

    const menuData = await prisma.menu.findMany({
      where: {
        ...formattedParams
      }
    })
    return menuData
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await prisma.$disconnect
  }
}

const addNewMenu = async (body) => {
  const isMenuAvailable = await prisma.menu.findMany({
    where: {menu_name: body.menu_name}
  })

  if(isMenuAvailable.length > 0){
    return { success: false, message: 'Menu is not available'}
  } else {
    await prisma.menu.create({
      data:{
        module_id: body.module_id,
        menu_name: body.menu_name,
        url: body.url,
        element: body.element
      }
    })
    return { success: true, message: "New menu is successfully added"}
  }
}

const updateMenu = async (body) => {
  try {
    await prisma.menu.update({
      where: { id: body.id },
      data: {
        module_id: body.module_id,
        menu_name: body.menu_name,
        url: body.url,
        element: body.element
      }
    })
    return { success: true, message: 'Menu updated successfully' };
  } catch (error) {
    console.error('Error updating menu:', error);
    return { success: false, message: 'Failed to update menu' };
  }
}

const deleteMenu = async (id) => {
  try {
    await prisma.menu.delete({
      where: { id : id}
    })
    return { success: true, message: 'Menu deleted successfully' }
  } catch (error) {
    console.error('Error deleting role:', error);
    return { success: false, message: 'Failed to delete menu' };
  }
}

module.exports = {
  getMenu,
  addNewMenu,
  updateMenu,
  deleteMenu
}
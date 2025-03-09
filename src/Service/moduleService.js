const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getModule = async (params) => {
  try {
    const formattedParams = {...params}
    if(formattedParams.id){
      formattedParams.id = parseInt(formattedParams.id, 10)
    }

    const moduleData = await prisma.module.findMany({
      where: {
        ...formattedParams
      }
    })
    return moduleData
  } catch (error) {
    console.error('Error fetching modules and menus:', error);
    throw error;
  } finally {
    await prisma.$disconnect
  }
}

const AddNewModule = async (body) => {
  const isModuleAvailable = await prisma.module.findMany({
    where: {module_name: body.module_name}
  })

  if(isModuleAvailable.length > 0) {
    return { success: false, message: 'Module is already taken'}
  } else {
    await prisma.module.create({
      data:{
        module_name: body.module_name,
        url: body.url,
        element: body.element
      }
    })
    return { success: true, message: 'New module successfully added'}
  }
}

const updateModule = async (body) => {
  try {
    await prisma.module.update({
      where: {id: body.id},
      data: {
        module_name: body.module_name,
        url: body.url,
        element: body.element
      }
    })
    return { success: true, message: 'Module updated successfully' };
  } catch (error) {
    console.error('Error updating module:', error);
    return { success: false, message: 'Failed to update module' };
  }
}

const deleteModule = async (id) => {
  try {
    await prisma.module.delete({
      where: { id: id }
    })
    return { success: true, message: 'Module deleted successfully' }
  } catch (error) {
    console.error('Error deleting role:', error);
    return { success: false, message: 'Failed to delete module' };
  }
}

module.exports = {
  getModule,
  AddNewModule,
  updateModule,
  deleteModule
}
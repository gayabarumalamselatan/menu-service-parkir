const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPermissionList = async () => {
  const permissionData = await prisma.permission.findMany()
  if (permissionData === 0) {
    return {
      status: 404,
      message: 'Data not found'
    }
  }
  return permissionData
}

module.exports = {
  getPermissionList
}
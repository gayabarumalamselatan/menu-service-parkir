const PermissionService = require('../Service/permissionService')

const getPermissionListController = async (req, res) => {
  try {
    const data = await PermissionService.getPermissionList();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error
    })
  }
}

module.exports = {
  getPermissionListController
}
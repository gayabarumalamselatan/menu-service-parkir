const MenuService = require('../Service/menuService')

const getMenu = async (req, res) => {
  try {
    const data = await MenuService.getMenu(req.query)
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

const addMenu = async (req, res) => {
  try {
    const data = await MenuService.addNewMenu(req.body)
    if (!data.success) {
      return res.status(401).json({ message: data.message });
    }else if(data.success === true){
      return res.status(200).json({ message: data.message });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const updateMenu = async (req, res) => {
  try {
    const result = await MenuService.updateMenu(req.body)
    console.log("sad",result)
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }else if(result.success === true){
      return res.status(200).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await MenuService.deleteMenu(parseInt(id))
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }else if(result.success === true){
      return res.status(200).json({ message: result.message });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu
}
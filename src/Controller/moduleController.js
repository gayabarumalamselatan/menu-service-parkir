const ModuleService = require('../Service/moduleService')

const getModule = async (req, res) => {
  try {
    const data = await ModuleService.getModule(req.query)
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

const addNewModule = async (req, res) => {
  try {
    const data = await ModuleService.AddNewModule(req.body)
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

const updateModule = async (req, res) => {
  try {
    const result = await ModuleService.updateModule(req.body)
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

const deleteModule = async (req, res) => {
  const { id } = req.params
  try {
    const result = await ModuleService.deleteModule(parseInt(id))
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
  getModule,
  addNewModule,
  updateModule,
  deleteModule
}
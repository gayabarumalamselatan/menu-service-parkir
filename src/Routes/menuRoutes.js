const express = require('express')

const menuController = require('../Controller/menuController')
const moduleController = require('../Controller/moduleController')
const mainController = require('../Controller/mainController')

const router = express.Router()

// Module routes
router.delete('/module/:id', moduleController.deleteModule)
router.get('/module', moduleController.getModule)
router.put('/module', moduleController.updateModule)
router.post('/module', moduleController.addNewModule)

// Main service route
router.get('/module-with-menu', mainController.moduleWithMenu)

// Menu routes
router.get('/menu', menuController.getMenu)
router.post('/menu', menuController.addMenu)
router.put('/menu', menuController.updateMenu)
router.delete('/menu/:id', menuController.deleteMenu)


module.exports = router
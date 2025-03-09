const express = require('express')
const cors = require('cors')

const app = express()
const menuRouter = require('./Routes/menuRoutes')
const port = 3110

app.use(cors())
app.use(express.json())

app.use('/menu-service', menuRouter)

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})
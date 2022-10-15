const express = require('express')
const errorHandler = require('./context/errorHandler')
const app = express()
const port = 3002
const routes = require('./routes')

app.use('/', routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Example app started at port ${port}`)
})
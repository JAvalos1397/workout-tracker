const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const htmlRoutes= require('./routes/view')
const apiroutes = require('./routes/api')

const port = process.env.PORT || 3001

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/workout', {
   
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(htmlRoutes)

app.use(apiroutes)

app.listen(port,() => {
    console.log('running on port 3001')
})
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')

// mongoose.connect("mongodb+srv://apuchandradas5569:" + process.env.MONGO_ATLAS_PW + "@first.yx2x8ji.mongodb.net/?retryWrites=true&w=majority", {
//     useMongoClient: true
// })

mongoose.connect("mongodb://localhost:27017/api-project")

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/products", productRoutes) // middleware 
app.use("/order", orderRoutes) // middleware 

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoraization")
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT,POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }

    next()
})

app.use((req,res,next) =>{
    const error = new Error("not found")
    error.status = 404;
    next(error)

})

app.use((error, req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
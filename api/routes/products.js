const express = require('express')
const router  = express.Router()
const mongoose = require("mongoose")
const Product = require("../models/product");

router.get("/", (req,res,next)=>{
    res.status(200).json({
        message: "handling get request to /products"
    })
})
router.post("/", (req,res,next)=>{

    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
 
    })
    product.save().then(result =>{
        console.log(result);
    })
    .catch(err =>console.log(err))
    res.status(201).json({
        message: "handling post request to /products",
        createProduct: product
    })
})



router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId
    if(id === "special"){
        res.status(200).json({
            message: "you discovered the special id ",
            id
        })
    }else{
        res.status(200).json({
            message: "you passsed an ID"
        })
    }
})

router.patch('/:productId', (req,res,next)=>{
  res.status(200).json({
    message: "updated product"
  })
})
router.delete('/:productId', (req,res,next)=>{
  res.status(200).json({
    message: "deleted product"
  })
})

module.exports = router;
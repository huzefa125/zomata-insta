const express = require("express");
const foodModel = require("../models/food.model");
const {v4: uuidv4} = require("uuid")

// Only load storage service if ImageKit credentials are available
let storageService;
try {
    if (process.env.IMAGEKIT_PUBLIC_KEY) {
        storageService = require("../storage/storage.service");
    }
} catch (error) {
    console.log("Storage service not available - missing ImageKit credentials");
}

async function getAllFoods(req,res){
    res.send("food items")
    console.log("foodPartner:", req.foodPartner);
    
}

async function createFood(req,res){
    if (storageService && req.file) {
        const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuidv4())
        console.log("File upload result:", fileUploadResult);
    } else {
        console.log("Storage service not available or no file provided");
    }
    res.send("food item created")
    console.log("File:", req.file); 
    console.log("Body:", req.body);
}
module.exports = {getAllFoods, createFood}

const express = require('express');
const cors = require('cors');
require('./db/config');
const Jwt=require('jsonwebtoken')
const JwtKey='e-comm';
const User = require('./db/User');
const Product = require('./db/Product'); // Ensure this matches the model name
const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ result: "Add some product first" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.delete("/product/:id", async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({result},JwtKey,{expiresIn:'2h'},(err,token)=>{
            if(err){
                res.send({result:"No user found please try later"});
            }
            res.send({result,auth:token});
        })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                Jwt.sign({user},JwtKey,{expiresIn:'2h'},(err,token)=>{
                    if(err){
                        res.send({result:"No user found please try later"});
                    }
                    res.send({user,auth:token});
                })
               
            } else {
                res.send("No user found");
            }
        } else {
            res.status(400).send("Email and password are required");
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post("/add-product", async (req, res) => {
    try {
        let newProduct = new Product(req.body);
        let result = await newProduct.save();
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        } else {
            res.send({ result: "No product found" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.delete("/prdoucts/:id",async(req,res)=>{
    let result=await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get("/product/:id",async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(res){
        res.send(result);
    }else{
        res.send({result:"No record found"});
    }
})
app.put("/product/:id", async (req, res) => {
    try {
        let result = await Product.updateOne(
            { _id: req.params.id }, // Corrected the query to use _id
            {
                $set: req.body
            }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get("/search/:key",async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

const express = require ("express");
const mongoose = require ("mongoose");
const app =express()
const cors=require('cors');
app.use(express.json())
app.use(cors());

const UserModel=require('./models/users.js')
mongoose.connect("mongodb+srv://admin:root@cluster0.fdglyqc.mongodb.net/login?retryWrites=true&w=majority")

app.listen(3000, () => {
    console.log("server running in port 3000")
});
app.get("/getUsers", (req, res)=>{
    UserModel.find().then(function(response){
    res.json(response);
    }).catch(function(err){
    res.json(err);
    })
});

app.post("/createUser", async (req, res)=>{
    const user = req.body;
    const newUser = new UserModel (user);
    await newUser.save();
    res.json(user)
 });
 
 app.delete("/deleteUser/:name", async (req, res) => {
    const userName = req.params.name;

    try {
        const result = await UserModel.findOneAndDelete({ name: userName });
        res.json(result);
    } catch (error) {
        res.json({ error: "User not found or couldn't be deleted." });
    }
});

app.put("/updateUser/:name", async (req, res) => {
    const userName = req.params.name;
    const updatedUser = req.body;
    
    try {
        const result = await UserModel.findOneAndUpdate({ name: userName }, updatedUser, { new: true });
        res.json(result);
    } catch (error) {
        res.json({ error: "User not found or couldn't be updated." });
    }
});

//PRODUCTS

const ProductModel = require("./models/products.js");
app.get("/getProducts", (req, res) => {
  ProductModel.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/createProduct", async (req, res) => {
  const product = req.body;
  const newProduct = new ProductModel(product);
  await newProduct.save();
  res.json(product);
});

app.delete("/deleteProduct/:name", async (req, res) => {
  const productName = req.params.name;

  try {
    const result = await ProductModel.findOneAndDelete({ name: productName });
    res.json(result);
  } catch (error) {
    res.json({ error: "Product not found or couldn't be deleted." });
  }
});

app.put("/updateProduct/:name", async (req, res) => {
  const productName = req.params.name;
  const updatedProduct = req.body;

  try {
    const result = await ProductModel.findOneAndUpdate(
      { name: productName },
      updatedProduct,
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.json({ error: "Product not found or couldn't be updated." });
  }
});

const express = require("express");
const app = express();

const fs = require("fs");

const PORT = 3000;
const FILE_NAME = "products.json";

app.use(express.json());

app.get("/allProducts", (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
        res.status(200).json({ data: products }).status(200);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "error getting information" });
    }
});

//insert products
app.post("/product", (req, res) => {
    let products = [];
    let maxId = 0;
    const { name, price, stock } = req.body;

    if (!name || price == undefined)
        return res.status(400).json({ error: "name and price are required" });

    if (fs.existsSync(FILE_NAME)) {
        products = JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
        maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    }
    const newProduct = {
        id: maxId + 1,
        name,
        price,
        stock: stock ?? 0,
    };

    try {
        products.push(newProduct);
        fs.writeFileSync(FILE_NAME, JSON.stringify(products, null, 2));
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error, al guardar" });
    }
});

//get products by id
app.get("/product/:id", (req, res) => {
    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) ||  id <= 0) {
            return res.status(400).json({"error": "id must be a positive integer"});
        }
        const products = JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
        const product = products.find((element) => element.id == id);
        if (!product) return res.status(400).json({ error: "error, no id" });

        res.json({ message: product });
    } catch (error) {
        res.status(500).json({error: "some error ocurred"});
    }
    
});

app.put("/product/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;
    if(!Number.isInteger(id) ||  id <= 0) {
        return res.status(400).json({"error": "id must be a positive integer"});
    }
    if (name === undefined || price === undefined || stock === undefined) {
        return res
            .status(400)
            .json({ error: "PUT requiere name, price and stock" });
    }
    try {
        let products = JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
        const index = products.findIndex((product) => product.id == id);

        if (index === -1) return res.status(404).json({ error: "Product not found" });
    
        products[index] = { id, name, price, stock };
        fs.writeFileSync(FILE_NAME, JSON.stringify(products, null, 2));
        console.log(products);
        return res.json({ message: products[index] });
        
    } catch (error) {
        res.status(500).json({error: "some error ocurred"});
    }
});

app.patch("/product/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;
    const products = JSON.parse(fs.readFileSync(FILE_NAME));
    const product = products.find((product) => product.id == id);

    if(!Number.isInteger(id) ||  id <= 0) {

        return res.status(400).json({error: "id must be a positive integer"});
    }
    if (!product){
        return res.status(404).json({ error: "no information found it" });
    }

    if (name != undefined) product.name = name;
    if (price != undefined) product.price = price;
    if (stock != undefined) product.stock = stock;

    try {
        fs.writeFileSync(FILE_NAME, JSON.stringify(products, null, 2));
        res.json({ message: product });
        
    } catch (error) {
        res.status(500).json({error: "error"});
    }
});

app.delete("/product/:id", (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(Number(id))){
        return res.status(400).json({ message: "the value is not a valid number" });
    }

    try {
        const products = JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
        const updatedProducts = products.filter((product) => product.id != id); //we exlude the ellement we dont need it.
        fs.writeFileSync(FILE_NAME, JSON.stringify(updatedProducts, null, 2));
        console.log(updatedProducts);
        res.json({ "message:": `the id ${id} was correctly deleted` });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: `Error while deleting id: ${id}` });
    }
});

app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});


import { Request, Response } from "express";
import {productModel}  from "../models/products.models";

const getAllProducts = (req: Request, res: Response) => {
    try {
        const products = productModel.readProducts();
        res.status(200).json({ data: products });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "error getting information" });
    }
}; 

//insert products
const insertProduct = (req: Request, res: Response) => {
    let products = [];
    let maxId = 0;
    const { name, price, stock } = req.body;

    if (!name || price == undefined) return res.status(400).json({ error: "name and price are required" });

    products = productModel.readProducts();
    maxId = products.reduce((max, p) => Math.max(max, p.id), 0);

    const newProduct = {
        id: maxId + 1,
        name,
        price,
        stock: stock ?? 0,
    };

    try {
        products.push(newProduct);
        const response = productModel.writeProducts(products); // validar response
        
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error, al guardar" });
    }
};

//get productbyId
const getProductById = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) ||  id <= 0) {
            return res.status(400).json({"error": "id must be a positive integer"});
        }
        const products = productModel.readProducts();
        const product = products.find((element) => element.id == id);
        if (!product) return res.status(400).json({ error: "error, no id" });

        res.json({ message: product });
    } catch (error) {
        res.status(500).json({error: "some error ocurred"});
    }
}

// Update all by Id
const updateAllById = (req: Request, res: Response) => {
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
        const products = productModel.readProducts();
        const index = products.findIndex(product => product.id === id);

        if (index === -1) return res.status(404).json({ error: "Product not found" });
    
        products[index] = { id, name, price, stock };
        productModel.writeProducts(products);
        
        console.log(products);
        return res.json({ message: products[index] });
        
    } catch (error) {
        res.status(500).json({error: "some error ocurred"});
    }
};

const updateById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;
    const products = productModel.readProducts();
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
        productModel.writeProducts(products);
        res.json({ message: product });
        
    } catch (error) {
        res.status(500).json({error: "error"});
    }
};

//delete
const deleteById = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(Number(id))){
        return res.status(400).json({ message: "the value is not a valid number" });
    }

    try {
        const products = productModel.readProducts();
        const updatedProducts = products.filter((product) => product.id != id); //we exlude the ellement we dont need it.
        productModel.writeProducts(updatedProducts);
        console.log(updatedProducts);
        res.json({ "message:": `the id ${id} was correctly deleted` });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: `Error while deleting id: ${id}` });
    }
};

export const productController = {
    deleteById,
    updateById,
    updateAllById,
    getProductById,
    insertProduct,
    getAllProducts
}




import fs from "fs";
const FILE_NAME = "products.json";


interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const readProducts = () : Product[] =>  {
    if (!fs.existsSync(FILE_NAME))  return [];
    return JSON.parse(fs.readFileSync(FILE_NAME, "utf-8"));
}


const writeProducts = (products :Product[]) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(products, null, 2));
}


export const productModel = {
    readProducts,
    writeProducts
}
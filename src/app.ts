import express, { Request, Response } from "express";
const app = express();

import productRoutes from "./routes/products.routes";

app.use(express.json());
app.use("/", productRoutes);


app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "route not found" });
});

export default app;

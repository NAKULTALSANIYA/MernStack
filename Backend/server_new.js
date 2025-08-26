import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.route_new.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

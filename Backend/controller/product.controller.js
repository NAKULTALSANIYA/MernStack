import db from "../utils/db.con.js";

export const GetProductData = (req, res) => {
  db.query("SELECT * FROM Products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

export const AddProduct = (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    category,
    image_url,
    ingredients,
  } = req.body;

  // Convert ingredients array to JSON string for database storage
  const ingredientsJson = ingredients ? JSON.stringify(ingredients) : null;

  db.query(
    "INSERT INTO Products (name, description, price, discountPrice, category, image_url, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      description,
      price,
      discountPrice,
      category,
      image_url,
      ingredientsJson,
    ],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ message: "Product added successfully", id: results.insertId });
    }
  );
};

export const UpdateProduct = (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    discountPrice,
    category,
    image_url,
    ingredients,
  } = req.body;

  // Convert ingredients array to JSON string for database storage
  const ingredientsJson = ingredients ? JSON.stringify(ingredients) : null;

  db.query(
    `
    UPDATE Products
    SET 
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      price = COALESCE(?, price),
      discountPrice = COALESCE(?, discountPrice),
      category = COALESCE(?, category),
      image_url = COALESCE(?, image_url),
      ingredients = COALESCE(?, ingredients)
    WHERE product_id = ?
`,
    [
      name,
      description,
      price,
      discountPrice,
      category,
      image_url,
      ingredientsJson,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};

export const DeleteProduct = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM Products WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
};

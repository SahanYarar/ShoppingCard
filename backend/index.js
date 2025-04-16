const express = require("express");
const cors = require("cors");
const products = require("./products");
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Configure CORS - more specific for development
app.use(cors({
  origin: ['http://localhost:8081', 'http://192.168.1.192:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.send("Welcome to Sahan Store API...");
});

// Mount auth routes
app.use('/auth', authRoutes);

// Products route without pagination
app.get("/products", (req, res) => {
  try {
    const { search, sortBy, sortOrder } = req.query;
    let filteredProducts = [...products];

    // Apply search filter if search term is provided
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.desc.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting if sort parameters are provided
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      filteredProducts.sort((a, b) => {
        if (sortBy === 'price') {
          return (a.price - b.price) * order;
        } else if (sortBy === 'name') {
          return a.name.localeCompare(b.name) * order;
        }
        return 0;
      });
    }

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product by ID
app.get("/products/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

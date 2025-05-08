const express = require("express");
const cors = require("cors");
const products = require("./products");
const authRoutes = require('./src/routes/authRoutes');
const { getProductComments, addComment, deleteComment } = require('./comments');

const app = express();

app.use(cors({
  origin: ['http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.send("Welcome to Sahan Store API...");
});

app.use('/auth', authRoutes);

app.get("/products", (req, res) => {
  try {
    const { search, sortBy, sortOrder } = req.query;
    let filteredProducts = [...products];

    //Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.desc.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sort
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


app.get("/products/:productId/comments", (req, res) => {
  try {
    const { productId } = req.params;
    console.log('Getting comments for product:', productId);
    const comments = getProductComments(productId);
    console.log('Found comments:', comments);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.post("/products/:productId/comments", (req, res) => {
  try {
    const { productId } = req.params;
    const { text, rating, userId, userName } = req.body;
    
    console.log('Adding comment:', {
      productId,
      text,
      rating,
      userId,
      userName
    });

    if (!text || !rating || !userId || !userName) {
      console.log('Missing required fields:', { text, rating, userId, userName });
      return res.status(400).json({ error: "Missing required fields" });
    }

    const comment = addComment({
      productId,
      text,
      rating,
      userId,
      userName
    });

    console.log('Added comment:', comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

app.delete("/products/:productId/comments/:commentId", (req, res) => {
  try {
    const { commentId } = req.params;
    const success = deleteComment(commentId);
    
    if (!success) {
      return res.status(404).json({ error: "Comment not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

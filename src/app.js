const express = require('express');

const ProductManager = require('./ProductManager'); 

const app = express();

const port = 8080;

const productManager = new ProductManager('./productos.json');

app.get('productos', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ productos });
});

app.get('productos/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ productos });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});



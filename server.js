const express = require('express');

const router = require('./routes/Register');
const loginRouter = require('./routes/Login');
const createSupplier = require('./routes/supplier');
const createCategory = require('./routes/category');
const listCategory = require('./routes/ListCategory');
const listProduct = require('./routes/ListProduct');
const updateProduct = require('./routes/updateProduct');
const createProduct = require('./routes/product');
const createProductStatus = require('./routes/productStatus');
const listStatus = require('./routes/productStatus');
const orderItem = require('./routes/orderItem');
const create_order = require('./routes/Order');

const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/api', loginRouter);
app.use('/api', createSupplier);
app.use('/api', createCategory);
app.use('/api', listCategory);
app.use('/api', listProduct);
app.use('/api', updateProduct);
app.use('/api', createProduct);
app.use('/api', createProductStatus);
app.use('/api', listStatus);
app.use('/api', orderItem);
app.use('/api', create_order);

const PORT = 3702;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});

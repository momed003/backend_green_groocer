import express from 'express';
import router from './routes/Register.js';
import loginRouter from './routes/Login.js';
import createSupplier from './routes/supplier.js';
import createCategory from './routes/category.js';
import listCategory from './routes/ListCategory.js';
import listProduct from './routes/ListProduct.js';
import updateProduct from './routes/updateProduct.js';
import createProduct from './routes/product.js';
import createProductStatus from './routes/productStatus.js';
import listStatus from "./routes/productStatus.js";
import orderItem from "./routes/orderItem.js";
import create_order from "./routes/Order.js";


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
app.use('/api',create_order);

const PORT = 3702 ;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});

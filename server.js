import express from 'express';
import router from './routes/Register.js';
import loginRouter from './routes/Login.js';
import createSupplier from './routes/supplier.js';
import createProduct from './routes/product.js';
import createCategory from './routes/category.js';

const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/api', loginRouter);
app.use('/api', createSupplier);
app.use('/api', createProduct);
app.use('/api', createCategory);

const PORT = 3702 ;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});

import express from 'express';
import router from './routes/Register.js';
import loginRouter from './routes/Login.js';

const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/api', loginRouter);


const PORT = 3702 ;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});

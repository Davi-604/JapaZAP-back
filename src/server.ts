import express, { urlencoded } from 'express';
import AppRoute from './routes/app';
import AdminRoute from './routes/admin';
import cors from 'cors';
import multer from 'multer';

const app = express();
const upload = multer();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(AppRoute);
app.use('/admin', AdminRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Rodando na porta ${port}🚀`);
});

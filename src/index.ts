import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import textRoutes from './routes/text-routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

setupSwagger(app);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Rotas
app.use('/api', textRoutes);

// Rota de saúde
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API está funcionando!' });
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app; // Para testes
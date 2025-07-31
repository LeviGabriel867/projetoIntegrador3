
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './src/app.js'; 

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    if (!DB_URI) {
      throw new Error('MONGO_URI não foi definida no arquivo .env. A aplicação não pode iniciar.');
    }


    await mongoose.connect(DB_URI);
    console.log('✅ Conectado ao MongoDB com sucesso!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
    
  } catch (err) {
    console.error('❌ Falha crítica ao iniciar o servidor:', err.message);
    process.exit(1); 
  }
};

startServer();
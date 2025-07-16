// server.js (VERSÃO ATUALIZADA)

// 1. A PRIMEIRA COISA a se fazer. Garante que process.env seja populado ANTES de qualquer outro código.
import dotenv from 'dotenv';
dotenv.config();

// 2. Importar os módulos necessários
import mongoose from 'mongoose';
import app from './src/app.js'; // Importa a aplicação Express já configurada a partir de app.js.

// 3. Pegar as variáveis de ambiente com segurança
const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGO_URI;

// Função assíncrona para controlar a ordem de inicialização
const startServer = async () => {
  try {
    // 4. Validar e Conectar ao MongoDB.
    if (!DB_URI) {
      throw new Error('MONGO_URI não foi definida no arquivo .env. A aplicação não pode iniciar.');
    }

    // Tenta conectar ao banco de dados.
    // As opções 'useNewUrlParser' e 'useUnifiedTopology' são desnecessárias e podem ser removidas.
    await mongoose.connect(DB_URI);
    console.log('✅ Conectado ao MongoDB com sucesso!');

    // 5. APENAS APÓS a conexão com o banco ser um sucesso, iniciar o servidor Express.
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
    
  } catch (err) {
    console.error('❌ Falha crítica ao iniciar o servidor:', err.message);
    // Encerra a aplicação em caso de erro na inicialização, pois ela não pode funcionar corretamente.
    process.exit(1); 
  }
};

// Inicia todo o processo de inicialização.
startServer();
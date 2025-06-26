import jwt from 'jsonwebtoken';

// Este middleware verifica se o usuário está logado
export const protect = (req, res, next) => {
  let token;

  // O token geralmente vem no cabeçalho 'Authorization' como "Bearer TOKEN_AQUI"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token (tira a parte "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verifica se o token é válido
      const decoded = jwt.verify(token, 'SEU_SEGREDO_SUPER_SECRETO_AQUI');
      
      // Anexa os dados do usuário (que estavam no token) na requisição
      req.user = decoded;
      
      next(); // Tudo certo, pode continuar para a próxima função (o controller)
    } catch (error) {
      res.status(401).json({ error: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Não autorizado, sem token.' });
  }
};

// Este middleware verifica a FUNÇÃO (role) do usuário
export const authorize = (...roles) => {
  return (req, res, next) => {
    // `req.user.role` existe porque o middleware `protect` rodou antes
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Usuário com função '${req.user.role}' não tem permissão para acessar esta rota.` });
    }
    next();
  };
};
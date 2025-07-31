import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, 'SEU_SEGREDO_SUPER_SECRETO_AQUI');
      
      req.user = decoded;
      
      next(); 
    } catch (error) {
      res.status(401).json({ error: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Não autorizado, sem token.' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Usuário com função '${req.user.role}' não tem permissão para acessar esta rota.` });
    }
    next();
  };
};
// controllers/UserController.js

export default class UserController {
  // Agora o construtor recebe os dois casos de uso
  constructor(createUser, loginUser) {
    this.createUser = createUser;
    this.loginUser = loginUser;
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.createUser.execute({ email, password });
      const userResponse = { id: user.id, email: user.email };
      res.status(201).json(userResponse);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // NOVO MÉTODO: Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute({ email, password });
      res.status(200).json(result); // Envia o objeto { token: '...' }
    } catch (err) {
      // 401 Unauthorized é o status HTTP correto para credenciais inválidas
      res.status(401).json({ error: err.message });
    }
  }
}
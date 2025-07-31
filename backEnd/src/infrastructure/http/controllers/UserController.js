
export default class UserController {
  constructor(createUser, loginUser) {
    this.createUser = createUser;
    this.loginUser = loginUser;
  }

  async register(req, res) {
    try {
      const { name, userName,role, email, password } = req.body;
      const user = await this.createUser.execute({ name, userName, role, email, password });
      const userResponse = { id: user.id, name:user.name, userName: user.userName, role: user.role, email: user.email };
      res.status(201).json(userResponse);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute({ email, password });
      res.status(200).json(result); 
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}
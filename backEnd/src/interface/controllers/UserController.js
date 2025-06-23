export default class UserController {
  constructor(createUser) {
    this.createUser = createUser;
  }

  async register(req, res) {
    try {
      const { name, email, role } = req.body;
      const user = await this.createUser.execute({ name, email, role });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

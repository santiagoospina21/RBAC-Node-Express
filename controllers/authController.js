const User = require("../models/user");

//Registrar un nuevo usario con un role
const registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, role });

  User.register(user, password, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err.message });
    }
    res.json({ message: "User registered successfully" });
  });
};

//Login del usuario  y crear una session
const loginUser = (req, res) => {
  const { username, password } = req.body;

  User.authenticate()(username, password, (err, user) => {
    if (err || !user) {
      return res.status(401).send({ error: "Invalid username or password" });
    }
    //Crear una nueva session y guardar el id del usuario
    req.session.userId = user._id;
    res.json({ message: "Login successful" });
  });
};

//Obtener todos los usuarios
const showAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registerUser, loginUser, showAllUsers };

const express = require("express");
const router = express.Router();
const passport = require("passport");

const { checkPermissions } = require("../middleware/rbacMiddleware");
// Controller
const {
  loginUser,
  registerUser,
  showAllUsers,
} = require("../controllers/authController");

router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post(
  "/login",
  passport.authenticate("local", {
    successMessage: "loggedIn",
    failureMessage: "failed",
    failureRedirect: "/failed",
  }),
  loginUser
);

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    res.json({ message: "Logged out successfully" }); // Enviar un mensaje JSON
  });
});

//Obtener todos los usuarios
router.get("/showAll", checkPermissions("read_user"), showAllUsers);

module.exports = router;

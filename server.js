const User = require("./models/user");
const express = require("express");
const mongoose = require("./db"); // Importar la conexión a la base de datos
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const authRoutes = require("./routes/auth");
const recordsRoutes = require("./routes/records");

const app = express();

//Configurar middleware
app.use(bodyParser.json());

//Configurar el passport
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false }) //Configuracion de la session
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.authenticate()(username, password, (err, user) => {
      if (err || !user) {
        return done(null, false, { message: "Invalid username or password" });
      }
      return done(null, user);
    });
  })
);

// Serializar y deserializar usuarios para almacenar en la sesión
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

//Definir rutas
app.use("/auth", authRoutes);
app.use("/record", recordsRoutes);

//Start the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

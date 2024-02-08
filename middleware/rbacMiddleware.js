const Permissions = require("../models/permissions");

//Verificar si el usuario tiene los permisos necesarios para una ruta
exports.checkPermissions = (permission) => {
  return (req, res, next) => {
    const userRole = req.user
      ? req.user.role[0].name || req.user.role
      : "anonymous";
    console.log(req.user.role);
    const userPermissions = new Permissions().getPermissionsByRoleName(
      userRole
    );

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).send({ error: "Access denied" });
    }
  };
};

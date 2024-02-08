const express = require("express");
const router = express.Router();
const { checkPermissions } = require("../middleware/rbacMiddleware");

//Importar el controlador
const {
  getAllRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordsController");

//Proteger la ruta con RBAC middleware
router.get("/records", checkPermissions("read_record"), getAllRecord);

router.post("/record", checkPermissions("create_record"), createRecord);

router.patch("/record/:id", checkPermissions("update_record"), updateRecord);

router.delete("/record/:id", checkPermissions("delete_record"), deleteRecord);

module.exports = router;

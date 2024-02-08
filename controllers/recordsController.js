const Records = require("../models/records");

//Obtener todos los registros
exports.getAllRecord = async (req, res) => {
  try {
    const records = await Records.find();
    res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Crear un nuevo registro
exports.createRecord = async (req, res) => {
  try {
    const { productName, price } = req.body;
    const newRecord = new Records({ productName, price });
    await newRecord.save();

    res.status(200).json({
      message: "new product saved successfully.",
      product: newRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Actualizar un registro
exports.updateRecord = async (req, res) => {
  const { id } = req.params;
  const { productName, price } = req.body;

  if (!productName && !price) {
    return res
      .status(400)
      .json({ error: "Provide at least one field to update." });
  }

  const record = await Records.findOneAndUpdate(
    { _id: id },
    { $set: { ...(productName && { productName }), ...(price && { price }) } },
    { new: true }
  );
  res.json({
    message: "product updated successfully.",
    product: record,
  });
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  const productDeleted = await Records.findOneAndDelete({ _id: id });
  res.json({
    message: "product deleted successfully.",
    product: productDeleted,
  });
};

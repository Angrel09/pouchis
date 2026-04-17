const validatePet = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      status: "error",
      error: "ValidationError",
      message: "El nombre de la mascota es obligatorio y debe ser un texto válido."
    });
  }
  next();
};

const validatePurchase = (req, res, next) => {
  const { petId, itemId } = req.body;
  if (!petId || !itemId) {
    return res.status(400).json({
      status: "error",
      error: "ValidationError",
      message: "petId e itemId son obligatorios para realizar una compra."
    });
  }
  next();
};

const validateActivity = (req, res, next) => {
  const { petId } = req.body;
  if (!petId) {
    return res.status(400).json({
      status: "error",
      error: "ValidationError",
      message: "petId es obligatorio para realizar una actividad."
    });
  }
  next();
};

module.exports = {
  validatePet,
  validatePurchase,
  validateActivity
};

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.verificarContacto = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const {
    nombre,
    email,
    mensaje,
    accion // "verificar" o "bloquear"
  } = req.body;

  if (!nombre || !email || !mensaje || !accion) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  if (accion === "bloquear") {
    return res.status(403).json({ estado: "bloqueado" });
  }

  if (accion === "verificar") {
    // Aquí luego conectamos Twilio o lo que quieras
    return res.status(200).json({
      estado: "verificado",
      mensaje: "Mensaje aprobado manualmente"
    });
  }

  return res.status(400).json({ error: "Acción inválida" });
});

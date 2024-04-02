import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200); // Establecer el código de estado de la respuesta a 200 (OK)
  res.send("Hello World from Express 🦍"); // Enviar una respuesta al cliente
});

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});

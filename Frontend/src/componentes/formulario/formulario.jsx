import "./formulario.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Form() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Traemos todos los usuarios desde el backend
      const response = await fetch("http://localhost:8080/api/usuarios");
      const data = await response.json();

      // Buscamos un usuario que coincida con nombre, apellido y email, y esté activo
      const usuario = data.find(
        (u) =>
          u.nombre.toLowerCase().trim() === nombre.toLowerCase().trim() &&
          u.apellido.toLowerCase().trim() === apellido.toLowerCase().trim() &&
          u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
          u.activo
      );

      if (usuario) {
        // Redirige según categoriaU
        // Se asume que categoriaU tiene un campo 'nombre' que indica 'administrador' o 'cliente'
        const categoria = usuario.categoriaU.nombre;

        if (categoria === "Administrador") {
          navigate("/administrador");
        } else if (categoria === "Cliente") {
          navigate("/carrito");
        } else {
          setError("Categoría de usuario desconocida");
        }
      } else {
        setError("Usuario no encontrado o inactivo");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <section id="Formulario">
      <div className="container">
        <h3>
          <em>¡Bienvenido!</em>
        </h3>

        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <br />

          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <br />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <button type="submit">Ingresar</button>
          <button type="reset" onClick={() => setError("")}>
            Limpiar
          </button>

          {error && <p style={{ color: "white" }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}


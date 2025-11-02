import React from "react";
import "../styles/styleindex.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado correctamente! Te contactaremos pronto.");
    e.target.reset();
  };

  return (
    <section id="contacto" className="container">
      <h2 className="section-title">𝐂𝐨𝐧𝐭𝐚́𝐜𝐭𝐚𝐧𝐨𝐬</h2>
      <div className="contact">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mensaje" required />
          <button type="submit" className="btn">
            Enviar
          </button>
        </form>

        <div className="map">
          <iframe
            src="https://maps.google.com/maps?q=Santiago%20Centro&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Ubicación"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

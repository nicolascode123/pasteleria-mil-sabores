import React from "react";
import "../styles/styleindex.css";

export default function Stores() {
  return (
    <section id="ubicaciones" className="container locations">
      <h2 className="section-title">𝐍𝐮𝐞𝐬𝐭𝐫𝐚𝐬 𝐭𝐢𝐞𝐧𝐝𝐚𝐬</h2>
      <div className="cards">
        <article className="loc santiago">
          <h3>Santiago Centro</h3>
          <p>
            Av. Libertador 1234
            <br />
            Horario: 09:00 - 20:00
            <br />
            Seguimiento en tiempo real disponible
          </p>
        </article>

        <article className="loc providencia">
          <h3>Providencia</h3>
          <p>
            Av. Los Sabores 567
            <br />
            Horario: 10:00 - 21:00
            <br />
            Seguimiento en tiempo real disponible
          </p>
        </article>

        <article className="loc vina">
          <h3>Viña del Mar</h3>
          <p>
            Calle Dulzura 890
            <br />
            Horario: 09:30 - 20:30
            <br />
            Seguimiento en tiempo real disponible
          </p>
        </article>
      </div>
    </section>
  );
}

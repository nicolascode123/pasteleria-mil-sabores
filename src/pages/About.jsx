import React from "react";
import "../styles/styleindex.css";
import personasImg from "../imagenes/personas.png";

export default function About() {
  return (
    <section id="nosotros" className="container about">
      <div className="about-text">
        <h2 className="section-title">
          ꧁༺ 𝓝𝓤𝓔𝓢𝓣𝓡𝓐 𝓗𝓘𝓢𝓣𝓞𝓡𝓘𝓐 ༻꧂
        </h2>
        <p>
          Pastelería Mil Sabores celebra su 50 aniversario como un referente en
          la repostería chilena. Famosa por su participación en un récord
          Guinness en 1995, cuando colaboró en la creación de la torta más
          grande del mundo, nuestra pastelería busca ofrecer una experiencia
          dulce y memorable a nuestros clientes, proporcionando tortas y
          productos de repostería de alta calidad para todas las ocasiones,
          mientras celebramos nuestras raíces históricas y fomentamos la
          creatividad en la repostería. Queremos convertirnos en la tienda
          online líder de productos de repostería en Chile, conocida por nuestra
          innovación, calidad y el impacto positivo en la comunidad,
          especialmente en la formación de nuevos talentos en gastronomía.
        </p>
      </div>
      <div className="about-img">
        <img src={personasImg} alt="Equipo de pastelería trabajando" />
      </div>
    </section>
  );
}

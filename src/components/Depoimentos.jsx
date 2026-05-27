import { FaStar } from 'react-icons/fa';
import '../styles/depoimentos.css';

const depoimentos = [
  {
    id: 4,
    nome: "Pedro Henrique",
    avatar: "PH",
    estrelas: 5,
    texto: "Comprei o 9PM da Afnan e fiquei impressionado com a qualidade. O perfume é original e o preço é muito bom. Já virei cliente fiel!",
    data: "Há 2 Dias",
  },
  {
    id: 6,
    nome: "Lucas Oliveira",
    avatar: "LO",
    estrelas: 5,
    texto: "Comprei Perfume Arabe Sabah Al Ward Eau de Parfum 100ml.",
    data: "Há 2 Dias",
  },
];

function Depoimentos() {
  return (
    <section className="depoimentos-section" id="depoimentos">
      <div className="depoimentos-container">
        <div className="depoimentos-header">
          <h2 className="depoimentos-heading">O que nossos clientes dizem.</h2>
          <p className="depoimentos-subheading">
            Mais de 3 clientes satisfeitos.
          </p>
        </div>

        <div className="depoimentos-grid">
          {depoimentos.map((dep) => (
            <div className="depoimento-card" key={dep.id}>
              <div className="depoimento-stars">
                {Array.from({ length: dep.estrelas }, (_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <blockquote className="depoimento-text">
                "{dep.texto}"
              </blockquote>
              <div className="depoimento-author">
                <div className="depoimento-avatar">{dep.avatar}</div>
                <div className="depoimento-author-info">
                  <span className="depoimento-name">{dep.nome}</span>
                  <span className="depoimento-date">{dep.data}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Depoimentos;

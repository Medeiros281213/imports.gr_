import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import ProductModal from "./ProductModal";
import "../styles/card.css";

function CardProduto({ produto, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = "5541997246465";
  const instagramUser = "imports.gr_";

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${produto.nome}* (${produto.marca}) - ${produto.preco}. Vi no site da IMPORTS GR!`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramLink = `https://www.instagram.com/${instagramUser}/`;

  const getBadgeClass = (badge) => {
    if (!badge) return "";
    const map = {
      "Mais Vendido": "badge-destaque",
      "Novo": "badge-novo",
      "Frete Grátis": "badge-frete",
      "Promoção": "badge-promo",
      "Kit Exclusivo": "badge-destaque",
      "Destaque": "badge-destaque",
      "Importado": "badge-novo",
      "Lançamento": "badge-novo",
      "Gamer": "badge-destaque",
    };
    return map[badge] || "badge-novo";
  };

  const parsePreco = (precoStr) => {
    if (!precoStr) return 0;
    const cleanStr = precoStr.replace("R$", "").replace(".", "").replace(",", ".").trim();
    return parseFloat(cleanStr);
  };

  const precoNum = parsePreco(produto.preco);
  const parcela = precoNum > 0 ? (precoNum / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

  return (
    <>
      <div
        className="apple-card animate-on-scroll"
        style={{ animationDelay: `${index * 80}ms` }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="apple-card-image">
          <img src={produto.imagem} alt={produto.nome} loading="lazy" />
          {produto.badge && (
            <span className={`apple-card-badge ${getBadgeClass(produto.badge)}`}>
              {produto.badge}
            </span>
          )}
        </div>

        <div className="apple-card-info">
          <span className="apple-card-category">{produto.categoria}</span>
          <h3 className="apple-card-name">{produto.nome}</h3>
          <p className="apple-card-brand">{produto.marca}</p>

          <div className="apple-card-pricing">
            {produto.precoAntigo && (
              <span className="apple-card-price-old">{produto.precoAntigo}</span>
            )}
            <span className="apple-card-price">{produto.preco}</span>
          </div>

          {precoNum > 0 && (
            <p className="apple-card-installments">
              ou 12x de <strong>{parcela}</strong>
            </p>
          )}

          <div className="apple-card-stock">
            {produto.estoque > 0 ? (
              <>
                <span className="stock-dot"></span>
                {produto.estoque} em estoque
              </>
            ) : (
              <span className="out-of-stock">Esgotado</span>
            )}
          </div>

          <div className="apple-card-actions" onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card-btn-whatsapp"
              id={`whatsapp-${produto.id}`}
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card-btn-instagram"
              id={`instagram-${produto.id}`}
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          produto={produto}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default CardProduto;
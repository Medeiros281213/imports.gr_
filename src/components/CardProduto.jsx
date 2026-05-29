import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import ProductModal from "./ProductModal";
import "../styles/card.css";

function CardProduto({ produto, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariationId, setSelectedVariationId] = useState(produto.variacoes?.[0]?.id || produto.id);
  const whatsappNumber = "5541997246465";
  const instagramUser = "imports.gr_";
  const variacoes = produto.variacoes || [produto];
  const selectedProduct = variacoes.find((variacao) => variacao.id === selectedVariationId) || variacoes[0];
  const hasVariations = variacoes.length > 1;

  const whatsappMessage = encodeURIComponent(
    `Ola! Tenho interesse no produto: *${selectedProduct.nome}* (${selectedProduct.marca}) - ${selectedProduct.preco}. Vi no site da IMPORTS GR!`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramLink = `https://www.instagram.com/${instagramUser}/`;

  const getBadgeClass = (badge) => {
    if (!badge) return "";
    const map = {
      "Mais Vendido": "badge-destaque",
      "Novo": "badge-novo",
      "Frete Gratis": "badge-frete",
      "Frete GrÃ¡tis": "badge-frete",
      "Promocao": "badge-promo",
      "PromoÃ§Ã£o": "badge-promo",
      "Kit Exclusivo": "badge-destaque",
      "Destaque": "badge-destaque",
      "Importado": "badge-novo",
      "Lancamento": "badge-novo",
      "LanÃ§amento": "badge-novo",
      "Gamer": "badge-destaque",
    };
    return map[badge] || "badge-novo";
  };

  const parsePreco = (precoStr) => {
    if (!precoStr) return 0;
    const cleanStr = precoStr.replace("R$", "").replace(".", "").replace(",", ".").trim();
    return parseFloat(cleanStr);
  };

  const precoNum = parsePreco(selectedProduct.preco);
  const parcela = precoNum > 0 ? (precoNum / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

  return (
    <>
      <div
        className="apple-card animate-on-scroll"
        style={{ animationDelay: `${index * 80}ms` }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="apple-card-image">
          <img src={selectedProduct.imagem} alt={selectedProduct.nome} loading="lazy" />
          {selectedProduct.badge && (
            <span className={`apple-card-badge ${getBadgeClass(selectedProduct.badge)}`}>
              {selectedProduct.badge}
            </span>
          )}
        </div>

        <div className="apple-card-info">
          <span className="apple-card-category">{selectedProduct.categoria}</span>
          <h3 className="apple-card-name">{produto.nome}</h3>
          <p className="apple-card-brand">{selectedProduct.marca}</p>

          {hasVariations && (
            <div className="apple-card-variations" onClick={(e) => e.stopPropagation()}>
              {variacoes.map((variacao) => (
                <button
                  type="button"
                  className={`apple-card-variation ${selectedProduct.id === variacao.id ? "active" : ""}`}
                  key={variacao.id}
                  onClick={() => setSelectedVariationId(variacao.id)}
                >
                  {variacao.variationLabel || variacao.nome}
                </button>
              ))}
            </div>
          )}

          <div className="apple-card-pricing">
            {selectedProduct.precoAntigo && (
              <span className="apple-card-price-old">{selectedProduct.precoAntigo}</span>
            )}
            <span className="apple-card-price">{selectedProduct.preco}</span>
          </div>

          {precoNum > 0 && (
            <p className="apple-card-installments">
              ou 12x de <strong>{parcela}</strong>
            </p>
          )}

          <div className="apple-card-stock">
            {selectedProduct.estoque > 0 ? (
              <>
                <span className="stock-dot"></span>
                {selectedProduct.estoque} em estoque
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
              id={`whatsapp-${selectedProduct.id}`}
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card-btn-instagram"
              id={`instagram-${selectedProduct.id}`}
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          produto={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default CardProduto;

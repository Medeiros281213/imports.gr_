import { useEffect } from 'react';
import { FiX, FiShare2, FiCopy } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import '../styles/modal.css';

function ProductModal({ produto, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!produto) return null;

  const whatsappNumber = "5541997246465";
  const instagramUser = "imports.gr_";

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${produto.nome}* (${produto.marca}) - ${produto.preco}. Vi no site da IMPORTS GR!`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramLink = `https://www.instagram.com/${instagramUser}/`;

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  };

  const parsePreco = (precoStr) => {
    if (!precoStr) return 0;
    const cleanStr = precoStr.replace("R$", "").replace(".", "").replace(",", ".").trim();
    return parseFloat(cleanStr);
  };

  const precoNum = parsePreco(produto.preco);
  const parcela = precoNum > 0 ? (precoNum / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <FiX />
        </button>

        <div className="modal-image-section">
          <img src={produto.imagem} alt={produto.nome} />
          {produto.badge && (
            <span className={`modal-badge ${getBadgeClass(produto.badge)}`}>
              {produto.badge}
            </span>
          )}
        </div>

        <div className="modal-info">
          <span className="modal-category">{produto.categoria}</span>
          <h2 className="modal-name">{produto.nome}</h2>
          <span className="modal-brand">{produto.marca}</span>

          <p className="modal-description">{produto.descricao}</p>

          <div className="modal-price-section">
            <div className="modal-price-row">
              {produto.precoAntigo && (
                <span className="modal-price-old">{produto.precoAntigo}</span>
              )}
              <span className="modal-price">{produto.preco}</span>
            </div>
            {precoNum > 0 && (
              <div className="modal-parcelas">
                em até 12x de {parcela} sem juros
              </div>
            )}

            <div className="modal-stock">
              {produto.estoque > 0 ? (
                <>
                  <span className="modal-stock-dot"></span>
                  Disponível em estoque ({produto.estoque} unid.)
                </>
              ) : (
                <span className="out-of-stock">Produto esgotado</span>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <div className="modal-actions-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn-primary"
              >
                <FaWhatsapp /> Comprar via WhatsApp
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn-secondary"
              >
                <FaInstagram /> Ver no Instagram
              </a>
            </div>
            <div className="modal-share-row">
              <button className="modal-share-btn" onClick={handleCopyLink}>
                <FiCopy /> Copiar Link
              </button>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Olha esse produto na IMPORTS GR: ${produto.nome} por ${produto.preco} - ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-share-btn"
              >
                <FiShare2 /> Compartilhar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

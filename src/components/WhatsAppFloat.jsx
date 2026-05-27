import { FaWhatsapp } from "react-icons/fa";
import "../styles/whatsapp-float.css";

function WhatsAppFloat() {
  const whatsappLink =
    "https://wa.me/5541997246465?text=Olá! Vim pelo site da IMPORTS GR e gostaria de mais informações.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco pelo WhatsApp"
      id="whatsapp-float-btn"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppFloat;

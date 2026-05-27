import { FaInstagram } from 'react-icons/fa';
import '../styles/instagram-feed.css';

function InstagramFeed() {
  const feedImages = [
    "/images/iphone_17_pro_1779845031605.png",
    "/images/lattafa_asad_1779845157780.png",
    "/images/vs_amber_romance_1779844997656.png",
    "/images/apple_watch_1779845044719.png",
    "/images/afnan_9pm_perfume_1779844985702.png",
    "/images/yara_rose_perfume_1779844972003.png"
  ];

  return (
    <section className="instagram-section">
      <div className="instagram-container">
        <div className="instagram-header">
          <h2 className="instagram-heading">Siga nosso Instagram.</h2>
          <p className="instagram-subheading">
            Acompanhe as novidades, dicas e promoções exclusivas.
          </p>
        </div>

        <div className="instagram-grid">
          {feedImages.map((img, index) => (
            <a
              key={index}
              href="https://www.instagram.com/imports.gr_/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item"
            >
              <img src={img} alt={`Instagram post ${index + 1}`} loading="lazy" />
              <div className="instagram-overlay">
                <FaInstagram />
              </div>
            </a>
          ))}
        </div>

        <div className="instagram-cta-wrapper">
          <a
            href="https://www.instagram.com/imports.gr_/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-cta"
          >
            Seguir @imports.gr_ <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;

import { useState } from 'react';
import '../styles/faq.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Os produtos são originais?",
      answer: "Sim, 100% originais. Trabalhamos apenas com fornecedores oficiais e importadores diretos. Garantimos a autenticidade de todos os perfumes, eletrônicos e cosméticos vendidos em nossa loja."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo varia de acordo com o seu CEP. Geralmente, entregas para as regiões Sul e Sudeste levam de 2 a 5 dias úteis, e para as demais regiões de 5 a 12 dias úteis. Você recebe o código de rastreio assim que o pedido for despachado."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Aceitamos Pix com aprovação imediata e cartões de crédito das principais bandeiras. Você pode parcelar suas compras em até 12x (consulte as condições no momento do checkout)."
    },
    {
      question: "Como funciona a garantia dos eletrônicos?",
      answer: "Todos os produtos Apple possuem 1 ano de garantia global diretamente com o fabricante. Para os demais eletrônicos, oferecemos garantia legal de 90 dias contra defeitos de fabricação."
    },
    {
      question: "Posso retirar pessoalmente?",
      answer: "Nossa operação atual é 100% online focada em entregas rápidas via correios e transportadoras. Não trabalhamos com retiradas presenciais."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-heading">Perguntas frequentes.</h2>
          <p className="faq-subheading">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-chevron">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

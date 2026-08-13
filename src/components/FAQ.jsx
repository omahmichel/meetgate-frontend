import { useState } from "react";
import { faqItems } from "../data/homeData";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro">
          <span className="section-label">Project Questions</span>
          <h2>Important points to explain during presentation</h2>
          <p>
            These answers help explain the purpose and operation of the proposed
            system.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-symbol">+</span>
                </button>

                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

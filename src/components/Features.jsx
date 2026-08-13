import { features } from "../data/homeData";

function Features() {
  return (
    <section className="section feature-section" id="features">
      <div className="container">
        <div className="split-heading">
          <div>
            <span className="section-label">Core Features</span>
            <h2>Built around the complete meeting journey</h2>
          </div>

          <p>
            Every feature supports a clear purpose: helping users organise
            meetings without unnecessary technical difficulty.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-icon">{feature.number}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

import { architectureSteps } from "../data/homeData";

function SystemArchitecture() {
  return (
    <section className="section architecture-section" id="architecture">
      <div className="container">
        <div className="section-heading light-heading">
          <span className="section-label section-label-light">
            System Architecture
          </span>
          <h2>How the major parts of the system communicate</h2>
          <p>
            The architecture separates the interface, business logic,
            third-party Zoom service and data storage for easier maintenance.
          </p>
        </div>

        <div className="architecture-flow">
          {architectureSteps.map((step, index) => (
            <div className="architecture-node" key={step.number}>
              <article>
                <span className="architecture-index">{step.number}</span>
                <div className="architecture-icon">{step.shortName}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>

              {index < architectureSteps.length - 1 && (
                <span className="flow-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="technology-row">
          <span>Possible technology stack</span>
          <strong>React</strong>
          <strong>Vite</strong>
          <strong>Django / Node.js</strong>
          <strong>Database</strong>
          <strong>Zoom API</strong>
        </div>
      </div>
    </section>
  );
}

export default SystemArchitecture;

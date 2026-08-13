import { securityItems } from "../data/homeData";

function Security() {
  return (
    <section className="section security-section" id="security">
      <div className="container security-grid">
        <div className="security-visual">
          <div className="security-orbit">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <div className="security-core">
              <span>✓</span>
              <strong>Protected</strong>
              <small>Meeting gateway</small>
            </div>
          </div>
        </div>

        <div className="security-content">
          <span className="section-label">Security and Reliability</span>
          <h2>Designed to protect users and meeting information</h2>
          <p>
            Security is handled at different levels of the system rather than
            depending on only one protection method.
          </p>

          <div className="security-list">
            {securityItems.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Security;

import communityScene from "../assets/images/community-meeting-scene.svg";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-pattern" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="project-badge">
            <span className="badge-dot" />
            Academic System Design Project
          </div>

          <h1>
            A smarter gateway for
            <span>creating and joining Zoom meetings.</span>
          </h1>

          <p className="hero-text">
            MeetGate connects users, organisations and communities to Zoom
            through one secure web platform for meeting creation, scheduling,
            invitations, access control and participation.
          </p>

          <div className="hero-actions">
            <a href="#join" className="button button-primary">
              Join a Meeting
              <span aria-hidden="true">→</span>
            </a>

            <a href="#overview" className="button button-secondary">
              View Project Overview
            </a>
          </div>

          <div className="hero-proof">
            <div>
              <strong>01</strong>
              <span>Unified meeting gateway</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Secure Zoom integration</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Phone and laptop access</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" />

          <div className="visual-shell">
            <div className="visual-topbar">
              <div className="window-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="system-status">
                <span />
                System online
              </div>
            </div>

            <img
              src={communityScene}
              alt="Community members using phones and laptops to join an online meeting"
            />

            <div className="visual-footer">
              <div>
                <strong>Community Strategy Meeting</strong>
                <span>Saturday · 10:00 AM</span>
              </div>
              <a href="#join">Open gateway</a>
            </div>
          </div>

          <div className="status-card status-card-left">
            <span className="status-icon">✓</span>
            <div>
              <strong>Meeting created</strong>
              <small>Zoom link is ready</small>
            </div>
          </div>

          <div className="status-card status-card-right">
            <span className="participant-stack" aria-hidden="true">
              <i>AK</i>
              <i>BM</i>
              <i>+8</i>
            </span>
            <div>
              <strong>10 participants</strong>
              <small>Access verified</small>
            </div>
          </div>
        </div>
      </div>

      <div className="container partner-strip">
        <span>Designed for</span>
        <strong>Schools</strong>
        <strong>Offices</strong>
        <strong>Churches</strong>
        <strong>Organisations</strong>
        <strong>Communities</strong>
      </div>
    </section>
  );
}

export default Hero;

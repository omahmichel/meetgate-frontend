import { Brand } from "./Navbar";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            A proposed online meeting gateway developed as an academic
            technology project.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>Project</span>
            <a href="#overview">Overview</a>
            <a href="#features">Features</a>
            <a href="#architecture">Architecture</a>
          </div>

          <div>
            <span>System</span>
            <a href="#workflow">Process</a>
            <a href="#security">Security</a>
            <a href="#join">Join Meeting</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MeetGate Academic Project.</span>
        <span>Online Meeting Gateway System Using Zoom</span>
      </div>
    </footer>
  );
}

export default Footer;

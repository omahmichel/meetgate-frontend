import laptopUser from "../assets/images/laptop-user.svg";
import phoneUser from "../assets/images/phone-user.svg";

function CommunitySection() {
  return (
    <section className="section community-section" id="community">
      <div className="container community-grid">
        <div className="community-content">
          <span className="section-label">Community Access</span>
          <h2>One platform, different devices, the same meeting.</h2>
          <p>
            MeetGate is designed for people in different locations. A
            participant can join by phone while a host manages the session from
            a laptop.
          </p>

          <div className="device-points">
            <div>
              <span>Mobile</span>
              <strong>Fast access from anywhere</strong>
            </div>
            <div>
              <span>Laptop</span>
              <strong>Full host and collaboration tools</strong>
            </div>
          </div>
        </div>

        <div className="device-showcase">
          <article className="device-card device-card-phone">
            <img src={phoneUser} alt="Person using a phone to join a meeting" />
            <div>
              <span>Mobile participant</span>
              <strong>Ready to join</strong>
            </div>
          </article>

          <article className="device-card device-card-laptop">
            <img src={laptopUser} alt="Person using a laptop for a meeting" />
            <div>
              <span>Meeting host</span>
              <strong>Session in progress</strong>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;

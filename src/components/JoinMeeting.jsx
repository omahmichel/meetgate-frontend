import { useState } from "react";

function JoinMeeting() {
  const [meetingCode, setMeetingCode] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    const formattedCode = digits.replace(/(\d{3})(?=\d)/g, "$1 ");

    setMeetingCode(formattedCode);
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedCode = meetingCode.replace(/\s|-/g, "");

    if (!/^\d{9,11}$/.test(cleanedCode)) {
      setMessage({
        type: "error",
        text: "Please enter a valid meeting code containing 9 to 11 digits.",
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Meeting code accepted. Backend Zoom authorisation will be connected in the next development phase.",
    });
  };

  return (
    <section className="section join-section" id="join">
      <div className="container join-panel">
        <div className="join-copy">
          <span className="section-label section-label-light">
            Meeting Gateway Demo
          </span>
          <h2>Enter a meeting code to continue</h2>
          <p>
            This frontend demonstration validates the meeting code. In the full
            system, a successful entry will connect the user to Zoom.
          </p>
        </div>

        <form className="join-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="meetingCode">Meeting code</label>

          <div className="join-row">
            <input
              id="meetingCode"
              name="meetingCode"
              type="text"
              value={meetingCode}
              onChange={handleChange}
              placeholder="Example: 984 210 778"
              inputMode="numeric"
              autoComplete="off"
              maxLength={14}
              required
            />

            <button type="submit">
              Continue
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <p className={`form-message ${message.type}`} role="status">
            {message.text}
          </p>
        </form>
      </div>
    </section>
  );
}

export default JoinMeeting;

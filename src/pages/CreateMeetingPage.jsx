import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createMeeting } from "../api/meetings";

function CreateMeetingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    startTime: "",
    durationMinutes: 30,
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.topic.trim()) {
      setMessage({
        type: "error",
        text: "Meeting topic is required.",
      });

      return;
    }

    if (!formData.startTime) {
      setMessage({
        type: "error",
        text: "Select the meeting date and time.",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      await createMeeting({
        topic: formData.topic.trim(),
        description: formData.description.trim(),
        start_time: new Date(formData.startTime).toISOString(),
        duration_minutes: Number(formData.durationMinutes),
      });

      setMessage({
        type: "success",
        text: "Meeting created successfully.",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-meeting-page">
      <section className="create-meeting-card">
        <div className="create-meeting-heading">
          <span>Create meeting</span>

          <h1>Schedule a new meeting</h1>

          <p>
            Enter the meeting details below. Zoom integration will be connected
            later.
          </p>
        </div>

        <form className="create-meeting-form" onSubmit={handleSubmit}>
          <div className="create-meeting-field">
            <label htmlFor="topic">Meeting topic</label>

            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Example: Project discussion"
            />
          </div>

          <div className="create-meeting-field">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short meeting description"
              rows="5"
            />
          </div>

          <div className="create-meeting-field">
            <label htmlFor="startTime">Start date and time</label>

            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="create-meeting-field">
            <label htmlFor="durationMinutes">Duration in minutes</label>

            <input
              type="number"
              id="durationMinutes"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
              min="5"
              max="480"
            />
          </div>

          {message.text && (
            <p
              className={
                message.type === "success"
                  ? "form-success"
                  : "form-server-error"
              }
            >
              {message.text}
            </p>
          )}

          <div className="create-meeting-buttons">
            <Link to="/dashboard">Cancel</Link>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating meeting..." : "Create meeting"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateMeetingPage;
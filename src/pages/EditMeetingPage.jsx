import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMeetingById, updateMeeting } from "../api/meetings";
import LoadingSpinner from "../components/LoadingSpinner";

function EditMeetingPage() {
  const { id } = useParams();
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadMeeting() {
      try {
        const meeting = await getMeetingById(id);

        const localStartTime = new Date(meeting.start_time);
        const timezoneOffset = localStartTime.getTimezoneOffset() * 60000;

        const formattedStartTime = new Date(
          localStartTime.getTime() - timezoneOffset
        )
          .toISOString()
          .slice(0, 16);

        setFormData({
          topic: meeting.topic,
          description: meeting.description || "",
          startTime: formattedStartTime,
          durationMinutes: meeting.duration_minutes,
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadMeeting();
  }, [id]);

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
      await updateMeeting(id, {
        topic: formData.topic.trim(),
        description: formData.description.trim(),
        start_time: new Date(formData.startTime).toISOString(),
        duration_minutes: Number(formData.durationMinutes),
      });

      setMessage({
        type: "success",
        text: "Meeting updated successfully.",
      });

      setTimeout(() => {
        navigate(`/meetings/${id}`);
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
  return (
    <main className="create-meeting-page">
      <section className="create-meeting-card">
        <LoadingSpinner message="Loading meeting..." />
      </section>
    </main>
  );
}
  return (
    <main className="create-meeting-page">
      <section className="create-meeting-card">
        <div className="create-meeting-heading">
          <span>Edit meeting</span>

          <h1>Update meeting details</h1>

          <p>
            Change the meeting information below and save your updates.
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
              placeholder="Enter meeting topic"
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
            <Link to={`/meetings/${id}`}>Cancel</Link>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditMeetingPage;
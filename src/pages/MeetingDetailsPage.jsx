
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  deleteMeeting,
  getMeetingById,
} from "../api/meetings";
import {
  addMeetingParticipant,
  deleteMeetingParticipant,
  getMeetingParticipants,
  updateMeetingParticipant,
} from "../api/participants";
function MeetingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(true);
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);

  async function loadParticipants() {
    setIsLoadingParticipants(true);

    try {
      const data = await getMeetingParticipants(id);
      setParticipants(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingParticipants(false);
    }
  }

  async function handleAddParticipant(event) {
    event.preventDefault();

    if (!participantEmail.trim()) {
      toast.error("Participant email is required.");
      return;
    }

    setIsAddingParticipant(true);

    try {
      const participant = await addMeetingParticipant(id, {
        name: participantName.trim(),
        email: participantEmail.trim(),
      });

      setParticipants((current) => [...current, participant]);
      setParticipantName("");
      setParticipantEmail("");
      toast.success("Participant added successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAddingParticipant(false);
    }
  }

  async function handleParticipantStatusChange(participantId, status) {
    try {
      const updatedParticipant = await updateMeetingParticipant(
        id,
        participantId,
        { status },
      );

      setParticipants((current) =>
        current.map((participant) =>
          participant.id === participantId
            ? updatedParticipant
            : participant,
        ),
      );

      toast.success("Participant status updated.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleRemoveParticipant(participantId) {
    try {
      await deleteMeetingParticipant(id, participantId);

      setParticipants((current) =>
        current.filter(
          (participant) => participant.id !== participantId,
        ),
      );

      toast.success("Participant removed.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleCopyLink() {
    if (!meeting?.join_url) {
      toast.error("Zoom join link is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(meeting.join_url);

      toast.success("Zoom join link copied successfully.");
    } catch (error) {
      toast.error("Failed to copy Zoom join link.");
    }
  }

  function handleStartMeeting() {
    if (!meeting?.start_url) {
      toast.error("Zoom start link is not available.");
      return;
    }

    window.open(
      meeting.start_url,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function handleDeleteMeeting() {
    setIsDeleting(true);

    try {
      await deleteMeeting(id);

      toast.success("Meeting deleted successfully.");

      setShowDeleteModal(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  }
  useEffect(() => {
    loadParticipants();
  }, [id]);

  useEffect(() => {
    async function loadMeeting() {
  try {
    const data = await getMeetingById(id);
    setMeeting(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMeeting();
  }, [id]);

  if (isLoading) {
  return (
    <main className="meeting-details-page">
      <section className="meeting-details-card">
        <LoadingSpinner message="Loading meeting details..." />
      </section>
    </main>
  );
}

  if (errorMessage) {
    return (
      <main className="meeting-details-page">
        <section className="meeting-details-card">
          <h1>Unable to load meeting</h1>
          <p>{errorMessage}</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="meeting-details-page">
      <section className="meeting-details-card">
        <div className="meeting-details-topbar">
          <Link to="/dashboard">← Back to dashboard</Link>

          <span className="meeting-details-status">
            {meeting.status}
          </span>
        </div>

        <header className="meeting-details-header">
          <span>Meeting details</span>
          <h1>{meeting.topic}</h1>
          <p>{meeting.description || "No description provided."}</p>
        </header>

        <div className="meeting-details-grid">
          <article>
            <span>Date</span>
            <strong>
              {new Date(meeting.start_time).toLocaleDateString()}
            </strong>
          </article>

          <article>
            <span>Time</span>
            <strong>
              {new Date(meeting.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>
          </article>

          <article>
            <span>Duration</span>
            <strong>{meeting.duration_minutes} minutes</strong>
          </article>

          <article>
            <span>Status</span>
            <strong>{meeting.status}</strong>
          </article>

          <article>
            <span>Zoom Meeting ID</span>
            <strong>
              {meeting.zoom_meeting_id || "Not available"}
            </strong>
          </article>

          <article>
            <span>Password</span>
            <strong>
              {meeting.meeting_password || "Not required"}
            </strong>
          </article>
        </div>

        <div className="meeting-details-actions">
          <button
            type="button"
            onClick={handleStartMeeting}
            disabled={!meeting.start_url}
          >
            Start Meeting
          </button>

          <button
  type="button"
  className="secondary"
  onClick={handleCopyLink}
>
  Copy Link
</button>
          <button
  type="button"
  className="secondary"
  onClick={() => navigate(`/meetings/${id}/edit`)}
>
  Edit Meeting
</button>
<button
  type="button"
  onClick={() => setShowDeleteModal(true)}
>
  Delete Meeting
</button>
<ConfirmModal
  isOpen={showDeleteModal}
  title="Delete Meeting"
  message={`Are you sure you want to delete "${meeting.topic}"? This action cannot be undone.`}
  confirmText="Delete Meeting"
  cancelText="Cancel"
  onConfirm={handleDeleteMeeting}
  onCancel={() => setShowDeleteModal(false)}
  isLoading={isDeleting}
/>
        </div>

        <section className="meeting-participants">
          <div className="meeting-participants-heading">
            <div>
              <span>Participants</span>
              <h2>Manage meeting participants</h2>
            </div>

            <strong className="meeting-participants-count">
              {participants.length}
            </strong>
          </div>

          <form
            className="participant-form"
            onSubmit={handleAddParticipant}
          >
            <input
              type="text"
              placeholder="Participant name (optional)"
              value={participantName}
              onChange={(event) =>
                setParticipantName(event.target.value)
              }
            />

            <input
              type="email"
              placeholder="Participant email"
              value={participantEmail}
              onChange={(event) =>
                setParticipantEmail(event.target.value)
              }
              required
            />

            <button type="submit" disabled={isAddingParticipant}>
              {isAddingParticipant ? "Adding..." : "Add participant"}
            </button>
          </form>

          {isLoadingParticipants ? (
            <LoadingSpinner message="Loading participants..." />
          ) : participants.length === 0 ? (
            <div className="participant-empty">
              No participants have been added to this meeting yet.
            </div>
          ) : (
            <div className="participant-list">
              {participants.map((participant) => (
                <article
                  key={participant.id}
                  className="participant-row"
                >
                  <div className="participant-identity">
                    <strong>
                      {participant.name || "Unnamed participant"}
                    </strong>
                    <span>{participant.email}</span>
                  </div>

                  <select
                    value={participant.status}
                    onChange={(event) =>
                      handleParticipantStatusChange(
                        participant.id,
                        event.target.value,
                      )
                    }
                  >
                    <option value="invited">Invited</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>

                  <button
                    type="button"
                    className="participant-remove"
                    onClick={() =>
                      handleRemoveParticipant(participant.id)
                    }
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default MeetingDetailsPage;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getMeetings } from "../api/meetings";
import {
  getZoomAuthorizationUrl,
  getZoomConnectionStatus,
} from "../api/zoom";

function DashboardPage() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [zoomConnected, setZoomConnected] = useState(false);
const [isConnectingZoom, setIsConnectingZoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const meetingsPerPage = 5;

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const filteredMeetings = meetings.filter((meeting) => {
  const searchValue = searchTerm.toLowerCase();

  return (
    meeting.topic.toLowerCase().includes(searchValue) ||
    meeting.description.toLowerCase().includes(searchValue)
  );
});
const totalPages = Math.ceil(
  filteredMeetings.length / meetingsPerPage
);

const indexOfLastMeeting = currentPage * meetingsPerPage;

const indexOfFirstMeeting =
  indexOfLastMeeting - meetingsPerPage;

const currentMeetings = filteredMeetings.slice(
  indexOfFirstMeeting,
  indexOfLastMeeting
);
  useEffect(() => {
    async function loadMeetings() {
      try {
        const data = await getMeetings();
        console.log("Meetings from API:", data);
        setMeetings(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMeetings();
  }, []);
  useEffect(() => {
  async function loadZoomStatus() {
    try {
      const data = await getZoomConnectionStatus();

      setZoomConnected(data.connected);
    } catch (error) {
      console.error("Zoom status error:", error);
    }
  }

  loadZoomStatus();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login");
  };
async function handleConnectZoom() {
  setIsConnectingZoom(true);

  try {
    const data = await getZoomAuthorizationUrl();

    window.location.href = data.authorization_url;
  } catch (error) {
    console.error("Zoom connection error:", error);
  } finally {
    setIsConnectingZoom(false);
  }
}
function handleStartMeeting(meeting) {
  if (!meeting.start_url) {
    toast.error("Zoom start link is not available.");
    return;
  }

  window.open(meeting.start_url, "_blank", "noopener,noreferrer");
}

async function handleCopyMeetingLink(meeting) {
  if (!meeting.join_url) {
    toast.error("Zoom join link is not available.");
    return;
  }

  try {
    await navigator.clipboard.writeText(meeting.join_url);
    toast.success("Zoom join link copied successfully.");
  } catch (error) {
    console.error("Copy meeting link error:", error);
    toast.error("Failed to copy Zoom join link.");
  }
}

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-brand">
          MeetGate
        </Link>

        <nav className="dashboard-navigation">
          <a href="#overview" className="active">Dashboard</a>
          <a href="#meetings">My Meetings</a>
          <a href="#schedule">Schedule Meeting</a>
          <a href="#participants">Participants</a>
          <a href="#settings">Settings</a>
        </nav>

        <button type="button" className="dashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <span>MeetGate Dashboard</span>
            <h1>Welcome, {user?.first_name || "User"}.</h1>
            <p>Manage your meetings, invitations and Zoom activities from one place.</p>
            <div className="dashboard-zoom-connection">
  {zoomConnected ? (
    <span className="zoom-connected-badge">
      Zoom connected
    </span>
  ) : (
    <button
      type="button"
      className="connect-zoom-button"
      onClick={handleConnectZoom}
      disabled={isConnectingZoom}
    >
      {isConnectingZoom
        ? "Connecting..."
        : "Connect Zoom Account"}
    </button>
  )}
</div>
          </div>

          <div className="dashboard-profile">
            <div className="dashboard-avatar">
              {user?.first_name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <strong>
                {user?.first_name || "User"} {user?.last_name || ""}
              </strong>
              <small>{user?.account_type || "Participant"}</small>
            </div>
          </div>
        </header>

        <section className="dashboard-stats" id="overview">
          <article className="dashboard-stat-card">
            <span>Total Meetings</span>
            <strong>{meetings.length}</strong>
            <p>Your created and joined meetings</p>
          </article>

          <article className="dashboard-stat-card">
            <span>Upcoming Meetings</span>
            <strong>{meetings.length}</strong>
            <p>Meetings scheduled for later</p>
          </article>

          <article className="dashboard-stat-card">
            <span>Completed Meetings</span>
            <strong>0</strong>
            <p>Meetings successfully completed</p>
          </article>
        </section>

        <section className="dashboard-actions">
          <div className="dashboard-section-heading">
            <div>
              <span>Quick actions</span>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="dashboard-action-grid">
            <article className="dashboard-action-card">
              <div className="dashboard-action-icon">+</div>
              <h3>Create Meeting</h3>
              <p>Create a new Zoom meeting and invite participants.</p>
              <button type="button" onClick={() => navigate("/meetings/create")}>
                Create meeting
              </button>
            </article>

            <article className="dashboard-action-card">
              <div className="dashboard-action-icon">⌚</div>
              <h3>Schedule Meeting</h3>
              <p>Select a future date and time for your meeting.</p>
              <button type="button">Schedule meeting</button>
            </article>

            <article className="dashboard-action-card">
              <div className="dashboard-action-icon">→</div>
              <h3>Join Meeting</h3>
              <p>Enter a meeting ID or invitation link to join.</p>
              <button type="button">Join meeting</button>
            </article>
          </div>
        </section>

        <section className="dashboard-recent" id="meetings">
          <div className="dashboard-section-heading">
            {totalPages > 1 && (
  <div className="meeting-pagination">
    <button
      type="button"
      onClick={() =>
        setCurrentPage((currentPageValue) =>
          Math.max(currentPageValue - 1, 1)
        )
      }
      disabled={currentPage === 1}
    >
      Previous
    </button>

    <span>
      Page {currentPage} of {totalPages}
    </span>

    <button
      type="button"
      onClick={() =>
        setCurrentPage((currentPageValue) =>
          Math.min(currentPageValue + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}
  <div>
    <span>Meeting activity</span>
    <h2>Recent meetings</h2>
  </div>

  <input
    type="search"
    className="meeting-search-input"
    placeholder="Search meetings..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
</div>

          <div className="dashboard-empty-state">

            {filteredMeetings.length === 0 ? (
  <>
    <div className="dashboard-empty-content">
  <div className="dashboard-empty-icon">+</div>

  <h3>No meetings yet</h3>

  <p>
    Create your first meeting to start managing your meeting activities.
  </p>

  <button
    type="button"
    onClick={() => navigate("/meetings/create")}
  >
    Create Meeting
  </button>
</div>
    <p>
      {searchTerm
        ? "Try searching with a different meeting topic or description."
        : "Your scheduled and completed meetings will appear here."}
    </p>
  </>
) : (
  <div className="meeting-list">
    {currentMeetings.map((meeting) => (
      <article key={meeting.id} className="meeting-item">
        <h3>{meeting.topic}</h3>

        <p>{meeting.description || "No description provided."}</p>

        <div className="meeting-meta">
          <span>
            Date: {new Date(meeting.start_time).toLocaleDateString()}
          </span>

          <span>
            Time:{" "}
            {new Date(meeting.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <span>Duration: {meeting.duration_minutes} mins</span>

          <span>Status: {meeting.status}</span>
        </div>

        <div className="meeting-actions">
          <button
            type="button"
            onClick={() => handleStartMeeting(meeting)}
            disabled={!meeting.start_url}
          >
            Start Meeting
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => handleCopyMeetingLink(meeting)}
            disabled={!meeting.join_url}
          >
            Copy Link
          </button>

          <Link
            to={`/meetings/${meeting.id}`}
            className="meeting-action-link"
          >
            View Details
          </Link>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate(`/meetings/${meeting.id}/edit`)}
          >
            Edit
          </button>
        </div>
      </article>
    ))}
  </div>
)}
          </div>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;

import { objectives, projectCards } from "../data/homeData";

function ProjectOverview() {
  return (
    <section className="section overview-section" id="overview">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Project Overview</span>
          <h2>A professional solution to an everyday online meeting problem</h2>
          <p>
            The project simplifies how users interact with Zoom by providing a
            central system that manages the complete meeting process.
          </p>
        </div>

        <div className="overview-grid">
          {projectCards.map((card) => (
            <article
              key={card.number}
              className={`overview-card ${
                card.featured ? "overview-card-dark" : ""
              }`}
            >
              <span className="overview-number">{card.number}</span>
              <div>
                <span className="card-label">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="objective-panel">
          <div className="objective-intro">
            <span className="section-label">Main Objectives</span>
            <h3>What the system is expected to achieve</h3>
          </div>

          <div className="objective-list">
            {objectives.map((objective, index) => (
              <div key={objective}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectOverview;

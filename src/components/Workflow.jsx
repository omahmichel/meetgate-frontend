import { workflowSteps } from "../data/homeData";

function Workflow() {
  return (
    <section className="section workflow-section" id="workflow">
      <div className="container workflow-grid">
        <div className="workflow-intro">
          <span className="section-label">System Process</span>
          <h2>From sign-in to a live Zoom session</h2>
          <p>
            The workflow is intentionally simple so that both technical and
            non-technical users can understand the process.
          </p>

          <div className="workflow-note">
            <span>Project principle</span>
            <strong>Simple for the user, secure behind the scenes.</strong>
          </div>
        </div>

        <div className="timeline">
          {workflowSteps.map((step) => (
            <article className="timeline-item" key={step.number}>
              <span className="timeline-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workflow;

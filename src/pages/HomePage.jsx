import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectOverview from "../components/ProjectOverview";
import Features from "../components/Features";
import CommunitySection from "../components/CommunitySection";
import SystemArchitecture from "../components/SystemArchitecture";
import Workflow from "../components/Workflow";
import Security from "../components/Security";
import JoinMeeting from "../components/JoinMeeting";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ProjectOverview />
        <Features />
        <CommunitySection />
        <SystemArchitecture />
        <Workflow />
        <Security />
        <JoinMeeting />
        <FAQ />
      </main>

      <a className="home-button" href="#home" aria-label="Return to home">
        <span aria-hidden="true">↑</span>
        Home
      </a>

      <Footer />
    </>
  );
}

export default HomePage;

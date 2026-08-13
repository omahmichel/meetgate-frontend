export const projectCards = [
  {
    number: "01",
    label: "Problem Statement",
    title: "Meeting activities are often scattered across different platforms.",
    description:
      "Users may struggle with creating links, sharing invitations, remembering schedules and controlling access from one place.",
    featured: true,
  },
  {
    number: "02",
    label: "Project Aim",
    title: "Build one reliable gateway between users and Zoom.",
    description:
      "The system provides a cleaner and more organised way to create, manage, join and monitor online meetings.",
  },
  {
    number: "03",
    label: "Expected Result",
    title: "Faster access, stronger control and a better user experience.",
    description:
      "The completed solution should reduce confusion and support users on both mobile devices and computers.",
  },
];

export const objectives = [
  "Create and schedule Zoom meetings through a web interface.",
  "Generate secure meeting links and invitation information.",
  "Allow users to join meetings with a code or protected link.",
  "Store meeting records, participants and activity information.",
];

export const features = [
  {
    number: "01",
    title: "Meeting Scheduling",
    description:
      "Set the meeting topic, date, time, duration and host details from one structured form.",
  },
  {
    number: "02",
    title: "Zoom API Connection",
    description:
      "Send meeting information securely to Zoom and receive a generated meeting link.",
  },
  {
    number: "03",
    title: "Invitation Management",
    description:
      "Prepare and share meeting links, passwords and schedule details with participants.",
  },
  {
    number: "04",
    title: "Secure Access",
    description:
      "Use authentication, meeting codes and protected links to control who can enter.",
  },
  {
    number: "05",
    title: "Participant Records",
    description:
      "Keep useful records of meeting attendance, status and relevant user activity.",
  },
  {
    number: "06",
    title: "Responsive Access",
    description:
      "Provide a consistent experience across phones, tablets and laptop computers.",
  },
];

export const architectureSteps = [
  {
    number: "01",
    shortName: "UI",
    title: "Frontend",
    description: "Landing page, forms, dashboard and user interaction.",
  },
  {
    number: "02",
    shortName: "API",
    title: "Backend",
    description: "Authentication, validation and meeting business logic.",
  },
  {
    number: "03",
    shortName: "Z",
    title: "Zoom Service",
    description: "Creates meetings and returns secure meeting information.",
  },
  {
    number: "04",
    shortName: "DB",
    title: "Database",
    description: "Stores users, schedules, invitations and meeting records.",
  },
];

export const workflowSteps = [
  {
    number: "01",
    title: "User authentication",
    description: "The user registers or signs in before managing a meeting.",
  },
  {
    number: "02",
    title: "Meeting information",
    description:
      "The host enters the topic, schedule and participant details.",
  },
  {
    number: "03",
    title: "Zoom meeting creation",
    description:
      "The backend connects to Zoom and generates the meeting session.",
  },
  {
    number: "04",
    title: "Invitation and access",
    description:
      "Participants receive the secure link or meeting code.",
  },
  {
    number: "05",
    title: "Meeting record",
    description:
      "The system stores the final meeting status and relevant activity.",
  },
];

export const securityItems = [
  {
    number: "01",
    title: "User authentication",
    description: "Only authorised users can create or manage meetings.",
  },
  {
    number: "02",
    title: "Protected API credentials",
    description:
      "Zoom secrets remain on the backend and outside the browser.",
  },
  {
    number: "03",
    title: "Input validation",
    description: "Meeting data is checked before processing or storage.",
  },
  {
    number: "04",
    title: "Activity logging",
    description:
      "Important system actions can be recorded for monitoring.",
  },
];

export const faqItems = [
  {
    question: "Does MeetGate replace Zoom?",
    answer:
      "No. MeetGate integrates with Zoom and provides an easier interface for managing Zoom meeting activities.",
  },
  {
    question: "Why is a gateway system needed?",
    answer:
      "It combines scheduling, invitation management, secure access and meeting records into one organised platform.",
  },
  {
    question: "Can users join with phones and laptops?",
    answer:
      "Yes. The responsive interface is designed to support mobile devices, tablets and computers.",
  },
  {
    question: "What remains after the landing page?",
    answer:
      "The next phase includes authentication, backend development, database design and secure Zoom API integration.",
  },
];

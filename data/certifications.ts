import type { Award, Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Google IT Support Professional Certificate",
    organization: "Google (Coursera)",
    logo: "/images/certs/google.svg",
    date: "2024-05",
    credentialUrl: "",
    skills: ["Networking", "Troubleshooting", "System Administration"],
  },
  {
    id: "cert-2",
    title: "Introduction to Cybersecurity",
    organization: "Cisco Networking Academy",
    logo: "/images/certs/cisco.svg",
    date: "2024-02",
    credentialUrl: "",
    skills: ["Cybersecurity Fundamentals", "Network Security"],
  },
  {
    id: "cert-3",
    title: "Deep Learning Specialization",
    organization: "DeepLearning.AI (Coursera)",
    logo: "/images/certs/deeplearning-ai.svg",
    date: "2024-11",
    credentialUrl: "",
    skills: ["Neural Networks", "TensorFlow", "Deep Learning"],
  },
  {
    id: "cert-4",
    title: "Practical Ethical Hacking",
    organization: "TCM Security",
    logo: "/images/certs/tcm-security.svg",
    date: "2025-01",
    credentialUrl: "",
    skills: ["Penetration Testing", "OSINT", "Exploitation"],
  },
];

export const awards: Award[] = [
  {
    id: "award-1",
    title: "Hackathon Finalist",
    issuer: "Campus Hack Night",
    date: "2025-03",
    description: "Top 5 of 40+ teams for an AI-assisted study planner.",
  },
  {
    id: "award-2",
    title: "Dean's List",
    issuer: "University Name",
    date: "2024-12",
  },
];

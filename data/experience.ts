import type { EducationItem, ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-internship",
    type: "internship",
    title: "Software Engineering Intern",
    organization: "Company Name",
    location: "Remote",
    startDate: "2025-06",
    endDate: "2025-08",
    description:
      "Contributed to an internal tooling team, shipping features end-to-end across a TypeScript/Node.js backend and a React frontend.",
    highlights: [
      "Shipped a feature that reduced manual triage time by an estimated 30%",
      "Wrote integration tests raising coverage on the touched module",
      "Paired with senior engineers on code review and design docs",
    ],
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    id: "exp-hackathon",
    type: "hackathon",
    title: "University Hackathon — Finalist",
    organization: "Campus Hack Night",
    startDate: "2025-03",
    endDate: "2025-03",
    description:
      "Built an AI-assisted study planner in 24 hours with a team of four, placing as a finalist among 40+ teams.",
    highlights: [
      "Designed the RAG pipeline for syllabus-aware scheduling",
      "Presented the final demo to a panel of industry judges",
    ],
    tech: ["Next.js", "OpenAI API", "Firebase"],
  },
  {
    id: "exp-opensource",
    type: "opensource",
    title: "Open Source Contributor",
    organization: "Various repositories",
    startDate: "2024-09",
    endDate: "Present",
    description:
      "Occasional contributions to developer-tooling and security-focused open source projects — bug fixes, docs, and small features.",
    highlights: [
      "Merged PRs fixing edge cases in CLI argument parsing",
      "Improved documentation for a static analysis tool",
    ],
  },
  {
    id: "exp-freelance",
    type: "freelance",
    title: "Freelance Developer",
    organization: "Self-employed",
    startDate: "2024-01",
    endDate: "Present",
    description:
      "Built small web and mobile apps for local clients — landing pages, booking flows, and internal tools.",
    highlights: [
      "Delivered 3 client projects on time and on budget",
      "Handled requirements gathering through deployment",
    ],
    tech: ["Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    id: "exp-university-project",
    type: "project",
    title: "Capstone Project — Network Intrusion Detection",
    organization: "University Coursework",
    startDate: "2024-09",
    endDate: "2024-12",
    description:
      "Built a lightweight network intrusion detection prototype using traffic capture and a trained classifier to flag anomalous flows.",
    highlights: [
      "Achieved strong precision/recall on a labeled traffic dataset",
      "Presented findings and a live demo to faculty reviewers",
    ],
    tech: ["Python", "Scikit-learn", "Wireshark"],
  },
];

export const education: EducationItem[] = [
  {
    id: "edu-university",
    institution: "University Name",
    degree: "B.S. Computer Science",
    field: "Artificial Intelligence & Cybersecurity focus",
    startDate: "2023-09",
    endDate: "2027-05",
    description:
      "Coursework spanning algorithms, systems, machine learning, and network security, alongside independent projects in applied AI and offensive security.",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "Applied Cryptography",
      "Database Systems",
    ],
  },
];

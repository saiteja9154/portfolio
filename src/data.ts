import { Education, Internship, Project, Certification, SkillItem } from './types';

export const PERSONAL_INFO = {
  name: "Sai Teja Revuri",
  headline: "Data Analyst | Python | SQL | Power BI | Excel",
  phone: "+91 9154122026",
  email: "steja9759@gmail.com",
  linkedin: "linkedin.com/in/sai-teja-revuri-97b63732a",
  github: "github.com/saiteja9154/saiteja9154",
  summary: "B.Tech Computer Science and Artificial Intelligence student focused on Data Analytics and AI-driven problem solving. Skilled in Python, SQL, Power BI, Excel, Pandas, NumPy, and Data Visualization. Built analytics and data management systems and AI-assisted SQL query generation. Experienced with data cleaning, exploratory analysis, database modeling, and practical implementation of data-driven solutions."
};

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Kakinada Institute of Engineering and Technology",
    degree: "Bachelor of Technology — Computer Science and Artificial Intelligence",
    period: "2024 – 2027",
    gpaOrPercentage: "CGPA: 7.9",
    type: "btech"
  },
  {
    institution: "Aditya Polytechnic College",
    degree: "Diploma in Mechanical Engineering",
    period: "2021 – 2024",
    gpaOrPercentage: "80%",
    type: "diploma"
  }
];

export const INTERNSHIP_LIST: Internship[] = [
  {
    organization: "Google for Developers & AICTE EduSkills",
    role: "AI/ML Virtual Internship",
    duration: "10 Weeks",
    technologies: ["Python", "Machine Learning", "Data Analysis", "AI/ML Fundamentals"],
    achievements: [
      "Completed a 10-week virtual internship focused on Artificial Intelligence and Machine Learning concepts.",
      "Worked on Python programming, data analysis, and real-world AI/ML project development tasks."
    ]
  },
  {
    organization: "Google for Developers & EduSkills",
    role: "Android Developer Virtual Internship",
    duration: "Virtual",
    technologies: ["Android SDK", "Java/Kotlin", "Software Implementation Workflows"],
    achievements: [
      "Learned fundamentals of Android application development and software implementation workflows."
    ]
  },
  {
    organization: "Microchip & EduSkills",
    role: "Embedded System Developer Virtual Internship",
    duration: "Virtual",
    technologies: ["Embedded C", "Hardware-Software Interaction", "Implementation Fundamentals"],
    achievements: [
      "Explored embedded systems concepts, hardware-software interaction, and implementation workflows."
    ]
  }
];

export const PROJECT_LIST: Project[] = [
  {
    id: "clinic-record-system",
    name: "Clinic Patient Record System",
    description: "Developed a robust system to manage patient records, streamlining data entry and retrieval processes for clinic staff.",
    technologies: ["SQL", "Python", "Database Management", "Data Modeling"],
    outcomes: [
      "Designed a structured database schema to efficiently store and query patient medical history and personal details.",
      "Implemented secure data handling workflows to ensure accurate patient record management and improved administrative efficiency."
    ],
    githubUrl: "https://github.com/saiteja9154/saiteja9154/tree/main/Clinic-Record-System",
    category: "data"
  },
  {
    id: "ai-sql-generator",
    name: "AI SQL Query Generator",
    description: "Developed a basic AI-assisted SQL query generation system to convert user inputs into SQL queries.",
    technologies: ["SQL", "Python", "Database Interaction", "Query Structuring"],
    outcomes: [
      "Implemented query generation logic to improve understanding of SQL automation and database interaction workflows.",
      "Worked with SQL concepts including filtering, joins, and query structuring for analytics-related operations."
    ],
    githubUrl: "https://github.com/saiteja9154/saiteja9154/tree/main/SQL-Generator",
    category: "data"
  }
];

export const CERTIFICATION_LIST: Certification[] = [
  {
    name: "Google Data Analytics Certification",
    issuer: "Google",
    status: "Verified"
  },
  {
    name: "AWS Cloud Practitioner Certification",
    issuer: "Amazon Web Services",
    status: "Verified"
  },
  {
    name: "Quantitative Research Job Simulation",
    issuer: "JPMorgan Chase & Co. Forage",
    status: "Verified"
  }
];

export const SKILL_MATRIX_DATA: SkillItem[] = [
  {
    name: "Python",
    category: "Languages",
    relatedProjects: ["Clinic Patient Record System", "AI SQL Query Generator"],
    relatedCertifications: ["Google Data Analytics Certification", "AWS Cloud Practitioner Certification"],
    experienceEvidence: "Employed extensively in Google AI/ML 10-week Virtual Internship for preprocessing and analyzing tabular inputs, formulating feature matrices, and training validation datasets. Built high-fidelity structured Patient Record Systems using Python connection & modeling principles.",
    resumeReferences: "Languages: Python | Data Analysis: Pandas, NumPy | Core Areas: AI/ML Fundamentals"
  },
  {
    name: "SQL",
    category: "Languages",
    relatedProjects: ["AI SQL Query Generator"],
    relatedCertifications: ["Google Data Analytics Certification"],
    experienceEvidence: "Conceptualized and coded natural language mapping rules to automate SELECT operations, JOIN filters, WHERE queries, and aggregated summaries. Skilled in query profiling and data fetching layouts.",
    resumeReferences: "Languages: SQL | Projects: AI SQL Query Generator | Certifications: Google Data Analytics"
  },
  {
    name: "Power BI",
    category: "Visualization Tools",
    relatedProjects: [],
    relatedCertifications: ["Google Data Analytics Certification"],
    experienceEvidence: "Built functional dash boards incorporating key performance indicator charts, cross-filtering reports, and time-series visual overlays, transforming raw database queries into insights.",
    resumeReferences: "Visualization Tools: Power BI | Data Analysis: Data Visualization"
  },
  {
    name: "Excel",
    category: "Visualization Tools",
    relatedProjects: [],
    relatedCertifications: ["Google Data Analytics Certification"],
    experienceEvidence: "Engineered lookup tables, financial projections, and custom logical sheets for sorting and cleaning dirty survey inputs.",
    resumeReferences: "Visualization Tools: Microsoft Excel | Data Analysis: Data Cleaning"
  },
  {
    name: "Pandas & NumPy",
    category: "Data Analysis",
    relatedProjects: ["Clinic Patient Record System"],
    relatedCertifications: ["Google Data Analytics Certification"],
    experienceEvidence: "Scripted indexing maps, dataset scaling, missing value imputation routines, and fast matrix operations for tabular models in Python environment.",
    resumeReferences: "Data Analysis: Pandas, NumPy; Projects: Clinic Patient Record System"
  },
  {
    name: "Exploratory Data Analysis",
    category: "Data Analysis",
    relatedProjects: ["Clinic Patient Record System", "AI SQL Query Generator"],
    relatedCertifications: ["Google Data Analytics Certification"],
    experienceEvidence: "Performed out-of-core calculations, statistical correlation maps, and custom data cleaning iterations on incoming text and analytical sets.",
    resumeReferences: "Data Analysis: Data Cleaning, Exploratory Data Analysis, Data Visualization"
  }
];

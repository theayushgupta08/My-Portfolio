import { mydata } from './mydata';

const CONTACT_EMAIL = 'mrayushg08@gmail.com';

// Extract structured data from mydata
const extractInfo = () => {
  const data = mydata.toLowerCase();
  return {
    name: 'Ayush Gupta',
    location: 'Pune, India',
    role: 'Data Science enthusiast and Software Development Engineer (SDE)',
    email: CONTACT_EMAIL,
    education: 'Bachelor of Engineering in Computer Science Engineering, Indira College of Engineering and Management, Pune (2020 - 2025)',
    currentWork: 'Software Developer at Sqano Systems Pvt. Ltd. (June 2025 - Present) - Building iQan.ai',
    skills: ['Python', 'JavaScript', 'SQL', 'MongoDB', 'React.js', 'Node.js', 'Machine Learning', 'Data Analysis', 'Power BI', 'Tableau'],
    projects: [
      'Fraudulent Transaction Prediction',
      'Heart Failure Detection',
      'Where is my BUS?',
      'Face Recognition Attendance System',
      'ToDo List Application',
      'Result Conversion Tool'
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/theayushgupta08/',
      github: 'https://github.com/theayushgupta08',
      portfolio: 'https://theayushgupta08.online/',
      fiverr: 'https://www.fiverr.com/theayushgupta08',
      freelancer: 'https://www.freelancer.in/u/theayushgupta08',
      instagram: 'https://www.instagram.com/cyberayush08/',
      blog: 'https://innovate-insight.blogspot.com/'
    }
  };
};

// Common question patterns and responses
const getResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();
  const info = extractInfo();

  // Greetings
  if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
    return `Hello! I'm GuptaGPT, an AI assistant representing ${info.name}. How can I help you today?`;
  }

  // Name questions
  if (message.match(/\b(who are you|what is your name|your name|name)\b/)) {
    return `I'm GuptaGPT, an AI assistant representing ${info.name}. I'm here to help answer questions about ${info.name}'s background, skills, projects, and experience.`;
  }

  // About questions
  if (message.match(/\b(about|tell me about|who is|introduce|introduction)\b/)) {
    return `${info.name} is a ${info.role} based in ${info.location}. ${info.name} is passionate about Data Science, AI/ML, and building end-to-end solutions. ${info.name} has expertise in Python, machine learning, data visualization, and web development.`;
  }

  // Location questions
  if (message.match(/\b(where|location|city|based|live|from)\b/)) {
    return `${info.name} is based in ${info.location}.`;
  }

  // Education questions
  if (message.match(/\b(education|degree|college|university|study|studied|qualification)\b/)) {
    return `${info.name}'s education: ${info.education}`;
  }

  // Current work questions (more specific check to avoid matching "contact")
  if (message.match(/\b(current.*work|current.*job|current.*position|currently.*working|current.*company|present.*work|present.*job)\b/)) {
    return `Currently, ${info.name} is working as ${info.currentWork}.`;
  }

  // Skills questions
  if (message.match(/\b(skills|technologies|tech stack|programming|languages|expertise|proficient)\b/)) {
    const skillsList = info.skills.join(', ');
    return `${info.name} has expertise in: ${skillsList}. ${info.name} is experienced in Machine Learning (Regression, Classification, Clustering, NLP), Data Analysis (Pandas, NumPy, Matplotlib, Seaborn), Web Development (React.js, Node.js), and Data Visualization (Power BI, Tableau).`;
  }

  // Projects questions
  if (message.match(/\b(projects|project|work|portfolio|built|developed|created)\b/)) {
    const projectsList = info.projects.slice(0, 6).join(', ');
    return `${info.name} has worked on several projects including: ${projectsList}, and more. Some notable projects include Fraudulent Transaction Prediction (with 6.3 million rows), Heart Failure Detection (92% accuracy), and Where is my BUS? (Real-Time Bus Locator using MERN Stack). You can check out more projects on GitHub: ${info.socialLinks.github}`;
  }

  // Specific project questions
  if (message.match(/\b(fraud|fraudulent|transaction)\b/)) {
    return `Fraudulent Transaction Prediction: This project aims to proactively detect fraudulent transactions using a dataset containing 6.3 million rows. The analysis includes data cleaning, model development, variable selection, performance demonstration, and infrastructure improvement recommendations.`;
  }

  if (message.match(/\b(heart|failure|detection)\b/)) {
    return `Heart Failure Detection: Created a classification model using Scikit-learn to detect heart failure with an accuracy of 92%.`;
  }

  if (message.match(/\b(bus|where is my bus|transport)\b/)) {
    return `Where is my BUS?: The Real-Time Local Bus Locator and Tracker is a smart transportation system designed to provide live bus tracking, route management, and passenger assistance. Built using MERN Stack, it enables real-time GPS updates, reducing waiting times and enhancing public transport efficiency. This project won the Best Research Paper Award at NTAI 2025.`;
  }

  // Experience/Internship questions
  if (message.match(/\b(experience|internship|intern|worked|previous|past)\b/)) {
    return `${info.name} has multiple internship experiences:
1. Content Creator at CyberAyush (March 2021 - Present)
2. Data Science Intern at Inorbvict Healthcare Pvt Ltd, Pune (August 2024 - September 2024)
3. Data Analyst and Alumni Engagement Specialist at Indira Group of Institutes, Pune (January 2024 - March 2024)
4. Software Developer Intern at Indira College of Engineering and Management, Pune (December 2023 - January 2024)`;
  }

  // Contact questions
  if (message.match(/\b(contact|email|reach|get in touch|connect|hire|collaborate)\b/)) {
    return `You can contact ${info.name} via email at ${info.email}. You can also connect on LinkedIn: ${info.socialLinks.linkedin}, or hire directly via Fiverr: ${info.socialLinks.fiverr} or Freelancer: ${info.socialLinks.freelancer}`;
  }

  // Social media questions
  if (message.match(/\b(linkedin|github|portfolio|fiverr|freelancer|instagram|blog|social|links)\b/)) {
    return `Here are ${info.name}'s social media links:
- LinkedIn: ${info.socialLinks.linkedin}
- GitHub: ${info.socialLinks.github}
- Portfolio: ${info.socialLinks.portfolio}
- Fiverr: ${info.socialLinks.fiverr}
- Freelancer: ${info.socialLinks.freelancer}
- Instagram: ${info.socialLinks.instagram}
- Blog: ${info.socialLinks.blog}`;
  }

  // Awards questions
  if (message.match(/\b(award|achievement|recognition|accomplishment)\b/)) {
    return `${info.name} has received:
1. Best Research Paper Award at NTAI 2025 for the project "Where is my BUS?"
2. Event Coordinator at IGLLS 2024
3. Runner-up in Project Competition at TechFest 2023 for the Result Conversion Tool project`;
  }

  // Certifications questions
  if (message.match(/\b(certification|certificate|certified|course|training)\b/)) {
    return `${info.name} has completed multiple certifications from IBM, Coursera, and freeCodeCamp to strengthen skills in Data Science, Machine Learning, and Web Development.`;
  }

  // Services/Freelancing questions
  if (message.match(/\b(service|freelance|hire|work with|collaborate|help|assist)\b/)) {
    return `${info.name} is currently exploring freelancing to help businesses turn raw data into powerful decisions. ${info.name} can build models, visualize insights, and communicate data clearly. You can hire directly via Fiverr: ${info.socialLinks.fiverr} or Freelancer: ${info.socialLinks.freelancer} or contact at ${info.email}`;
  }

  // Technologies/Tools questions
  if (message.match(/\b(python|javascript|react|node|mongodb|sql|machine learning|data science|power bi|tableau)\b/)) {
    return `${info.name} is experienced with Python, JavaScript, React.js, Node.js, SQL, MongoDB, Machine Learning, Data Science tools (Pandas, NumPy, Scikit-learn), and Data Visualization tools (Power BI, Tableau).`;
  }

  // Default response for unknown questions
  return `I'm sorry, I don't have specific information about that. For detailed inquiries, please contact ${info.name} directly at ${info.email}. ${info.name} would be happy to help you with your questions!`;
};

export { getResponse, CONTACT_EMAIL };


import { ProfileData } from './types';

export const profile: ProfileData = {
  name: 'Aymane El Khadraoui',
  title: 'Full Stack Developer (Java EE, Laravel, Next.js)',
  location: 'Beni Mellal, Morocco',
  email: 'aymane.elkhadraoui1@gmail.com',
  githubUrl: 'https://github.com/vito-ctrl',
  linkedinUrl: 'https://www.linkedin.com/in/aymane-elkhadraoui-79b223263/',
  statusLine: 'Seeking a developer internship.',
  cvUrl: '/cv/Aymane_El_Khadraoui_CV_EN.pdf',
  education: [
    {
      degree: 'Full Stack Web Development',
      institution: 'YouCode / UM6P',
      location: 'Safi, Morocco',
      period: '2025 – 2027',
      focus: 'Java, Java EE, full stack',
    },
    {
      degree: 'Full Stack JavaScript Web Development',
      institution: 'Ahmed Al Hansali Digital School (ENAA)',
      location: 'Beni Mellal, Morocco',
      period: '2024 – 2025',
    },
  ],
  languages: [
    { language: 'Arabic', level: 'Native' },
    { language: 'English', level: 'Intermediate' },
    { language: 'French', level: 'Intermediate' },
  ],
  activities: [
    'Vice President of the Student Union (BDE) at ENAA',
    'Competitive Programming Club at ENAA',
  ],
};

import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, 'profile.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
});

// Sample data - replace with your actual information
const sampleProfile = {
  name: 'Akshai Praveen',
  email: '231210009@nitdelhi.ac.in'
};

const sampleEducation = [
  {
    school: 'National Institute of Technology Delhi',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science and Engineering',
    start_year: 2023,
    end_year: 2027
  },
  {
    school: 'Indian Educational School, Kuwait',
    degree: 'Central Board of Secondary Education (CBSE)',
    field: 'Class XII',
    start_year: 2022,
    end_year: 2023
  }
];

const sampleSkills = [
  { skill: 'C/C++', proficiency: 'advanced', years: 3 },
  { skill: 'Python', proficiency: 'advanced', years: 3 },
  { skill: 'SQL', proficiency: 'advanced', years: 3 },
  { skill: 'React', proficiency: 'advanced', years: 2 },
  { skill: 'Next.js', proficiency: 'advanced', years: 2 },
  { skill: 'FastAPI', proficiency: 'advanced', years: 1 },
  { skill: 'Streamlit', proficiency: 'intermediate', years: 1 },
  { skill: 'PyTorch', proficiency: 'advanced', years: 1 },
  { skill: 'YOLOv8', proficiency: 'advanced', years: 1 },
  { skill: 'XGBoost', proficiency: 'intermediate', years: 1 },
  { skill: 'U-Net', proficiency: 'intermediate', years: 1 },
  { skill: 'OpenCV', proficiency: 'advanced', years: 1 },
  { skill: 'GeoPandas', proficiency: 'intermediate', years: 1 },
  { skill: 'MongoDB', proficiency: 'advanced', years: 2 },
  { skill: 'Git', proficiency: 'expert', years: 3 },
  { skill: 'Linux', proficiency: 'advanced', years: 3 },
  { skill: 'Cloud Computing', proficiency: 'intermediate', years: 1 },
  { skill: 'FAISS', proficiency: 'intermediate', years: 1 }
];

const sampleProjects = [
  {
    title: 'ClairVision',
    description: 'AI-powered event photo curation pipeline with duplicate detection, blur filtering, and ranking. Used CLIP ViT-L/14, FaceNet, ResNet-50, and MTCNN for embeddings, face detection, and quality scoring. Optimized large-scale similarity search using FAISS, achieving sub-second retrieval on 10k+ images. Achieved 97% clustering precision and 98% blur detection accuracy.',
    links: JSON.stringify([
      { title: 'GitHub', url: 'https://github.com/Akshayzzz777/clair-vision' }
    ]),
    skills_used: 'Python,PyTorch,FastAPI,React,FAISS,CLIP,FaceNet,ResNet-50,MTCNN'
  },
  {
    title: 'Road Damage Detection System (RDD)',
    description: 'End-to-end road safety AI system using CV, spatio-temporal ML, and satellite imagery. Implemented YOLO-based road-damage detection and accident-risk prediction using real-time weather/traffic data. Developed U-Net-based satellite segmentation to analyze urban structural change. Integrated all model outputs into a unified "Road Risk Index" dashboard using Mapbox and Streamlit.',
    links: JSON.stringify([
      { title: 'GitHub', url: '' }
    ]),
    skills_used: 'YOLOv8,XGBoost,U-Net,FastAPI,Streamlit,Mapbox'
  },
  {
    title: 'VocaAI',
    description: 'AI-powered virtual receptionist with real-time voice processing and NLP-based call automation. Reduced business support costs by handling 24/7 automated call workflows with natural, human-like responses. Built a secure dashboard with authentication, call analytics, and scalable deployment on Vercel. Led architecture design and feature rollout, accelerating MVP delivery by 2 weeks.',
    links: JSON.stringify([
      { title: 'Vercel', url: 'https://vocaai.vercel.app' }
    ]),
    skills_used: 'Next.js,React,OpenAI API,MongoDB,Vercel'
  }
];

const sampleWork = [
  {
    company: 'Self-employed',
    position: 'AI/ML Developer',
    description: 'Built production-ready AI voice automation systems using OpenAI APIs. Developed full-stack applications with React and Next.js. Focused on scalable system design and real-world product development.',
    start_date: '2024-01',
    end_date: null,
    is_current: 1
  }
];

const sampleLinks = {
  github: 'https://github.com/Akshayzzz777',
  linkedin: 'https://www.linkedin.com/in/akshai-praveen-65a854359/',
  portfolio: ''
};

// Run seeding
db.serialize(() => {
  db.run('BEGIN TRANSACTION');

  // Insert profile
  db.run(
    'INSERT OR REPLACE INTO profile (id, name, email) VALUES (1, ?, ?)',
    [sampleProfile.name, sampleProfile.email],
    function(err) {
      if (err) {
        console.error('Error inserting profile:', err);
        return;
      }
      console.log('✓ Profile inserted');

      // Insert education
      sampleEducation.forEach((edu) => {
        db.run(
          'INSERT INTO education (profile_id, school, degree, field, start_year, end_year) VALUES (1, ?, ?, ?, ?, ?)',
          [edu.school, edu.degree, edu.field, edu.start_year, edu.end_year],
          (err) => {
            if (err) console.error('Error inserting education:', err);
          }
        );
      });
      console.log('✓ Education inserted');

      // Insert skills
      sampleSkills.forEach((skill) => {
        db.run(
          'INSERT INTO skills (profile_id, skill, proficiency, years_of_experience) VALUES (1, ?, ?, ?)',
          [skill.skill, skill.proficiency, skill.years],
          (err) => {
            if (err) console.error('Error inserting skill:', err);
          }
        );
      });
      console.log('✓ Skills inserted');

      // Insert projects
      sampleProjects.forEach((project) => {
        db.run(
          'INSERT INTO projects (profile_id, title, description, links, skills_used) VALUES (1, ?, ?, ?, ?)',
          [project.title, project.description, project.links, project.skills_used],
          (err) => {
            if (err) console.error('Error inserting project:', err);
          }
        );
      });
      console.log('✓ Projects inserted');

      // Insert work experience
      sampleWork.forEach((work) => {
        db.run(
          'INSERT INTO work (profile_id, company, position, description, start_date, end_date, is_current) VALUES (1, ?, ?, ?, ?, ?, ?)',
          [work.company, work.position, work.description, work.start_date, work.end_date, work.is_current],
          (err) => {
            if (err) console.error('Error inserting work:', err);
          }
        );
      });
      console.log('✓ Work experience inserted');

      // Insert links
      db.run(
        'INSERT OR REPLACE INTO links (profile_id, github, linkedin, portfolio) VALUES (1, ?, ?, ?)',
        [sampleLinks.github, sampleLinks.linkedin, sampleLinks.portfolio],
        (err) => {
          if (err) console.error('Error inserting links:', err);
          else console.log('✓ Links inserted');
        }
      );
    }
  );

  db.run('COMMIT', () => {
    console.log('\n✓ Database seeded successfully!');
    db.close();
  });
});

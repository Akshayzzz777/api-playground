import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../db/profile.db');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Helper function to promisify database operations
const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// ===== ENDPOINTS =====

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Me-API Playground',
    version: '1.0.0',
    description: 'Personal profile API with full-stack integration',
    endpoints: {
      health: 'GET /health',
      profile: {
        get: 'GET /profile',
        create: 'POST /profile',
        update: 'PUT /profile/:id'
      },
      projects: {
        list: 'GET /projects',
        filter: 'GET /projects?skill=<skill>',
        create: 'POST /projects'
      },
      skills: {
        list: 'GET /skills',
        top: 'GET /skills/top?limit=5'
      },
      work: 'GET /work',
      education: 'GET /education',
      links: 'GET /links',
      search: 'GET /search?q=<query>'
    },
    documentation: 'See README.md for complete API documentation'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET Profile
app.get('/profile', async (req, res) => {
  try {
    const profile = await dbGet('SELECT * FROM profile WHERE id = 1');
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const education = await dbAll('SELECT * FROM education WHERE profile_id = 1');
    const skills = await dbAll('SELECT * FROM skills WHERE profile_id = 1');
    const projects = await dbAll('SELECT * FROM projects WHERE profile_id = 1');
    const work = await dbAll('SELECT * FROM work WHERE profile_id = 1');
    const links = await dbGet('SELECT * FROM links WHERE profile_id = 1');

    // Parse JSON fields
    const projectsWithLinks = projects.map(p => ({
      ...p,
      links: p.links ? JSON.parse(p.links) : []
    }));

    res.json({
      profile,
      education,
      skills,
      projects: projectsWithLinks,
      work,
      links
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE/UPDATE Profile (POST for creation, PUT for update)
app.post('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const result = await dbRun(
      'INSERT INTO profile (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({
      id: result.id,
      name,
      email,
      message: 'Profile created successfully'
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    if (error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/profile/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    await dbRun(
      'UPDATE profile SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, email, id]
    );

    const profile = await dbGet('SELECT * FROM profile WHERE id = ?', [id]);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      ...profile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Projects with optional skill filter
app.get('/projects', async (req, res) => {
  try {
    const skill = req.query.skill;

    let query = 'SELECT * FROM projects WHERE profile_id = 1';
    const params = [];

    if (skill) {
      query += ' AND skills_used LIKE ?';
      params.push(`%${skill}%`);
    }

    const projects = await dbAll(query, params);

    const projectsWithLinks = projects.map(p => ({
      ...p,
      links: p.links ? JSON.parse(p.links) : []
    }));

    res.json(projectsWithLinks);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE Project
app.post('/projects', async (req, res) => {
  try {
    const { title, description, links, skills_used } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await dbRun(
      'INSERT INTO projects (profile_id, title, description, links, skills_used) VALUES (1, ?, ?, ?, ?)',
      [title, description || null, links ? JSON.stringify(links) : null, skills_used || null]
    );

    res.status(201).json({
      id: result.id,
      title,
      description,
      links,
      skills_used,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Skills with optional top filter
app.get('/skills', async (req, res) => {
  try {
    const skills = await dbAll('SELECT * FROM skills WHERE profile_id = 1 ORDER BY proficiency DESC');
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/skills/top', async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const skills = await dbAll(
      'SELECT skill, proficiency, years_of_experience FROM skills WHERE profile_id = 1 ORDER BY years_of_experience DESC, proficiency DESC LIMIT ?',
      [limit]
    );
    res.json(skills);
  } catch (error) {
    console.error('Error fetching top skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search endpoint
app.get('/search', async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const searchTerm = `%${q}%`;

    // Search in projects, skills, work
    const [projects, skills, workExperience] = await Promise.all([
      dbAll(
        'SELECT id, title, description, skills_used FROM projects WHERE profile_id = 1 AND (title LIKE ? OR description LIKE ? OR skills_used LIKE ?)',
        [searchTerm, searchTerm, searchTerm]
      ),
      dbAll('SELECT * FROM skills WHERE profile_id = 1 AND skill LIKE ?', [searchTerm]),
      dbAll(
        'SELECT id, company, position, description FROM work WHERE profile_id = 1 AND (company LIKE ? OR position LIKE ? OR description LIKE ?)',
        [searchTerm, searchTerm, searchTerm]
      )
    ]);

    res.json({
      query: q,
      results: {
        projects: projects.length,
        skills: skills.length,
        work: workExperience.length,
        data: {
          projects,
          skills,
          workExperience
        }
      }
    });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Work experience
app.get('/work', async (req, res) => {
  try {
    const work = await dbAll('SELECT * FROM work WHERE profile_id = 1 ORDER BY start_date DESC');
    res.json(work);
  } catch (error) {
    console.error('Error fetching work:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Education
app.get('/education', async (req, res) => {
  try {
    const education = await dbAll('SELECT * FROM education WHERE profile_id = 1');
    res.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Links
app.get('/links', async (req, res) => {
  try {
    const links = await dbGet('SELECT * FROM links WHERE profile_id = 1');

    if (!links) {
      return res.status(404).json({ error: 'Links not found' });
    }

    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ CORS enabled for: ${FRONTEND_URL}`);
  console.log(`✓ Database: ${DB_PATH}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close((err) => {
    if (err) console.error('Error closing database:', err);
    process.exit(0);
  });
});

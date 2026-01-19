-- Profile Database Schema
-- SQLite implementation

DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS work;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS profile;

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  start_year INTEGER,
  end_year INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  skill TEXT NOT NULL,
  proficiency TEXT, -- beginner, intermediate, advanced, expert
  years_of_experience INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE INDEX idx_skills_skill ON skills(skill);
CREATE INDEX idx_skills_profile_id ON skills(profile_id);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  links TEXT, -- JSON array of {title, url}
  skills_used TEXT, -- comma-separated or JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_profile_id ON projects(profile_id);

CREATE TABLE IF NOT EXISTS work (
  id INTEGER PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT,
  start_date TEXT, -- YYYY-MM format
  end_date TEXT,
  is_current INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE INDEX idx_work_profile_id ON work(profile_id);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY,
  profile_id INTEGER NOT NULL UNIQUE,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE INDEX idx_links_profile_id ON links(profile_id);

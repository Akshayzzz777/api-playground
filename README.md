# Me-API Playground

A personal profile playground that stores your information in a database and exposes it via a REST API with a minimal web frontend. This project demonstrates full-stack development with backend APIs, database design, and frontend integration.

## 🎯 Project Overview

**Me-API Playground** is a simple yet complete example of a backend assessment project that includes:

- **Backend API**: Express.js REST API with CORS support
- **Database**: SQLite with proper schema and relationships
- **Frontend**: Minimal but functional HTML UI
- **Features**: Profile management, project listing, skill tracking, work experience, education, and search functionality

## 📋 Features

### Core Functionality
- ✅ **Profile Management**: Create and view personal profile (name, email)
- ✅ **Skills Tracking**: Organize skills by proficiency level and years of experience
- ✅ **Projects**: List projects with descriptions, technologies used, and links
- ✅ **Work Experience**: Track job history with dates and descriptions
- ✅ **Education**: Store educational background
- ✅ **Links**: GitHub, LinkedIn, and portfolio links
- ✅ **Search**: Full-text search across projects, skills, and work experience
- ✅ **API Filtering**: Filter projects by skill, get top skills

### API Endpoints
- `GET /health` - Health check endpoint
- `GET /profile` - Retrieve complete profile
- `POST /profile` - Create profile
- `PUT /profile/:id` - Update profile
- `GET /projects` - List all projects
- `GET /projects?skill=<skill>` - Filter projects by skill
- `POST /projects` - Create new project
- `GET /skills` - List all skills
- `GET /skills/top?limit=5` - Get top skills by experience
- `GET /work` - List work experience
- `GET /education` - List education
- `GET /links` - Get social links
- `GET /search?q=<query>` - Search across profile data

## 🏗️ Architecture

```
me-api-playground/
├── backend/
│   ├── db/
│   │   ├── schema.sql           # Database schema
│   │   ├── init.js              # Database initialization
│   │   └── seed.js              # Sample data seeding
│   ├── src/
│   │   └── index.js             # Express server & routes
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── index.html               # Single-page HTML app
│   └── package.json
└── README.md
```

### Technology Stack

**Backend:**
- Node.js with Express.js
- SQLite3 database
- CORS enabled for frontend communication
- Environment-based configuration

**Frontend:**
- Vanilla HTML5
- CSS3 (responsive grid layout)
- Vanilla JavaScript (no frameworks)
- Fetch API for HTTP requests

**Database:**
- SQLite (lightweight, file-based)
- Proper schema with foreign keys and indexes
- Optimized queries for filtering and search

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- Python 3 (for simple HTTP server, optional)

### Local Development Setup

1. **Clone the repository**
```bash
cd me-api-playground
```

2. **Backend Setup**
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Initialize database
npm run db:init

# Seed with sample data
npm run db:seed

# Start development server (with auto-reload)
npm run dev

# Or for production
npm start
```

The backend will start on `http://localhost:5000`

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend

# Simple HTTP server (Python)
python -m http.server 3000

# Or using Node.js http-server (install globally first):
# npx http-server -p 3000
```

The frontend will be available at `http://localhost:3000`

4. **Verify Setup**
```bash
# Test health endpoint
curl http://localhost:5000/health

# Should return:
# {"status":"healthy","timestamp":"2024-01-18T...","environment":"development"}

# Get profile
curl http://localhost:5000/profile

# Search for Python projects
curl "http://localhost:5000/projects?skill=python"
```

## 📊 Database Schema

### Tables

#### `profile`
Stores basic profile information
```sql
id (INTEGER, PRIMARY KEY)
name (TEXT, NOT NULL)
email (TEXT, NOT NULL, UNIQUE)
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
updated_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```

#### `skills`
Tracks professional skills with proficiency levels
```sql
id (INTEGER, PRIMARY KEY)
profile_id (INTEGER, FOREIGN KEY → profile.id)
skill (TEXT, NOT NULL)
proficiency (TEXT) -- beginner, intermediate, advanced, expert
years_of_experience (INTEGER)
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```
**Indexes**: skill, profile_id

#### `projects`
Lists portfolio projects
```sql
id (INTEGER, PRIMARY KEY)
profile_id (INTEGER, FOREIGN KEY → profile.id)
title (TEXT, NOT NULL)
description (TEXT)
links (TEXT) -- JSON array
skills_used (TEXT) -- comma-separated or JSON
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
updated_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```
**Index**: profile_id

#### `work`
Work experience and employment history
```sql
id (INTEGER, PRIMARY KEY)
profile_id (INTEGER, FOREIGN KEY → profile.id)
company (TEXT, NOT NULL)
position (TEXT, NOT NULL)
description (TEXT)
start_date (TEXT) -- YYYY-MM format
end_date (TEXT)
is_current (INTEGER) -- 0 or 1
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```
**Index**: profile_id

#### `education`
Educational background
```sql
id (INTEGER, PRIMARY KEY)
profile_id (INTEGER, FOREIGN KEY → profile.id)
school (TEXT, NOT NULL)
degree (TEXT, NOT NULL)
field (TEXT)
start_year (INTEGER)
end_year (INTEGER)
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```
**Index**: profile_id

#### `links`
Social and portfolio links
```sql
id (INTEGER, PRIMARY KEY)
profile_id (INTEGER, UNIQUE FOREIGN KEY → profile.id)
github (TEXT)
linkedin (TEXT)
portfolio (TEXT)
created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
updated_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
```
**Index**: profile_id

## 🔧 API Documentation

### Health Check
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-18T10:30:00.000Z",
  "environment": "development"
}
```

### Get Profile
```bash
curl http://localhost:5000/profile
```

**Response:**
```json
{
  "profile": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-18T10:00:00.000Z",
    "updated_at": "2024-01-18T10:00:00.000Z"
  },
  "education": [
    {
      "id": 1,
      "profile_id": 1,
      "school": "State University",
      "degree": "Bachelor",
      "field": "Computer Science",
      "start_year": 2016,
      "end_year": 2020
    }
  ],
  "skills": [
    {
      "id": 1,
      "profile_id": 1,
      "skill": "JavaScript",
      "proficiency": "expert",
      "years_of_experience": 5
    }
  ],
  "projects": [
    {
      "id": 1,
      "profile_id": 1,
      "title": "E-commerce Platform",
      "description": "Full-stack e-commerce application",
      "links": [
        {"title": "GitHub", "url": "https://github.com/..."},
        {"title": "Live", "url": "https://..."}
      ],
      "skills_used": "React,Node.js,MongoDB"
    }
  ],
  "work": [
    {
      "id": 1,
      "profile_id": 1,
      "company": "Tech Corp",
      "position": "Senior Full Stack Developer",
      "description": "Led development of microservices",
      "start_date": "2021-01",
      "end_date": null,
      "is_current": 1
    }
  ],
  "links": {
    "id": 1,
    "profile_id": 1,
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "portfolio": "https://johndoe.dev"
  }
}
```

### Get Projects with Skill Filter
```bash
curl "http://localhost:5000/projects?skill=Python"
```

**Response:**
```json
[
  {
    "id": 1,
    "profile_id": 1,
    "title": "Data Analytics Dashboard",
    "description": "Analytics dashboard with real-time visualization",
    "links": [...],
    "skills_used": "Python,Pandas,React,D3.js"
  }
]
```

### Get Top Skills
```bash
curl "http://localhost:5000/skills/top?limit=5"
```

**Response:**
```json
[
  {
    "skill": "JavaScript",
    "proficiency": "expert",
    "years_of_experience": 5
  },
  {
    "skill": "Node.js",
    "proficiency": "expert",
    "years_of_experience": 4
  }
]
```

### Search
```bash
curl "http://localhost:5000/search?q=React"
```

**Response:**
```json
{
  "query": "React",
  "results": {
    "projects": 2,
    "skills": 0,
    "work": 0,
    "data": {
      "projects": [...],
      "skills": [],
      "workExperience": []
    }
  }
}
```

## 📝 Sample Postman/cURL Commands

### Create a Profile
```bash
curl -X POST http://localhost:5000/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com"
  }'
```

### Update a Profile
```bash
curl -X PUT http://localhost:5000/profile/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  }'
```

### Create a Project
```bash
curl -X POST http://localhost:5000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Chatbot",
    "description": "An intelligent chatbot using NLP",
    "links": [
      {"title": "GitHub", "url": "https://github.com/example/chatbot"}
    ],
    "skills_used": "Python,TensorFlow,NLP"
  }'
```

### Filter Projects by Skill
```bash
curl "http://localhost:5000/projects?skill=React"
curl "http://localhost:5000/projects?skill=Node.js"
```

### Get Top Skills (limit to 10)
```bash
curl "http://localhost:5000/skills/top?limit=10"
```

### Search Example
```bash
curl "http://localhost:5000/search?q=full-stack"
curl "http://localhost:5000/search?q=AWS"
curl "http://localhost:5000/search?q=leadership"
```

## 🌐 Deployment

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DATABASE_PATH=/app/db/profile.db

# CORS Configuration
FRONTEND_URL=https://yourdomain.com
```

### Docker Deployment

#### Prerequisites
- Docker Desktop installed
- Docker Compose (included with Docker Desktop)

#### Using Docker Compose
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Services available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

#### Individual Container Commands
```bash
# Build backend
docker build -f Dockerfile.backend -t me-api-backend:latest .

# Run backend
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e FRONTEND_URL=http://localhost:3000 \
  -v $(pwd)/backend/db:/app/db \
  me-api-backend:latest

# Build frontend
docker build -f Dockerfile.frontend -t me-api-frontend:latest .

# Run frontend
docker run -p 3000:80 me-api-frontend:latest
```

#### Environment Variables for Docker
Edit `docker-compose.yml`:
```yaml
environment:
  - PORT=5000
  - NODE_ENV=production
  - DATABASE_PATH=/app/db/profile.db
  - FRONTEND_URL=http://your-domain.com
```

### Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### AWS (ECS)
```bash
# Push images to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag me-api-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/me-api-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/me-api-backend:latest
```

#### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/me-api-backend

gcloud run deploy me-api-backend \
  --image gcr.io/PROJECT-ID/me-api-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Vercel (Frontend)
```bash
npm install -g vercel
cd frontend
vercel
```

## 📊 Detailed Database Schema

### Schema Diagram
```
┌─────────────────────┐
│      profile        │
├─────────────────────┤
│ id (PK)            │
│ name               │
│ email (UNIQUE)     │
│ created_at         │
│ updated_at         │
└──────────┬──────────┘
           │
     ┌─────┴──────┬──────────┬──────────┬──────────┐
     │            │          │          │          │
     ▼            ▼          ▼          ▼          ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌─────┐  ┌──────┐
│skills  │  │project │  │  work  │  │link │  │educs │
└────────┘  └────────┘  └────────┘  └─────┘  └──────┘
```

### Table Details

#### `profile` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique profile identifier |
| name | TEXT | NOT NULL | User's full name |
| email | TEXT | NOT NULL, UNIQUE | User's email address |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

#### `skills` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique skill identifier |
| profile_id | INTEGER | FK → profile.id | Reference to profile |
| skill | TEXT | NOT NULL | Skill name |
| proficiency | TEXT | | beginner, intermediate, advanced, expert |
| years_of_experience | INTEGER | | Years of experience |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Indexes**: `idx_skills_skill`, `idx_skills_profile_id`

#### `projects` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique project identifier |
| profile_id | INTEGER | FK → profile.id | Reference to profile |
| title | TEXT | NOT NULL | Project name |
| description | TEXT | | Project description |
| links | TEXT | | JSON array of project links |
| skills_used | TEXT | | Comma-separated or JSON array |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

**Index**: `idx_projects_profile_id`

#### `work` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique identifier |
| profile_id | INTEGER | FK → profile.id | Reference to profile |
| company | TEXT | NOT NULL | Company name |
| position | TEXT | NOT NULL | Job title |
| description | TEXT | | Job description |
| start_date | TEXT | | YYYY-MM format |
| end_date | TEXT | | YYYY-MM format (NULL if current) |
| is_current | INTEGER | | 0=past, 1=current |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Index**: `idx_work_profile_id`

#### `education` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique identifier |
| profile_id | INTEGER | FK → profile.id | Reference to profile |
| school | TEXT | NOT NULL | School/University name |
| degree | TEXT | NOT NULL | Degree type |
| field | TEXT | | Field of study |
| start_year | INTEGER | | Start year |
| end_year | INTEGER | | End/Graduation year |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Index**: `idx_education_profile_id`

#### `links` Table
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INTEGER | PRIMARY KEY | Unique identifier |
| profile_id | INTEGER | UNIQUE FK → profile.id | Reference to profile |
| github | TEXT | | GitHub URL |
| linkedin | TEXT | | LinkedIn URL |
| portfolio | TEXT | | Portfolio URL |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

**Index**: `idx_links_profile_id`

### Foreign Key Relationships
```sql
FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
```
Deleting a profile automatically deletes all related data.

### Common SQL Queries

**Find Projects Using Specific Technology**
```sql
SELECT * FROM projects 
WHERE profile_id = 1 
AND skills_used LIKE '%React%';
```

**Get Top Skills by Experience**
```sql
SELECT skill, proficiency, years_of_experience 
FROM skills 
WHERE profile_id = 1 
ORDER BY years_of_experience DESC, proficiency DESC 
LIMIT 5;
```

**Search Across Profile Data**
```sql
SELECT 'project' as type, title as name FROM projects WHERE profile_id = 1 AND title LIKE '%query%'
UNION
SELECT 'skill', skill FROM skills WHERE profile_id = 1 AND skill LIKE '%query%'
UNION
SELECT 'company', company FROM work WHERE profile_id = 1 AND company LIKE '%query%';
```

## 🔒 Security Considerations

### Current Implementation
- CORS enabled (configurable via environment)
- Input validation on API endpoints
- SQL injection prevention (parameterized queries)
- Error messages don't leak sensitive information in production

### Recommended Enhancements (Not Included)
- Basic authentication for write operations
- Rate limiting
- Request logging and monitoring
- Input sanitization library (e.g., `xss`)
- HTTPS enforcement
- Database encryption at rest

## 📋 Known Limitations

1. **Single Profile**: Application supports only one profile (ID = 1)
2. **No Authentication**: All endpoints are publicly accessible
3. **No Rate Limiting**: No protection against API abuse
4. **File-Based Database**: SQLite not recommended for high-traffic production use
5. **No Pagination**: All results returned without limit
6. **No Caching**: Every request hits the database
7. **Simple Search**: Text search doesn't use full-text search indexes
8. **No Logging**: Limited request logging capability
9. **Frontend Limitations**:
   - No offline capability
   - No data caching
   - No form validation on input
   - No error recovery/retry logic

## 🧪 Testing

### Manual Testing Checklist

```bash
# 1. Health Check
curl http://localhost:5000/health
# Expected: 200 status

# 2. Get Profile
curl http://localhost:5000/profile
# Expected: Full profile with all nested data

# 3. List Projects
curl http://localhost:5000/projects
# Expected: Array of projects

# 4. Filter Projects
curl "http://localhost:5000/projects?skill=React"
# Expected: Only projects with React skill

# 5. Get Top Skills
curl "http://localhost:5000/skills/top?limit=5"
# Expected: Top 5 skills by years_of_experience

# 6. Search
curl "http://localhost:5000/search?q=test"
# Expected: JSON with results count and data

# 7. Get Work Experience
curl http://localhost:5000/work
# Expected: Array of work experiences

# 8. Get Education
curl http://localhost:5000/education
# Expected: Array of education entries

# 9. Get Links
curl http://localhost:5000/links
# Expected: Links object with GitHub, LinkedIn, Portfolio
```

### Frontend Testing

1. Open `http://localhost:3000` in browser
2. Verify API health indicator shows "healthy"
3. Navigate through sections (Profile, Projects, Skills, Work, Education, Links)
4. Test skill filter on Projects tab
5. Perform search queries
6. Verify all data loads correctly

### Testing with Postman

Import `Me-API-Playground.postman_collection.json` into Postman to test all 14+ API endpoints with pre-configured requests.

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Node.js SQLite3 Module](https://github.com/mapbox/node-sqlite3)
- [CORS Middleware](https://github.com/expressjs/cors)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is provided as-is for assessment and educational purposes.

## 🙋 Support

For issues or questions:
1. Check this documentation
2. Review API response error messages
3. Enable NODE_ENV=development for detailed logs
4. Check database file exists at configured path
5. Review test scripts for command examples

---

**Last Updated**: January 19, 2026
**Status**: ✅ Complete - All requirements fulfilled

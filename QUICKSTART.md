# Quick Start Guide

## Prerequisites

Ensure you have the following installed:
- **Node.js** 14+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Python** 3.6+ (optional, for running frontend server with `python -m http.server`)

## 5-Minute Setup

### Option 1: Automated Setup (Windows)
```batch
# Run setup script
setup.bat
```

### Option 2: Automated Setup (macOS/Linux)
```bash
# Make script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

### Option 3: Manual Setup

#### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 2: Create Environment File
```bash
# Copy example env
cp .env.example .env
# Or on Windows:
# copy .env.example .env
```

#### Step 3: Initialize Database
```bash
npm run db:init
```

#### Step 4: Seed Sample Data
```bash
npm run db:seed
```

#### Step 5: Start Backend Server
```bash
npm run dev
# Output: ✓ Server running on http://localhost:5000
```

#### Step 6: Start Frontend Server (New Terminal)
```bash
cd frontend

# Using Python
python -m http.server 3000

# Or if you have http-server installed globally:
# npx http-server -p 3000
```

#### Step 7: Open Browser
Visit `http://localhost:3000`

## Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend accessible on `http://localhost:3000`
- [ ] Health check returns 200:
  ```bash
  curl http://localhost:5000/health
  ```
- [ ] Profile data loads in browser
- [ ] Can navigate between tabs (Profile, Projects, Skills, etc.)
- [ ] Search functionality works
- [ ] Skill filter works on Projects tab

## Troubleshooting

### "npm: command not found"
- Make sure Node.js is installed: `node --version`
- Restart terminal/PowerShell after installing Node.js

### "Database file not found"
- Run `npm run db:init` in the backend directory
- Check that `backend/db/` directory exists

### "Port 5000 already in use"
- Change PORT in `.env`: `PORT=5001`
- Or kill the process using the port

### "CORS Error in Browser"
- Ensure backend is running and CORS is properly configured
- Check `.env` FRONTEND_URL matches your frontend URL
- Default: `FRONTEND_URL=http://localhost:3000`

### Frontend won't load API data
1. Check browser console for errors (F12)
2. Verify backend is running (`http://localhost:5000/health`)
3. Check if API_BASE in `frontend/index.html` matches your backend URL

## Next Steps

- Edit sample data in `backend/db/seed.js`
- Customize API endpoints in `backend/src/index.js`
- Style frontend in `frontend/index.html`
- Deploy to production (see README.md)
- Add authentication and rate limiting (optional)

## API Documentation

See the main [README.md](./README.md) for:
- Complete API endpoint documentation
- Postman collection import
- Database schema details
- Deployment instructions
- Known limitations

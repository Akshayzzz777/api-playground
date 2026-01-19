@echo off
REM Me-API Playground Setup Script for Windows

echo.
echo 🚀 Me-API Playground Setup
echo ==========================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js 14+ from https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version

REM Backend setup
echo.
echo 📦 Setting up backend...
cd backend

if not exist package-lock.json (
    call npm install
) else (
    call npm ci
)

if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file (customize as needed)
)

REM Initialize database
echo.
echo 🗄️  Initializing database...
call npm run db:init

REM Seed database
echo.
echo 🌱 Seeding database with sample data...
call npm run db:seed

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Backend: npm run dev (from backend directory)
echo 2. Frontend: python -m http.server 3000 (from frontend directory)
echo 3. Visit: http://localhost:3000
echo.
pause

#!/bin/bash

# Me-API Playground Setup Script
# This script will install dependencies and initialize the project

echo "🚀 Me-API Playground Setup"
echo "=========================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 14+ from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo "✓ npm $(npm --version)"

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -f package-lock.json ]; then
    npm install
else
    npm ci
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env file (customize as needed)"
fi

# Initialize database
echo ""
echo "🗄️  Initializing database..."
npm run db:init

# Seed database
echo ""
echo "🌱 Seeding database with sample data..."
npm run db:seed

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Backend: npm run dev (from backend directory)"
echo "2. Frontend: python -m http.server 3000 (from frontend directory)"
echo "3. Visit: http://localhost:3000"

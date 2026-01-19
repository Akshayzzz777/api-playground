#!/bin/bash

# Me-API Playground - Test Script
# This script tests all API endpoints

API_BASE="${1:-http://localhost:5000}"
RESULTS_FILE="api-test-results.txt"

echo "🧪 Me-API Playground - API Test Suite"
echo "======================================"
echo "API Base URL: $API_BASE"
echo "Results saved to: $RESULTS_FILE"
echo ""

# Clear previous results
> "$RESULTS_FILE"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test endpoint
test_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    
    echo -n "Testing: $name ... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -X "$method" "$API_BASE$endpoint" -H "Content-Type: application/json")
    else
        response=$(curl -s -X "$method" "$API_BASE$endpoint" -H "Content-Type: application/json" -d "$data")
    fi
    
    status_code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$API_BASE$endpoint" -H "Content-Type: application/json" ${data:+-d "$data"})
    
    if [[ $status_code == 200 || $status_code == 201 ]]; then
        echo -e "${GREEN}✓ PASS${NC} ($status_code)"
        echo "✓ $name ($status_code)" >> "$RESULTS_FILE"
    else
        echo -e "${RED}✗ FAIL${NC} ($status_code)"
        echo "✗ $name ($status_code)" >> "$RESULTS_FILE"
    fi
    
    echo "Response: $response" >> "$RESULTS_FILE"
    echo "---" >> "$RESULTS_FILE"
}

# 1. Health Check
test_endpoint "Health Check" "GET" "/health"

# 2. Get Profile
test_endpoint "Get Profile" "GET" "/profile"

# 3. Get Projects
test_endpoint "Get Projects (All)" "GET" "/projects"

# 4. Filter Projects by Skill
test_endpoint "Get Projects (Filter: React)" "GET" "/projects?skill=React"
test_endpoint "Get Projects (Filter: Python)" "GET" "/projects?skill=Python"

# 5. Get Skills
test_endpoint "Get Skills (All)" "GET" "/skills"
test_endpoint "Get Skills (Top 5)" "GET" "/skills/top?limit=5"
test_endpoint "Get Skills (Top 10)" "GET" "/skills/top?limit=10"

# 6. Get Work Experience
test_endpoint "Get Work Experience" "GET" "/work"

# 7. Get Education
test_endpoint "Get Education" "GET" "/education"

# 8. Get Links
test_endpoint "Get Links" "GET" "/links"

# 9. Search Queries
test_endpoint "Search: React" "GET" "/search?q=React"
test_endpoint "Search: Python" "GET" "/search?q=Python"
test_endpoint "Search: Full Stack" "GET" "/search?q=full-stack"
test_endpoint "Search: Developer" "GET" "/search?q=developer"

# 10. Create Project (POST)
create_project_data='{"title":"Test Project","description":"A test project","skills_used":"Node.js,Express"}'
test_endpoint "Create Project" "POST" "/projects" "$create_project_data"

# 11. Invalid Requests (should fail)
test_endpoint "Invalid Skill Filter" "GET" "/projects?skill=NonExistentSkill"

echo ""
echo "======================================"
echo "✓ Test suite completed!"
echo "📊 Results saved to: $RESULTS_FILE"
echo ""
echo "Summary:"
grep "✓" "$RESULTS_FILE" | wc -l | xargs echo "Passed:"
grep "✗" "$RESULTS_FILE" | wc -l | xargs echo "Failed:"

@echo off
REM Me-API Playground - API Test Script for Windows

setlocal enabledelayedexpansion

set API_BASE=http://localhost:5000
if not "%~1"=="" set API_BASE=%~1

set RESULTS_FILE=api-test-results.txt

echo 🧪 Me-API Playground - API Test Suite
echo ======================================
echo API Base URL: %API_BASE%
echo Results saved to: %RESULTS_FILE%
echo.

REM Clear previous results
> "%RESULTS_FILE%"

REM Test Health Check
echo Testing: Health Check...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/health' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Health Check - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Health Check - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Profile
echo Testing: Get Profile...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/profile' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Profile - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Profile - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Projects
echo Testing: Get Projects...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/projects' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Projects - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Projects - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Filter Projects
echo Testing: Filter Projects by Skill...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/projects?skill=React' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Filter Projects - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Filter Projects - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Skills
echo Testing: Get Skills...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/skills' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Skills - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Skills - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Top Skills
echo Testing: Get Top Skills...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/skills/top?limit=5' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Top Skills - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Top Skills - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Work
echo Testing: Get Work Experience...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/work' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Work - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Work - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Education
echo Testing: Get Education...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/education' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Education - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Education - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Get Links
echo Testing: Get Links...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/links' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Get Links - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Get Links - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

REM Test Search
echo Testing: Search...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%API_BASE%/search?q=React' -Method GET -ContentType 'application/json' -SkipHttpErrorCheck; if ($response.StatusCode -eq 200) { Write-Host '✓ PASS'; 'Search - PASS' | Out-File -Append '%RESULTS_FILE%' } else { Write-Host '✗ FAIL'; 'Search - FAIL' | Out-File -Append '%RESULTS_FILE%' } } catch { Write-Host '✗ ERROR'; $_ | Out-File -Append '%RESULTS_FILE%' }"

echo.
echo ======================================
echo ✓ Test suite completed!
echo 📊 Results saved to: %RESULTS_FILE%
echo.
echo Check %RESULTS_FILE% for detailed results
pause

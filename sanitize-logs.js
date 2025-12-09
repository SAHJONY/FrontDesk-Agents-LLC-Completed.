# Output to console
node sanitize-logs.js build.log

# Save to file
node sanitize-logs.js build.log clean-build.log

# Process deployment logs
node sanitize-logs.js deploy.txt sanitized-deploy.txt
```

## What It Does

✅ **Automatically masks 20+ types of sensitive data:**
- Repository URLs, branches, commits
- API endpoints and webhooks
- Service names (Supabase, Twilio, Stripe, etc.)
- IP addresses, emails, phone numbers
- AWS keys, JWT tokens
- Deployment IDs and cache keys

✅ **Generates security reports** showing exactly what was found

✅ **Color-coded severity levels:**
- 🔴 CRITICAL (repos, keys, tokens)
- 🟠 SENSITIVE (APIs, services, emails)
- 🟡 LOW (regions, general info)

## Example Output
```
🔍 Scanning for sensitive information...
✅ Sanitized output written to: clean-build.log
📊 Security report written to: clean-build-report.txt

============================================================
  SECURITY SANITIZATION REPORT
============================================================

Total Issues Found: 12

🔴 CRITICAL (5):
   - Repository URL: github.com/SAHJONY/FrontDesk-Agents-LLC-Completed
   - Branch Name: Branch: SAHJONY-patch-1
   - Commit Hash: Commit: 4315c39
   - Deployment ID: (CFuFxmsFJC15SSLd259KooRnkro6)

🟠 SENSITIVE (7):
   - API Endpoint: /api/webhooks/call-events
   - Supabase: @supabase
   - Twilio: twilio
   - Stripe: stripe

// ./lib/api-handlers/dashboard/calls.ts

// ... existing imports

const decoded = verifyJWT(token);

// 1. Critical Security Gate: Check for null decoded token
if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized: Session Expired or Invalid' });
}

// 2. Safely access tenant_id now that decoded is guaranteed to exist
// Casting as 'any' or your Specific Interface to ensure tenant_id is recognized
const payload = decoded as { tenant_id: string };
const tenantId = (req.query.tenant_id as string) || payload.tenant_id;

const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

// Strict Multi-tenant Security Gate follows...

import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "solaryn_admin_session";
const SESSION_DURATION = "7d";

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET ?? "default_solaryn_jwt_secret_key_2026";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "adminpassword123";
  return password === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

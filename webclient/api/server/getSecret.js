export function getSecret() {
  const secret = process.env.FIREBASE_SECRET;
  if (!secret) {
    throw new Error("Secret was not configured");
  }
  return secret;
}

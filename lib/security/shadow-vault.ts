import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.SHADOW_VAULT_KEY; // 32-byte key

export function encryptSecret(text: string) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY!), iv);
  
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Return a single string containing IV, Tag, and Ciphertext
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptSecret(hash: string) {
  const [iv, tag, content] = hash.split(':');
  const decipher = createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY!), Buffer.from(iv, 'hex'));
  
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  
  return decrypted.toString('utf8');
}

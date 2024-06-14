// import * as jwt from 'jsonwebtoken';
import { hash, compareSync } from 'bcrypt'

export async function encryptPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export function comparepassword(
  hashPassword: string,
  password: string
): boolean {
  return compareSync(password, hashPassword)
}

// static generateToken(payload: payload) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
// }

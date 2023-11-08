import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);

export class CryptoConfig {
	public encrypt(text: string) {
		const cipher = createCipheriv(algorithm, key, iv);
		let encryptedData = cipher.update(text, 'utf-8', 'hex');
		encryptedData += cipher.final('hex');
		return encryptedData;
	}

	public decrypt(text: string) {
		const decipher = createDecipheriv(algorithm, key, iv);
		let decipherData = decipher.update(this.encrypt(text), 'hex', 'utf-8');
		decipherData += decipher.final('utf-8');
		return decipherData;
	}
}

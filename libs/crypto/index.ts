import * as crypto from 'node:crypto';

const ALGORITHM = 'aes-256-cbc';
const BLOCK_SIZE = 16;
const KEY = crypto.randomBytes(32);

export class Crypto {
	public decrypt(text: string) {
		const contents = Buffer.from(text, 'hex');
		const iv = contents.subarray(0, BLOCK_SIZE);
		const textBytes = contents.subarray(BLOCK_SIZE);

		const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
		let decrypted = decipher.update(textBytes.toString(), 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	}

	public encrypt(plainText: string) {
		const iv = crypto.randomBytes(BLOCK_SIZE);
		const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
		let cipherText: string;
		try {
			cipherText = cipher.update(plainText, 'utf8', 'hex');
			cipherText += cipher.final('hex');
			cipherText = iv.toString('hex') + cipherText;
		} catch (error) {
			cipherText = null;
		}
		return cipherText;
	}
}

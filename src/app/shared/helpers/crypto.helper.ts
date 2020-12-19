import CryptoJS from 'crypto-js';

export class CryptoUtil {
    static salt;
    static initSalt(salt): void {
        CryptoUtil.salt = salt;
    }

    static hashMessage(message): string {
        if (!CryptoUtil.salt) {
            throw new Error('Salt is not set!');
        }
        const parsedSalt = CryptoJS.enc.Base64.parse(CryptoUtil.salt);
        const result = CryptoJS.PBKDF2(message, parsedSalt, {
            keySize: 64 / 4,
            iterations: 1000,
            hasher: CryptoJS.algo.SHA512
        });
        return CryptoJS.enc.Base64.stringify(result);
    }

    static generateSignature(message: string): any {
        if (!CryptoUtil.salt) {
            throw new Error('Salt is not set!');
        }
        const timestamp = Date.now();
        return {
            timestamp,
            signature: CryptoUtil.hashMessage(`${message}${timestamp}`)
        };
    }
}

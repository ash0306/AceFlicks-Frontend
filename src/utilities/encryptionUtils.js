import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
    if (!data) return data;
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
    if (!encryptedData) return encryptedData;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
};
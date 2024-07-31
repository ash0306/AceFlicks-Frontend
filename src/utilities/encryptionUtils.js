import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
    if (!data) return data;
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
    if (!encryptedData) return encryptedData;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedString);
    return JSON.parse(decryptedString);
};
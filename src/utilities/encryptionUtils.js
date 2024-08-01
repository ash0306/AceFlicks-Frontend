import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
    console.log(secretKey);
    if (!data) return data;
    const jsonString = JSON.stringify(data);
    console.log(CryptoJS.AES.encrypt(jsonString, secretKey).toString());
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
    if (!encryptedData) return encryptedData;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypt:"+decryptedString);
    return JSON.parse(decryptedString);
};
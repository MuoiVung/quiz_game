import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "";

const encryptData = (name: string, data: any) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  localStorage.setItem(name, encrypted);
};

const decryptData = (name: string) => {
  const encrypted = localStorage.getItem(name);

  if (!encrypted) {
    return null;
  }

  const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );

  return JSON.parse(decrypted);
};

export { encryptData, decryptData };

import CryptoJS from "crypto-js";

export function toMd5(string) {
  return CryptoJS.MD5(string).toString();
}

export function encodeBase64(string) {
  return btoa(string);
}

export function decodeBase64(string) {
  return atob(string);
}

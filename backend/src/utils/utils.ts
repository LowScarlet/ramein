import { v4 as uuidv4 } from "uuid";

export function fileUploadName(file: any) {
  const uuid = uuidv4();
  const fileExtension = file.originalname.split(".").pop();
  return `${Date.now()}-${uuid}.${fileExtension}`;
}

export function generateShortUid(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i += 1) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
}

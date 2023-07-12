import multiparty from "multiparty";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase_config";
import fs from "fs";
import { url } from "inspector";
import mongooseConnect from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  //connect mongoose
  await mongooseConnect();
  //check if isAdmin
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const links = [];
  // Create a storage reference from our storage service
  for (const file of files.file) {
    const ext = file.originalFilename.split(".")[1];
    const name = file.originalFilename.split(".")[0];
    const newFileName = name + "." + ext;

    const storageRef = ref(storage, `images/${newFileName}`);

    const uploadTask = await uploadBytesResumable(
      storageRef,
      fs.readFileSync(file.path)
    );

    const link = await getDownloadURL(uploadTask.ref);
    links.push(link);
  }
  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};

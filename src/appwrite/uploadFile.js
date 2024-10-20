import { Client, Databases, Storage, Query, ID } from "appwrite";
import envImport from "../envImport/envImport";

export class UploadFile {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(envImport.appwrite_URL);
    this.client.setProject(envImport.appwriteProjectID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        envImport.appwriteBucketID,
        ID.unique(),
        file
      );

      return uploadedFile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      const deletedFile = await this.storage.deleteFile(
        envImport.appwriteBucketID,
        fileID
      );

      return deletedFile;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileID) {
    const previewedFile = this.storage.getFilePreview(
      envImport.appwriteBucketID,
      fileID
    );
    return previewedFile;
  }
}

const uploadFile = new UploadFile();

export default uploadFile;

import { Client, Databases, Storage, Query, ID } from "appwrite";
import envImport from "../envImport/envImport";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(envImport.appwrite_URL);
    this.client.setProject(envImport.appwriteProjectID);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      const createdPost = await this.databases.createDocument(
        envImport.appwriteDatabaseID,
        envImport.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, userId }
      );

      return createdPost;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedPost = await this.databases.updateDocument(
        envImport.appwriteDatabaseID,
        envImport.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status }
      );

      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      const deletedPost = await this.databases.deleteDocument(
        envImport.appwriteDatabaseID,
        envImport.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const getedPost = await this.databases.getDocument(
        envImport.appwriteDatabaseID,
        envImport.appwriteCollectionID,
        slug
      );

      return getedPost;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const getedPosts = await this.databases.listDocuments(
        envImport.appwriteDatabaseID,
        envImport.appwriteCollectionID,
        queries
      );
      return getedPosts;
    } catch (error) {
      console.log(error);
    }
    const getedPosts = await this.databases.listDocuments(
      envImport.appwriteDatabaseID,
      envImport.appwriteCollectionID,
      queries
    );
  }
}
const service = new Service();

export default service;

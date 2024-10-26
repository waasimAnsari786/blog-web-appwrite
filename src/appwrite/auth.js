import { Client, Account, ID } from "appwrite";
import envImport from "../envImport/envImport";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(envImport.appwrite_URL);
    this.client.setProject(envImport.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({ email, password });
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userLogin;
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logOut() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;

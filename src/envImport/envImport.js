const envImport = {
  appwrite_URL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_PROJECT_ID),
  appwriteCollectionID: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_DATABASE_ID),
  appwriteBucketID: String(import.meta.env.VITE_BUCKET_ID),
};

export default envImport;

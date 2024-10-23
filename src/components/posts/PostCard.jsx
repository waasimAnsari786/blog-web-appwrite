import React from "react";
import uploadFile from "../../appwrite/uploadFile";
import { Link } from "react-router-dom";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/posts/${$id}`}>
      <div>
        <img src={uploadFile.getFilePreview(featuredImage)} alt={title} />
        <p>{title}</p>
      </div>
    </Link>
  );
}
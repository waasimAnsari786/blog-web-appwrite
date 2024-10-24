import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import service from "../appwrite/config";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) setPosts(posts);
    });
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className=" flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

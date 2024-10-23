import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../appwrite/uploadFile";
import service from "../../appwrite/config";
import Input from "../reuseableComponents/Input";
import RTE from "../RTE";
import Select from "../reuseableComponents/Select";
import Button from "../reuseableComponents/Button";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = (await data.image[0])
        ? uploadFile.uploadFile(data.image[0])
        : null;

      if (file) uploadFile.deleteFile(post.featuredImage);
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await uploadFile.uploadFile(data.image[0]);
      if (file) {
        const fileID = file.$id;
        data.featuredImage = fileID;
        const dbPost = await service.createPost({
          ...data,
          userID: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLocaleLowerCase().replace(/\s/g, "-");
    return "";
  }, []);
  return (
    <form onSubmit={() => handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 p-2">
        <Input
          label="Title"
          placeholder="your title"
          myClass="mb-4"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug"
          placeholder="slug"
          myClass="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="content"
          name="content"
          control={control}
          defaultVal={getValues("content")}
        />
      </div>

      <div className="w-1/3 p-2">
        <Input
          label="featured image"
          type="file"
          myClass="mb-4"
          accept="image/png , image/jpg , image/jpeg , image/gif"
          {...register("image", {
            required: !post,
          })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={uploadFile.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          myClass="mb-4"
          {...register("status", { required: true })}
        />

        <Button type="submit" myClass="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

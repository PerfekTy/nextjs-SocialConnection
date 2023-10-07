"use client";

import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import { ImageUpload } from "../user-view/image-upload";
import { AiOutlineUpload } from "react-icons/ai";

export const EditModal = ({ userId }: { userId: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();

      toast.success("User updated successfully");
    } catch (error) {
      if (error === 413) {
        toast.error("Image is too large");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        icon={<AiOutlineUpload size={24} />}
        label="Cover image"
      />
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        icon={<AiOutlineUpload size={24} />}
        label="Profile image"
      />
      <Input
        placeholder="Username"
        name="text"
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        name="text"
        type="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Textarea
        placeholder="Something about you..."
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        className="border text-md tracking-wide"
        disabled={isLoading}
      >
        Update your details
      </Button>
    </form>
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="rounded-lg w-20">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="md:text-left text-center">
          Edit your SocialConnection account details.
        </DialogDescription>
        {bodyContent}
        <DialogFooter className="text-center text-sm text-muted-foreground">
          * Name and Username fields are required.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

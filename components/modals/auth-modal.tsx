"use client";

import { FormEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useRouter } from "next/navigation";

export const AuthModal = () => {
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalToggle, setModalToggle] = useState(true);

  const onChangeLoginHandler = (name: string, value: string) => {
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const onChangeRegisterHandler = (name: string, value: string) => {
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };

  const onSubmitLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        if (
          !loginCredentials.email.trim().length ||
          !loginCredentials.password.trim().length
        ) {
          return toast.error("Fields cannot be empty!");
        }

        const result = await signIn("credentials", {
          ...loginCredentials,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Invalid credentials, try again");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [loginCredentials, router]
  );

  const onSubmitRegister = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        if (
          !registerCredentials.email.trim().length ||
          !registerCredentials.password.trim().length ||
          !registerCredentials.username.trim().length ||
          !registerCredentials.name.trim().length
        ) {
          return toast.error("Fields cannot be empty!");
        }

        await axios.post("/api/register", {
          email: registerCredentials.email,
          password: registerCredentials.password,
          username: registerCredentials.username,
          name: registerCredentials.name,
        });

        setIsLoading(false);

        toast.success("Account created");

        await signIn("credentials", {
          ...registerCredentials,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [registerCredentials]
  );

  const bodyContentLogin = (
    <form onSubmit={onSubmitLogin} className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        name="email"
        type="email"
        onChange={(e) => onChangeLoginHandler("email", e.target.value)}
        value={loginCredentials.email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        onChange={(e) => onChangeLoginHandler("password", e.target.value)}
        value={loginCredentials.password}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        className="border text-md tracking-wide text-white"
        disabled={isLoading}
      >
        Login
      </Button>
    </form>
  );

  const bodyContentRegister = (
    <form onSubmit={onSubmitRegister} className="flex flex-col gap-4">
      <Input
        placeholder="Username"
        type="text"
        name="username"
        onChange={(e) => onChangeRegisterHandler("username", e.target.value)}
        value={registerCredentials.username}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        type="text"
        name="name"
        onChange={(e) => onChangeRegisterHandler("name", e.target.value)}
        value={registerCredentials.name}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        type="email"
        name="email"
        onChange={(e) => onChangeRegisterHandler("email", e.target.value)}
        value={registerCredentials.email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        onChange={(e) => onChangeRegisterHandler("password", e.target.value)}
        value={registerCredentials.password}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        className="border text-md tracking-wide text-white"
        disabled={isLoading}
      >
        Create an account
      </Button>
    </form>
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white w-full uppercase">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {modalToggle ? (
            <>
              <DialogTitle className="my-5 flex gap-2 items-center justify-center">
                Login to your SocialConnection{" "}
                <MdOutlineConnectWithoutContact size={30} color="#2dac5c" />
                account
              </DialogTitle>
              {bodyContentLogin}
              <DialogDescription className="justify-center items-center flex gap-3">
                First time using SocialConnection?
                <Button
                  onClick={() => setModalToggle(false)}
                  variant="ghost"
                  className="font-bold underline underline-offset-4"
                >
                  Create an account
                </Button>
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="my-5 flex gap-2 items-center justify-center">
                Create account to use SocialConnection
                <MdOutlineConnectWithoutContact size={30} color="#2dac5c" />
              </DialogTitle>
              {bodyContentRegister}
              <DialogDescription className="justify-center items-center flex gap-3">
                Already have an account?
                <Button
                  onClick={() => setModalToggle(true)}
                  variant="ghost"
                  className="font-bold underline underline-offset-4"
                >
                  Login
                </Button>
              </DialogDescription>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

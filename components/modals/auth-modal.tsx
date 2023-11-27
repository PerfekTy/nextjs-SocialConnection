"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/forms/register";
import LoginForm from "@/components/forms/login";

import { MdOutlineConnectWithoutContact } from "react-icons/md";

export const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerModal, setRegisterModal] = useState(true);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white w-full uppercase">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {registerModal ? (
            <>
              <DialogTitle className="my-5 flex gap-2 items-center justify-center text-sm md:text-lg">
                <p>Login to your </p>
                <MdOutlineConnectWithoutContact size={30} color="#2dac5c" />
                account
              </DialogTitle>
              <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
              <DialogDescription className="justify-center items-center flex gap-3 text-[10px] md:text-sm">
                First time using SocialConnection?
                <Button
                  onClick={() => setRegisterModal(false)}
                  variant="ghost"
                  className="font-bold underline text-[10px] md:text-sm"
                >
                  Create an account
                </Button>
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="my-5 flex gap-2 items-center justify-center">
                Create account to use
                <MdOutlineConnectWithoutContact size={30} color="#2dac5c" />
              </DialogTitle>
              <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
              <DialogDescription className="justify-center items-center flex gap-3">
                Already have an account?
                <Button
                  onClick={() => setRegisterModal(true)}
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

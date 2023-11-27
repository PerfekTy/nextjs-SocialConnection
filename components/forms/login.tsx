import React, { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoginForm = ({ isLoading, setIsLoading }: LoginProps) => {
  const router = useRouter();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const onChangeLoginHandler = (name: string, value: string) => {
    setLoginCredentials({ ...loginCredentials, [name]: value });
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

        const res = await signIn("credentials", {
          ...loginCredentials,
          redirect: false,
        });

        if (res?.error) {
          toast.error("Invalid credentials, try again");
        } else {
          router.push("/");
          toast.success("You are logged in");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [loginCredentials, router, loginCredentials.password, setIsLoading],
  );

  return (
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
};

export default LoginForm;

import React, { FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const RegisterForm = ({ isLoading, setIsLoading }: RegisterProps) => {
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const onChangeRegisterHandler = (name: string, value: string) => {
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };

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
    [
      registerCredentials,
      registerCredentials.password,
      registerCredentials.username,
      registerCredentials.name,
      setIsLoading,
    ],
  );

  return (
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
};

export default RegisterForm;

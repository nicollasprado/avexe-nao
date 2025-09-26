"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Input, InputGroup } from "rsuite";

interface IPasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: ControllerRenderProps<any> & { onChange: (value: string) => void };
  size?: "sm" | "md" | "lg" | "xs";
  autoComplete?: string;
  placeholder?: string;
  name?: string;
  id?: string;
}

export default function PasswordInput({
  name = "password",
  id = "password_input",
  field,
  size = "lg",
  autoComplete = "on",
  placeholder = "Digite sua senha",
}: IPasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <InputGroup size={size}>
      <Input
        {...field}
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        id={id}
        name={name}
      />
      <InputGroup.Button onClick={() => setPasswordVisible(!passwordVisible)}>
        {passwordVisible ? <Eye /> : <EyeClosed />}
      </InputGroup.Button>
    </InputGroup>
  );
}

"use client";

import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { AutoComplete } from "rsuite";

const EMAIL_SUFFIXES = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
];

interface IEmailAutoCompleteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: ControllerRenderProps<any> & { onChange: (value: string) => void };
  size?: "sm" | "md" | "lg" | "xs";
  autoComplete?: string;
  placeholder?: string;
  name?: string;
  id?: string;
}

export default function EmailAutoComplete({
  name = "email",
  id = "email_input",
  field,
  size = "lg",
  autoComplete = "new-password",
  placeholder = "Digite seu email",
}: IEmailAutoCompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleEmailChange = (value: string) => {
    const at = value.match(/@[\S]*/);
    const nextData = at
      ? EMAIL_SUFFIXES.filter((item) => item.indexOf(at[0]) >= 0).map(
          (item) => {
            return `${value}${item.replace(at[0], "")}`;
          }
        )
      : EMAIL_SUFFIXES.map((item) => `${value}${item}`);

    setSuggestions(nextData);
  };

  return (
    <AutoComplete
      {...field}
      data={suggestions}
      onChange={(value) => {
        if (field) {
          field.onChange(value);
        }

        handleEmailChange(value);
      }}
      placeholder={placeholder}
      autoComplete={autoComplete}
      size={size}
      id={id}
      name={name}
    />
  );
}

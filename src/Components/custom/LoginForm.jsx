"use client";

import { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Action/auth/loginAction";
import logo from "../../Images/logo.png";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
  const [errors, setErrors] = useState({ usernameOrEmail: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { usernameOrEmail, password } = formData;
    let hasError = false;

    if (!usernameOrEmail) {
      setErrors((prev) => ({ ...prev, usernameOrEmail: "Username is required" }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    }
    if (!hasError) {
      setIsDisabled(true);
      dispatch(
        login({
          payload: formData,
          callback: (data) => {
            if (data.meta.code === 200) {
              setIsDisabled(false);
            } else {
              setIsDisabled(false);
            }
          },
        })
      );
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const { usernameOrEmail, password } = formData;
    if (usernameOrEmail && password && !errors.usernameOrEmail && !errors.password) {
      setIsDisabled(false);
    }
  }, [formData, errors]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        gap="4"
        align="center"
        maxW="md"
        margin="auto"
        borderRadius="10px"
        padding="3rem"
      >
        <Image src={resolvedTheme === "dark" ? logo : logo} alt="Logo" mb={4} />
        <Field label="Username/Email" invalid={!!errors.usernameOrEmail} errorText={errors.usernameOrEmail}>
          <Input name="usernameOrEmail" value={formData.usernameOrEmail} onChange={handleChange} />
        </Field>

        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password}
        >
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Field>

        <Button
          variant="outline"
          color={resolvedTheme === "dark" && "var(--themeColor)"}
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </Button>
        <HStack fontSize="md">
          <Text>Don't have an account?</Text>
          <Link color="blue.500" onClick={() => navigate("/signup")}>
            Signup
          </Link>
        </HStack>
      </Stack>
    </form>
  );
};

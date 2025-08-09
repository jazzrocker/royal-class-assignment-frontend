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
import logo from "../../Images/logo.png";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Redux/Action/auth/signupAction";

export const SignupForm = () => {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordMissmatched, setPasswordMisssmatched] = useState(false);
  const [isEnteringCP, setIsEnteringCP] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e?.target || {};

    const nameRegex = /^[A-Za-z\s]*$/;


    if (name === "name") {
      if (!nameRegex.test(value)) return;
    }


    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "password" || name === "cpassword") {
        setPasswordMisssmatched(updatedForm.password !== updatedForm.cpassword);
      }

      return updatedForm;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const {
      name,
      username,
      email,
      password,
      cpassword,
    } = formData || {};
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#]).{8,}$/;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      hasError = true;
    }
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
      hasError = true;
    }
    if (!email || !emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Valid E-mail is required." }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters, with one uppercase and either '@' or '#'.",
      }));
      hasError = true;
    }
    if (!cpassword) {
      setErrors((prev) => ({
        ...prev,
        cpassword: "Please re-enter your password.",
      }));
      hasError = true;
    } else if (passwordMissmatched) {
      setErrors((prev) => ({
        ...prev,
        cpassword: "Passwords do not match.",
      }));
      hasError = true;
    }
    if (!hasError) {
      setIsDisabled(true);
      dispatch(
        signup({
          payload: formData,
          callback: (data) => {
            if (data?.meta?.code === 200) {
              setIsDisabled(false);
              navigate("/verifyemail");
            } else {
              setIsDisabled(false);
            }
          },
        })
      );
    }
  };

  useEffect(() => {
    const { name, username, email, password, cpassword } = formData || {};
    if (
      name &&
      username &&
      email &&
      password &&
      cpassword &&
      !errors?.name &&
      !errors?.username &&
      !errors?.email &&
      !errors?.password &&
      !errors?.cpassword
    ) {
      setIsDisabled(false);
    }
  }, [formData, errors]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        gap="5"
        align="center"
        maxW="md"
        margin="auto"
        borderRadius="10px"
        padding="3rem"
        boxShadow={
          resolvedTheme === "dark"
            ? "var(--themeColor) 0px 2px 8px 0px;"
            : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        }
      >
        <Image src={resolvedTheme === "dark" ? logo : logo} alt="Logo" mb={4} />
        <HStack>
          <Field
            label="Name"
            invalid={!!errors?.name}
            errorText={errors?.name}
          >
            <Input
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </Field>
          <Field
            label="Username"
            invalid={!!errors?.username}
            errorText={errors?.username}
          >
            <Input
              name="username"
              value={formData?.username}
              onChange={handleChange}
            />
          </Field>
        </HStack>
        <Field
          label="Email"
          invalid={!!errors?.email}
          errorText={errors?.email}
        >
          <Input name="email" value={formData?.email} onChange={handleChange} />
        </Field>
        <HStack>
          <Field
            label="Password"
            invalid={!!errors?.password}
            errorText={errors?.password}
          >
            <PasswordInput
              name="password"
              value={formData?.password}
              onChange={handleChange}
            />
          </Field>
          <Field
            label="Confirm Password"
            color={
              isEnteringCP
                ? passwordMissmatched
                  ? "red.500"
                  : "green.500"
                : ""
            }
            invalid={!!errors?.cpassword}
            errorText={errors?.cpassword}
          >
            <PasswordInput
              name="cpassword"
              value={formData?.cpassword}
              onFocus={() => setIsEnteringCP(true)}
              onBlur={() => setIsEnteringCP(false)}
              onChange={handleChange}
            />
          </Field>
        </HStack>

        <Button
          variant="outline"
          color={resolvedTheme === "dark" && "var(--themeColor)"}
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </Button>
        <HStack fontSize="md">
          <Text>Already have an account?</Text>
          <Link color="blue.500" onClick={() => navigate?.("/login")}>
            Login
          </Link>
        </HStack>
      </Stack>
    </form>
  );
};

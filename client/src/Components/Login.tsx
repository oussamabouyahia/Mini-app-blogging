import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";

import { LoginUser } from "../type";
const Login = () => {
  //input is the user object
  const [input, setInput] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const isErrorEmail = () => {
    const regex = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );

    return !regex.test(input.email);
  };

  const isErrorPassword = () => {
    return !(input.password.length > 7 && input.password.length < 14);
  };
  const login = () => {
    axios
      .post("http://localhost:5000/user/login", input)
      .then((res) => {
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("access_token", res.data.token);
        setInput({ email: "", password: "" });
        alert("logged in successfully");
        navigate("/posts");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div style={{ marginTop: "10%" }}>
      <h2>Create new account</h2>

      <FormControl isInvalid={isErrorEmail()}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={input.email}
          onChange={handleEmailChange}
          placeholder="email"
        />
        {!isErrorEmail() ? (
          <FormHelperText color="green">valid email</FormHelperText>
        ) : (
          <FormErrorMessage>Valid email is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={isErrorPassword()}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={input.password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
        {!isErrorPassword() ? (
          <FormHelperText color="green">valid password</FormHelperText>
        ) : (
          <FormErrorMessage>
            password is required with a length between 8 and 13
          </FormErrorMessage>
        )}
      </FormControl>

      <Button
        colorScheme="telegram"
        size="lg"
        style={{ marginTop: "5%" }}
        onClick={login}
        isDisabled={isErrorEmail() || isErrorPassword()}
      >
        Sign in
      </Button>
      <span
        style={{ color: "blue", margin: "5%", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        I don't have an account
      </span>
    </div>
  );
};

export default Login;

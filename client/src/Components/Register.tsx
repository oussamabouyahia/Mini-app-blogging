import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { UserType } from "../type";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //input is the user object
  const [input, setInput] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, email: e.target.value };
    });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      return { ...prev, name: e.target.value };
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
  const isErrorName = () => {
    return !(input.name.length > 2 && input.name.length < 21);
  };
  const isErrorPassword = () => {
    return !(input.password.length > 7 && input.password.length < 14);
  };
  const register = () => {
    axios
      .post("http://localhost:5000/user/register", input)
      .then(() => {
        setInput({ name: "", email: "", password: "" });
        alert("new account created");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div style={{ marginTop: "10%" }}>
      <h2>Create new account</h2>
      <FormControl isInvalid={isErrorName()}>
        <FormLabel>name</FormLabel>
        <Input
          type="name"
          value={input.name}
          onChange={handleNameChange}
          placeholder="name"
        />
        {!isErrorName() ? (
          <FormHelperText color="green">valid name</FormHelperText>
        ) : (
          <FormErrorMessage>
            name is required with min 03 characters and max 20
          </FormErrorMessage>
        )}
      </FormControl>
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
        onClick={register}
        isDisabled={isErrorEmail() || isErrorName() || isErrorPassword()}
      >
        Sign up
      </Button>
      <span
        style={{ color: "blue", margin: "5%", cursor: "pointer" }}
        onClick={() => navigate("/login")}
      >
        Already have an account
      </span>
    </div>
  );
};

export default Register;

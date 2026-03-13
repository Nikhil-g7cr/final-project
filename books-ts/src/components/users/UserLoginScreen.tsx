import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import LabeledInput from "../utils/Input";
import Spacer from "../utils/Spacer";
import { useUserProvider } from "../../providers/UserProvider";
import Loading from "../utils/Loading";

export interface UserLoginScreenProps {}

const UserLoginScreen = (props: UserLoginScreenProps) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, status, error } = useUserProvider();

  const handleChange = (value: string, id: string) => {
    setLoginInfo({ ...loginInfo, [id]: value });

    setErrors({ ...errors, [id]: "" });
  };

  const validate = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!loginInfo.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !loginInfo.email.includes("@") ||
      !loginInfo.email.includes(".")
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!loginInfo.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (loginInfo.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await login(loginInfo.email, loginInfo.password);

    if (result) {
      navigate("/books");
    }
  };

  return (
    <div className="UserLoginScreen">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <LabeledInput
          id="email"
          value={loginInfo.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}

        <LabeledInput
          id="password"
          value={loginInfo.password}
          onChange={handleChange}
          type="password"
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}

        <Spacer height={10} />
        <button className="form-element btn btn-primary" type="submit">
          Login
        </button>

        <span>
          <Spacer height={10} />
          {status === "loading" && <Loading />}
          {status === "error" && (
            <span className="text-danger">{error?.message}</span>
          )}
          {status === "done" && (
            <span className="text-success">Login Successful</span>
          )}
        </span>
      </form>
    </div>
  );
};

export default UserLoginScreen;

import { useState, type FormEvent } from "react";
import LabeledInput from "../utils/Input";
import Spacer from "../utils/Spacer";
import { useUserProvider } from "../../providers/UserProvider";
import Loading from "../utils/Loading";
import { useNavigate } from "react-router-dom";

export interface UserRegisterScreenProps {}

const UserRegisterScreen = (props: UserRegisterScreenProps) => {

    const navigate=useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register, status, error } = useUserProvider();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (value: string, id: string) => {
    setRegisterInfo({ ...registerInfo, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const validate = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (!registerInfo.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!registerInfo.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !registerInfo.email.includes("@") ||
      !registerInfo.email.includes(".")
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!registerInfo.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (registerInfo.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const newUser = {
      name: registerInfo.name,
      email: registerInfo.email,
      password: registerInfo.password,
      roles: ["user"],
    };

    await register(newUser);
        navigate("/");
  };

  return (
    <div className="UserLoginScreen">
      <h2>Register Account</h2>
      <form onSubmit={handleRegister}>
        <LabeledInput
          id="name"
          value={registerInfo.name}
          onChange={handleChange}
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}

        <LabeledInput
          id="email"
          value={registerInfo.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}

        <LabeledInput
          id="password"
          value={registerInfo.password}
          onChange={handleChange}
          type="password"
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}

        <Spacer height={10} />
        <button className="form-element btn btn-primary" type="submit">
          Register
        </button>

        <span>
          <Spacer height={10} />
          {status === "loading" && <Loading />}
          {status === "error" && (
            <span className="text-danger">{error?.message}</span>
          )}
          {status === "done" && (
            <span className="text-success">Registration Successful!</span>
          )}
        </span>
      </form>
    </div>
  );
};

export default UserRegisterScreen;

import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { updateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      // 检查响应中是否包含token
      if (res.data.token) {
        // 将token存储在localStorage中
        localStorage.setItem('token', res.data.token);

        // 设置默认的Authorization header
        apiRequest.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      } else {
        console.warn('Token not found in the response');
      }

      // 更新用户状态
      updateUser(res.data.user);

      // 显示成功消息
      setSuccessMessage("Login successful!");

      // 延迟导航，让用户看到成功消息
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred during login");
      } else if (err.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

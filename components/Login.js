import { useState,useEffect } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function login(e) {
    e.preventDefault();
    if (!data.username || !data.password) {
      setMessage("Enter all fields");
      return;
    }

    fetch("http://localhost:8080/user/signin", {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Login successful") sessionStorage.setItem("token", data.token);
        setMessage(data.message);
      });
  }

  useEffect(() => {
    if (message == "Login successful") {
      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 5000);
    } else {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);

  return (
    <>
      {message ? (
        <div className="message">
          <span className="msg-span">
            <div className="msg-body">{message}</div>
            <button
              className="msg-btn"
              onClick={() => {
                if (message == "Login successful") {
                  setMessage("");
                  navigate("/home");
                } else setMessage("");
              }}
            >
              OK
            </button>
          </span>
        </div>
      ) : null}

      <div className="login-main">
        <h1 className="name">Battle Store</h1>
        <form className="form">
          <input
            placeholder="Username"
            className="inputs"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="inputs"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="btn" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
import { useEffect, useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    age: 0,
    password: "",
  });

  function register(e) {
    e.preventDefault();
    if (!data.username || !data.age || !data.password) {
      setMessage("Enter all fields");
      return;
    }
    if (data.age < 18) {
      setMessage("You should be 18 or above to register");
      return;
    }

    if(data.password.length<6){
        setMessage("Paswword should have atleast 6 characters")
        return;
    }

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }

  useEffect(() => {
    if (message == "Registration successful") {
      setTimeout(() => {
        setMessage("");
        navigate("/signin");
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
                if (message == "Registration successful") {
                  setMessage("");
                  navigate("/login");
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
            placeholder="Player Id"
            className="inputs"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            placeholder="Age"
            className="inputs"
            type="number"
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
          <input
            placeholder="Password"
            className="inputs"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            className="btn"
            onClick={register}
            disabled={message ? true : false}
          >
            Register
          </button>
        </form>
        <span className="warn">
          all the items will be sent based on the player id so make sure you
          give the correct player id.
        </span>
      </div>
    </>
  );
}

export default Signup;
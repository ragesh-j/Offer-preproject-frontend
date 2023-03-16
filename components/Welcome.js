import { useState } from "react";
import "../Styles/Welcome.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);
  return (
    <div className="welcome-main">
      <h1 className="name">Battle Store</h1>
      <h2 className="header">Buy items and dominate the battlefield</h2>
      <button
        className="btn"
        disabled={btn ? true : false}
        onClick={() => setBtn(true)}
      >
        Start Buying
      </button>
      <div className={`${btn ? "btns" : "nobtns"} allbtns`}>
        <button className="btn btn1" onClick={() => navigate("/signin")}>
          Login as existing user
        </button>
        <button className="btn btn1" onClick={() => navigate("/signup")}>
          Register as new user
        </button>
      </div>
    </div>
  );
}

export default Welcome;
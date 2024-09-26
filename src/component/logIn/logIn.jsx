import { useState } from "react";
import Cookies from "js-cookies";
import "./index.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const nav = useNavigate();
  const [allValues, setValues] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(`${allValues.username}, ${allValues.password}`);

    const url = "https://apis.ccbp.in/login";

    const useDetails = {
      username: allValues.username,
      password: allValues.password,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(useDetails),
    };

    const response = await fetch(url, options);
    const fetchData = await response.json();
    console.log(fetchData);
    if (response.ok === true) {
      Cookies.setItem("jwtToken", fetchData.jwt_token);
      setValues({ ...allValues, errorMsg: "" });
      nav("/");

      //console.log(fetchData.error_msg);
    } else {
      setValues({ ...allValues, errorMsg: fetchData.error_msg });
      //console.log(fetchData.error_msg);
    }
  };




  const onChangeUsername = (event) => {
    //console.log("good");
    setValues({ ...allValues, username: event.target.value });
  };

  const onChangePassword = (event) => {
    // console.log("good2");
    setValues({ ...allValues, password: event.target.value });
  };

  return (
    <div className="form-cont">
      <form className="my-form" onSubmit={onSubmit}>
        <img
          className="logo"
          src="/public/logo.png"
        />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChangeUsername}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChangePassword}
          ></input>
        </div>
        <div>
          <p className="error-spc" style={{ color: "red" }}>
            {allValues.errorMsg}
          </p>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

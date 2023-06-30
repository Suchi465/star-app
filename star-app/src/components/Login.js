import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../css_Modules/login.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { type } from "@testing-library/user-event/dist/type";

function Login() {
  let navigate = useNavigate();
  const cookie = new Cookies(); //to store user data in browser(locally)
  const [showPwd, setpwd] = useState(false);
  const [userexists, setUserExists] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(true);
  const email = watch("email", "");
  const password = watch("password", "");
  const [cookieStatus, setCookieStatus] = useState("");

  function changeIcon() {
    // change eye icon to show/hide password
    setpwd((prevVal) => {
      return !prevVal;
    });
  }
  function checkUserExists() {
    //check user exists in the DB..if exists return true..else return false
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);

    axios({
      method: "post",
      url: "http://localhost:8080/idexists",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        setUserExists(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  const onSubmit = async (
    data //login
  ) => {
    var bodyFormData = new FormData();

    bodyFormData.append("email", email); //get the entire user object to store data in cookies
    const cookieData = await axios({
      method: "post",
      url: "http://localhost:8080/objemail",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    //setting cookie values
    cookie.set("id", cookieData.data.id, { path: "/" });
    cookie.set("username", cookieData.data.username, { path: "/" });
    cookie.set("role", cookieData.data.role, { path: "/" });
    cookie.set("status", cookieData.data.status, { path: "/" });

    var bodyFormData = new FormData();
    bodyFormData.append("id", email);
    bodyFormData.append("password", password); //send these data to login page

    const loginData = await axios({
      //login using email and password
      method: "post",
      url: "http://localhost:8080/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setData(loginData.data); //loginData is boolean..correct credentials->True

    console.log(loginData.data);

    if (loginData.data && cookie.get("status") === "Active") {
      //if login is successful and status is active
      console.log(cookie.get("status"));
      Store.addNotification({
        title: "Success",
        message: "Login success",
        type: "success",
        container: "top-center",
        dismiss: {
          duration: 2000,
          showIcon: true,
          pauseOnHover: true,
        },
      });
    } else if (!loginData.data) {
      Store.addNotification({
        title: "Error",
        message: "Incorrect Password",
        type: "warning",
        container: "top-center",
        dismiss: {
          duration: 2000,
          showIcon: true,
          pauseOnHover: true,
        },
      });
    }

    let RoleCookie = cookie.get("role");
    setCookieStatus(cookie.get("status"));

    let status = cookie.get("status");
    if (status === "Requested") {
      Store.addNotification({
        title: "Access Denied",
        message: "Your Request has not been accepted.Try Later",
        type: "info",
        container: "top-center",
        dismiss: {
          duration: 2000,
          showIcon: true,
          pauseOnHover: true,
        },
      });
    } else if (status === "Inactive") {
      Store.addNotification({
        title: "Access Denied",
        message: "Your Request has been denied.Contact Admin",
        type: "danger",
        container: "top-center",
        dismiss: {
          duration: 2000,
          showIcon: true,
          pauseOnHover: true,
        },
      });
    }
    console.log(cookieData.data.status);
    if (loginData.data && cookieData.data.status === "Active") {
      //implement role based authentication
      console.log(RoleCookie);
      if (RoleCookie === "Lead") {
        //if theres no error (requested,denied,wrong pwd)
        setTimeout(() => {
          navigate("/profile");
        }, 3000);

        console.log("Lead page");
      } else if (RoleCookie === "Admin") {
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
        //  navigate("/profile")
        console.log("Admin Page");
      } else if (RoleCookie === "Developer") {
        setTimeout(() => {
          navigate("/profile");
        }, 3000);

        console.log("Developer Page");
      }
    }
  };

  return (
    <div class="outermostdiv">
      <ReactNotifications />
      <div className="bg-img">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="container2">
        <h3> Login </h3>

        <form
          noValidate
          action=""
          className="formControl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="innerDiv2">
            <label class="label2" htmlFor="Id">
              User ID
            </label>
            <input
              class="ip2"
              type="email"
              placeholder="Enter Incedo mail"
              id="Id"
              {...register("email", {
                required: true,
                pattern: /^[a-z](\.?[a-z0-9]){3,}@incedoinc\.com$/,
              })}
              onBlur={checkUserExists}
            />
            {!userexists && (
              <span className="error3">User ID is not registered</span>
            )}
            {errors.email && errors.email.type === "required" && (
              <span className="error3"> User ID is required </span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="error3 "> Invalid User ID </span>
            )}
          </div>

          <div className="innerDiv2">
            <label class="label2" htmlFor="password">
              Password
            </label>
            <input
              class="ip2"
              type={showPwd ? "text" : "password"}
              placeholder="Enter password"
              id="pwd"
              {...register("password", {
                required: true,
              })}
            />

            {/* <i id="passwordImg3" className={showPwd?"fa fa-eye":"fa fa-eye-slash"} onClick={changeIcon}></i> */}

            {errors.password && errors.password.type === "required" && (
              <span className="error3">Password is required </span>
            )}
          </div>

          <a href="/verifyemail" class="linkForgotPwd signupanchor">
            {" "}
            Forgot Password?{" "}
          </a>

          <div className="buttonDiv">
            <button type="submit" class="button3">
              Login{" "}
            </button>
          </div>
          <br />
          <br />
          <br />
          <a class="signupLink" href="/signup">
            {" "}
            Don't have an account? Sign Up{" "}
          </a>
        </form>
      </div>
    </div>
  );
}
export default Login;

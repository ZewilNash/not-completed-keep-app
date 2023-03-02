import React, { useEffect, useState } from "react";
import logo from "../images/logo (1).png";
import finalStepLoginImg from '../images/flat.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import loginBanner from "../images/login-banner.png";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import {randomBytes} from 'crypto'
import bcrypt from 'bcryptjs'
const userToken = JSON.parse(localStorage.getItem("token")) 

let googleUser = JSON.parse(localStorage.getItem("google-user"))

// to do redirect user to create a password after login with
// google the create a new user with given data

// import {GoogleLogin} from '@react-oauth/google'
export const Login = ({ switchLight }) => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [token , setToken] = useState("")
  const [password , setPassword] = useState("")
  const [confirmPassword , setConfirmPassword] = useState("")
  // after login set the user with the gmail user to get data with its token
  
  useEffect(() => {
      if(userToken){
        window.location.href = "/keep"
      }
  } , [])
 
 
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("login Failed:", error)
  });


  const createUser = async () => {
    if(!password || !confirmPassword){
        console.log("Please Provide fields")
        return
    }

    if(!(password === confirmPassword)){
      console.log("Please confirm your password")
      return
    }

    let collectionOfImages = [
      "https://avatars0.githubusercontent.com/u/33479836?v=4",
      "https://avatars.mds.yandex.net/i?id=bdb1645a7d669d75726f432a7eec4939-5088908-images-thumbs&n=13",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FDoE7hj3aGSQLna7G3lQMOh46yme5fUbZ4PDCrKBLu_mIgX48kRXnamuL77XyIYnNho&usqp=CAU",
      "https://www.factroom.ru/wp-content/uploads/2018/07/795_YmVzdC0.png",
      "https://assets.codepen.io/1480814/av+1.png",
      "https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png",
      "data:image/png;base64,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",
      "https://www.peterbe.com/avatar.random.png",
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4aa68f80-158e-4744-95e9-da53a23e1eba/dasli0e-0189993a-d23c-4825-a6fc-aa0403374080.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhYTY4ZjgwLTE1OGUtNDc0NC05NWU5LWRhNTNhMjNlMWViYVwvZGFzbGkwZS0wMTg5OTkzYS1kMjNjLTQ4MjUtYTZmYy1hYTA0MDMzNzQwODAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fIqn95jSk9V2Ue2AWhx7Ow8k4B1T7to-RjMXJs04mmA"
  ]

    let token = randomBytes(64).toString("hex")

    let hashedPassword = await bcrypt.hash(password , 10)

    let newUser = {
      id:googleUser.id,
      firstname:googleUser.given_name,
      lastname:googleUser.family_name,
      username:googleUser.name,
      userImage:collectionOfImages[Math.floor(Math.random() * collectionOfImages.length)],
      email:googleUser.email,
      password:hashedPassword
    }

    let prevUser = JSON.parse(localStorage.getItem("users")) || []
    prevUser.push(newUser)
    localStorage.setItem("users" , JSON.stringify(prevUser))
    localStorage.setItem("token", JSON.stringify(token))

    window.location.href = "/keep"

  }

  useEffect(() => {
    if (user.length > 0) {
      // we have to make this headers to the api to get the data
      // get the user info with user access token from this api
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json"
            }
          }
        )

        .then((res) => {
          setProfile(res.data);
          console.log(res.data)
          // createUser(res.data)
          localStorage.setItem("google-user" , JSON.stringify(res.data))
        })

        .catch((err) => console.log(err));
    }
  }, [user]);

  const logoutWithGoogle = () => {
    googleLogout();
    setProfile(null);
  };

  const styles = {
    backgroundColor: switchLight ? "#fe4370" : "#16161d",
    color: switchLight ? "#000" : "#fff"
  };

 function RenderLogin (){
    return (
      <div className="login">
      <div className="login-left" style={styles}>
        <small>Everything Big Started With A Note</small>
        <img src={logo} alt="" />
        <input type="email" placeholder="Email.." />
        <input type="password" placeholder="Password.." />
        <button>Login</button>
        <span>Or</span>
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        <button onClick={() => googleLogin()}>
          <FontAwesomeIcon icon={faGoogle} /> Login With Google
        </button>
      </div>
      <div className="seperator"></div>
      <div className="login-right">
        <img src={loginBanner} alt="" />
      </div>
    </div>
    )
  }

  function RenderCompleteLogin({profile}){
    // console.log(profile)
    return (
      <div className="final-login-step">
          <div className="final-step-login-logo">
              <div className="info">
              <h1 style={{color:"#fff"}}>{profile.name}</h1>
              <small>Just this tiny step and you good to go</small>
              </div>
              <div className="form">
                  <input name="password" value={password} onChange={({target}) => setPassword(target.value)} type="password" placeholder="Type a password" />
                  <input name="confirmPassword" value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value)} type="password" placeholder="Confirm your password" />
                  <button onClick={createUser}>Signup</button>
              </div>
          </div>
          <div>
                <img src={finalStepLoginImg} alt="final-step-icon" />
          </div>
      </div>
    )
  }

  

  if(profile.length > 0 || googleUser){
      return <RenderCompleteLogin profile={googleUser} />
  }
    return <RenderLogin />
 

  // return;
  // return (
  //   <div className="login">
  //   <div className="login-left" style={styles}>
  //     <small>Everything Big Started With A Note</small>
  //     <img src={logo} alt="" />
  //     <input type="email" placeholder="Email.." />
  //     <input type="password" placeholder="Password.." />
  //     <button>Login</button>
  //     <span>Or</span>
  //     {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
  //     <button onClick={() => googleLogin()}>
  //       <FontAwesomeIcon icon={faGoogle} /> Login With Google
  //     </button>
  //   </div>
  //   <div className="seperator"></div>
  //   <div className="login-right">
  //     <img src={loginBanner} alt="" />
  //   </div>
  //   </div>
  // )


};

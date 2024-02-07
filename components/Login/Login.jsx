import React, { useState, useEffect } from "react";
import firebase from "firebase";
import backdrop from "../../assets/backdrop.png";
import "./Login.css";
import Spinner from "../../elements/Spinner/Spinner";
import validate from "../../helpers/inputValidator";
import db from "../../firebase";
import { actionTypes } from "../../contexts/StateReducers";
import { useStateValue } from "../../contexts/StateContextProvider";
import { ethers } from "ethers";
const { ethereum } = window;
const getERC1155ContractEthereumTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract("", "", signer);
  return tokenContract;
};

const Login = () => {
  const [auth, setAuth] = useState(false); // a state to change auth mode
  const initialSignup = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const initialLogin = {
    email: "",
    password: "",
  };
  const [{ user }, dispatch] = useStateValue();
  const [signupState, setSignupState] = useState(initialSignup);
  const [loginState, setLoginState] = useState(initialLogin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  const [isSigning, setIsSigning] = useState(false);

  const connectToMetamask = async () => {
    // getBalanceTestnet();

    let provider = null;
    if (window.ethereum !== "undefined") {
      let provider = ethereum;
      // edge case if MM and CBW are both installed
      //   if (window.ethereum.providers?.length) {
      //     window.ethereum.providers.forEach(async (p) => {
      //       if (p.isMetaMask) provider = p;
      //     });
      //   }
      console.log(provider);
      try {
        const chainid = await provider.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        setChain(chainid);
        if (chainid === "0x13881") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts[0]);
          setCurrentAccount(accounts[0]);

          // setUser(res.data.user);

          // localStorage.setItem("tokenDsl", res.data.token);
        } else {
          console.log("Please Switch to BSC Chain");
        }
      } catch (error) {
        console.log("Error");
      }
    } else {
      console.log("Error");
    }
    console.log("MetaMask provider", provider);
    return provider;
  };

  const cleanupState = () => {
    setIsSigning(false);
    setSignupState(initialSignup);
    setLoginState(initialLogin);
    setError("");
    setLoading(false);
  };

  const toggleAuth = () => {
    setAuth((auth) => !auth);
    cleanupState();
    // console.log(!auth?'changed to signupPage':'changed to loginPage')
  };

  const auths = (user) => {
    try {
      user.password = undefined;
      localStorage.setItem("twittie_user", JSON.stringify(user));

      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(localStorage.getItem("twittie_user")),
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  const connectToTwitter = async () => {
    try {
      await connectToMetamask();

      db.collection("anonymous")
        .where("walletAddress", "==", currentAccount)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (!snapshot.docs.length) {
            db.collection("anonymous")
              .add({
                walletAddress: "",
              })
              .then((res) => {
                console.log(res);
              });
            return;
          } else {
            return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
          }
        });
    } catch (error) {
      throw new Error("User Rejected");
    }
  };

  const onSubmitLogin = (e) => {
    const { email, password } = loginState;
    e.preventDefault();
    setLoading(true);
    db.collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (!snapshot.docs.length) {
          setError("Invalid credential");
          return;
        } else {
          return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        }
      })
      .then((res) => {
        if (res) {
          auths(res);
        } else {
          setError("An error occured, please try again");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occured, please try again");
        return;
      });
  };

  const preSignup = (e) => {
    e.preventDefault();
    setIsSigning(true);
    setError(validate(signupState));
  };

  // console.log(`currently in ${auth?'signupPage':'loginPage'} and ${isSigning?'isSigning':'not isSigning'}`)

  if (user) {
  }

  useEffect(() => {
    const { name, username, email, password } = signupState;

    // console.log(isSigning, error.length)
    if (isSigning && !error.length) {
      setLoading(true);
      try {
        db.collection("users")
          .add({
            bio: "",
            displayName: name,
            email,
            followers: [],
            following: [],
            joined: firebase.firestore.FieldValue.serverTimestamp(),
            password,
            photoURL: "",
            rooms: [],
            username,
            verified: true,
            wallpaper: "",
          })
          .then((res) => {
            console.log(res);
            toggleAuth();
          });
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }, [isSigning, error]);

  return (
    <section className="login__section">
      <div className={`login__container ${auth ? "active" : ""}`}>
        <div className="user signinBc">
          <div className="imgBc">
            <img src={backdrop} alt="backdrop" />
          </div>
          <div className="formBc">
            <div>
              <form autoComplete="off" onSubmit={onSubmitLogin}>
                <h2>Log In</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginState.email}
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginState.password}
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                  required
                />
                <button type="submit" className="button">
                  {loading ? <Spinner /> : "Log in"}
                </button>
                {error.length > 0 && <div className="error">{error}</div>}
                <p className="signup">
                  Don't have an account?{" "}
                  <span onClick={toggleAuth}>Sign up</span>
                </p>
              </form>
            </div>
            <button className="button" onClick={() => connectToTwitter()}>
              Connect
            </button>
          </div>
        </div>
        <div className="user signupBc">
          <div className="formBc">
            <form autoComplete="off" onSubmit={preSignup}>
              <h2>Create an Account</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signupState.name}
                onChange={(e) =>
                  setSignupState({ ...signupState, name: e.target.value })
                }
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupState.username}
                onChange={(e) =>
                  setSignupState({ ...signupState, username: e.target.value })
                }
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={signupState.email}
                onChange={(e) =>
                  setSignupState({ ...signupState, email: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={signupState.password}
                onChange={(e) =>
                  setSignupState({ ...signupState, password: e.target.value })
                }
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupState.confirmPassword}
                onChange={(e) =>
                  setSignupState({
                    ...signupState,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {error.length > 0 && <div className="error">{error}</div>}
              <button type="submit" className="button">
                {loading ? <Spinner /> : "Sign up"}
              </button>
              <p className="signup">
                have an account? <span onClick={toggleAuth}>Log in</span>
              </p>
            </form>
          </div>
          <div className="imgBc">
            <img src={backdrop} alt="backdrop" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

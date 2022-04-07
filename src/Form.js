import React, { useRef } from 'react'
import { auth, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Form() {

    const x = useRef(null);
    const y = useRef(null);
    const z = useRef(null);

    const signUp = () => {
        x.current.style.left = "-400px";
        y.current.style.left = "60px";
        z.current.style.left = "125px";
    }

    const logIn = () => {
        x.current.style.left = "60px";
        y.current.style.left = "400px";
        z.current.style.left = "0";
    }

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
        // Listening for auth state changes.
        auth.onAuthStateChanged(function (user) {
            if (user) {
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                // window.location.href=hostname+"main.php";
            } else {
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            }
            document.getElementById('quickstart-sign-in').disabled = false;
        });

        document.getElementById('quickstart-sign-in').addEventListener('click', handleWithGoogle, false);
    }

    window.onload = function () {
        initApp();
    };

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    if (!auth.currentUser) {
        alert('login');
    } else {
        auth.signOut();
        alert('logout')
    }

    return (
        <div className="contener">
            <div className="main">
                <div className="button_box">
                    <div id="btn" ref={z}></div>
                    <button type="button" className="toggle_btn" onClick={logIn}>Log In</button>
                    <button type="button" className="toggle_btn" onClick={signUp}>Sign Up</button>
                </div>
                {/* <!-- <p className="heading">Log In --> */}
                <div className="google_box">
                    <button type="button" className="btn btn-light btn_style"
                        disabled id="quickstart-sign-in"
                        onClick={handleWithGoogle}>Log In With GOOGLE</button>
                </div>
                <div id="log_in" ref={x}>
                    <form action="signUpOk()" method="POST">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <button type="button" className="btn btn-light btn_style">Log In</button>
                    </form>
                </div>
                <div id="sign_up" ref={y}>
                    <form action="signUpOk()" method="POST">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                            <label className="form-check-label" for="exampleCheck2">I agree to Term & Condition</label>
                        </div>
                        <button type="button" className="btn btn-light btn_style">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>)
}

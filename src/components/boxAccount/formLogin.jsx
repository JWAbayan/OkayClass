import React, { useContext, useState } from "react";
import { ButtonSubmit, ContainerBox, ContainerForm, Input, LinkBold, LinkMuted, ErrorModal, ContainerHolder } from "./common";
import { Marginer } from "../marginer";

import { ContextAccount } from "./contextAccount";
import LockModal from "./errorMessages/lockModal";
import InvalidModal from "./errorMessages/invalidModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AES, enc } from 'crypto-js';



export function FormLogin(props) {
    const { SwitchToSignup, SwitchToChangePassword } = useContext(ContextAccount);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLocked, setShowLocked] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);
    const [showToExpire, setShowToExpire] = useState(false);
    const [retrievedUser, setRetrievedUser] = useState(null);
    const hasCurrentUSer = Boolean(retrievedUser);

    let navigate = useNavigate();


    const encryptData = (data) => {
        let encryptedUsername = AES.encrypt(data.username, process.env.REACT_APP_SECRET_KEY).toString();
        let encryptedPassword = AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();
        console.log(encryptedUsername);
        console.log(encryptedPassword);
        decryptData({ username: encryptedUsername, password: encryptedPassword })
    }

    const decryptData = (data) => {
        let decryptedUsername = AES.decrypt(data.username, process.env.REACT_APP_SECRET_KEY).toString(enc.Utf8);
        let decryptedPassword = AES.decrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString(enc.Utf8);
        console.log(decryptedUsername);
        console.log(decryptedPassword);
    }


    const handleSubmit = (evt) => {
        if (attempts === 3) {
            lockSubmit();
        }

        else {
            //Store user info
            let user = { username: username, password: password };
            //Post Request
            axios.post("https://okay-class-server.herokuapp.com/auth/login/", user).then(response => { handleReceivedData(response.data) });
            //handleReceivedData({ authorized: true, expired: true, user_info: { id_user: 60, username: "Testuser", firstname: "Greg", lastname: "Smith" } });

        }
        evt.preventDefault();
    }


    const handleReceivedData = (res) => {
        setRetrievedUser(res.user_info);

        if (res.authorized) {
            if (res.expired) {
                //Redirect to Change Password. with user props
                redirectTo('changepass', { authenticated: true, user_info: res.user_info, text: "Password Expired", reason: "EXPIRED_PASS" })
                // setPassExpired(true);

            }
            else if (res.toExpire) {
                redirectTo('dashboard', { authenticated: true, user: res.user_info, toExpire: true })
            }
            else {
                redirectTo('dashboard', { authenticated: true, user: res.user_info, toExpire: false })
            }

        }
        else {
            setAttempts(attempts + 1)
            setShowInvalid(true);
        }
    }

    //Redirect to a page with state
    const redirectTo = (path, state) => {
        navigate(path, { state: state });
    }


    const lockSubmit = () => {
        //Lock the submit button for 5 seconds
        let waitTime = 10000;

        console.log("Out of attempts!");

        if (!isLocked) {
            setIsLocked(true);
            setTimeout(() => {
                setIsLocked(false)
                setShowLocked(false);
                setAttempts(0);
            }, waitTime)
        }
        setShowLocked(true);
    }

    const handleClick = (e) => {
        SwitchToChangePassword();
        e.preventDefault()
    }

    return (

        <ContainerBox style={{ margin: "30%" }}>
            {showLocked ? <LockModal setShowLocked={setShowLocked} /> : null}
            {showInvalid ? <InvalidModal setShowInvalid={setShowInvalid} message={"Invalid username or password. Please try again."} /> : null}

            <ContainerForm onSubmit={handleSubmit}>
                <ContainerHolder>
                    <Input type="username" onChange={evt => setUsername(evt.target.value)} placeholder="Username" required />

                    <Input type="password" onChange={evt => setPassword(evt.target.value)} placeholder="Password" required />

                </ContainerHolder>

                <Marginer direction="vertical" margin="1em" />

                <Marginer direction="vertical" margin={10} />

                <LinkMuted href="#" onClick={handleClick}>Forgot your password?</LinkMuted>

                <Marginer direction="vertical" margin="1.5em" />

                <ButtonSubmit type="submit" >Log In</ButtonSubmit>

            </ContainerForm>

            <Marginer direction="vertical" margin="1em" />

            <LinkMuted href="#">
                Don't have an account?

                <LinkBold href="#" onClick={SwitchToSignup}>Sign Up</LinkBold>
            </LinkMuted>

            <Marginer direction="vertical" margin="1em" />
        </ContainerBox>
    );
}
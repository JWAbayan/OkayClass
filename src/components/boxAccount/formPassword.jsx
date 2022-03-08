import React, { useContext, useState, useRef, useEffect } from "react";
import { ButtonSubmit, ContainerBox, ContainerForm, ContainerHolder, Input, LinkBold, LinkMuted } from "./common";
import { Marginer } from "../marginer";

import { ContextAccount } from "./contextAccount";
import InvalidPassModal from "./errorMessages/invalidPassModal";
import SuccessModal from "./successModal";
import InvalidUserModal from "./errorMessages/invalidUserModal";
import NotHumanModal from "./errorMessages/notHumanModal";
import axios from "axios";
import { PasswordPolicy } from "./passwordPolicy";

export function FormPassword(props) {

    const policiesDefault = {
        'length': false,
        'lowercase': false,
        'uppercase': false,
        'number': false,
        'special': false,
        'username': false,
        'fname': false,
        'lname': false,
    }
    const { SwitchToSignup } = useContext(ContextAccount);
    const { SwitchToLogin } = useContext(ContextAccount);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [username, setUsername] = useState('');
    const [showInvalidPass, setShowInvalidPass] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showInvalidUser, setShowInvalidUser] = useState(false);
    const [showNotHuman, setShowNotHuman] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [policyValidation, setPolicyValidation] = useState(policiesDefault)

    const reRef = useRef();

    const checkIfUserExist = () => {

        let user = { username: username };
        axios.post("https://okay-class-server.herokuapp.com/auth/getname/", user).then((res) => {
            if (res.data.success) {
                validateFields(res.data.user_info);
            }
            else {
                setShowInvalidUser(true);
            }
        })

        //Checks if password contains atleast 1 uppercase, lowercase, number, and special character
    }


    const validateFields = (user_info) => {
        setFirstName(user_info.firstName)
        setLastName(user_info.lastName)

        let passwordPattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );

        let passwordContains = passwordPattern.test(password)
        let lowerCasePass = password.toLowerCase()

        //Check validity of password
        if (
            lowerCasePass.length < 10 ||
            lowerCasePass.includes(username.toLowerCase()) ||
            lowerCasePass.includes(user_info.firstName.toLowerCase()) ||
            lowerCasePass.includes(user_info.lastName.toLowerCase()) ||
            lowerCasePass !== rePassword.toLowerCase() ||
            !passwordContains
        ) {
            setShowInvalidPass(true);
            return false
        }
        else {
            let updateInfo = { username: username, password: password }

            axios.post("https://okay-class-server.herokuapp.com/auth/forgotpass/", updateInfo)
                .then(res => {

                    if (res.data.success) {
                        setShowSuccess(true);
                        //redirect to login page after 5 seconds
                        setTimeout(() => {
                            SwitchToLogin();
                        }, 3000);

                    }
                    else {
                        setShowInvalidPass(true);
                    }

                });
        }

    }

    const handleSubmit = (e) => {
        checkIfUserExist();
        e.preventDefault();
    }

    const handleSetPassword = (pass) => {
        const policy = policyValidation
        let lowercasePass = pass.toLowerCase();

        //10 Characters Long
        if (lowercasePass.length > 10) {
            policy.length = true;
        }
        else {
            policy.length = false;
        }

        //Contains lowercase
        if (/[a-z]/.test(pass)) {
            policy.lowercase = true
        }
        else {
            policy.lowercase = false
        }

        //Contains uppercase
        if (/[A-Z]/.test(pass)) {
            policy.uppercase = true
        }
        else {
            policy.uppercase = false
        }

        //Contains number
        if (/\d/.test(pass)) {
            policy.number = true
        }
        else {
            policy.number = false
        }

        //Contains special character
        if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass)) {
            policy.special = true
        }
        else {
            policy.special = false
        }

        //does not contain username
        if (!lowercasePass.includes(username.toLowerCase())) {
            policy.username = true;
        }
        else {
            policy.username = false;
        }

        //does not contain firstname
        if (!lowercasePass.includes(firstName.toLowerCase())) {
            policy.fname = true;
        }
        else {
            policy.fname = false;
        }

        //does not contain lastName
        if (!lowercasePass.includes(lastName.toLowerCase())) {
            policy.lname = true;
        }
        else {
            policy.lname = false;
        }

        setPassword(pass);
        setPolicyValidation(policy);
    }



    return (
        <ContainerBox>
            {showInvalidPass ? <InvalidPassModal setShowInvalidPass={setShowInvalidPass} /> : null}
            {showSuccess ? <SuccessModal setShowSuccess={setShowSuccess} /> : null}
            {showInvalidUser ? <InvalidUserModal setShowInvalidUser={setShowInvalidUser} /> : null}
            {showNotHuman ? <NotHumanModal setShowNotHuman={setShowNotHuman} /> : null}
            <ContainerForm onSubmit={handleSubmit}>
                <ContainerHolder>
                    <Input type="text" onChange={evt => { setUsername(evt.target.value) }} placeholder="Username" required />

                    <Input type="password" onChange={evt => { handleSetPassword(evt.target.value) }} placeholder="New Password" required />

                    <Input type="password" onChange={evt => { setRePassword(evt.target.value) }} placeholder="Confirm Password" required />
                </ContainerHolder>

                <Marginer direction="vertical" margin="1.5em" />

                <PasswordPolicy policies={policyValidation} />

                <Marginer direction="vertical" margin="1.5em" />

                <ButtonSubmit type="submit">Confirm</ButtonSubmit>

            </ContainerForm>

            <Marginer direction="vertical" margin=".5em" />

            <Marginer direction="vertical" margin="1em" />

            <LinkMuted href="#">
                Don't have an account?

                <LinkBold href="#" onClick={SwitchToSignup}>Sign Up</LinkBold>
            </LinkMuted>

            <LinkMuted href="#">
                Remember your password?

                <LinkBold href="#" onClick={SwitchToLogin}>Log In</LinkBold>
            </LinkMuted>

            <Marginer direction="vertical" margin="1em" />
        </ContainerBox>
    );
}
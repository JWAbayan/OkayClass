import React, { useContext, useEffect, useRef, useState } from "react";
import { ButtonSubmit, ContainerBox, ContainerForm, ContainerHolder, Input, LinkBold, LinkMuted } from "./common";
import { Marginer } from "../marginer";
import axios from 'axios'

import { ContextAccount } from "./contextAccount";
import SuccessModal from "./successModal";
import DuplicateModal from "./errorMessages/duplicateModal";
import InvalidPassModal from "./errorMessages/invalidPassModal";
import NotHumanModal from "./errorMessages/notHumanModal";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import { PasswordPolicy } from "./passwordPolicy";



export function FormSignup(props) {


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

    const { SwitchToLogin } = useContext(ContextAccount);
    const [username, setUsername] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDuplicate, setShowDuplicate] = useState(false);
    const [showInvalidPass, setShowInvalidPass] = useState(false);
    const [showNotHuman, setShowNotHuman] = useState(false);
    const [policyValidation, setPolicyValidation] = useState(policiesDefault)


    const navigate = useNavigate();
    const reRef = useRef();



    const handleSubmit = async (e) => {
        e.preventDefault();
        let fieldsValidated = validateFields();

        if (fieldsValidated) {
            const token = await reRef.current.executeAsync();
            window.grecaptcha.reset();

            let newAccount = { usn: username, fname: firstName, lname: lastName, email: email, password: password, token: token }

            axios.post("https://okay-class-server.herokuapp.com/auth/register/", newAccount)
                .then(res => {
                    //If user is verified as human
                    if (res.data.human) {
                        if (res.data.duplicate) {
                            setShowDuplicate(true);
                        }
                        else if (res.data.success) {
                            setShowSuccess(true);
                            setTimeout(() => {
                                SwitchToLogin();
                            }, 3000)
                        }
                    } else {
                        setShowNotHuman(true);
                    }
                });

        }
    }

    const validateFields = () => {
        let passwordPattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        //Checks if password contains atleast 1 uppercase, lowercase, number, and special character
        let passwordContains = passwordPattern.test(password)
        let lowercasePass = password.toLowerCase();

        //Check validity of password
        if (
            password.length < 10 ||
            lowercasePass.includes(username.toLowerCase()) ||
            lowercasePass.includes(firstName.toLowerCase()) ||
            lowercasePass.includes(lastName.toLowerCase()) ||
            !passwordContains
        ) {
            setShowInvalidPass(true);
            return false
        }

        return true;
    }

    const handleSetPassword = (pass) => {
        const policy = policyValidation;
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
            {showDuplicate ? <DuplicateModal setShowDuplicate={setShowDuplicate} /> : null}
            {showSuccess ? <SuccessModal setShowSuccess={setShowSuccess} /> : null}
            {showInvalidPass ? <InvalidPassModal setShowInvalidPass={setShowInvalidPass} /> : null}
            {showNotHuman ? <NotHumanModal setShowNotHuman={setShowNotHuman} /> : null}
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                size="invisible"
                ref={reRef}
            />
            <ContainerForm onSubmit={handleSubmit}>
                <ContainerHolder>
                    <Input type="text" onChange={evt => setUsername(evt.target.value)} placeholder="Username" required />

                    <Input type="text" onChange={evt => setFirstname(evt.target.value)} placeholder="First Name" required />

                    <Input type="text" onChange={evt => setLastname(evt.target.value)} placeholder="Last Name" required />

                    <Input type="email" onChange={evt => setEmail(evt.target.value)} placeholder="Email" required />

                    <Input type="password" onChange={evt => handleSetPassword(evt.target.value)} placeholder="Password" required />
                </ContainerHolder>

                <Marginer direction="vertical" margin=".5em" />

                <PasswordPolicy policies={policyValidation} />

                <Marginer direction="vertical" margin="1.5em" />

                <ButtonSubmit type="submit">Sign Up</ButtonSubmit>

            </ContainerForm>

            <Marginer direction="vertical" margin="1em" />

            <LinkMuted href="#">
                Already have an account?

                <LinkBold href="#" onClick={SwitchToLogin}>Log In</LinkBold>
            </LinkMuted>

            <Marginer direction="vertical" margin="1em" />
        </ContainerBox>
    );
}
import react, { useContext, useRef } from "react";
import { ButtonSubmit, ContainerChangePass, ContainerBox, ContainerForm, Input, LinkBold, LinkMuted, ContainerHolder } from "./common";
import { Marginer } from "../marginer";
import styled from "styled-components";
import { useState, useEffect } from "react";
import InvalidPassModal from "./errorMessages/invalidPassModal";
import NotHumanModal from "./errorMessages/notHumanModal";
import { motion } from "framer-motion"
import { ContextAccount } from "./contextAccount";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "./successModal";
import { ReCAPTCHA } from "react-google-recaptcha";
import { PasswordPolicy } from "./passwordPolicy";


const ContainerApp = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContainerPasswordForm = styled.div`
    width: 320px;
    min-height: 70%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #FFF;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.25);
    position: relative;
    overflow: hidden;
`;

const ContainerHeader = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 8%;
`;

const ContainerInner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
`;

const ContainerTop = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 1em;
`;


const BackDrop = styled(motion.div)`
    width: 100%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    top: -325px;
    background: rgb(69,170,242);
    background: linear-gradient(
        0deg, 
        rgba(69,170,242,1) 0%, 
        rgba(136,194,236,1) 20%, 
        rgba(45,152,218,1) 100%
    );
`;

const VariantsBackdrop = {
    expanded: {
        width: "100%",
        height: "1050px",
        borderRadius: "15px",
        transform: "scale (10)",
    },
    collapsed: {
        width: "100%",
        height: "550px",
        borderRadius: "15px",
        transform: "scale (1)",
    }
};

const ExpandingTransition = {
    type: "spring",
    duration: 2.5,
    stiffness: 25,
};


const TextHeader = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.25;
    color: #FFF;
    z-index: 10;
    margin: 0;
`;

const TextSmall = styled.h5`
    color: #FFF;
    font-weight: 500;
    fonst-size: 12px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`;

const ChangePassPage = (props) => {

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

    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showInvalidPass, setShowInvalidPass] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)
    const [locationState, setLocationState] = useState(null);
    const [showNotHuman, setShowNotHuman] = useState(false);
    const [policyValidation, setPolicyValidation] = useState(policiesDefault)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLocationState(location.state);
    }, [])

    const validateFields = () => {
        var user_info = locationState.user_info;

        let passwordPattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        //Checks if password contains atleast 1 uppercase, lowercase, number, and special character
        let passwordContains = passwordPattern.test(password)
        let lowercasePass = password.toLowerCase();
        //Check validity of password
        if (
            lowercasePass.length < 10 ||
            lowercasePass.includes(user_info.username.toLowerCase()) ||
            lowercasePass.includes(user_info.first_name.toLowerCase()) ||
            lowercasePass.includes(user_info.last_name.toLowerCase()) ||
            lowercasePass !== rePassword.toLowerCase() ||
            !passwordContains
        ) {
            setShowInvalidPass(true);
            return false
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fieldsValidated = validateFields();

        if (fieldsValidated) {
            let updateInfo = { id_user: locationState.user_info.id_user, password: password }
            axios.post("https://okay-class-server.herokuapp.com/auth/changepass/", updateInfo)
                .then(res => {
                    if (res.data.success) {
                        setShowSuccess(true);
                        //redirect to login page after 2 seconds
                        setTimeout(() => {
                            switch (locationState.reason) {
                                case "EXPIRED_PASS":
                                    redirectTo('/');
                                    break;
                                case "CHANGE_PASS":
                                    redirectTo('/')
                            }
                        }, 2000);

                    }
                    else {
                        setShowInvalidPass(true);
                    }


                });
        } else {
            setShowInvalidPass(true);
        }

    }
    const handleSetPassword = (pass) => {
        const policy = policyValidation
        let lowercasePass = pass.toLowerCase();
        let user_info = locationState.user_info;
        let username = user_info.username
        let firstName = user_info.first_name
        let lastName = user_info.last_name


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



    const redirectTo = (path) => {
        navigate(path);
    }

    return (
        <ContainerApp>
            <ContainerPasswordForm>
                <ContainerTop>
                    <BackDrop />
                    <ContainerHeader>
                        <TextHeader>{Boolean(locationState) ? locationState.text : "Error"}</TextHeader>

                        <TextSmall>Change your password to continue.</TextSmall>

                    </ContainerHeader>
                </ContainerTop>

                <ContainerInner>
                    <ContainerBox>
                        {showInvalidPass ? <InvalidPassModal setShowInvalidPass={setShowInvalidPass} /> : null}
                        {showSuccess ? <SuccessModal setShowSuccess={setShowSuccess} /> : null}
                        {showNotHuman ? <NotHumanModal setShowNotHuman={setShowNotHuman} /> : null}
                        <ContainerForm onSubmit={handleSubmit}>
                            <ContainerHolder>
                                <Input type="password" onChange={evt => { handleSetPassword(evt.target.value) }} placeholder="New Passowrd" required />

                                <Input type="password" onChange={evt => { setRePassword(evt.target.value) }} placeholder="Confirm Password" required />
                            </ContainerHolder>

                            <Marginer direction="vertical" margin="1.5em" />

                            <PasswordPolicy policies={policyValidation} />

                            <Marginer direction="vertical" margin="1.5em" />

                            <ButtonSubmit type="submit">Confirm</ButtonSubmit>
                        </ContainerForm>
                    </ContainerBox>
                </ContainerInner>
            </ContainerPasswordForm>
        </ContainerApp>

    );
}



export default ChangePassPage;
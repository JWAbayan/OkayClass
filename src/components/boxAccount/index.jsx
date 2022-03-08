import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FormLogin } from "./formLogin"
import { FormSignup } from "./formSignup";
import { FormPassword } from "./formPassword";
import { ContextAccount } from "./contextAccount";


const ContainerApp = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ContainerLeft = styled.div`
    height:100%;
    flex:4;
`;


const ContainerRight = styled.div`
    height : 100%;
    flex : 2;
    display: flex;
    padding : 1em;
    justify-content: center;
    align-items:center;
`

const ContainerForm = styled.div`
    width: 320px;
    min-height: 80%;
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
    justify-content : center;
    align-items : center;
    padding: 1.5em;
`;

const ContainerTop = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 0.5em;
`;


const BackDrop = styled(motion.div)`
    width: 100%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    top: -400px;
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
        height: "1175px",
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
    font-size: 28px;
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

export function BoxAccount(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('login');
    const [currentUser, setCurrentUser] = useState(null);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, ExpandingTransition.duration * 1000 - 1500);
    };

    const SwitchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 900)
    };

    const SwitchToLogin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 900)
    };

    const SwitchToChangePassword = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("changepassword");
        }, 900)
    };

    const ValueContext = { SwitchToSignup, SwitchToLogin, SwitchToChangePassword };

    return (
        <ContainerApp>
            {/* <ContainerLeft /> */}
            <ContainerRight>
                <ContextAccount.Provider value={ValueContext}>
                    <ContainerForm>
                        <ContainerTop>
                            <BackDrop
                                initial={false}
                                animate={isExpanded ? "expanded" : "collapsed"}
                                variants={VariantsBackdrop}
                                transition={ExpandingTransition}
                            />

                            {active === "login" && <ContainerHeader>
                                <TextHeader>Welcome</TextHeader>

                                <TextSmall>Log in to continue.</TextSmall>

                            </ContainerHeader>}

                            {active === "signup" && <ContainerHeader>
                                <TextHeader>Create an account</TextHeader>

                                <TextSmall>Sign up to continue.</TextSmall>

                            </ContainerHeader>}

                            {active === "changepassword" && <ContainerHeader>
                                <TextHeader>Change your password</TextHeader>

                                <TextSmall>Change your password to continue.</TextSmall>

                            </ContainerHeader>}
                        </ContainerTop>

                        <ContainerInner>
                            {active === "login" && <FormLogin />}
                            {active === "signup" && <FormSignup />}
                            {active === "changepassword" && <FormPassword />}
                        </ContainerInner>
                    </ContainerForm>
                </ContextAccount.Provider>
            </ContainerRight>

        </ContainerApp>
    );
}
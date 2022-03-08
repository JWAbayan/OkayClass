import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FormView } from "./formView";
import { FormEdit } from "./formEdit";
import { ContextProfile } from "./contextProfile";
import axios from "axios";

const BackDrop = styled(motion.div)`
    width: 100%;
    height: 200px;
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

const ContainerPageAccount = styled.div`
    margin : 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
`;

const ContainerAccountProfile = styled.div`
    width: 500px;
    min-height: 700px;
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
    margin: 10%;
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
    padding-bottom: 1em;
`;

const TextHeader = styled.h2`
    font-size: 28px;
    font-weight: 600;
    line-height: 1.25;
    color: #FFF;
    z-index: 10;
    margin: 0;
`;

const VariantsBackdrop = {
    expanded: {
        width: "100%",
        height: "1250px",
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

export function PageAccount(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('view');
    const [user, setUser] = useState(null);
    const [formChanged, setFormChanged] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const response = await axios.get('https://okay-class-server.herokuapp.com/account/details/', { params: { uid: props.user.id_user } });
        console.log(response.data.user_info)
        setUser(response.data.user_info);
    }


    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, ExpandingTransition.duration * 1000 - 1500);
    };

    const ToEdit = () => {
        getUserDetails();
        playExpandingAnimation();
        setTimeout(() => {
            setActive("edit");
        }, 500)
    };

    const ToView = () => {
        getUserDetails();
        playExpandingAnimation();
        setTimeout(() => {
            setActive("view");
        }, 500)
    };

    const ValueContext = { ToEdit, ToView };

    return (
        <ContainerPageAccount>
            <ContextProfile.Provider value={ValueContext}>
                <ContainerAccountProfile>
                    <ContainerTop>
                        <BackDrop
                            initial={false}
                            animate={isExpanded ? "expanded" : "collapsed"}
                            variants={VariantsBackdrop}
                            transition={ExpandingTransition}
                        />

                        {active === "view" && <ContainerHeader>
                            <TextHeader>
                                USER ACCOUNT
                            </TextHeader>
                        </ContainerHeader>}

                        {active === "edit" && <ContainerHeader>
                            <TextHeader>
                                EDIT ACCOUNT
                            </TextHeader>
                        </ContainerHeader>}

                    </ContainerTop>

                    <ContainerInner>
                        {
                            active === "view" && <FormView user={Boolean(user) ? user : null} />
                        }
                        {
                            active === "edit" && <FormEdit user={Boolean(user) ? user : null} />
                        }
                    </ContainerInner>
                </ContainerAccountProfile>
            </ContextProfile.Provider>
        </ContainerPageAccount>
    );
}
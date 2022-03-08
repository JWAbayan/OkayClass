import React from "react";
import styled from 'styled-components';
import { BarNavigation } from "../barNavigation";
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { PageWelcome } from "../pageWelcome";
import { WarningSnackbar } from "./warningSnackbar";

const ContainerDashboard = styled.div`
    width:100%
`;

const ContainerTemp = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgb(69,170,242);
    background: linear-gradient(
        0deg, 
        rgba(69,170,242,1) 0%, 
        rgba(136,194,236,1) 20%, 
        rgba(45,152,218,1) 100%
    );
`;

const CurrentPage = styled.div`
     padding: 50px;
     

`;


export function PageDashboard(props) {
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
    const [currentPage, setCurrentPage] = useState(PageWelcome)
    const [visibleWarning, setVisibleWarning] = useState(location.state.toExpire)
    const [user, setUser] = useState(null);

    //Check if the user is authorized to access the dashboard
    let redirected = Boolean(location.state)

    //check if the render is called by redirect and if it is the first render to prevent infinite loop
    if (firstRender && redirected) {
        setAuthenticated(true)
        setFirstRender(false);
        setUser(location.state.user)
    }

    const changeCurrentPage = (pageComponent) => {
        setCurrentPage(pageComponent);
    }

    const closeWarningSnack = () => {
        setVisibleWarning(false);
    }

    if (authenticated) {
        return (
            <>
                {visibleWarning && <WarningSnackbar visible={visibleWarning} closeWarningSnack={closeWarningSnack} />}
                <ContainerDashboard>
                    <BarNavigation changeCurrentPage={changeCurrentPage} user={user} />
                    <CurrentPage>
                        {currentPage}
                    </CurrentPage>
                </ContainerDashboard>
            </>
        );
    }
    else {
        return (<Navigate to="/" />)
    };
}
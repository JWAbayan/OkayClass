import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ContainerAccessability = styled.div`
    display: flex;
    margin-left: 10px;
`;

const ButtonLogout = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #222;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #2D98DA;
    transition: all 240ms ease-in-out;
    cursor: pointer;
    
    &:hover {
        color: #fff;
        background-color: #2D98DA;
    }
    
    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;




export function Accessability(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        redirectTo('/')
    }

    const redirectTo = (path) => {
        navigate(path, { state: { authorized: false } });
    }

    return (
        <ContainerAccessability>
            <ButtonLogout onClick={handleLogout}>
                Log Out
            </ButtonLogout>
        </ContainerAccessability>
    );
}
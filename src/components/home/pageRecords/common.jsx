import styled from "styled-components";

export const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const ContainerSection = styled.div`
    width : 100%;
    margin : 0.5em;
    height : 100px;
    display : flex;
    flex-direction : row;
    align-items : center;
    border-radius : 15px;
    background: white;
    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
    cursor:pointer;
`;

export const ButtonSectionDelete = styled.button`
    border: 0;
    width : 100px;
    outline: 0;
    padding: 5px 1em;
    color: #222;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #CC3300;
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #CC3300;
    }

    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;

export const ButtonSectionView = styled.button`
    border: 0;
    width : 100px;
    outline: 0;
    padding: 5px 1em;
    color: #222;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #0099FF;
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #0099FF;
    }

    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;

export const ButtonSectionEdit = styled.button`
    border: 0;
    width : 100px;
    outline: 0;
    padding: px 1em;
    color: #222;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    background-color: transparent;
    border: 2px solid #0099FF;
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #0099FF;
    }

    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;

export const TextLabel = styled.h3`
    color: #53a8ed;
    font-weight: light;
    font-size: 16px;
    z-index: 50;
    margin: 0.5em;
`;
import styled from "styled-components";

export const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content : center;
    align-items: center;
    margin-top: 10px;
`;

export const ContainerView = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius : 5px;
`;

export const ContainerForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius : 5px;
`;

export const ContainerProfileItems = styled.div`
    width: 100%;
    display: flex;
    flex-direction : row;
    padding : 0 1em;
    align-items : center;
    justify-content : space-between;
`;

export const ContainerButtons = styled.div`
    display: flex;
    flex-direction: row
    align-items : center;
    justify-content : center;
`;

export const TextLabel = styled.h3`
    color: #000;
    font-weight: 250;
    fonst-size: 15px
    margin: 0;
`;

export const TextInput = styled.input`
    width: 50%;
    height: 30px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding: 0px 10px;
    border-bottom: 1.5px solid transparent;
    transition: all, 200ms ease-in-out;
    font-size: 12px;

    &::placeholder {
        color : rgba(200, 200, 200, 1);
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.5);
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid rgb(69,170,242);
    }
`;

export const TextContent = styled.h4`
    color: #000;
    font-weight: 150;
    fonst-size: 15px;
    margin: 0;
`;

export const ButtonEdit = styled.button`
    width: 20%;
    padding: 0.5em;
    color: #FFF;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(69,170,242);
    background: linear-gradient(
        0deg, 
        rgba(69,170,242,1) 0%, 
        rgba(136,194,236,1) 20%, 
        rgba(45,152,218,1) 100%
    );

    &:hover {
        filter: brightness (1.05);
    }
`;

export const ButtonSave = styled.button`
    width: 100%;
    padding: 10px 25%;
    color: #FFF;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(69,170,242);
    background: linear-gradient(
        0deg, 
        rgba(69,170,242,1) 0%, 
        rgba(136,194,236,1) 20%, 
        rgba(45,152,218,1) 100%
    );

    &:hover {
        filter: brightness (1.05);
    }
`;

export const ButtonCancel = styled.button`
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


export const LinkMuted = styled.a`
    font-size: 10px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
`;
import styled from "styled-components";

export const ContainerBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content : center;
    margin-top: 10px;
`;

export const ContainerHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.2)
`;

export const ContainerChangePass = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;


export const ContainerForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LinkMuted = styled.a`
    font-size: 10px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
`;

export const LinkBold = styled.a`
    font-size: 12px;
    color: rgb(69,170,242);
    font-weight: 500;
    text-decoration: none;
    margin 0 4px;
`;

export const Input = styled.input`
    width: 100%;
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

export const ButtonSubmit = styled.button`
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

export const ErrorMessage = styled.div`
    display: flex;
    font-size: 10px;
    height: 10%;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    background-color: rgba(255, 3, 43,0.30);
    border-radius: 20px 20px 20px 20px;
`

export const SuccessMessage = styled.div`
    display: flex;
    font-size: 10px;
    height: 10%;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    background-color: rgba(83, 251, 119,0.30);
    border-radius: 20px 20px 20px 20px;
`

export const ErrorModal = styled.div`
  display: flex; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 50;
  top: 50;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  margin: 20px 20px 0px 0px;
`;
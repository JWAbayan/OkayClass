import react from "react";
import styled from "styled-components";
import welcome_image from "../../../assets/bg.png"

const ContainerImage = styled.div`
margin: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 2em;
`;

const Image = styled.img`
    width:40%;
    height:30%;
`;

export function PageWelcome() {
    return (
        <ContainerImage>
            <Image src={welcome_image} />
        </ContainerImage>
    )
}
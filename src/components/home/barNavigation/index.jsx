import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";


import { Accessability } from "./accessability";
import { LinksNavigation } from "./linksNavigation";
import { DeviceSize } from "../dynamic";
import { MobileLinksNavigation } from "./mobileLinksNavigation";
import { useEffect } from "react";

const ContainerBarNavigation = styled.div`
    width: 100%;
    height: 60px;
    background-color: #a8f6ff;
    box-shadow: 0 1px 3px rgba(25, 25, 25, 0.15);
    display: flex;
    position: fixed;
    align-items: center;
    padding 0 1.5em;
`;

const SectionLeft = styled.div`
    display: flex;
`;

const SectionMiddle = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: end;
`;

const SectionRight = styled.div`
    display: flex;
`;

const AppName = styled.h2`
    color:blue;
`;


export function BarNavigation(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    useEffect(() => {
        console.log(props.user)
    }, [])

    return (
        <ContainerBarNavigation>
            <SectionLeft>
                <h3 onClick={() => { console.log("Clicked") }}>OkayClass</h3>
            </SectionLeft>

            <SectionMiddle>
                {!isMobile && <LinksNavigation changeCurrentPage={props.changeCurrentPage} user={props.user} />}
            </SectionMiddle>

            <SectionRight>
                {!isMobile && <Accessability />}
                {isMobile && <MobileLinksNavigation />}
            </SectionRight>
        </ContainerBarNavigation>
    )
}
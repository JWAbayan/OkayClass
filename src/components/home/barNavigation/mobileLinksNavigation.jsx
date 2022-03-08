import React, { useState } from "react";
import styled from "styled-components";

import { ToggleMenu } from "./toggleMenu";
import { Marginer } from "../../marginer";
import { Accessability } from "./accessability";

const ContainerLinksNav = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const WrapperLinks = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
    background-color: #FFF;
    width: 100%;
    flex-direction: column;
    position: fixed;
    top: 65px;
    left: 0;
`;

const ItemLink = styled.li`
    width: 100%;
    padding: 0 1em;
    color: #222;
    font-weight: 500;
    font-size: 15px;
    display: flex;
    border-top: 2px solid transparent;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        border-top: 2px solid #2D98DA;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

export function MobileLinksNavigation(props) {
    const [isOpen, setOpen] = useState(false);


    return (
        <ContainerLinksNav>
            <ToggleMenu isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (
                <WrapperLinks>
                    <ItemLink>
                        <Link href="#">
                            Schedule
                        </Link>
                    </ItemLink>

                    <ItemLink>
                        <Link href="#">
                            Records
                        </Link>
                    </ItemLink>

                    <ItemLink>
                        <Link href="#">
                            Account
                        </Link>
                    </ItemLink>

                    <Marginer direction="vertical" margin="1em" />

                    <Accessability />
                </WrapperLinks>
            )}

        </ContainerLinksNav>
    );
}
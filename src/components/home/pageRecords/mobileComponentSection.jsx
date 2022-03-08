import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ButtonSectionDelete, ButtonSectionEdit, ContainerSection, TextLabel } from "./common";

const LeftSection = styled.div`
    display : flex;
    flex-direction : column;
`;

const RightSection = styled.div`
    display : flex;
    flex-direction : column;
`;



export function MobileComponentSection(props) {
    var count = 0;

    function Clicked() {
        count++;

        console.log("Clicked ", count, " times.");
    }

    return (
        <ContainerSection
            onClick={() => Clicked()}
        >
            <LeftSection>
                <TextLabel>
                    {props.section_name}
                </TextLabel>

                <TextLabel>
                    {props.subject}
                </TextLabel>
            </LeftSection>

            <RightSection>
                <ButtonSectionDelete>
                    Delete
                </ButtonSectionDelete>

                <ButtonSectionEdit>
                    Edit
                </ButtonSectionEdit>
            </RightSection>
        </ContainerSection>
    );
}
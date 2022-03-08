import react from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fontWeight } from "@mui/system";

export function PasswordPolicy(props) {


    /**
     * validations:
     * 
     * length, lowercase, uppercase, number, special, username, fname, lname
     */
    const policiesValidation = props.policies;

    const TooltipText = styled.p`
        color:gray;
        font-size:10px;
        margin:.5em;
    `;

    const PolicyContainer = styled.div`
        display:flex;
        width:100%;
        flex-direction:row;
        align-items:center;
        text-align:start;
    `;

    const MainContainer = styled.div`
        display:flex;
        flex-direction: row;
    `;

    const policies = [
        { 'text': "Be a minimum of 10 characters", 'validation': policiesValidation.length },
        { 'text': "Include at least one lowecase letter (a-z)", 'validation': policiesValidation.lowercase },
        { 'text': "Include at least one uppercase letter (A-Z)", 'validation': policiesValidation.uppercase },
        { 'text': "Include one number (0-9)", 'validation': policiesValidation.number },
        { 'text': "Include one special character", 'validation': policiesValidation.special },
        { 'text': "Not contain your username", 'validation': policiesValidation.username },
        { 'text': "Not contain your first name", 'validation': policiesValidation.fname },
        { 'text': "Not contain your last name", 'validation': policiesValidation.lname },
    ]

    return (
        <>
            <PolicyContainer>
                <TooltipText >Password must:</TooltipText>
            </PolicyContainer>
            {
                policies.map((policy) => {
                    return (
                        <PolicyContainer>
                            {policy.validation ? <CheckCircleIcon sx={{ fontSize: 10, color: '#2adb5c' }} /> : <CancelIcon sx={{ fontSize: 10, color: '#ff305a' }} />}
                            <TooltipText>{policy.text}</TooltipText>
                        </PolicyContainer>
                    );
                })
            }

        </>
    );
}
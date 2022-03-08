import react from 'react'
import styled from 'styled-components'
import Typography from '@mui/material/Typography';

const DropdownContainer = styled.div`
    display:flex;
    flex-direction:column;
    height:300px;
    width:300px;
    justify-content:center;
    align-items:center;
`;

const TitleText = styled.p`
    font-size:12px
`;

export function NotificationDropDown() {
    return (
        <DropdownContainer>
            <TitleText>
                No notifications for today
            </TitleText>
        </DropdownContainer>
    );
}
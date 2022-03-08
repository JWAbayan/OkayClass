import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { PageAccount } from "../pageAccount";
import { PageRecords } from "../pageRecords";

import { Menu } from "@mui/material";
import { NotificationDropDown } from "./notificationDropDown";

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
`;

const ItemLink = styled.li`
    height: 100%;
    padding: 0 1em;
    color: #222;
    font-weight: 500;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    display: flex;
    border-top: 2px solid transparent;
    transition: all 250ms ease-in-out;
    cursor: pointer;

    &:hover {
        border-top: 2px solid #2D98DA;
    }
`;



export function LinksNavigation(props) {
    const [notifAnchor, setNotifAnchor] = useState(false)
    const notifOpen = Boolean(notifAnchor)

    const openNotifMenu = (event) => {
        setNotifAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setNotifAnchor(null)
    }

    return (
        <ContainerLinksNav>
            <Menu
                id="basic-menu"
                anchorEl={notifAnchor}
                open={notifOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <NotificationDropDown />
            </Menu>
            <WrapperLinks>
                <ItemLink onClick={() => { props.changeCurrentPage(<PageRecords user={props.user} changeCurrentPage={props.changeCurrentPage} />) }}>
                    Records
                </ItemLink>
                <ItemLink onClick={openNotifMenu}>
                    Notifications
                </ItemLink>
                <ItemLink onClick={() => { props.changeCurrentPage(<PageAccount user={props.user} />) }}>
                    Account
                </ItemLink>
            </WrapperLinks>
        </ContainerLinksNav >
    )
}
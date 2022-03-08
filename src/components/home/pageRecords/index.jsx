import { useState, useEffect, react } from "react";
import styled from "styled-components";
import { ComponentSection } from "./componentSection";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../dynamic";
import { MobileComponentSection } from "./mobileComponentSection";
import { Typography } from '@mui/material';
import { AddModal } from "./addModal";
import { MessageSnackbar } from "./messageSnackbar";
import axios from 'axios'

const ContainerRecords = styled.div`
    margin : 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
`;

const ContainerMenu = styled.div`
    display:flex;
`;

const ContainerSections = styled.div`
    width:80%;
    display: flex;
    justify-content:center;
    flex-direction: column;
`;

const ButtonAdd = styled.button`
    border: 0;
    width : 100px;
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

const ContainerActions = styled.div`
    width:30%;
    padding: 20px;
    display: flex;
    justify-content: center;
`;


const ContainerHeader = styled.div`
    display:flex;
    width:100%;
    align-items: center;
    padding:0em 2em 0em 2em;
    background-color: #edfbff;
    box-shadow: 0px 5px 5px rgba(90,90,90,.4)
`;

const ContainerHeaderActions = styled.div`
    width:30%;
    padding: 20px;
    display: flex;
    justify-content:end;
    margin-left:auto;
`;

const ButtonAddSection = styled.button`
    display:flex;
    justify-content:center;
    border: 0;
    width : 200px;
    outline: 0;
    padding: 8px 1em;
    color: #222;
    font-size: 13px;
    font-weight: 600;
    flex-direction: row;
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

const HeaderStyle = {
    "marginRight": "2em",
    "fontSize": "20px",
    "fontWeight": "bold"
};


export function PageRecords(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    const [visibleAddModal, setVisibileAddModal] = useState(false)
    const [visibleMessageSnack, setVisibleMessageSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [sections, setSections] = useState(null);

    const hasSections = Boolean(sections)
    const id_user = props.user.id_user;

    const openAddModal = () => { setVisibileAddModal(true) }
    const closeAddModal = () => { setVisibileAddModal(false) }

    const setMessage = (message) => { setSnackMessage(message) }
    const openMessageSnack = () => { setVisibleMessageSnack(true) }
    const closeMessageSnack = () => { setVisibleMessageSnack(false) }
    const setSnackbarMessage = (message) => { setSnackMessage(message); }

    useEffect(() => {
        console.log()
        fetchSection();
    }, [])


    /**
     * Fetch sections from API
     */
    const fetchSection = async () => {
        let response = await axios.get(`https://okay-class-server.herokuapp.com/sections/retrieve/?id=${id_user}`)
        let success = response.data.success;
        let fetchedSections = response.data.sections
        if (success) {
            setSections(fetchedSections);
        }
    }

    return (
        <>
            {
                visibleAddModal &&
                <AddModal
                    user={id_user}
                    fetchSection={fetchSection}
                    visible={visibleAddModal}
                    onClose={closeAddModal}
                    setSnackMessage={setSnackMessage}
                    openMessageSnack={openMessageSnack}
                />}
            {
                <MessageSnackbar message={snackMessage} visible={visibleMessageSnack} closeMessageSnack={closeMessageSnack} />
            }
            <ContainerRecords>
                <ContainerHeader>
                    <Typography style={HeaderStyle}>
                        Your Sections
                    </Typography>

                    <ContainerHeaderActions>
                        <ButtonAddSection variant="contained" color="primary" size="large" onClick={openAddModal}>
                            <Typography>
                                Add Section
                            </Typography>
                        </ButtonAddSection>
                    </ContainerHeaderActions>
                </ContainerHeader>
                <ContainerSections>
                    {
                        hasSections &&
                        sections.map((item, key) => {
                            return (
                                <ComponentSection
                                    sectionId={item.id_section}
                                    key={key}
                                    section_name={item.section_name}
                                    subject={item.subject}
                                    user={id_user}
                                    fetchSection={fetchSection}
                                    setSnackMessage={setSnackMessage}
                                    openMessageSnack={openMessageSnack}
                                    changeCurrentPage={props.changeCurrentPage}
                                />
                            );
                        })
                    }
                </ContainerSections>
            </ContainerRecords>
        </>
    );
}
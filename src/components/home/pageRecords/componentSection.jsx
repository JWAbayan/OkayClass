import React, { useState } from "react";
import styled from "styled-components";
import { ButtonSectionDelete, ButtonSectionEdit, ButtonSectionView, ContainerSection, TextLabel } from "./common";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../dynamic";
import { EditModal } from "./editModal";
import { Grow } from "@mui/material";
import axios from "axios";
import { PageStudents } from "./pageStudents";

const LeftSection = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-around;
    align-items:center;
    border-radius: 15px 0px 0px 15px;
    border-right: 2px solid #e3e3e3;
    height: 100%;
    flex : 1;
    
`;

const MidSection = styled.div`
    display:flex;
    height:100%;
    flex-direction : row;
    align-items: center;
    justify-content : center;
    border-right: 2px solid #e3e3e3;
    flex:1
`;

const RightSection = styled.div`
    display : flex;
    flex : 1;
    flex-direction : row;
    justify-content : center;
    margin : 1em;
`;


const MobileLeftSection = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    flex : 2;
`;

const MobileRightSection = styled.div`
    display : flex;
    flex : 1;
    flex-direction : column;
    justify-content : center;
    margin : 1em;
`;

export function ComponentSection(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const [visibleEditModal, setVisibileEditModal] = useState(false);

    //Utilities
    const fetchSection = props.fetchSection
    const openMessageSnack = props.openMessageSnack;
    const setSnackMessage = props.setSnackMessage;
    const changeCurrentPage = props.changeCurrentPage;

    //Data
    const sectionId = props.sectionId;
    const user = props.user;
    const sectionData = { sectionId: props.sectionId, sectionCode: props.section_name, courseName: props.subject };


    const handleDelete = async (e) => {
        e.preventDefault();
        let response = await axios.delete('https://okay-class-server.herokuapp.com/sections/delete', { data: { id_user: user, id_section: sectionId } })
        let success = response.data.success;
        console.log(response.data)
        if (success) {
            setSnackMessage('Section Removed');
            openMessageSnack();
            fetchSection();
        }
    }

    const handleEdit = () => { setVisibileEditModal(true) };
    const handleView = () => { changeCurrentPage(<PageStudents sectionData={sectionData} id_user={user} changeCurrentPage={props.changeCurrentPage} />) };
    const closeEditModal = () => { setVisibileEditModal(false) };

    return (
        <>
            {
                visibleEditModal &&
                <EditModal
                    user={user}
                    sectionData={sectionData}
                    fetchSection={fetchSection}
                    visible={visibleEditModal}
                    onClose={closeEditModal}
                    setSnackMessage={props.setSnackMessage}
                    openMessageSnack={props.openMessageSnack}
                />

            }
            <Grow in={true}>
                <ContainerSection>
                    {
                        !isMobile &&
                        <>
                            <LeftSection>
                                <TextLabel>
                                    {sectionData.sectionCode}
                                </TextLabel>
                            </LeftSection>
                            <MidSection>
                                <TextLabel>
                                    {sectionData.courseName}
                                </TextLabel>
                            </MidSection>
                        </>

                    }

                    {
                        !isMobile && <RightSection>

                            <ButtonSectionView onClick={handleView}>
                                View
                            </ButtonSectionView>
                            <ButtonSectionEdit onClick={handleEdit}>
                                Edit
                            </ButtonSectionEdit>
                            <ButtonSectionDelete onClick={handleDelete}>
                                Delete
                            </ButtonSectionDelete>
                        </RightSection>
                    }

                    {
                        isMobile && <MobileLeftSection>
                            <TextLabel>
                                {props.section_name}
                            </TextLabel>

                            <TextLabel>
                                {props.subject}
                            </TextLabel>
                        </MobileLeftSection>
                    }

                    {
                        isMobile && <MobileRightSection>
                            <ButtonSectionView onClick={handleView}>
                                View
                            </ButtonSectionView>

                            <ButtonSectionEdit onClick={handleEdit}>
                                Edit
                            </ButtonSectionEdit>
                            <ButtonSectionDelete onClick={handleDelete}>
                                Delete
                            </ButtonSectionDelete>
                        </MobileRightSection>
                    }
                </ContainerSection>
            </Grow>
        </>
    );
}
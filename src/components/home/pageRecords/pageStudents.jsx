import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonSectionDelete, ButtonSectionEdit, ContainerSection, TextLabel } from "./common";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../dynamic";
import { ComponentStudent } from "./componentStudent";
import { ModalAddStudent } from "./modalAddStudent";
import { Typography } from "@mui/material";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PageRecords } from ".";

const ContainerTable = styled.div`
    margin : 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
`;


const ContainerHeader = styled.div`
    display:flex;
    width:100%;
    align-items: center;
    padding:0em 2em 0em 2em;
    background-color: #edfbff;
    box-shadow: 0px 5px 5px rgba(90,90,90,.4)
`;

const ContainerActions = styled.div`
    width:30%;
    padding: 20px;
    display: flex;
    justify-content:end;
    margin-left:auto;
`;
const ButtonAddStudent = styled.button`
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

const BackButtonStyle = {
    "marginRight": "2em"
};

const TableMain = styled.table`
    padding : 0.5em;
    width : 100%;
    align-items : center;
    justify-content : center;
    border-radius : 15px;
    border-color : #2980b9;
`;

const TableHeader = styled.thead`
    background-color : #17c0eb;
    font-weight: 250;
    fonst-size: 15px;
    z-index: 50;
    margin: 0.5em;
`;

const TableCell = styled.th`
    align-items : center;
    justify-content : center;
    flex-direction : row;
`;

const TextTableHeader = styled.h3`
    color: #FFF;
    font-weight: 250;
    fonst-size: 15px;
    z-index: 50;
    margin: 0.5em;
`;

const HeaderStyle = {
    "marginRight": "2em",
    "fontSize": "20px",
    "fontWeight": "bold"
};


export function PageStudents(props) {
    const [isInputDisabled, setInputDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [visibleAddModal, setVisibileAddModal] = useState(false)
    const [students, setStudents] = useState(null)

    const sectionId = props.sectionData.sectionId;
    const user = props.id_user;
    const sectionData = props.sectionData;
    const changeCurrentPage = props.changeCurrentPage;
    const hasStudents = Boolean(students);

    const openAddModal = () => { setVisibileAddModal(true) };
    const closeAddModal = () => { setVisibileAddModal(false) };

    useEffect(() => {
        console.table(changeCurrentPage);
        fetchStudents();
    }, [])

    const fetchStudents = async () => {
        let response = await axios.get(`https://okay-class-server.herokuapp.com/students/retrieve/?uid=${user}&&id=${sectionId}`);
        console.log(response.data);
        if (response.data.success) {
            console.log('in');
            setStudents(response.data.students_data);
        }
    }

    const handleBackClick = () => {
        changeCurrentPage(<PageRecords user={{ id_user: props.id_user }} changeCurrentPage={props.changeCurrentPage} />);
    }

    return (
        <ContainerTable>
            {
                visibleAddModal &&
                <ModalAddStudent
                    visible={visibleAddModal}
                    onClose={closeAddModal}
                    user={user}
                    sectionId={sectionId}
                    fetchStudents={fetchStudents}
                />
            }
            <ContainerHeader>
                <ArrowBackIcon style={BackButtonStyle} onClick={handleBackClick} />
                <Typography style={HeaderStyle}>
                    {sectionData.sectionCode}
                </Typography>
                <Typography style={HeaderStyle}>
                    {sectionData.courseName}
                </Typography>
                <ContainerActions>
                    <ButtonAddStudent variant="contained" color="primary" size="large" onClick={openAddModal}>
                        <Typography>
                            Add Student
                        </Typography>
                    </ButtonAddStudent>
                </ContainerActions>
            </ContainerHeader>

            <TableMain>
                <TableHeader>
                    <TableCell style={{ width: "150px" }}>
                        <TextTableHeader>
                            First Name
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "150px" }}>
                        <TextTableHeader>
                            Last Name
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "150px" }}>
                        <TextTableHeader>
                            Email
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "150px" }}>
                        <TextTableHeader>
                            Contact No.
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "75px" }}>
                        <TextTableHeader>
                            Prelims
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "75px" }}>
                        <TextTableHeader>
                            Midterms
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "75px" }}>
                        <TextTableHeader>
                            Finals
                        </TextTableHeader>
                    </TableCell>

                    <TableCell style={{ width: "100px" }}>
                        <TextTableHeader>
                            Actions
                        </TextTableHeader>
                    </TableCell>
                </TableHeader>
                {
                    hasStudents &&
                    students.map((item, key) => {
                        return (
                            <ComponentStudent
                                key={key}
                                user={user}
                                fetchStudents={fetchStudents}
                                student_id={item.id_student}
                                first_name={item.first_name}
                                last_name={item.last_name}
                                email={item.email}
                                contact_no={item.contact_no}
                                grade_prelims={item.grade_prelims}
                                grade_midterms={item.grade_midterms}
                                grade_finals={item.grade_finals}
                            />
                        );
                    })
                }
            </TableMain>
        </ContainerTable>
    );
}
import { React, useEffect, useState } from "react";
import { Modal, Button, Box, Typography, Input, FormGroup, FormControl, Paper } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { compose } from "@mui/system";

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px #000',
    borderRadius: `20px`,
    boxShadow: 24,
    p: 4,
};

const styleHeader = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#1976d2',
    color: '#FFF'
};

const styleLabel = {
    fontWeight: 'bold',
};

const textFieldStyle = {
    width: '100%',
};


const TextFieldContainer = styled.div`
    margin-top: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const FormContainer = styled.form`
    width:100%;
`;


export function EditModal(props) {
    const [visible, setVisible] = useState(props.visible);
    const [sectionCode, setSectionCode] = useState(props.sectionData.sectionCode);
    const [courseName, setCourseName] = useState(props.sectionData.courseName);

    const sectionId = props.sectionData.sectionId
    const user = props.user;

    const closeEditModal = props.onClose;

    const openMessageSnack = props.openMessageSnack;
    const setSnackMessage = props.setSnackMessage;

    const fetchSection = props.fetchSection;

    const handleSave = async (e) => {
        e.preventDefault();
        let sectionData = {
            "id_section": sectionId,
            "section_name": sectionCode,
            "subject": courseName
        }

        let response = await axios.patch('https://okay-class-server.herokuapp.com/sections/update', { updated_section: sectionData, id_user: user })
        if (response.data.success) {
            closeEditModal();
            setSnackMessage("Section Updated");
            openMessageSnack();
            fetchSection();
        }
    }

    return (
        <>
            <Modal
                open={visible}
                onClose={closeEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper style={styleHeader}>
                        <Typography>
                            EDIT SECTION
                        </Typography>
                    </Paper>
                    <FormContainer onSubmit={handleSave}>
                        <TextFieldContainer>
                            <Typography style={styleLabel}>
                                Section Code
                            </Typography>
                            <Input defaultValue={sectionCode} required onChange={(evt) => { setSectionCode(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Sectiion Code" variant="outlined" />
                        </TextFieldContainer>


                        <TextFieldContainer>
                            <Typography style={styleLabel}>
                                Course Name
                            </Typography>
                            <Input defaultValue={courseName} required onChange={(evt) => { setCourseName(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Course Name" variant="outlined" />
                        </TextFieldContainer>

                        <ButtonContainer>
                            <Button type="submit" variant="contained">Save</Button>
                        </ButtonContainer>
                    </FormContainer>
                </Box>
            </Modal>

        </>
    );

}
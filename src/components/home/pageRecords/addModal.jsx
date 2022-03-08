import { React, useState } from "react";
import { Modal, Button, Box, Typography, Input, FormGroup, FormControl, Paper } from "@mui/material";
import styled from "styled-components";
import axios from "axios";

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


export function AddModal(props) {
    const [visible, setVisible] = useState(props.visible);
    const [sectionCode, setSectionCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const user = props.user;
    const closeAddModal = props.onClose;
    const fetchSection = props.fetchSection;

    const openMessageSnack = props.openMessageSnack;
    const setSnackMessage = props.setSnackMessage;


    const handleSave = async (e) => {
        e.preventDefault();
        let sectionData = {
            "sectionCode": sectionCode,
            "courseName": courseName
        }
        let response = await axios.post('https://okay-class-server.herokuapp.com/sections/create', { sectionData: sectionData, id_user: user })

        if (response.data.success) {
            closeAddModal();
            setSnackMessage("Section Added")
            openMessageSnack();
            fetchSection();
        }
    }

    return (
        <>
            <Modal
                open={visible}
                onClose={closeAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper style={styleHeader}>
                        <Typography>
                            ADD SECTION
                        </Typography>
                    </Paper>
                    <FormContainer onSubmit={handleSave}>
                        <TextFieldContainer>
                            <Typography>
                                Section Code
                            </Typography>
                            <Input required onChange={(evt) => { setSectionCode(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Sectiion Code" variant="outlined" />
                        </TextFieldContainer>


                        <TextFieldContainer>
                            <Typography>
                                Course Name
                            </Typography>
                            <Input required onChange={(evt) => { setCourseName(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Course Name" variant="outlined" />
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
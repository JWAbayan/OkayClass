import { React, useState } from "react";
import { Modal, Button, Box, Typography, Input, Paper } from "@mui/material";
import MuiPhoneNumber from 'material-ui-phone-number'
import styled from "styled-components";
import axios from "axios";
import './phoneNumber.css'

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

export function ModalAddStudent(props) {
    const [visible, setVisible] = useState(props.visible);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('')

    const sectionId = props.sectionId;
    const user = props.user;

    const fetchStudents = props.fetchStudents;
    const closeAddModal = props.onClose;

    const handleContactChange = (value) => {
        setContact(value);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let studentData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "contact": contact
        }
        let response = await axios.post('https://okay-class-server.herokuapp.com/students/create', { id_user: user, id_section: sectionId, student_data: studentData })

        if (response.data.success) {
            closeAddModal();
            fetchStudents();
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
                            ADD STUDENT
                        </Typography>
                    </Paper>

                    <FormContainer onSubmit={handleSave}>
                        <TextFieldContainer>
                            <Typography>
                                First Name
                            </Typography>
                            <Input required onChange={(evt) => { setFirstName(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="First Name" variant="outlined" />
                        </TextFieldContainer>


                        <TextFieldContainer>
                            <Typography>
                                Last Name
                            </Typography>
                            <Input required onChange={(evt) => { setLastName(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Last Name" variant="outlined" />
                        </TextFieldContainer>

                        <TextFieldContainer>
                            <Typography>
                                Email
                            </Typography>
                            <Input required onChange={(evt) => { setEmail(evt.target.value) }} style={textFieldStyle} id="outlined-basic" label="Email" variant="outlined" />
                        </TextFieldContainer>

                        <TextFieldContainer>
                            <Typography>
                                Contact Number
                            </Typography>
                            <MuiPhoneNumber required defaultCountry={'ph'} onChange={handleContactChange} />
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
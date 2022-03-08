import React, { useState } from "react";
import styled from "styled-components";
import { ButtonSectionDelete, ButtonSectionEdit, ContainerSection, TextLabel } from "./common";
import { DeviceSize } from "../dynamic";
import axios from "axios";
import MuiPhoneNumber from 'material-ui-phone-number'
import { Grow } from "@mui/material";

const TableRows = styled.tr`
    background-color : #7efff5
`;

const TableCell = styled.th`
    align-items : center;
    justify-content : center;
    flex-direction : row;
`;


const TextContent = styled.h5`
    color: #000;
    font-weight: 250;
    fonst-size: 15px;
    z-index: 50;
    margin: 0.5em;
`;

const TextInput = styled.input`
    width: 100%;
    height: 30px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.3);
    border-radius : 10px;
    padding: 0px 10px;
    text-align : center;
    border-bottom: 1.5px solid transparent;
    transition: all, 200ms ease-in-out;
    font-size: 12px;

    &::placeholder {
        color : rgba(200, 200, 200, 1);
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200, 200, 200, 0.5);
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid rgb(69,170,242);
    }
`;

const ButtonStudentEdit = styled.button`
    border: 0;
    width : 75px;
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

const ButtonStudentSave = styled.button`
    border: 0;
    width : 75px;
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

const ButtonStudentDelete = styled.button`
    border: 0;
    width : 75px;
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

const Form = styled.form`

`;

export function ComponentStudent(props) {
    const [isInputDisabled, setInputDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState(props.first_name);
    const [lastName, setLastName] = useState(props.last_name);
    const [email, setEmail] = useState(props.email);
    const [contact, setContact] = useState(props.contact_no)
    const [prelims, setPrelims] = useState('')
    const [midterms, setMidterms] = useState('')
    const [finals, setFinals] = useState('')
    const user = props.user;
    const studentId = props.student_id;
    const sectionData = props.sectionData;
    const fetchStudents = props.fetchStudents;

    //Delete student
    const handleDelete = async () => {
        let response = await axios.delete('https://okay-class-server.herokuapp.com/students/delete', { data: { user: user, id_student: studentId } })
        if (response.data.success) {
            fetchStudents();
        }
    }

    //Save edit changes
    const handleSave = async () => {

        let studentData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "contact": contact,
            "prelims": prelims,
            "midterms": midterms,
            "finals": finals,
        }

        let response = await axios.patch('https://okay-class-server.herokuapp.com/students/update',
            { user: user, studentId: studentId, studentData: studentData })


        if (response.data.success) {
            fetchStudents();
            setEditMode(!editMode);
            setInputDisabled(!isInputDisabled);
        }

    }

    const handleContactChange = (value) => {
        setContact(value);
    }

    return (
        <Grow in={true}>

            <TableRows student_id={props.student_id} key={props.student_id}>
                <TableCell>
                    <TextInput type="text" onChange={(e) => { setFirstName(e.target.value) }} defaultValue={props.first_name} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    <TextInput type="text" onChange={(e) => { setLastName(e.target.value) }} defaultValue={props.last_name} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    <TextInput type="email" onChange={(e) => { setEmail(e.target.value) }} defaultValue={props.email} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    {
                        isInputDisabled && <TextInput type="text" defaultValue={props.contact_no} disabled={isInputDisabled} />
                    }
                    {
                        !isInputDisabled &&
                        <MuiPhoneNumber onChange={handleContactChange} disabled={isInputDisabled} defaultCountry={"ph"} />
                    }
                </TableCell>

                <TableCell>
                    <TextInput type="text" onChange={(e) => { setPrelims(e.target.value) }} defaultValue={props.grade_prelims} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    <TextInput type="text" onChange={(e) => { setMidterms(e.target.value) }} defaultValue={props.grade_midterms} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    <TextInput type="text" onChange={(e) => { setFinals(e.target.value) }} defaultValue={props.grade_finals} disabled={isInputDisabled} />
                </TableCell>

                <TableCell>
                    {
                        editMode && <ButtonStudentSave onClick={handleSave} student-id={props.student_id}>
                            Save
                        </ButtonStudentSave>
                    }

                    {
                        !editMode && <ButtonStudentEdit onClick={(e) => { setEditMode(!editMode); setInputDisabled(!isInputDisabled) }} student-id={props.student_id}>
                            Edit
                        </ButtonStudentEdit>
                    }

                    <ButtonStudentDelete onClick={handleDelete}>
                        Delete
                    </ButtonStudentDelete>
                </TableCell>

            </TableRows>
        </Grow>
    );
}
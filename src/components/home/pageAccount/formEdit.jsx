import React, { useContext, useState } from "react";
import { Marginer } from "../../marginer";
import { ButtonCancel, ButtonSave, ContainerButtons, ContainerMain, ContainerProfileItems, ContainerView, TextInput, TextLabel, LinkMuted, ContainerForm } from "./common";
import { ContextProfile } from "./contextProfile";
import DuplicateModal from "../../boxAccount/errorMessages/duplicateModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";





export function FormEdit(props) {
    const { ToView } = useContext(ContextProfile);
    const navigate = useNavigate()
    const [firstName, setFirstname] = useState(props.user.first_name);
    const [lastName, setLastName] = useState(props.user.last_name);
    const [email, setEmail] = useState(props.user.email);


    const redirectToChangePass = () => {
        //Redirect to Change PAssword page using navigate
        navigate('/changepass', { state: { user_info: props.user, text: "Change Password", reason: "CHANGE_PASS" } })
    }

    const handleResponse = (response) => {
        if (response)
            console.log(response)
        if (response.success) {
            ToView();
        }
        else if (response.isDuplicate) {
            console.log("DUPLICATE")
        }
        else {
            console.log("UNHANDLED ERROR")
        }
    }

    const handleSubmit = (e) => {
        axios.patch('https://okay-class-server.herokuapp.com/account/update/', { uid: props.user.id_user, firstName: firstName, lastName: lastName, email: email }).then((response) => { handleResponse(response.data) });
        e.preventDefault()
    }

    return (
        <ContainerMain>
            <ContainerForm onSubmit={handleSubmit}>
                <ContainerProfileItems>
                    <TextLabel>
                        First Name
                    </TextLabel>

                    <TextInput type="text" defaultValue={props.user.first_name} onChange={(e) => { setFirstname(e.target.value) }} />
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Last Name
                    </TextLabel>

                    <TextInput type="text" defaultValue={props.user.last_name} onChange={(e) => { setLastName(e.target.value) }} />
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Email
                    </TextLabel>

                    <TextInput type="email" defaultValue={props.user.email} onChange={(e) => { setEmail(e.target.value) }} />
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Username
                    </TextLabel>

                    <TextInput type="text" readOnly={true} defaultValue={props.user.username} />
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Password
                    </TextLabel>

                    <LinkMuted href="#" onClick={redirectToChangePass}>Change your password</LinkMuted>
                </ContainerProfileItems>

                <Marginer direction="vertical" margin="1.5em" />

                <ContainerButtons>
                    <ButtonSave type="submit">Save</ButtonSave>
                </ContainerButtons>
            </ContainerForm>
            <Marginer direction="vertical" margin="1.5em" />

            <ContainerButtons>
                <ButtonCancel onClick={ToView}>Cancel</ButtonCancel>
            </ContainerButtons>
        </ContainerMain>
    );
}
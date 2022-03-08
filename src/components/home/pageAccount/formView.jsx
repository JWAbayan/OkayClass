import React, { useContext } from "react";
import { Marginer } from "../../marginer";
import { ButtonEdit, ContainerMain, ContainerProfileItems, ContainerView, TextContent, TextLabel } from "./common";
import { ContextProfile } from "./contextProfile"

export function FormView(props) {
    const { ToEdit } = useContext(ContextProfile);

    return (
        <ContainerMain>
            <ContainerView>
                <ContainerProfileItems>
                    <TextLabel>
                        First Name
                    </TextLabel>

                    <TextContent>
                        {Boolean(props.user) ? props.user.first_name : "Sorry, We can't fetch your data."}
                    </TextContent>
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Last Name
                    </TextLabel>

                    <TextContent>
                        {Boolean(props.user) ? props.user.last_name : "Sorry, We can't fetch your data."}
                    </TextContent>
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Email
                    </TextLabel>

                    <TextContent>
                        {Boolean(props.user) ? props.user.email : "Sorry, We can't fetch your data."}
                    </TextContent>
                </ContainerProfileItems>

                <ContainerProfileItems>
                    <TextLabel>
                        Username
                    </TextLabel>

                    <TextContent>
                        {Boolean(props.user) ? props.user.username : "Sorry, We can't fetch your data."}
                    </TextContent>
                </ContainerProfileItems>


            </ContainerView>


            <Marginer direction="vertical" margin="1.5em" />

            <ButtonEdit onClick={ToEdit}>Edit</ButtonEdit>
        </ContainerMain>
    );
}
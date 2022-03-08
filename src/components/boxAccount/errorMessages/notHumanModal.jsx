import React, { useEffect } from "react";
import { ErrorMessage } from "../common";

const NotHumanModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowNotHuman(false) }, 2000)
    })

    return (
        <ErrorMessage>
            <p>Oops. Are you really a human? Try again</p>
        </ErrorMessage>
    );
}

export default NotHumanModal;
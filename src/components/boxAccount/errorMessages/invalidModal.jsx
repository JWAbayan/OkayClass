import React, { useEffect } from "react";
import { ErrorMessage, ErrorModal } from "../common";

const InvalidModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowInvalid(false) }, 5000)
    })

    return (
        <ErrorMessage>
            <p>Invalid username or password. Please try again.</p>
        </ErrorMessage>
    );
}



export default InvalidModal;
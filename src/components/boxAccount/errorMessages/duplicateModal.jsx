import React, { useEffect } from "react";
import { ErrorMessage, ErrorModal } from "../common";

const DuplicateModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowDuplicate(false) }, 5000)
    })

    return (
        <ErrorMessage>
            <p>Account is already taken. Try another one.</p>
        </ErrorMessage>
    );
}

export default DuplicateModal;
import React, { useEffect } from "react";
import { ErrorMessage, ErrorModal } from "../common";

const LockModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowLocked(false) }, 10000)
    })

    return (
        <ErrorMessage>
            <p>Maximum attempts reached. Try again after 5 minutes</p>
        </ErrorMessage>
    );
}



export default LockModal;
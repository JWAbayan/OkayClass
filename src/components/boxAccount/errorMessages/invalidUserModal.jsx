import React, { useEffect } from "react";
import { ErrorMessage } from "../common";

const InvalidUserModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowInvalidUser(false) }, 2000)
    })

    return (
        <ErrorMessage>
            <p>Invalid username</p>
        </ErrorMessage>
    );
}

export default InvalidUserModal;
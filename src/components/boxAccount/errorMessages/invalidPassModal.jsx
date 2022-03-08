import React, { useEffect } from "react";
import { ErrorMessage } from "../common";

const InvalidPassModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowInvalidPass(false) }, 2000)
    })

    return (
        <ErrorMessage>
            <p>Password does not conform to the password policy</p>
        </ErrorMessage>
    );
}

export default InvalidPassModal;
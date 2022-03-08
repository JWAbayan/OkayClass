import React, { useEffect } from "react";
import { SuccessMessage, ErrorModal } from "./common";

const SuccessModal = (props) => {
    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowSuccess(false) }, 2000)
    })

    return (
        <SuccessMessage>
            <p>Success!</p>
        </SuccessMessage>
    );
}



export default SuccessModal;
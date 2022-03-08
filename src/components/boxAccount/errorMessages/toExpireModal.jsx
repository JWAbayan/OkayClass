import React, { useEffect } from "react";
import { ErrorMessage } from "../common";

const ToExpireModal = (props) => {

    var someDate = new Date();
    var numberOfDaysToAdd = 10;
    var holderDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var result = new Date(holderDate)
    var month = result.toLocaleString('default', { month: 'long' })
    var day = result.getDate();
    var year = result.getFullYear();


    //Hide this component after 5 seconds of rendering
    useEffect(() => {
        setTimeout(() => { props.setShowInvalidPass(false) }, 3000)

    })

    return (
        <ErrorMessage>
            <p>{`Your password will expire on ${month} ${day}, ${year}`}</p>
        </ErrorMessage>
    );
}

export default ToExpireModal;
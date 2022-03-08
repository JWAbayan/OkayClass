import { react, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";


export function WarningSnackbar(props) {

    const visible = props.visible;
    const closeWarningSnack = props.closeWarningSnack
    var someDate = new Date();
    var numberOfDaysToAdd = 10;
    var holderDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var result = new Date(holderDate)
    var month = result.toLocaleString('default', { month: 'long' })
    var day = result.getDate();
    var year = result.getFullYear();

    useEffect(() => {
        console.log("Rendered");
    }, [])

    return (
        <Snackbar
            open={visible}
            autoHideDuration={10000}
            onClose={closeWarningSnack}
        >
            <Alert onClose={closeWarningSnack} severity="warning" sx={{ width: '100%' }}>
                {`Your password will expire on ${month} ${day}, ${year}.`}
            </Alert>
        </Snackbar>
    );
}
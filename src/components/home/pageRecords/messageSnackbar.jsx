import react, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";


export function MessageSnackbar(props) {

    const message = props.message;
    const visible = props.visible;
    const closeMessageSnack = props.closeMessageSnack

    useEffect(() => {
        console.log("Rendered");
    }, [])

    return (
        <Snackbar
            open={visible}
            autoHideDuration={5000}
            onClose={closeMessageSnack}
        >
            <Alert onClose={closeMessageSnack} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
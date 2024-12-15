import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Fragment } from "react";

function TodoDetails({ todoDetails, openDialog, setOpenDialog, setTodoDEtails }) {
    return <Fragment>
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
            <DialogTitle>
                {todoDetails?.todo}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => {
                    setTodoDEtails(null)
                    setOpenDialog(false)
                }} >close</Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default TodoDetails
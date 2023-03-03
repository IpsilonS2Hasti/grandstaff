import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

const EditField = ({ value }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <div>
            {
                editMode
                    ?
                    <TextField value={value} id="standard-basic" variant="standard" />
                    :
                    value
            }

            <IconButton size="small" onClick={() => setEditMode(prev => prev ? false : true)}>
                <EditIcon fontSize="small" />
            </IconButton>



        </div>
    );
}

export default EditField;
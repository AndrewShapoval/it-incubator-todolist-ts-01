import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: PropsType) => {
    console.log("AddItemForm")

    let [itemName, setItemName] = useState("");
    let [error, setError] = useState<string | null>(null)

    function onItemNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setItemName(e.currentTarget.value)
    }

    function onAddItemKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (error !== null) setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }

    function addItem() {
        if (itemName.trim() !== "") {
            props.addItem(itemName.trim());
            setItemName("");
        } else {
            setError("Tittle is required!")
        }
    }

    return (
        <div>
            <TextField

                variant="outlined"
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                // className={error ? "error" : ""}
                error={!!error}
                label={"Tittle"}
                helperText={error}
            />
            <IconButton onClick={addItem} color="primary">
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error message">{error}</div>}*/}
        </div>
    )
})

export default AddItemForm;
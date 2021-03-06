import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

const EditableSpan = React.memo((props: PropsType) => {
    console.log("EditableSpan")

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    function activateEditMode() {
        setEditMode(true)
    }

    function DeActivateEditMode() {
        setEditMode(false)
        props.saveNewTitle(title)
    }

    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant="outlined"
                value={title}
                onBlur={DeActivateEditMode}
                autoFocus={true} onChange={changeTitle}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})

export default EditableSpan;
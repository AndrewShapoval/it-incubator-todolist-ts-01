import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

function EditableSpan(props: PropsType) {

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
            ? <input value={title} onBlur={DeActivateEditMode} autoFocus={true} onChange={changeTitle}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan;
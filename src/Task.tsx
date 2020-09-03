import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTasks: (taskId: string, todoListID: string) => void
    todoListId: string

}

export const Task = React.memo((props: TaskPropsType) => {

    let removeTask = () => {
        props.removeTasks(props.task.id, props.todoListId)
    }
    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newCheckBoxValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newCheckBoxValue, props.todoListId)
    }
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <div key={props.task.id}
             className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color="primary"
                      checked={props.task.isDone}
                      onChange={changeStatus}/>
            <EditableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})
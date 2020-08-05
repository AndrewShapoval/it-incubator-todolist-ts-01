import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string,
    filter: FilterValuesType
    tasks: Array<TaskType>,
    addTask: (newTaskName: string, todoListID: string) => void,
    removeTasks: (taskId: string, todoListID: string) => void,
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    function onAllClickHandler() {
        props.changeFilter("all", props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter("active", props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter("completed", props.id)
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                    <IconButton onClick={onClickRemoveTodoList}>
                        <Delete/>
                    </IconButton>
                    {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {props.tasks.map((t) => {
                        let removeTask = () => {
                            props.removeTasks(t.id, props.id)
                        }
                        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newCheckBoxValue = e.currentTarget.checked
                            props.changeStatus(t.id, newCheckBoxValue, props.id)
                        }
                        let changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id)
                        }

                        return (
                            <div key={t.id}
                                className={t.isDone ? "is-done" : ""}>
                                <Checkbox color="primary"
                                          checked={t.isDone}
                                          onChange={changeStatus}/>
                                <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Button
                        onClick={onAllClickHandler}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        color="primary"
                    >All
                    </Button>
                    <Button
                        onClick={onActiveClickHandler}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        color="primary">
                        Active
                    </Button>
                    <Button
                        onClick={onCompletedClickHandler}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        color="primary">
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )

}
import React, {ChangeEvent, useCallback} from "react";
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

export const TodoList = React.memo((props: PropsType) => {

    console.log("Todolist called")


    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])


    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
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
                    {tasksForTodoList.map((t) => {
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

})
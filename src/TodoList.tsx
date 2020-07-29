import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
                    <button onClick={onClickRemoveTodoList}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
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
                            <li key={t.id}
                                className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeStatus}/>
                                <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                                <button onClick={removeTask}> x</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button
                        className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                    </button>
                    <button
                        className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                    </button>
                    <button
                        className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )

}
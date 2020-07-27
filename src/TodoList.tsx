import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string,
    filter: FilterValuesType
    tasks: Array<TaskType>,
    addTask: (newTaskName: string, todoListID: string) => void,
    removeTasks: (taskId: string, todoListID: string) => void,
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: PropsType) {

    let [taskName, setTaskName] = useState("");
    let [error, setError] = useState<string | null>(null)

    let addTask = () => {
        if (taskName.trim() !== "") {
            props.addTask(taskName.trim(), props.id);
            setTaskName("");
        } else {
            setError("Tittle is required!")
        }

    }

    function onTaskNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value)
        setError(null)
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTask()
        }
    }

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

    return (
        <div>
            <div>
                <h3>{props.title}<button onClick={onClickRemoveTodoList}>X</button></h3>
                <div>
                    <input type="text"
                           value={taskName}
                           onChange={onTaskNameChanged}
                           onKeyPress={onAddTaskKeyPressed}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error message">{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((t) => {
                        let removeTask = () => {
                            props.removeTasks(t.id, props.id)
                        }
                        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newCheckBoxValue = e.currentTarget.checked
                            props.changeStatus(t.id, newCheckBoxValue, props.id)
                        }
                        return (
                            <li key={t.id}
                                className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeStatus}/>
                                <span>{t.title}</span>
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
import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK",
    taskId: string,
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD_TASK",
    title: string,
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS",
    todoListId: string,
    taskId: string,
    isDone: boolean
}

export type ChangeTittleStatusActionType = {
    type: "CHANGE_TASK_TITTLE",
    taskId: string,
    tittle: string,
    todoListId: string
}


type ActionsTypes =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTittleStatusActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            let newTodoList = [...state[action.todoListId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todoListId]: newTodoList}
        case "ADD_TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        case "CHANGE_TASK_STATUS":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        case "CHANGE_TASK_TITTLE":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.tittle}
                    }
                })
            }
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.todoListId]: []
            }
        case "REMOVE_TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE_TASK_STATUS", todoListId, isDone, taskId}
}

export const changeTaskTittleAC = (taskId: string, tittle: string, todoListId: string): ChangeTittleStatusActionType => {
    return {type: "CHANGE_TASK_TITTLE", taskId, tittle, todoListId}
}

let newArry = (tasks: Array<TaskType>, taskId: string, property: string | boolean) => {

}
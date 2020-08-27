import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    title: string
    todoListId: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

let initialState: Array<TodoListType> = []

type ActionsTypes =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

export const todoListsReducer = (state = initialState, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD_TODOLIST":
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        //    Можно использовать метод find или map (без разницы):
        // return state.map(tl => tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE_TODOLIST", id: todolistId}
}

export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', title: newTodolistTitle, todoListId: v1()}
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: title
    }
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: filter
    }
}
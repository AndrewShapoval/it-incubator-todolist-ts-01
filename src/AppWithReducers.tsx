import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTittleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
            [todoListID1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'CSS', isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: 'SaSS', isDone: true},
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false}
            ],
        }
    )

    function removeTasks(taskId: string, todoListID: string) {
        let action = removeTaskAC(taskId, todoListID)
        dispatchTasks(action)
    }

    function addTask(newTaskName: string, todoListID: string) {
        let action = addTaskAC(newTaskName, todoListID)
        dispatchTasks(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatchTasks(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let action = changeTaskTittleAC(id, newTitle, todoListID)
        dispatchTasks(action)
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let action = ChangeTodolistTitleAC(newTitle, todoListID)
        dispatchTodoLists(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let action = ChangeTodolistFilterAC(todoListID, newFilterValue)
        dispatchTodoLists(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>{
                    todoLists.map(tl => {
                        let tasksForTodoList = tasks[tl.id];
                        if (tl.filter === "active") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "20px"}}
                                       elevation={6}
                                ><TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForTodoList}
                                    addTask={addTask}
                                    removeTasks={removeTasks}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}/></Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

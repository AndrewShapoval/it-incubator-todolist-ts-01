import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTittleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {

    // let todoListID1 = v1()
    // let todoListID2 = v1()

    // let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
    //     {id: todoListID1, title: 'What to learn', filter: 'all'},
    //     {id: todoListID2, title: 'What to buy', filter: 'all'}
    // ])

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //         [todoListID1]: [
    //             {id: v1(), title: 'HTML', isDone: true},
    //             {id: v1(), title: 'JS', isDone: false},
    //             {id: v1(), title: 'CSS', isDone: false},
    //         ],
    //         [todoListID2]: [
    //             {id: v1(), title: 'SaSS', isDone: true},
    //             {id: v1(), title: 'Rest API', isDone: false},
    //             {id: v1(), title: 'GraphQL', isDone: false}
    //         ],
    //     }
    // )

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    let dispatch = useDispatch()

    const removeTasks = useCallback((taskId: string, todoListID: string) => {
        let action = removeTaskAC(taskId, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((newTaskName: string, todoListID: string) => {
        let action = addTaskAC(newTaskName, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTittleAC(id, newTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        let action = ChangeTodolistTitleAC(newTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        let action = ChangeTodolistFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodolistAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }, [])

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

export default AppWithRedux;

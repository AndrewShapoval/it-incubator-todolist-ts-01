import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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


    // let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTasks(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false};
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        delete tasks[todoListID]
        setTasks({...tasks})
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }

    // let tasksForTodoList = tasks;
    // if (filter === "active") {
    //     tasksForTodoList = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === "completed") {
    //     tasksForTodoList = tasks.filter(t => t.isDone === true)
    // }

    // const tasks2: Array<TaskType> = [
    //     {id: 1, title: 'Beer', isDone: false},
    //     {id: 2, title: 'Fish', isDone: false},
    //     {id: 3, title: 'Cheeps', isDone: true}
    // ]

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}/>
                    )
                })
            }

            {/*<TodoList title='What to learn'*/}
            {/*          filter={filter}*/}
            {/*          tasks={tasksForTodoList}*/}
            {/*          addTask={addTask}*/}
            {/*          removeTasks={removeTasks}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          changeStatus={changeStatus}/>*/}
            {/*<TodoList title='What to buy' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;

import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'TodoList/Task Stories',
    component: Task,
}

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

export const TaskBaseExample = (props: any) => {
    return (<div>
        <Task task={{id: '1', isDone: true, title: 'CSS'}}
              removeTasks={removeCallback}
              changeTaskTitle={changeTitleCallback}
              changeStatus={changeStatusCallback}
              todoListId={'TodoListId1'}
        />
        <Task task={{id: '2', isDone: false, title: 'JS'}}
              removeTasks={removeCallback}
              changeTaskTitle={changeTitleCallback}
              changeStatus={changeStatusCallback}
              todoListId={'TodoListId2'}
        />
    </div>)
}

import React from 'react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "../EditableSpan";

export default {
    title: 'TodoList/EditableSpan ',
    component: EditableSpan ,
}

export const EditableSpanFormBaseExample = (props: any) => {
    return (<div>
        <EditableSpan title={'Start Value'} saveNewTitle={action('Value Changed')}
        />
    </div>)
}
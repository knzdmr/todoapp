import React from 'react'
const TaskListItem=({task,onTaskSelect, onTaskButtonClicked})=>{
    console.log(task)

    return (

        <div className="container nomargin">
            <div className="row">
        <li class={'col-md-11 col-11  '+(task.status?'':'underline')} onClick={()=> onTaskSelect(task)}>


                        {task.task}

        </li>
        <button type='button' aria-label="Close"  className='col-md-1 col-1 nomargin close' onClick={()=> onTaskButtonClicked(task)}><span aria-hidden="true">&times;</span></button>
            </div>
            </div>
    );
};

export default TaskListItem;

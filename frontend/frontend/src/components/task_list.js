import React from 'react';
import TaskListItem from './task_item'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'
const TaskList=(props)=> {
    if(props.tasks){
    if(!props.tasks.length==0) {
        const task_items = props.tasks.map((task) => {
            return (<TaskListItem
                    onTaskSelect={props.onTaskSelect}
                    onTaskButtonClicked={props.onTaskButtonClicked}
                    key={task.pk}
                    task={task}/>
            );
        });
        return (
            <div className='row d-block scrollable col-md-12'>

                    <ul className="list-group ">
                        <ReactCssTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            {task_items}
                        </ReactCssTransitionGroup>
                    </ul>
                </div>

        );
    }else{
        if(props.term==''){
        return (
            <div className='row d-block  scrollable'>

                       <h6 className='text-dark'>No Task!</h6>

            </div>
        );
        }else{
            return (
                <div className='row d-block  scrollable'>
                    <h6 className='text-dark'>{'No result for:'+props.term}</h6>


                </div>
            );
        }
    }}else{
       return(
        <div className='d-block'>Loading</div>
       );
    }
}

export default TaskList;

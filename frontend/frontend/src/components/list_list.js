import React from 'react';
import ListItem from './list_list_item'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'
const List=(props)=>{
    const list_items=props.lists.map((list)=>{
        return (<ListItem
                onListSelect={props.onListSelect}
                onListDelClick={props.onListDelClick}
                key={list.pk}
                list={list}
                check={props.checked}
            />
        );
    });
    return (
            <div className='col-md-12 d-block  '>
                <ul  className="list-group  ">
                    <ReactCssTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}>
                        {list_items}
                    </ReactCssTransitionGroup>
                </ul>
            </div>
    );

};

export default List;
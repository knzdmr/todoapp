
import React from 'react'
const ListItem=({list,onListSelect, onListDelClick,check})=>{
    console.log(list)
    console.log('hi')

    return (

        <div className="container nomargin">
            <div className="row ">
                <li className={"col-md-11 col-11  " + (list.pk == check ? 'selected':'listelements')} onClick={()=> onListSelect(list)}>

                        {list.title}
                </li>
                <button type='button' aria-label="Close"  className='col-md-1 col-1 nomargin close' onClick={()=> onListDelClick(list)}><span aria-hidden="true">&times;</span></button>
            </div>
        </div>
    );
};

export default ListItem;

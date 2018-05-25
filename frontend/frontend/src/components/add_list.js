import React, {Component} from 'react'
class AddList extends Component { //React.Component
    constructor(props) {
        super(props);
        this.state = {
            title:'',


        }
        this.onChange = this.onChange.bind(this);

    }
    onChange(title) {
        this.setState({title})
    }

    submit(e){
        e.preventDefault()
        this.props.onListCreateClicked(this.state.title);
        document.getElementById('title').value='';
        this.setState({title:''});
    }

    render() {

        return (


            <div className='d-block col-md-12 padding'>

                    <form className='' onSubmit={e=>this.submit(e) }>
                        <input className='col-md-10 col-10 nomargin' id='title'  required='True' type="text" placeholder='title' value={this.state.title} onChange={event=>{this.onChange(event.target.value)}} />
                        <button className='col-md-2 col-2 nomargin btn-primary' type='submit'>+</button>
                    </form>
                </div>



        );
    }



}

export  default AddList;
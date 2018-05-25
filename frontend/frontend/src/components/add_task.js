import React,{Component} from 'react';
import 'flatpickr/dist/themes/light.css'

import Flatpickr from 'react-flatpickr'

class AddTask extends Component { //React.Component
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate(),
            task:'',


        }
        this.onChange = this.onChange.bind(this);

    }
    onChange(task) {
        this.setState({task})
    }

    submit(e){
        e.preventDefault()
        this.props.onCreateClicked(this.state.task,this.state.date);
        document.getElementById('task-create').value='';
        this.setState({task:''});
    }

    render() {

        return (


                <div className='container col-md-12 nomargin'>
                <div className='row'>
                    <form className='' onSubmit={e=>this.submit(e) }>
                        <input className='col-md-8 ' id='task-create'  required='True' type="text" placeholder='task' value={this.state.task} onChange={event=>{this.onChange(event.target.value)}} />
                        <Flatpickr className='col-md-3 ' value={this.state.date} onChange={date => {
                            const a=new Date(date)
                            const d=a.getFullYear()+"-"+ parseInt(a.getMonth()+1) +"-"+ a.getDate()
                            this.setState({date:d})
                        }} />
                        <button className='col-md-1 nomargin btn-success' type='submit'>+</button>
                    </form>
                </div>

                </div>

        );
    }



}

export  default AddTask;
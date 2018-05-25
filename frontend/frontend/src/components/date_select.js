import React,{Component} from 'react';
import 'flatpickr/dist/themes/airbnb.css'

import Flatpickr from 'react-flatpickr'

class DateBar extends Component { //React.Component
    constructor(props) {
        super(props);
        this.state = {
            date:new Date().getFullYear() + "-"+ parseInt(new Date().getMonth()+1) +"-"+ new Date().getDate(),
           test:new Date(),
            selectedDay: undefined,
        }
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    render() {

        return (

            <div className="col-md-3 col-5 nomargin cntr d-inline-block">
            <Flatpickr
                className='col-md-12 '
              value={this.state.test}
              onChange={date => {
                  const a=new Date(date)
                  const d=a.getFullYear()+"-"+ parseInt(a.getMonth()+1) +"-"+ a.getDate()
                  this.handleDayChange(d)
              }} />


            </div>


        );
    }

    handleDayChange(selectedDay) {
        this.setState({
            selectedDay,
            }

        );
        console.log(selectedDay)
        this.props.onFilterDateTermChange(selectedDay)
    }
}
export  default DateBar;
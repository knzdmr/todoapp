import React, {Component} from 'react'
import axios from 'axios';
import List from './list_list'
import AddList from './add_list'
import Notifications, {notify} from 'react-notify-toast';
import {getJWT} from '../helpers/jwt';
import SearchBar from './search_bar'
import DateBar from './date_select';
import TaskList  from './task_list';
import AddTask from './add_task';
import _ from 'lodash';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedList: null,
            taskLists: [],
            tasks: null,
            selectedTask: '',
            filterDate: new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate(),
            today: new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate(),
            listSearchTerm: '',
            searchTerm: '',
            selectedListName:'No Selected List'

        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if (!jwt) {
            this.props.history.push('/Login')
        } else {
            this.listSearch()
            // if (this.state.selectedList) {
                this.todoSearch(this.state.selectedList, ' ', this.state.today, '')
            // }
        }
    }

    listSearch() {
        axios.get('list/?ordering=-pk',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access')
                }
            }
        ).then((response) => {
            console.log(response);
            this.setState({taskLists: response.data})
            if (!response.data.length == 0) {

                    this.setState({selectedList: response.data[0].pk,selectedListName:response.data[0].title})
                    this.todoSearch(this.state.selectedList, ' ', this.state.today, '')
                console.log(this.state.selectedList)
            } else {
                this.setState({selectedListName:'No Selected List',selectedList:'',taskLists:[]})
                notify.show('your list is empty')
              this.todoSearch(this.state.selectedList, ' ', this.state.today, '')
            }
        })
            .catch(
                err => {
                    this.logout()
                });
    }

    listCreate(title) {

        axios.post('list/', {title: title},
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),


                }
            }
        ).then((response) => {

            this.listSearch();

        })
            .catch(
                err => {
                    this.logout()
                });
    }

    listDelete(clicked) {

        axios.delete('list/' + clicked.pk + '/',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),


                }
            }
        ).then((response) => {
            this.listSearch()
            // notify.show('deleted')
        })
            .catch(
                err => {
                    this.logout()
                });
    }

    listSelect(selected) {
        this.todoSearch(selected.pk, this.state.searchTerm, this.state.today, '')
        this.setState({selectedList: selected.pk,selectedListName:selected.title})


    }

    todoSearch(pk, term, date, status) {
        axios.get('todo/?search=' + term + '&list=' + pk + '&expiration_date=' + date + '&status=' + status,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access')
                }
            }
        ).then((response) => {
            console.log(response);
            this.setState({tasks: response.data})
        })
            .catch(
                err => {
                    this.logout()
                });
    }

    todoCreate(list, task, date) {
        if(!this.state.selectedList==''){
        axios.post('todo/', {list: list, task: task, expiration_date: date},
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),


                }
            }
        ).then((response) => {

            this.todoSearch(this.state.selectedList, this.state.searchTerm, this.state.filterDate, '')
        })
            .catch(
                err => {
                  this.logout()
                });
        }else {
            notify.show('first you should create a list','error',1000)
        }

    }
    todoDone(clicked) {
        var check;
        if (clicked.status == true) {
            check = false
        } else {
            check = true
        }
        axios.patch('todo/' + clicked.pk + '/', {status: check},
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    "Access-Control-Allow-Origin": "*",

                }
            }
        ).then((response) => {
            this.todoSearch(this.state.selectedList, this.state.searchTerm, this.state.filterDate, '')
        })
            .catch(
                err => {
                    this.logout()
                });
    }
    todoDelete(clicked) {

        axios.delete('todo/' + clicked.pk + '/',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    "Access-Control-Allow-Origin": "*",

                }
            }
        ).then((response) => {
            this.todoSearch(this.state.selectedList, this.state.searchTerm, this.state.filterDate, '')
        })
            .catch(
                err => {
                    this.logout()
                });
    }
    logout() {
        localStorage.clear(),
            this.props.history.push('/Login')


    }

    render() {
        const taskCreate = _.debounce((task, date) => {
            this.todoCreate(this.state.selectedList, task, date)
        }, 10);
        return (


            <div>
                <Notifications/>
                <div className='row black'>
                <button className=' form-submit col-md-2 offset-md-10' onClick={() => this.logout()}>logout</button>
                </div>
                <div className='container col-md-12'>
                    <h5 className=''>{'Hi, '+localStorage.getItem('user')}</h5>
                    <div className='row'>
                    <div className='col-md-3 col-sm-12 '>
                        <h5 className='text-center card-header '>ToDo List</h5>
                    <AddList onListCreateClicked={data => this.listCreate(data)}/>
                    <List
                        onListDelClick={clicked => this.listDelete(clicked)}
                        onListSelect={selected => this.listSelect(selected)}
                        checked={this.state.selectedList}
                        lists={this.state.taskLists}/>
                    </div>

                    <div className='col-md-9 col-sm-12 '>

                        <h5 className='text-center card-header '>{this.state.selectedListName}</h5>
                        <div className='container'>
                    <SearchBar onSearchTermChange={term =>{
                        this.setState({searchTerm: term}),
                        this.todoSearch(this.state.selectedList,term,this.state.filterDate,'')}}/>
                    <DateBar onFilterDateTermChange={date =>{
                        this.setState({filterDate: date}),
                        this.todoSearch(this.state.selectedList,this.state.searchTerm,date,'')}}/>
                    <TaskList
                        onTaskButtonClicked={clickedTask => this.todoDelete(clickedTask)}
                        onTaskSelect={selectedTask => this.todoDone(selectedTask)}
                        term={this.state.searchTerm}
                        tasks={this.state.tasks}/>
                    <AddTask onCreateClicked={taskCreate}/>
                    </div>
                    </div>
                    </div>
                    </div>
            </div>

        );
    }
}

export default Main;

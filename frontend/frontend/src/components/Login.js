import React, {Component} from 'react'
import axios from 'axios';


import Notifications, {notify} from 'react-notify-toast';



import {getJWT} from "../helpers/jwt";

class Login extends Component {

    constructor(props) {


        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            isEnabled: 0,
            c: 0,
            show: 1,
            btnName: 'Register',
            head:'Login',
            shake:false,
            fade:false

        }
    }
    componentDidMount(){
        const jwt=getJWT();
        if(jwt){
            this.props.history.push('/')
        }


        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.check = this.check.bind(this);

    }



    change(e) {
        this.setState({
            [e.target.name]: e.target.value,shake:false,fade:false})
        if(this.state.show==1) {
            this.setState({isEnabled:document.getElementById('email').value.length > 0 && document.getElementById('password').value.length > 0})
        }else{
            this.setState({isEnabled:document.getElementById('email').value.length > 0
                && document.getElementById('password').value.length > 0 &&document.getElementById('password2').value.length>0})
        }
        console.log(this.state.email.length,this.state.email)
    }

//
    submit(e){
        e.preventDefault();
        axios.post("token/",{ username: this.state.email, password: this.state.password
        }).then(
            (response) => { localStorage.clear(),localStorage.setItem('jwt-access',response.data['access']) ,localStorage.setItem('jwt-refresh',response.data['refresh']),localStorage.setItem('user',this.state.email),this.props.history.push('/')},
            (error) => { console.log(error),localStorage.clear(),this.setState({c:this.state.c+1})
                if(this.state.c==3){
                    notify.show("3 times wrong combination,are you registered?",'warning',3000);
                    this.setState({c:0}),
                        this.setState({isEnabled:0,password:'',email:''}),
                        this.setState({show:0,btnName:'Login',head:'Register'})
                    document.getElementById('email').focus()
                }else {
                    notify.show("check your username & password", 'error', 1200);
                    this.setState({isEnabled:0,password:'',shake:true})
                }

                document.getElementById('password').value=''

            }

        )}

    submitRegister(e){
        e.preventDefault();
        if(this.state.password!=this.state.password2){
            notify.show("password does not match!", 'error', 3000);
            document.getElementById('password').value='';
            document.getElementById('password2').value='';
            this.setState({password:'',password2:'',shake:true});
            document.getElementById('password').focus();


        }else{

            axios.post("register/",{ username: this.state.email, password: this.state.password
            }).then(
                (response) => {console.log(response), this.setState({show:1,btnName:'Register',head:'Login',email:response.data.username}),notify.show("succesfully registired!",'success',4000)},
                (error) => {  notify.show("username already taken",'warning',3000); this.setState({shake:true})}



            )
        }}
    check(e){
        this.setState({isEnabled:0,password:'',email:'',fade:true}),
            document.getElementById('email').value='',
            document.getElementById('password').value=''
        document.getElementById('password2').value=''

        if(this.state.show==0){
            this.setState({show:1,btnName:'Register',head:'Login'})

        }else{
            this.setState({show:0,btnName:'Login',head:'Register'})
        }
    }

    render() {
        return (

            <div className="center " >
                <Notifications />
                <div className={"card "+(this.state.shake ?'slide':'')+' '+(this.state.fade ? 'fade-io':'')}>
                    <button className='rl' onClick={e=>this.check(e)}>{this.state.btnName}</button>
                    <h1>{this.state.head} </h1>
                    <form onSubmit={e=>this.state.show ? this.submit(e) : this.submitRegister(e)}  >
                        <input id='email' className="form-item" required='True' type="text" name="email" placeholder='username' value={this.state.email} onChange={e => this.change(e)} />
                        <input id='password'className="form-item" required='True' type="password" name="password" placeholder='passwords' value={this.state.password} onChange={e => this.change(e)} />
                        <input id='password2'className="form-item" style={{ display: this.state.show ?   'none':'block'  }} type="password" name="password2" value={this.state.password2} placeholder='password again' onChange={e => this.change(e)} />
                        <button className="form-submit" disabled={!this.state.isEnabled} type="submit">{this.state.head}</button>
                    </form>
                </div>
            </div>

        );
    }
}
export default Login;
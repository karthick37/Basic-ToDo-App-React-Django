import React, { Component } from "react";
import axios from "axios";
export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
        }
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange (event) {
        console.log(event.target.value)
        this.setState({
            user_name: event.target.value
        });
    };

    handleUserSubmit (event) {
        event.preventDefault();
        const post_user = {
            user_name: this.state.user_name,
        }
        console.log(post_user);

        axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/todo-backend/users/',
                data: post_user,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(
                function (response){
                    console.log(response);
                    window.location.reload();
                }
            )
            .catch(
                function (response){
                    console.log(response)
                }
            )

    };
     addToDo (todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        });
    };

    render() {
        return (
            <div>
                <div className="side-box">
                    <h3>
                        Users
                    </h3>
                    <form onSubmit={this.handleUserSubmit} >
                        <div className="form-group">
                             <input name="user_name" value={this.state.user_name} onChange={this.handleUserChange} className="form-control" placeholder="Enter User Name" />
                        </div>
                        <button type="submit" className="form-control btn btn-primary" >Add User</button>
                    </form>
                </div>
            </div>
        );
    }
}

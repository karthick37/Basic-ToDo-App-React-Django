import React, { Component } from "react";
//FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from 'react-data-table-component';

import AddTodo from './AddToDo';
import AddBucket from './AddBucket';
import axios from 'axios';
import AddUser from "./AddUser";


export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state ={
            todos: [],
            users: [],
            buckets: [],
            error: null,
            bucketList: []
        };
        this.getTasks = this.getTasks.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
    }

    refreshTable() {
        this.getTasks();
      }

     getUsers(){
        axios
            .get("http://localhost:8000/api/todo-backend/users/")
            .then(response => {
                this.setState({
                    users: response.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({error, isLoading: false}));
     }

    getTasks(){

    axios
        .get("http://localhost:8000/api/todo-backend/todo_view/")
        .then(response => {
            this.setState({
                todos: response.data,
                isLoading: false
            });
        })
        .catch(error => this.setState({error, isLoading: false}));
    }

    getBuckets(){

    axios
        .get("http://localhost:8000/api/todo-backend/buckets/")
        .then(response => {
            this.setState({
                buckets: response.data,
                isLoading: false
            });
        })
        .catch(error => this.setState({error, isLoading: false}));
    }


    componentDidMount() {
        this.getTasks()
        this.getUsers()
        this.getBuckets()
    }

render() {
    return (
         <div>
             <div className="container-fluid main-container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="container">
                            <h1>TODO List</h1>
                                <table className="table table-bordered table-striped table-sm" >
                                   <thead className="thead-dark">
                                     <tr>
                                        <th scope="col">Id</th>
                                         <th scope="col">User</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Status</th>
                                         <th scope="col">Bucket</th>
                                        <th scope="col">Action</th>
                                     </tr>
                                   </thead>
                                   <tbody className="">
                                       {this.state.todos.map(x => {
                                         return (
                                              <tr key={x.id}>
                                              <td scope="row">{x.id}</td>
                                                  <td>{x.bucket_id.bucket_user.user_name}</td>
                                              <td>{x.task}</td>
                                              <td style={{ color: x.task_status === "Done" ? "green" : "red" }}>{x.task_status}</td>
                                              <td>{x.bucket_id.bucket_name}</td>
                                              <td>
                                                  <button className="btn btn-primary btn-sm" >
                                                    <span>
                                                       <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                                    </span>
                                                </button>
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                 <button className="btn btn-danger btn-sm">
                                                    <span>
                                                       <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                                    </span>
                                                </button>
                                              </td>
                                              </tr>
                                          );
                                       })}
                                    </tbody>
                                </table>
                        </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                <h2>List of Users</h2>
                                <table className="table table-bordered table-striped table-sm">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">UserName</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map(u => {
                                         return (
                                              <tr key={u.id}>
                                                  <td scope="row">{u.id}</td>
                                                  <td>{u.user_name}</td>
                                              </tr>
                                          );
                                       })}
                                    </tbody>
                                </table>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <h2>List of Buckets</h2>
                                    <table className="table table-bordered table-striped table-sm">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Bucket Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.buckets.map(b => {
                                         return (
                                              <tr key={b.id}>
                                                  <td scope="row">{b.id}</td>
                                                  <td>{b.bucket_name}</td>
                                              </tr>
                                          );
                                       })}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>

                     <div className="col-lg-4 col-md-4 col-sm-12">
                        <h2>Add Items</h2>
                         <AddTodo></AddTodo>
                        <AddBucket></AddBucket>
                         <AddUser></AddUser>
                     </div>

                </div>
             </div>
          </div>
    );
  }
}

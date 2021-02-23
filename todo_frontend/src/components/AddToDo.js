import React, { Component } from "react";
import axios from "axios";
export default class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: "",
            bucket: "",
            task_status: "",
            bucketOptions: [],
            todos: []
        }
        this.handleToDoSubmit = this.handleToDoSubmit.bind(this);
        this.handleBucketChange = this.handleBucketChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this)
    }

    handleBucketChange (event) {
        console.log(event.target.value)
        this.setState({
            bucket: event.target.value
        });
    };
    handleTaskChange (event) {
        this.setState({
            task: event.target.value
        });
    }
    handleStatusChange(event)  {
        console.log(event.target.value)
        this.setState({
            task_status: event.target.value
        });
    };

    handleToDoSubmit (event) {
        event.preventDefault();
        const post_task = {
            bucket_id: this.state.bucket,
            task: this.state.task,
            task_status: this.state.task_status
        }
        console.log(post_task);

        axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/todo-backend/todo/',
                data: post_task,
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

     getBuckets(){
        axios
            .get("http://localhost:8000/api/todo-backend/buckets/")
            .then(response => {
                console.log(response)
                this.setState({
                    bucketOptions: response.data,
                });
            })
            .catch(error => this.setState({error, isLoading: false}));
        }
        componentDidMount() {
            this.getBuckets()
        }

    render() {
        let optionTemplate = this.state.bucketOptions.map(v => (
            <option value={v.id}>{v.bucket_name}</option>
        ));
        return (
            <div>
                <div className="side-box">
                    <h3>
                        ToDo
                    </h3>
                    <form onSubmit={this.handleToDoSubmit} >
                        <div className="form-group">
                            <select name="bucket" value={this.state.bucket} onChange={this.handleBucketChange} className="form-control">
                                <option value="">Select Bucket</option>
                                {optionTemplate}
                            </select>
                        </div>
                        <div className="form-group" >
                            <input name="task" value={this.state.task} onChange={this.handleTaskChange} className="form-control" placeholder="Enter Task" />
                        </div>
                        <div className="form-group">
                            <select name="task_status" value={this.state.task_status} onChange={this.handleStatusChange} className="form-control" >
                                <option value="">Select Status</option>
                                <option value="Done" >Done</option>
                                <option value="Pending">Pending</option>
                                <option value="Hold">Hold</option>
                            </select>
                        </div>
                        <button type="submit" className="form-control btn btn-primary" >Add Todo</button>
                    </form>
                </div>
            </div>
        );
    }
}

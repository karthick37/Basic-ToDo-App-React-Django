import React, { Component } from "react";
import axios from "axios";
export default class AddBucket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bucket_name: "",
            bucket_user: "",
            userOptions: [],
        }
        this.handleBucketSubmit = this.handleBucketSubmit.bind(this);
        this.handleBucketChange = this.handleBucketChange.bind(this);
        this.handleBucketuserChange = this.handleBucketuserChange.bind(this);
    }

    handleBucketChange (event) {
        console.log(event.target.value)
        this.setState({
            bucket_name: event.target.value
        });
    };
    handleBucketuserChange (event) {
        this.setState({
            bucket_user: event.target.value
        });
    }

    handleBucketSubmit (event) {
        event.preventDefault();
        const post_task = {
            bucket_user: this.state.bucket_user,
            bucket_name: this.state.bucket_name,
        }
        console.log(post_task);

        axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/todo-backend/buckets/',
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

     getUsers(){
        axios
            .get("http://localhost:8000/api/todo-backend/users/")
            .then(response => {
                console.log(response)
                this.setState({
                    userOptions: response.data,
                });
            })
            .catch(error => this.setState({error, isLoading: false}));
        }
        componentDidMount() {
            this.getUsers()
        }

    render() {
        let optionTemplate = this.state.userOptions.map(v => (
            <option value={v.id}>{v.user_name}</option>
        ));
        return (
            <div>
                <div className="side-box">
                    <h3>
                        Bucket
                    </h3>
                    <form onSubmit={this.handleBucketSubmit} >
                        <div className="form-group">
                             <input name="bucket_name" value={this.state.bucket_name} onChange={this.handleBucketChange} className="form-control" placeholder="Enter Bucket Name" />
                        </div>
                        <div className="form-group">
                            <select name="bucket_user" value={this.state.bucket_user} onChange={this.handleBucketuserChange} className="form-control" >
                                <option value="">Select User</option>
                                {optionTemplate}
                            </select>
                        </div>
                        <button type="submit" className="form-control btn btn-primary" >Add Bucket</button>
                    </form>
                </div>
            </div>
        );
    }
}

import React from "react";
import { connect } from 'react-redux';
import * as actions from "../../actions/index";

class TaskTable extends React.Component {

    state = {
        filterName: '',
        filterStatus: -1, // all: -1; active: 1, deactive: 0
    }

    handleUpdateStatus = (id) => {
        let checkConfirm = window.confirm("Do you want to update status ???");
        if (checkConfirm) {
            this.props.handleUpdateStatus(id);
        }
    }

    handleDeleteTask = (id) => {
        let checkConfirm = window.confirm("Do you want to delete ???");
        if (checkConfirm) {
            this.props.handleDeleteTask(id);
        }
    }

    handleEditTask = (task) => {
        this.props.handleEditTask(task);
    }

    handleSaveTask = (task) => {
        this.props.handleSaveTask(task);
    }

    handleOnChangFilter = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let filter = {
            name: name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus
        }
        this.props.handleFilter(filter);
        this.setState({
            [name]: value
        })
    }

    render() {
        let { tasks, taskEditing, taskFilter, keyword } = this.props;
        if (taskFilter) {
            if (taskFilter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(taskFilter.name) !== -1;
                })
            }
            if (taskFilter.status) {
                tasks = tasks.filter((task) => {
                    if (taskFilter.status === -1) {
                        return task;
                    } else {
                        return task.status === (taskFilter.status === 1 ? true : false);
                    }
                })
            }
        }
        tasks = tasks.filter((task) => {
            if (!keyword) {
                return task;
            } else {
                return task.name.includes(keyword);
            }
        })
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>T??n c??ng vi???c</th>
                            <th>Tr???ng th??i</th>
                            <th>H??nh ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input typet="text" name="filterName"
                                    placeholder="Filter name..." value={this.state.filterName}
                                    onChange={(event) => this.handleOnChangFilter(event)} />
                            </td>
                            <td>
                                <div class="form-group">
                                    <select name="filterStatus"
                                        class="form-control text-center" id="sel1"
                                        onChange={(event) => this.handleOnChangFilter(event)}>
                                        <option value={-1}>T???t c???</option>
                                        <option value={1}>K??ch ho???t</option>
                                        <option value={0}>???n</option>
                                    </select>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        {tasks && tasks.length > 0 &&
                            tasks.map((task, index) => {
                                return (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.name}</td>
                                        <td>
                                            <span onClick={() => this.handleUpdateStatus(task.id)}
                                                className={
                                                    task.status === true ? "status status-enable" : "status status-disable"
                                                }>
                                                {task.status === true ? "K??ch ho???t" : "Ch??a k??ch ho???t"}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-success mr-3"
                                                data-toggle="modal" data-target="#myModal2"
                                                onClick={() => this.handleEditTask(task)}>S???a</button>
                                            <button className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>X??a</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="modal" id="myModal2">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Edit c??ng vi???c</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label for="work">T??n c??ng vi???c:</label>
                                        <input type="text"
                                            name="name" value={taskEditing.name}
                                            className="form-control"
                                            placeholder="T??n c??ng vi???c ..."
                                            id="work" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="sel1">Tr???ng th??i:</label>
                                        <select className="form-control"
                                            name="status" value={taskEditing.status}
                                            id="sel1">
                                            <option value={false}>Ch??a k??ch ho???t</option>
                                            <option value={true}>K??ch ho???t</option>
                                        </select>
                                    </div>
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => this.handleSaveTask()}>Save</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        taskEditing: state.taskEditing,
        taskFilter: state.taskFilter,
        keyword: state.taskSearch,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        handleDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        handleEditTask: (task) => {
            dispatch(actions.editTask(task));
        },
        handleSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        handleFilter: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
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
                            <th>Tên công việc</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
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
                                        <option value={-1}>Tất cả</option>
                                        <option value={1}>Kích hoạt</option>
                                        <option value={0}>Ẩn</option>
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
                                                {task.status === true ? "Kích hoạt" : "Chưa kích hoạt"}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-success mr-3"
                                                data-toggle="modal" data-target="#myModal2"
                                                onClick={() => this.handleEditTask(task)}>Sửa</button>
                                            <button className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>Xóa</button>
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
                                <h4 className="modal-title">Edit công việc</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label for="work">Tên công việc:</label>
                                        <input type="text"
                                            name="name" value={taskEditing.name}
                                            className="form-control"
                                            placeholder="Tên công việc ..."
                                            id="work" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="sel1">Trạng thái:</label>
                                        <select className="form-control"
                                            name="status" value={taskEditing.status}
                                            id="sel1">
                                            <option value={false}>Chưa kích hoạt</option>
                                            <option value={true}>Kích hoạt</option>
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
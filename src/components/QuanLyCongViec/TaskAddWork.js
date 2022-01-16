import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class TaskAddWork extends React.Component {

    state = {
        name: '',
        status: false,
    }

    handleOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        let task = {
            id: Math.floor(Math.random() * 100000),
            name: this.state.name,
            status: Boolean(this.state.status),
        }
        this.props.handleSaveTask(task);
        alert("Save success");
        this.state.name = '';
        this.state.status = false;
    }

    render() {
        return (
            <>
                <button type="button" className="btn btn-primary m-5" data-toggle="modal" data-target="#myModal">
                    Thêm công việc
                </button>
                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm công việc</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="" onSubmit={(event) => this.handleOnSubmit(event)}>
                                    <div className="form-group">
                                        <label for="work">Tên công việc:</label>
                                        <input type="text"
                                            name="name" value={this.state.name}
                                            onChange={(event) => this.handleOnChange(event)}
                                            className="form-control"
                                            placeholder="Tên công việc ..."
                                            id="work" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="sel1">Trạng thái:</label>
                                        <select className="form-control"
                                            name="status" value={this.state.status}
                                            onChange={(event) => this.handleOnChange(event)}
                                            id="sel1">
                                            <option value={false}>Chưa kích hoạt</option>
                                            <option value={true}>Kích hoạt</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
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

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskAddWork);
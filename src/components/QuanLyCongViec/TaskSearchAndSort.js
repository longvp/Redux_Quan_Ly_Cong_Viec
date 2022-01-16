import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";


class TaskSearchAndSort extends React.Component {

    state = {
        searchByName: '',
    }

    handleOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    }

    handleSearch = () => {
        let searchByName = this.state.searchByName;
        this.props.handleSearch(searchByName);
    }

    handleClickSort = (event, sortBy, sortValue) => {
        event.preventDefault();
        this.props.handleSort({
            by: sortBy,
            value: sortValue
        });
        console.log(sortBy);
    }

    render() {
        let { searchByName } = this.state;
        // console.log(this.props.sort);
        return (
            <>
                <form>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                            placeholder="Nhập từ khóa..." name="searchByName"
                            value={searchByName}
                            onChange={(event) => this.handleOnChange(event)} />
                        <div class="input-group-append">
                            <button className="btn btn-primary" type="button"
                                onClick={() => this.handleSearch()}>Tìm</button>
                        </div>
                    </div>
                </form>
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle mb-3" data-toggle="dropdown">
                        Sắp xếp
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#"
                            onClick={(event) => this.handleClickSort(event, 'name', 1)}>Tên A-Z</a>
                        <a className="dropdown-item" href="#"
                            onClick={(event) => this.handleClickSort(event, 'name', -1)}>Tên Z-A</a>
                        <a className="dropdown-item" href="#"
                            onClick={(event) => this.handleClickSort(event, 'status', 1)}>Trạng thái: Kích hoạt</a>
                        <a className="dropdown-item" href="#"
                            onClick={(event) => this.handleClickSort(event, 'status', -1)}>Trạng thái: Chưa kích hoạt</a>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        },
        handleSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchAndSort);
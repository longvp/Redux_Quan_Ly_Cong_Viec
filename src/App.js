import logo from './logo.svg';
import './App.css';
import React from 'react';
import _ from "lodash";
import demo from './trainningRedux/demo';

// ------------------------ Quan ly cong viec ----------------------------
import TaskAddWork from './components/QuanLyCongViec/TaskAddWork';
import TaskSearchAndSort from './components/QuanLyCongViec/TaskSearchAndSort';
import TaskTable from './components/QuanLyCongViec/TaskTable';

class App extends React.Component {

  state = {
    filter: {
      name: '',
      status: -1
    },
    searchByName: '',
    sortBy: '',
    sortValue: 1,
  }

  handleSort = (sortBy, sortValue) => {
    this.setState({
      sortBy,
      sortValue
    })
  }

  render() {
    let { taskEditing, filter, searchByName, sortBy, sortValue } = this.state


    // if (sortBy === 'name') {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) {
    //       return sortValue;
    //     }
    //     else if (a.name < b.name) {
    //       return -sortValue;
    //     } else {
    //       return 0;
    //     }
    //   })
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) {
    //       return -sortValue;
    //     }
    //     else if (a.status < b.status) {
    //       return sortValue;
    //     } else {
    //       return 0;
    //     }
    //   })
    // }

    return (
      <>
        <div className="project-2">
          <h1>Quản lý công việc</h1>
          <TaskAddWork />
          <TaskSearchAndSort />
          <TaskTable />
        </div>
      </>
    )
  }

}

export default App;

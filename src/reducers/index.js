import { combineReducers } from "redux";
import tasks from './tasks';
import taskEditing from './taskEditing';
import taskFilter from './taskFilter';
import taskSearch from './taskSearch';
import taskSort from './taskSort';

const myReducer = combineReducers({
    tasks,
    taskEditing,
    taskFilter,
    taskSearch,
    taskSort
});

export default myReducer;
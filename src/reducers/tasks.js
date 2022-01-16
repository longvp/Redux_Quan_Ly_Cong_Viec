import * as types from '../constants/TypeAction';

let initialState = [
    {
        id: 'id-1',
        name: 'Playing game',
        status: true,
    },
    {
        id: 'id-2',
        name: 'Watching movie',
        status: false,
    },
    {
        id: 'id-3',
        name: 'Doing homework',
        status: false,
    },
];

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL: {
            return state;
        }
        case types.SAVE_TASK: {
            let newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status,
            }
            return [...state, newTask];
        }
        case types.UPDATE_STATUS: {
            let id = action.id;
            let newState = state.map((task) => {
                if (task.id === id) {
                    task.status = !task.status;
                }
                return task;
            })
            return newState;
        }
        case types.DELETE_TASK: {
            let id = action.id;
            let newState = state.filter((task) => {
                return task.id !== id;
            })
            return newState;
        }
        case types.EDIT_TASK: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;
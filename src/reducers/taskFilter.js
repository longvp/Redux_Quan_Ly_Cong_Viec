import * as types from '../constants/TypeAction';

let initialState = {
    name: '',
    status: -1 // all: -1; active: 1, deactive: 0
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK: {
            return {
                name: action.filter.name,
                status: parseInt(action.filter.status)
            };
        }
        default: {
            return state;
        }
    }
}

export default myReducer;

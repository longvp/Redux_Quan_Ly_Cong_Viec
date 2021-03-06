import * as types from '../constants/TypeAction';

let initialState = '';

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK: {
            return action.keyword;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;

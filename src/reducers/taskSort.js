import * as types from '../constants/TypeAction';

let initialState = {
    by: '',
    value: 1 //1 tang; -1 giam
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_TASK: {
            let by = action.sort.by;
            let value = action.sort.value;
            state = {
                by,
                value
            }
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;

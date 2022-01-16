let initialState = {
    sort: {
        by: 'name',
        value: 1 // 1: tang; -1: giam
    }
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SORT': {
            let { by, value } = action.sort;
            return {
                sort: {
                    by,
                    value
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default myReducer;
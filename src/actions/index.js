import * as types from '../constants/TypeAction';

export const listAll = () => {
    return {
        type: types.LIST_ALL,
    };
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS,
        id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task
    }
}

export const filterTask = (filter) => {
    return {
        type: types.FILTER_TASK,
        filter
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH_TASK,
        keyword
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT_TASK,
        sort
    }
}
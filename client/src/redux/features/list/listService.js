import axios from "axios";

const API_URL = '/api/lists/'

const createList = async (listData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, listData, config);

    return response.data;
}

const getList = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}

const deleteList = async (listID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + listID, config);

    return response.data;
}

const updateList = async (listData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + listData._id, listData, config);
    return response.data;
}

const listService = {
    createList,
    getList,
    deleteList,
    updateList
}

export default listService;
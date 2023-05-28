import axios from 'axios';

const API_BASE_URL = 'https://management-api-anas.onrender.com/api';

export const getInventory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        return response.data;
    } catch (error) {
        console.error('Error getting inventory:', error);
        throw error;
    }
};

export const createInventory = async (inventoryData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/inventory`, inventoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory:', error);
        throw error;
    }
};


export const apiCallToUpdateInventory = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const apideleteSelectedInventory = async (inventoryIds) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/inventory`, { data: { ids: inventoryIds } });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete selected inventory.');
    }
};

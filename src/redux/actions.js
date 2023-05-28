import { getInventory, createInventory, apiCallToUpdateInventory, apideleteSelectedInventory } from '../api';

// Action Types
export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';
export const CREATE_INVENTORY_REQUEST = 'CREATE_INVENTORY_REQUEST';
export const CREATE_INVENTORY_SUCCESS = 'CREATE_INVENTORY_SUCCESS';
export const CREATE_INVENTORY_FAILURE = 'CREATE_INVENTORY_FAILURE';
export const UPDATE_INVENTORY_REQUEST = 'UPDATE_INVENTORY_REQUEST';
export const UPDATE_INVENTORY_SUCCESS = 'UPDATE_INVENTORY_SUCCESS';
export const UPDATE_INVENTORY_FAILURE = 'UPDATE_INVENTORY_FAILURE';
export const DELETE_SELECTED_INVENTORY_REQUEST = 'DELETE_SELECTED_INVENTORY_REQUEST';
export const DELETE_SELECTED_INVENTORY_SUCCESS = 'DELETE_SELECTED_INVENTORY_SUCCESS';
export const DELETE_SELECTED_INVENTORY_FAILURE = 'DELETE_SELECTED_INVENTORY_FAILURE';


// Action Creators
export const fetchInventoryRequest = () => ({
    type: FETCH_INVENTORY_REQUEST,
});

export const fetchInventorySuccess = (inventory) => ({
    type: FETCH_INVENTORY_SUCCESS,
    payload: inventory,
});

export const fetchInventoryFailure = (error) => ({
    type: FETCH_INVENTORY_FAILURE,
    payload: error,
});

export const updateInventoryRequest = () => ({
    type: UPDATE_INVENTORY_REQUEST,
});

export const updateInventorySuccess = () => ({
    type: UPDATE_INVENTORY_SUCCESS,
});

export const updateInventoryFailure = (error) => ({
    type: UPDATE_INVENTORY_FAILURE,
    payload: error,
});

export const createInventoryRequest = () => ({
    type: CREATE_INVENTORY_REQUEST,
});

export const createInventorySuccess = (inventory) => ({
    type: CREATE_INVENTORY_SUCCESS,
    payload: inventory,
});

export const createInventoryFailure = (error) => ({
    type: CREATE_INVENTORY_FAILURE,
    payload: error,
});

export const deleteSelectedInventoryRequest = () => ({
    type: DELETE_SELECTED_INVENTORY_REQUEST,
});

export const deleteSelectedInventorySuccess = (inventoryIds) => ({
    type: DELETE_SELECTED_INVENTORY_SUCCESS,
    payload: inventoryIds,
});

export const deleteSelectedInventoryFailure = (error) => ({
    type: DELETE_SELECTED_INVENTORY_FAILURE,
    payload: error,
});

// Thunk to fetch inventory
export const fetchInventory = () => async (dispatch) => {
    dispatch(fetchInventoryRequest());
    try {
        const inventory = await getInventory();
        dispatch(fetchInventorySuccess(inventory));
    } catch (error) {
        dispatch(fetchInventoryFailure(error.message));
    }
};

// Thunk to create inventory
export const createNewInventory = (inventoryData) => async (dispatch) => {
    dispatch(createInventoryRequest());
    try {
        const inventory = await createInventory(inventoryData);
        dispatch(createInventorySuccess(inventory));
    } catch (error) {
        dispatch(createInventoryFailure(error.message));
    }
};

// thunk to update the inventory
export const updateInventory = (id, updatedData) => async (dispatch) => {
    try {
        dispatch(updateInventoryRequest());

        // Make an API call to update the inventory item using the provided `id` and `updatedData`
        // Replace the `apiCallToUpdateInventory` with your actual API call
        const response = await apiCallToUpdateInventory(id, updatedData);
        console.log(response);
        // Dispatch the success action
        dispatch(updateInventorySuccess());

        // Optionally, you can dispatch the fetchInventory action to update the inventory list
        // dispatch(fetchInventory());
    } catch (error) {
        // Dispatch the failure action with the error message
        dispatch(updateInventoryFailure(error.message));
    }
};

// ...existing code...

export const deleteSelectedInventory = (inventoryIds) => async (dispatch) => {
    
    try {
        // console.log(inventoryIds);
            // Make the API call to delete the selected inventory
            await apideleteSelectedInventory(inventoryIds);

            dispatch(deleteSelectedInventorySuccess(inventoryIds));
        } catch (error) {
            dispatch(deleteSelectedInventoryFailure(error.message));
        }
};

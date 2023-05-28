import {
    FETCH_INVENTORY_REQUEST,
    FETCH_INVENTORY_SUCCESS,
    FETCH_INVENTORY_FAILURE,
    CREATE_INVENTORY_REQUEST,
    UPDATE_INVENTORY_REQUEST,
    UPDATE_INVENTORY_SUCCESS,
    UPDATE_INVENTORY_FAILURE,
    CREATE_INVENTORY_SUCCESS,
    CREATE_INVENTORY_FAILURE,
    DELETE_SELECTED_INVENTORY_REQUEST,
    DELETE_SELECTED_INVENTORY_SUCCESS,
    DELETE_SELECTED_INVENTORY_FAILURE,
} from './actions';

const initialState = {
    inventory: [],
    selectedInventory: [],
    loading: false,
    error: null,
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVENTORY_REQUEST:
        case CREATE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                inventory: action.payload,
                loading: false,
                error: null,
            };
        case CREATE_INVENTORY_SUCCESS:
            return {
                ...state,
                inventory: [...state.inventory, action.payload],
                loading: false,
                error: null,
            };
        case FETCH_INVENTORY_FAILURE:
        case CREATE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case UPDATE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_SELECTED_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case DELETE_SELECTED_INVENTORY_SUCCESS:
            const updatedInventory = state.inventory.filter(
                (item) => !action.payload.includes(item.id)
            );

            return {
                ...state,
                inventory: updatedInventory,
                selectedInventory: [],
                loading: false,
                error: null,
            };

        case DELETE_SELECTED_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            
        default:
            return state;
    }
};

export default inventoryReducer;

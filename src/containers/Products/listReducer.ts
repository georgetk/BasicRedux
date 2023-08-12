import {Reducer} from 'redux';
import {
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_FAILURE,
  FETCHING_PRODUCTS_SUCCESS,
  PRODUCT_OBJECT,
  UPDATE_COUNT,
} from './listActions';

export interface STATE_OBJECT {
  isLoading: boolean;
  products: PRODUCT_OBJECT[];
  error: string | null | undefined;
}

const INITIAL_STATE: STATE_OBJECT = {
  isLoading: false,
  products: [],
  error: null,
};

type PAYLOAD_TYPE = {
  error?: string;
  products: PRODUCT_OBJECT[];
};

export interface ACTION_INTERFACE {
  type: string;
  payload: PAYLOAD_TYPE;
}

export const listReducer: Reducer<STATE_OBJECT, ACTION_INTERFACE> = (
  state = INITIAL_STATE,
  action: ACTION_INTERFACE,
): STATE_OBJECT => {
  switch (action.type) {
    case FETCHING_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCHING_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
      };

    case FETCHING_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case UPDATE_COUNT:
      return {
        ...state,
        products: action.payload.products,
      };

    default:
      return state;
  }
};

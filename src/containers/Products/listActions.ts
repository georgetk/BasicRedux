import {AnyAction, Dispatch} from 'redux';
import {PRODUCTS_ENDPOINT, axiosService} from '../../axios';
import {ThunkAction} from 'redux-thunk';
import {STATE_OBJECT} from './listReducer';

export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS';
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE';
export const UPDATE_COUNT = 'UPDATE_COUNT';

export enum PRODUCT_COUNT_OPERATION {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}

export interface PRODUCT_OBJECT {
  colour: string;
  id: number;
  img: string;
  name: string;
  price: number;
  count: number;
}

type ERROR_PAYLOAD = string;

const fetchingProductsAction = () => ({type: FETCHING_PRODUCTS, payload: null});

const fetchingProductsSuccessAction = (payload: PRODUCT_OBJECT[]) => ({
  type: FETCHING_PRODUCTS_SUCCESS,
  payload: {products: payload},
});

const fetchingProductsFailureAction = (payload: ERROR_PAYLOAD) => ({
  type: FETCHING_PRODUCTS_FAILURE,
  payload: {error: payload},
});

export const updateCountAction = (payload: PRODUCT_OBJECT[]) => ({
  type: UPDATE_COUNT,
  payload: {products: payload},
});

export const fetchProductsThunk = (): ThunkAction<
  void,
  STATE_OBJECT,
  unknown,
  AnyAction
> => {
  return async (disptach: Dispatch<AnyAction>) => {
    try {
      disptach(fetchingProductsAction());

      const response = await axiosService.get<PRODUCT_OBJECT[]>(
        PRODUCTS_ENDPOINT,
      );

      const productsWithCount = response.data.map(item => ({
        ...item,
        count: 0,
      }));

      disptach(fetchingProductsSuccessAction(productsWithCount));
    } catch (error) {
      disptach(
        fetchingProductsFailureAction(
          'Something went wrong while fetching the products.',
        ),
      );
    }
  };
};

export const modifiedList = (
  id: number,
  products: PRODUCT_OBJECT[],
  type: string,
) =>
  products.map(item => {
    if (item.id === id) {
      return {
        ...item,
        count:
          type === PRODUCT_COUNT_OPERATION.INCREMENT
            ? (item?.count || 0) + 1
            : item?.count >= 1
            ? item?.count - 1
            : 0,
      };
    }

    return item;
  });

export const updateCountThunk =
  (id: number, products: PRODUCT_OBJECT[], type: string) =>
  (disptach: Dispatch) =>
    disptach(updateCountAction(modifiedList(id, products, type)));

import thunk from 'redux-thunk';
import {
  PRODUCT_COUNT_OPERATION,
  modifiedList,
  updateCountThunk,
  updateCountAction,
} from './listActions';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialProducts = [
  {
    colour: 'Black',
    count: 10,
    id: 1,
    img: 'http://someURL',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
  },
  {
    colour: 'Pink',
    count: 1,
    id: 2,
    img: 'http://someURL',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 1,
  },
  {
    colour: 'Blue',
    count: 5,
    id: 3,
    img: 'http://someURL',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 7,
  },
];

const productsAfterDecrement = [
  {
    colour: 'Black',
    count: 10,
    id: 1,
    img: 'http://someURL',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
  },
  {
    colour: 'Pink',
    count: 0,
    id: 2,
    img: 'http://someURL',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 1,
  },
  {
    colour: 'Blue',
    count: 5,
    id: 3,
    img: 'http://someURL',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 7,
  },
];

const productsAfterIncrement = [
  {
    colour: 'Black',
    count: 10,
    id: 1,
    img: 'http://someURL',
    name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
    price: 10,
  },
  {
    colour: 'Pink',
    count: 2,
    id: 2,
    img: 'http://someURL',
    name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
    price: 1,
  },
  {
    colour: 'Blue',
    count: 5,
    id: 3,
    img: 'http://someURL',
    name: 'Black Frill Tie Shoulder Bodycon Dress',
    price: 7,
  },
];

const productId = 2;

describe('Checking count update scenarios:', () => {
  it('should correctly decrement the product count', () => {
    expect(
      modifiedList(
        productId,
        initialProducts,
        PRODUCT_COUNT_OPERATION.DECREMENT,
      ),
    ).toEqual(productsAfterDecrement);
  });

  it('should correctly increment the product count', () => {
    expect(
      modifiedList(
        productId,
        initialProducts,
        PRODUCT_COUNT_OPERATION.INCREMENT,
      ),
    ).toEqual(productsAfterIncrement);
  });

  it('should correctly decrement and dispatch the correct action', () => {
    // Initial state and input data
    const initialState = {
      isLoading: false,
      products: initialProducts,
      error: null,
    };

    const type = PRODUCT_COUNT_OPERATION.DECREMENT;

    const store = mockStore(initialState);

    // Dispatch the thunk
    store.dispatch(updateCountThunk(productId, initialState.products, type));

    // Get the dispatched actions
    const dispatchedActions = store.getActions();

    // Assert the dispatched action
    expect(dispatchedActions).toEqual([
      updateCountAction(productsAfterDecrement),
    ]);
  });

  it('should correctly increment and dispatch the correct action', () => {
    // Initial state and input data
    const initialState = {
      isLoading: false,
      products: initialProducts,
      error: null,
    };

    const type = PRODUCT_COUNT_OPERATION.DECREMENT;

    const store = mockStore(initialState);

    // Dispatch the thunk
    store.dispatch(updateCountThunk(productId, initialState.products, type));

    // Get the dispatched actions
    const dispatchedActions = store.getActions();

    // Assert the dispatched action
    expect(dispatchedActions).toEqual([
      updateCountAction(productsAfterDecrement),
    ]);
  });
});

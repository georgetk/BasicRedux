import {Dispatch} from 'redux';
import {
  PRODUCT_COUNT_OPERATION,
  updateCount,
  updateCountAction,
} from './listActions';

// Mock the action creator
jest.mock('./listActions', () => ({
  updateCountAction: jest.fn(),
}));

// Mock dispatch
const dispatch: Dispatch = jest.fn();

describe('updateCount thunk', () => {
  it('should dispatch the correct action for increment', async () => {
    const id = 1;
    const products = [
      {id: 1, count: 0, colour: 'balck', price: 1, name: 'test1', img: 'img1'},
      {id: 2, count: 2, colour: 'balck', price: 1, name: 'test2', img: 'img2'},
    ];

    // Mock the action creator's return value
    (updateCountAction as jest.Mock).mockReturnValue({
      type: 'UPDATE_COUNT',
      payload: products,
    });

    // Call the thunk function
    updateCount(id, products, PRODUCT_COUNT_OPERATION.INCREMENT)(dispatch);

    // Check if the expected actions were dispatched
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_COUNT',
      payload: products,
    });
  });

  // Add more test cases for different scenarios
});

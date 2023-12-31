import {AnyAction, Store, configureStore} from '@reduxjs/toolkit';
import {
  ACTION_INTERFACE,
  STATE_OBJECT,
  listReducer,
} from '../containers/Products/listReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

export const store: Store<STATE_OBJECT, ACTION_INTERFACE> = configureStore({
  reducer: listReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

type AppState = ReturnType<typeof listReducer>;

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

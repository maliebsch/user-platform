import rootReducer from '../store/reducers/rootReducer';
import { createStore } from 'redux';

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState);
};

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

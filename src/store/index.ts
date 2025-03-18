import {configureStore} from '@reduxjs/toolkit';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

import sagaMiddleware from './middleware/saga';
import reactotron from '../../ReactotronConfig';

const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: createRootReducer,
  enhancers: __DEV__ ? [reactotron.createEnhancer!()] : [],
  middleware,
});

sagaMiddleware.run(rootSaga);

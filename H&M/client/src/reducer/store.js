import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import commonUiReducer from './commonUIReducer';
import orderReducer from './orderReducer';
import favoriteReducer from './favoriteReducer';
import bannerReducer from './bannerReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		product: productReducer,
		cart: cartReducer,
		ui: commonUiReducer,
		order: orderReducer,
		favorite: favoriteReducer,
		banner: bannerReducer,
	},
});
export default store;

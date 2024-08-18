import { Add_Goods, Remove_Goods, Update_Goods } from "./Actions";
import data from "./Data";

const initialState = data;

const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_Goods:
            return [...state, action.payload];
        case Remove_Goods:
            return state.filter((goods) => goods.productId !== action.payload);
        case Update_Goods:
            return state.map((goods) =>
                goods.productId === action.payload.productId ? { ...goods, ...action.payload } : goods
            );
        default:
            return state;
    }
};

export default goodsReducer;

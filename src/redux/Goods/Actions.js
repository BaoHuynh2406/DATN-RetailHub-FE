export const Add_Goods = 'Add_Goods';
export const Remove_Goods = 'Remove_Goods';
export const Update_Goods = 'Update_Goods';

export const addGoods = (goods) => ({
    type: Add_Goods,
    payload: goods,
});

export const removeGoods = (id) => ({
    type: Remove_Goods,
    payload: id,
});

export const updateGoods = (goods) => ({
    type: Update_Goods,
    payload: goods,
});

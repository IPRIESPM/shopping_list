import supabaseConnection from '../config/supabase';

const getShoppingListsDb = async (userId) => {
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

const getShoppingListByIDB = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select()
      .eq('id', id);

    if (error) {
      return false;
    }

    return data[0];
  } catch (error) {
    return false;
  }
};

const getProductsByShoppingListIdBD = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list_product')
      .select(`
      amount,
      product(*)
    `)
      .eq('shopping_list_id', id);

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};
const createShoppingListDB = async (name, user) => {
  const { data, error } = await supabaseConnection
    .from('shopping_list')
    .insert(
      [{ name, user_id: user.id }],
    )
    .select();

  if (error) {
    return false;
  }

  return data;
};
const deleteShoppingListDB = async (id) => {
  const { data, error } = await supabaseConnection
    .from('shopping_list')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return false;
  }

  return data;
};

const addProductToShoppingListDB = async (shoppingListId, productDetails) => {
  const { amount, id } = productDetails;

  const { data, error } = await supabaseConnection
    .from('shopping_list_product')
    .insert([
      {
        shopping_list_id: shoppingListId,
        product_id: id,
        amount,
      },
    ])
    .select();

  if (error) {
    return false;
  }

  return data;
};

const updateProductAmountDB = async (shoppingListId, productDetails) => {
  const { amount, id } = productDetails;

  const { data, error } = await supabaseConnection
    .from('shopping_list_product')
    .update({ amount })
    .eq('shopping_list_id', shoppingListId)
    .eq('product_id', id)
    .select();

  if (error) {
    return false;
  }

  return data;
};

const deleteProductFromShoppingListDB = async (shoppingListId, productId) => {
  const { data, error } = await supabaseConnection
    .from('shopping_list_product')
    .delete()
    .eq('shopping_list_id', shoppingListId)
    .eq('product_id', productId)
    .select();

  if (error) {
    return false;
  }

  return data;
};

export {
  getShoppingListsDb,
  getShoppingListByIDB,
  getProductsByShoppingListIdBD,
  createShoppingListDB,
  deleteShoppingListDB,
  addProductToShoppingListDB,
  updateProductAmountDB,
  deleteProductFromShoppingListDB,
};

/* eslint-disable prefer-destructuring */
import supabaseConnection from '../config/supabase';

const getShoppingListsDb = async (userId) => {
  let response;
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select('*')
      .eq('user_id', userId);

    if (error) response = false;
    else response = data;

    return response;
  } catch (error) {
    return false;
  }
};
const getShoppingListsDbForEditor = async () => {
  let response;
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select('*');

    if (error) response = false;
    else response = data;

    return response;
  } catch (error) {
    return false;
  }
};
const getShoppingListByIDB = async (id) => {
  try {
    let response;
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select()
      .eq('id', id);

    if (error) response = false;
    else response = data[0];

    return response;
  } catch (error) {
    return false;
  }
};

const getProductsByShoppingListIdBD = async (id) => {
  try {
    let response;
    const { data, error } = await supabaseConnection
      .from('shopping_list_product')
      .select(`
      amount,
      product(*)
    `)
      .eq('shopping_list_id', id);

    if (error) response = false;
    else response = data;

    return response;
  } catch (error) {
    return false;
  }
};
const createShoppingListDB = async (name, user) => {
  let response;
  const { data, error } = await supabaseConnection
    .from('shopping_list')
    .insert(
      [{ name, user_id: user }],
    )
    .select();

  if (error) response = false;
  else response = data;

  return response;
};
const deleteShoppingListDB = async (id) => {
  let response;
  const { data, error } = await supabaseConnection
    .from('shopping_list')
    .delete()
    .eq('id', id)
    .select();

  if (error) response = false;
  else response = data;

  return response;
};

const addProductToShoppingListDB = async (shoppingListId, productDetails) => {
  const { amount, id } = productDetails;
  let response;
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

  if (error) response = false;
  else response = data;

  return response;
};

const updateProductAmountDB = async (shoppingListId, productDetails) => {
  const { amount, id } = productDetails;
  let response;
  const { data, error } = await supabaseConnection
    .from('shopping_list_product')
    .update({ amount })
    .eq('shopping_list_id', shoppingListId)
    .eq('product_id', id)
    .select();

  if (error) response = false;
  else response = data;

  return response;
};

const deleteProductFromShoppingListDB = async (shoppingListId, productId) => {
  let response;
  const { data, error } = await supabaseConnection
    .from('shopping_list_product')
    .delete()
    .eq('shopping_list_id', shoppingListId)
    .eq('product_id', productId)
    .select();

  if (error) response = false;
  else response = data;

  return response;
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
  getShoppingListsDbForEditor,
};

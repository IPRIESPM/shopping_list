import supabaseConnection from '../config/supabase';

const getShoppingListsDb = async () => {
  try {
    const { data, error } = await supabaseConnection
      .from('shopping_list')
      .select('*');

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
      console.log(error);
      return false;
    }

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const createShoppingListDB = async (name) => {
  const { data, error } = await supabaseConnection
    .from('shopping_list')
    .insert([
      { name },
    ])
    .select();

  if (error) {
    console.log(error);
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
export {
  getShoppingListsDb,
  getShoppingListByIDB,
  getProductsByShoppingListIdBD,
  createShoppingListDB,
  deleteShoppingListDB,
};

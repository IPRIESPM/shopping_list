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
      product_id,
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

export {
  getShoppingListsDb,
  getShoppingListByIDB,
  getProductsByShoppingListIdBD,
};

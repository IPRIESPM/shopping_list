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

export default getShoppingListsDb;

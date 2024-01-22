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

const getShoppingListByIdB = async (id) => {
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

const getProductsByShoppingListId = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('productos')
      .select('productos.*')
      .innerJoin('productos_lista', { 'productos.id': 'productos_lista.id_producto' })
      .innerJoin('lista_compra', { 'productos_lista.id_lista_compra': 'lista_compra.id' })
      .eq('lista_compra.id', id);

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

export { getShoppingListsDb, getShoppingListByIdB, getProductsByShoppingListId };

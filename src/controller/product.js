import { supabaseConnection } from '../config/supabase';

const updateProduct = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .update(userData)
      .eq('id', userData.id)
      .select();

    if (error) {
      console.log('Error al actualizar el producto a', error);
      return false;
    }

    return data;
  } catch (error) {
    console.log('Error al actualizar el producto', error);
    return false;
  }
};

const createProduct = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .insert([userData])
      .select();

    if (error) {
      console.log('Error al crear el producto a', error);
      return false;
    }

    return data;
  } catch (error) {
    console.log('Error al crear el producto', error);
    return false;
  }
};

const findProductById = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .select()
      .eq('id', id);

    if (error) {
      // console.log(error);
      return false;
    }

    return data[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { updateProduct, findProductById, createProduct };

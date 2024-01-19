import { supabaseConnection } from '../config/supabase';

const updateProductDB = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .update(userData)
      .eq('id', userData.id)
      .select();

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

const createProductDB = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .insert([userData])
      .select();

    if (error) {
      return false;
    }

    return data;
  } catch (error) {
    return false;
  }
};

const findProductByIdDB = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
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

export { updateProductDB, createProductDB, findProductByIdDB };

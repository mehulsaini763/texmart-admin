'use server';

import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from './cookie';

// REGISTER
export const register = async (body) => {
  try {
    const response = await axios({
      url: `${process.env.SERVER_BASE_URL}/api/auth/admin/register`,
      method: 'POST',
      data: body,
    });
    await setCookie('TEXMART_ADMIN_USER', response.data, '6h');
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//LOGIN

//LOGOUT
export const logout = async () => await deleteCookie('TEXMART_ADMIN_USER');

export const getUser = async () => await getCookie('TEXMART_ADMIN_USER');

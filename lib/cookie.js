// 'use server';

// import { cookies } from 'next/headers';
// import { SignJWT, jwtVerify } from 'jose';

// const key = new TextEncoder().encode(process.env.SECRET_KEY); // Ensure key is in correct format

// export async function encrypt(payload, expires) {
//   return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expires).sign(key);
// }

// export async function decrypt(input) {
//   try {
//     const { payload } = await jwtVerify(input, key, {
//       algorithms: ['HS256'],
//     });
//     return payload;
//   } catch (error) {
//     return null;
//   }
// }

// export async function getCookie(name) {
//   if (name) {
//     const session = cookies().get(name)?.value;
//     if (!session) return null;
//     return await decrypt(session);
//   } else {
//     console.log('Invalid Cookie Name');
//     return false;
//   }
// }

// export async function setCookie(name, data, expires = '24h') {
//   try {
//     const session = await encrypt(data, expires);
//     cookies().set(name, session, { httpOnly: true });
//     return true;
//   } catch (error) {
//     console.log('UNABLE TO SET COOKIE', error);
//     return false;
//   }
// }

// export async function deleteCookie(name) {
//   if (name) {
//     cookies().delete(name);
//     return true;
//   } else {
//     console.log('Invalid Cookie Name');
//     return false;
//   }
// }

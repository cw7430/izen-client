export const getCookies = (request: Request) => {
  const cookieHeader = request.headers.get('Cookie');

  return cookieHeader
    ? Object.fromEntries(
        cookieHeader.split(';').map((cookie) => {
          const [key, ...value] = cookie.trim().split('=');
          return [key, value.join('=')];
        }),
      )
    : undefined;
};

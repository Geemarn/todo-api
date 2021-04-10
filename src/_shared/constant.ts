export const jwtSecret = 'test';
export const statusEnum = ['Pending', 'Completed', 'Progress'];
export const response = (status, data, token = '') => {
  let meta = {
    statusCode: status,
    Success: true,
  };
  if (token) meta['token'] = token;
  return {
    meta,
    data,
  };
};

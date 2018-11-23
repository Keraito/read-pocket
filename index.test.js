import { obtainRequestToken, obtainAccessToken } from '.';

describe('The Pocket API', () => {
  const consumerKey = '82175-555ac50456965486c86eeb53';
  test('should correctly obtain the request token.', () => {
    const result = obtainRequestToken(consumerKey);
    return expect(result).resolves.toHaveProperty('code');
  });

  // test('should correctly convert a request token into a Pocket access token.', () => {
  //   const result = obtainAccessToken();
  //   expect(result).toHaveProperty('access_token');
  //   expect(result).toHaveProperty('username');
  // });
});

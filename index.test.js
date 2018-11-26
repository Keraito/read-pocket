import { obtainRequestToken, obtainAccessToken, getArticles } from '.';

describe('The Pocket API', () => {
  const consumerKey = '82175-555ac50456965486c86eeb53';
  let requestToken;
  let access_token;

  test('should correctly obtain the request token.', async () => {
    const result = await obtainRequestToken(consumerKey);
    expect(result).toHaveProperty('code');
    requestToken = result.code;
  }, 10000);

  test('should correctly convert a request token into a Pocket access token.', async () => {
    expect(requestToken).toBeTruthy();
    const result2 = await obtainAccessToken(consumerKey, requestToken);
    expect(result2).toHaveProperty('access_token');
    expect(result2).toHaveProperty('username');
    access_token = result2.access_token;
  });

  test('should correctly retrieve an article', async () => {
    expect(access_token).toBeTruthy();
    const result3 = await getArticles(consumerKey, access_token);
    expect(result3.status).toBeTruthy();
    expect(Object.keys(result3.list).length).toBeGreaterThan(0);
  }, 10000);
});

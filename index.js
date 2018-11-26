import request from 'request';
import open from 'open';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Accept': 'application/json',
};

const urls = {
  request: 'https://getpocket.com/v3/oauth/request',
  authorize: 'https://getpocket.com/v3/oauth/authorize',
  get: 'https://getpocket.com/v3/get',
  redirect: 'https://github.com',
};

export const obtainRequestToken = consumerKey =>
  new Promise((res, rej) => {
    const options = {
      headers,
      url: urls.request,
      body: `consumer_key=${consumerKey}&redirect_uri=${urls.redirect}`,
    };
    request.post(options, (err, resp, body) => {
      if (err) rej(err);
      const result = JSON.parse(body);
      redirect(result.code);
      res(result);
    });
  });

const redirect = requestToken =>
  open(
    `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${
      urls.redirect
    }`
  );

export const obtainAccessToken = (consumerKey, requestToken) =>
  new Promise((res, rej) => {
    const options = {
      headers,
      url: urls.authorize,
      body: `consumer_key=${consumerKey}&code=${requestToken}`,
    };
    request.post(options, (err, resp, body) => {
      if (err) rej(err);
      res(JSON.parse(body));
    });
  });

export const getArticles = (consumerKey, accessToken) =>
  new Promise((res, rej) => {
    const options = {
      headers,
      url: urls.get,
      body: `consumer_key=${consumerKey}&access_token=${accessToken}&count=1&contentType=article`,
    };
    request.post(options, (err, resp, body) => {
      if (err) rej(err);
      res(JSON.parse(body));
    });
  });

import request from 'request';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Accept': 'application/json',
};

const urls = {
  request: 'https://getpocket.com/v3/oauth/request',
};

export const obtainRequestToken = consumerKey =>
  new Promise((res, rej) => {
    const options = {
      headers,
      url: urls.request,
      body:
        'consumer_key=' +
        consumerKey +
        '&redirect_uri=pocketapp1234:authorizationFinished',
    };
    request.post(options, (err, resp, body) => {
      if (err) rej(err);
      res(JSON.parse(body));
    });
  });

export const obtainAccessToken = () => undefined;

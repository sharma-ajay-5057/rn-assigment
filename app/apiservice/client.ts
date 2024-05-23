import axios from 'axios';

export const client = async (
  endpoint: any,
  methodType: any,
  body: any,
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const config = {
    method: methodType,
    headers: {
      ...headers,
    },
  };

  if (body) {
    config.body = body;
  }

  return new Promise(async (resolve, reject) => {
    const response = await axios({
      method: config.method,
      url: endpoint,
      data: config?.body,
      Accept: 'application/json',
      headers: config.headers,
    })
      .then(async result => {
        resolve(result);
      })
      .catch(err => {
        console.log('------- err', err);
        reject(err);
      });
  });
};

client.get = async function (endpoint: any) {
  return client(endpoint, 'GET', null);
};

client.post = async function (endpoint: any, body: any) {
  return client(endpoint, 'POST', body);
};

client.put = async function (endpoint: any, body: any) {
  return client(endpoint, 'PUT', body);
};

client.delete = async function (endpoint: any, body: any) {
  return client(endpoint, 'DELETE', body);
};

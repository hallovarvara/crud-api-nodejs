import { IncomingMessage } from 'http';

type GetPostDataF = (props: { req: IncomingMessage }) => Promise<string>;

export const getPostData: GetPostDataF = ({ req }) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });

      req.on('error', () => {
        reject('Request has wrong format');
      });
    } catch (error) {
      reject(error);
    }
  });

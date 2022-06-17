export const getPostData = ({ req }) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
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
};

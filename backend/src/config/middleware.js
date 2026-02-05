import path from 'path';

export const unknownEndpoint = (request, response) => {
  response.sendFile(path.join(path.resolve(), 'dist/index.html'));

};
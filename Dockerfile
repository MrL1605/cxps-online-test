FROM node:12-slim

WORKDIR /cxps
CMD ["node", "/cxps/src/index.js"]

ADD . /cxps
RUN npm install


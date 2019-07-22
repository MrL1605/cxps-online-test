FROM node:12-slim

WORKDIR /cxps
CMD ["node", "/cxps/src/index.js"]

VOLUME /cxps/questions_dir /cxps/submission_dir /cxps/ui/assets/ext-images

ADD . /cxps
RUN npm install


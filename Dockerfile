FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY start.sh .
RUN RUN ["chmod", "+x", "./start.sh"]
EXPOSE 3000
COPY . .
ENTRYPOINT [ "sh", "./start.sh" ]
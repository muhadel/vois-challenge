FROM node:alpine
WORKDIR /app
COPY . .
COPY .env.example .env
RUN ["npm", "i", "-g", "typescript" ,"pm2", "@nestjs/cli"]
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
EXPOSE 5000
CMD ["pm2-runtime", "process.yml"]
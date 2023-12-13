FROM node:21-alpine AS deps
WORKDIR /app
COPY package.json .
RUN --mount=type=cache,target=/app/node_modules npm i

FROM node:21-alpine AS build
WORKDIR /app
COPY --from=deps /app .
COPY . .
RUN ["npx","prisma", "generate"]
RUN ["npm", "run", "build"]

FROM node:21-alpine AS run
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["sh","-c","npx prisma migrate deploy && node dist/src/main"]

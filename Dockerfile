# 选择基础镜像
FROM node:18-alpine as build
# 设置工作目录
WORKDIR /app
# 复制 package.json 和 package-lock.json
# 安装依赖
# Install dependencies based on the preferred package manager
#COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY server/package.json server/package-lock.json ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY server/ .

# 安装项目依赖
#RUN npm install && npx webpack
RUN npm run build

FROM node:18-alpine 
WORKDIR /app
COPY --from=build /app/dist/ .
# 暴露端口
EXPOSE 41403

# 设置启动命令
CMD [ "node", "./index.js" ]

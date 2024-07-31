# 选择基础镜像
FROM node:18-alpine as build
# 设置工作目录
WORKDIR /app
# 复制 package.json 和 package-lock.json
COPY server/ .

# 安装项目依赖
RUN npm install && npx webpack

FROM node:18-alpine 
WORKDIR /app
COPY --from=build /app/dist/ .
# 暴露端口
EXPOSE 41403

# 设置启动命令
CMD [ "node", "./index.js" ]

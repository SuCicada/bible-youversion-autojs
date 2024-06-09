# 选择基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY . .

# 安装项目依赖
RUN make install

# 复制项目代码到工作目录
COPY . .

# 暴露端口
EXPOSE 41403

# 设置启动命令
CMD [ "make", "start" ]

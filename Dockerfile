FROM --platform=linux/amd64 node:20


WORKDIR /app

# 复制api和socket目录的package*.json文件
COPY api/package*.json ./api/


RUN npm cache clean --force

# 安装依赖
RUN cd api && npm install

# 复制项目文件
COPY api ./api
COPY start.sh .


EXPOSE 8800



# 在这里添加 chmod 命令
RUN chmod +x start.sh

# 设置启动命令
CMD ["/bin/sh", "start.sh"]
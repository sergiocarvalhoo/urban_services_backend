FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependências
RUN npm ci

# Copiar arquivos Prisma e gerar cliente
COPY prisma ./prisma/
RUN npx prisma generate

# Copiar todo o código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Verificar se o arquivo foi gerado corretamente
RUN ls -la dist/main.js || exit 1

# Limpar dependências de desenvolvimento
RUN npm ci --only=production

# Configurar variáveis de ambiente
ENV NODE_ENV=production \
    PORT=3000

EXPOSE ${PORT}

# Script para esperar o banco e aplicar migrações
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:${PORT}/api || exit 1

# Usar o script como ponto de entrada
ENTRYPOINT ["docker-entrypoint.sh"]

# Comando padrão
CMD ["node", "dist/main.js"]
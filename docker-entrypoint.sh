#!/bin/sh

# Aguardar pelo PostgreSQL
echo "Aguardando o PostgreSQL iniciar..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL iniciado"

# Aplicar migrações do Prisma
echo "Executando migrações do Prisma..."
npx prisma migrate deploy
echo "Migrações concluídas"

# Executar o comando passado como argumento
exec "$@"
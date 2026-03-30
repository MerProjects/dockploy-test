#!/bin/sh
# start.sh: Run prisma db push then start the next.js standalone server

echo "Synchronizing database schema..."
# Push the schema to ensure the database matches our Prisma files
npx prisma db push --accept-data-loss

echo "Starting Next.js application..."
# Start the Next.js standalone server
node server.js

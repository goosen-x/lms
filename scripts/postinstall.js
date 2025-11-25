#!/usr/bin/env node

/**
 * Postinstall script для генерации Prisma клиента
 * Использует dummy DATABASE_URL если переменная не установлена
 */

const { execSync } = require('child_process');

// Если DATABASE_URL не установлен, используем dummy значение для генерации типов
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, using dummy URL for Prisma type generation...');
  process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy?schema=public';
}

try {
  console.log('🔄 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully!');
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message);
  process.exit(1);
}

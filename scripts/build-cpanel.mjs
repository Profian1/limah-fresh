import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const productionDir = path.join(rootDir, 'production');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

console.log('🚀 Starting cPanel optimized build process...');

// 1. Build the Next.js app
try {
  console.log('📦 Building Next.js app...');
  execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.error('❌ Build failed. Please check the errors above.');
  process.exit(1);
}

// 2. Prepare production directory
console.log('🧹 Preparing production directory...');
if (fs.existsSync(productionDir)) {
  fs.rmSync(productionDir, { recursive: true, force: true });
}
fs.mkdirSync(productionDir, { recursive: true });

// 3. Move standalone files
console.log('📂 Copying standalone files...');
if (!fs.existsSync(standaloneDir)) {
  console.error('❌ Standalone directory not found. Is output: "standalone" set in next.config.ts?');
  process.exit(1);
}
fs.cpSync(standaloneDir, productionDir, { recursive: true });

// 4. Copy public folder
console.log('🖼️ Copying public directory...');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(productionDir, 'public');
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// 5. Copy .next/static folder
console.log('✨ Copying .next/static directory...');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(productionDir, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.join(productionDir, '.next'), { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}

console.log('✅ Build complete! The "production" folder is ready for cPanel.');
console.log('👉 Just upload the contents of the "production" folder to your cPanel.');

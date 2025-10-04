#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying to Vercel...\n');

// Check if vercel.json exists
const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
if (!fs.existsSync(vercelConfigPath)) {
  console.error('❌ vercel.json not found! Please ensure the file exists.');
  process.exit(1);
}

// Check if _redirects exists
const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.error('❌ _redirects file not found in public folder!');
  process.exit(1);
}

try {
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if dist folder exists
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build failed! dist folder not found.');
    process.exit(1);
  }
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Build output:', distPath);
  
  // Deploy to Vercel
  console.log('\n🚀 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your app should now be live on Vercel with proper SPA routing.');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

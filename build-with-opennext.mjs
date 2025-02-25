#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// We'll use an auto-discovery tool for routes
import { execFileSync } from 'child_process';

async function main() {
  console.log('🚀 Starting enhanced OpenNext build process for Cloudflare Workers...');
  
  // Step 1: Remove output: 'export' from next.config.js as it's incompatible with OpenNext
  console.log('🔧 Ensuring Next.js configuration is compatible with OpenNext...');
  removeStaticExportFlag();
  
  // Step 2: Add explicit route declarations for OpenNext to process
  console.log('🛣️ Creating route prerendering data...');
  generateRoutesFile();
  
  // Step 3: Run OpenNext builder
  console.log('☁️ Running OpenNext Cloudflare adapter...');
  execSync('npx opennextjs-cloudflare', { stdio: 'inherit' });
  
  // Step 4: Apply post-build modifications if needed
  console.log('📝 Verifying build output...');
  verifyBuildOutput();
  
  console.log('✅ Build complete! Your site is ready to deploy to Cloudflare Workers.');
}

function removeStaticExportFlag() {
  // Read the current next.config.mjs
  const configFile = path.resolve('next.config.mjs');
  let configContent = fs.readFileSync(configFile, 'utf8');
  
  // Make sure there's no output: 'export' in the config
  // as it's incompatible with OpenNext
  if (configContent.includes('output: \'export\'') || configContent.includes('output: "export"')) {
    console.log('🔧 Removing static export flag for OpenNext compatibility');
    configContent = configContent.replace(/output:\s*['"]export['"],?/g, '');
    
    // Write back the modified config
    fs.writeFileSync(configFile, configContent);
  } else {
    console.log('✅ Config already compatible with OpenNext');
  }
  
  // Set trailingSlash to true if not already set
  if (!configContent.includes('trailingSlash')) {
    configContent = configContent.replace(
      /export default withNextra\({/,
      'export default withNextra({\n  trailingSlash: true,'
    );
    
    // Write back the modified config
    fs.writeFileSync(configFile, configContent);
    console.log('✅ Added trailingSlash: true for better URL consistency');
  }
}

function generateRoutesFile() {
  console.log('📖 Discovering routes in the project...');
  
  // Run the route discovery script
  execFileSync('./discover-routes.mjs', { stdio: 'inherit' });
  
  // Read the discovered routes
  const discoveredRoutes = JSON.parse(
    fs.readFileSync('.discovered-routes.json', 'utf8')
  );
  
  // Create the OpenNext routes file
  fs.writeFileSync('.opennext-routes.json', JSON.stringify(discoveredRoutes, null, 2));
  
  return discoveredRoutes.routes.length;
}

function verifyBuildOutput() {
  // Check if .cloudflare directory exists
  const outputDir = '.open-next';
  if (!fs.existsSync(outputDir)) {
    console.error('❌ Output directory not found. Build may have failed.');
    process.exit(1);
  }
  
  console.log('📁 OpenNext build completed successfully.');
  console.log('🔍 To test locally run: wrangler dev .open-next/worker-bundle.js');
  console.log('🚀 To deploy run: wrangler deploy .open-next/worker-bundle.js');
}

main().catch(err => {
  console.error('Failed to build:', err);
  process.exit(1);
});
// Script to update all files from mock usage to API usage
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/Home/components/PartNews/PartNews.js',
  'src/pages/Home/components/Feature/Feature.js', 
  'src/pages/Home/components/AlertBox/AlertBox.js',
  'src/pages/News/components/WhatsNews/WhatsNews.js',
  'src/pages/News/components/WeeklyNews/WeeklyNews.js',
  'src/pages/News/components/TrendingArea/TrendingArea.js',
  'src/pages/News/components/NewsSection/NewsSection.js',
  'src/pages/CompanyInfo/components/Gallery/Gallery.js',
  'src/pages/CompanyInfo/components/Gallery/GalleryDetail.js',
  'src/components/NewsSection/NewsSection.js'
];

const replacements = [
  {
    from: /import.*mockNews.*from.*mockNews.*\n/g,
    to: 'import { getNews, getLatestNews, getFeaturedNews, formatNewsForDisplay } from "../../../services/clientNewsService";\n'
  },
  {
    from: /import.*mockNews.*from.*mockNews.*\n/g,
    to: 'import { getNews, getLatestNews, getFeaturedNews, formatNewsForDisplay } from "../../services/clientNewsService";\n'
  },
  // Add useState and useEffect if not present
  {
    from: /import React from "react"/,
    to: 'import React, { useState, useEffect } from "react"'
  }
];

console.log('Starting mock to API conversion...');

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Apply replacements
    replacements.forEach(replacement => {
      content = content.replace(replacement.from, replacement.to);
    });
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('✅ Mock to API conversion completed!');
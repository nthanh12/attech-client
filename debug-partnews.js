// Debug script for PartNews category issue
console.log("🧪 Debugging PartNews Categories...");

const API_BASE = 'https://localhost:7276';

async function testCategoryAPI() {
  const categoryIds = [2, 4, 5, 6, 7]; // All target categories
  
  console.log("1️⃣ Testing individual category endpoints...");
  
  for (const categoryId of categoryIds) {
    try {
      const url = `${API_BASE}/api/news/find-all?categoryId=${categoryId}&pageIndex=1&pageSize=3&status=1`;
      console.log(`\n🔍 Testing Category ${categoryId}:`);
      console.log(`URL: ${url}`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 1 && data.data) {
        const items = data.data.items || [];
        console.log(`✅ Category ${categoryId} Results:`);
        console.log(`   Total: ${data.data.totalItems || 0}`);
        console.log(`   Returned: ${items.length}`);
        
        if (items.length > 0) {
          items.forEach((item, index) => {
            console.log(`   Item ${index + 1}:`);
            console.log(`     ID: ${item.id}`);
            console.log(`     Title: ${item.titleVi?.substring(0, 50)}...`);
            console.log(`     CategoryId: ${item.newsCategoryId}`);
            console.log(`     Posted: ${item.timePosted}`);
          });
        } else {
          console.log(`   ⚠️ No items found for category ${categoryId}`);
        }
      } else {
        console.log(`❌ Invalid response for category ${categoryId}`);
      }
    } catch (error) {
      console.error(`❌ Error testing category ${categoryId}:`, error);
    }
  }
  
  console.log("\n2️⃣ Testing all news (no category filter)...");
  try {
    const url = `${API_BASE}/api/news/find-all?pageIndex=1&pageSize=10&status=1`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 1 && data.data) {
      const items = data.data.items || [];
      console.log(`✅ All News Results:`);
      console.log(`   Total: ${data.data.totalItems || 0}`);
      console.log(`   Returned: ${items.length}`);
      
      // Group by category
      const byCategory = {};
      items.forEach(item => {
        const catId = item.newsCategoryId;
        if (!byCategory[catId]) byCategory[catId] = [];
        byCategory[catId].push(item);
      });
      
      console.log(`   Distribution by category:`);
      Object.keys(byCategory).forEach(catId => {
        console.log(`     Category ${catId}: ${byCategory[catId].length} items`);
      });
    }
  } catch (error) {
    console.error(`❌ Error testing all news:`, error);
  }
}

// Instructions for manual testing
console.log("\n📝 Manual Testing Instructions:");
console.log("1. Open browser console");
console.log("2. Copy and paste this function:");
console.log("3. Run: testCategoryAPI()");
console.log("4. Check if each category returns different items");

// Export for browser use
if (typeof window !== 'undefined') {
  window.testCategoryAPI = testCategoryAPI;
}
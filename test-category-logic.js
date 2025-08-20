// Test script để kiểm tra logic category filtering
// Chạy trong console browser để test

console.log("🧪 Testing Category Logic...");

// Test function để kiểm tra API endpoints
async function testCategoryAPI() {
  const baseUrl = 'https://localhost:7276';
  
  console.log("1️⃣ Testing getNewsCategories...");
  try {
    const response = await fetch(`${baseUrl}/api/news-category/find-all`);
    const data = await response.json();
    console.log("✅ Categories:", data.data?.items || data);
  } catch (error) {
    console.error("❌ Error loading categories:", error);
  }

  console.log("\n2️⃣ Testing getNewsByCategory with ID=2 (Company Activities)...");
  try {
    const response = await fetch(`${baseUrl}/api/news/find-all?categoryId=2&pageIndex=1&pageSize=5&status=1`);
    const data = await response.json();
    console.log("✅ News by Category ID 2:", data.data?.items?.length || 0, "items");
    if (data.data?.items?.length > 0) {
      console.log("First item category ID:", data.data.items[0].newsCategoryId);
    }
  } catch (error) {
    console.error("❌ Error loading news by category:", error);
  }

  console.log("\n3️⃣ Testing getNewsByCategorySlug...");
  try {
    const response = await fetch(`${baseUrl}/api/news/category/hoat-dong-cong-ty?pageIndex=1&pageSize=5`);
    const data = await response.json();
    console.log("✅ News by Category Slug:", data.data?.items?.length || 0, "items");
    if (data.data?.items?.length > 0) {
      console.log("First item category ID:", data.data.items[0].newsCategoryId);
    }
  } catch (error) {
    console.error("❌ Error with slug endpoint (might not be implemented):", error);
  }

  console.log("\n4️⃣ Testing category mapping...");
  const CATEGORY_IDS = {
    COMPANY_ACTIVITIES: 2,
    COMPANY_PARTY: 4,
    COMPANY_YOUTH_UNION: 5,
    COMPANY_UNION: 6,
    AVIATION_NEWS: 7
  };

  for (const [name, id] of Object.entries(CATEGORY_IDS)) {
    try {
      const response = await fetch(`${baseUrl}/api/news/find-all?categoryId=${id}&pageIndex=1&pageSize=1&status=1`);
      const data = await response.json();
      const count = data.data?.totalItems || 0;
      console.log(`✅ ${name} (ID: ${id}): ${count} total items`);
    } catch (error) {
      console.error(`❌ Error testing ${name}:`, error);
    }
  }
}

// Test client-side components
function testComponentLogic() {
  console.log("\n🔧 Testing Component Logic...");
  
  // Kiểm tra các CATEGORY_IDS constants
  console.log("Category IDs being used:");
  console.log("- COMPANY_ACTIVITIES:", 2);
  console.log("- COMPANY_PARTY:", 4);
  console.log("- COMPANY_YOUTH_UNION:", 5);
  console.log("- COMPANY_UNION:", 6);
  console.log("- AVIATION_NEWS:", 7);

  // Test URL routing
  const testUrls = [
    "/tin-tuc",
    "/tin-tuc/hoat-dong-cong-ty",
    "/tin-tuc/dang-bo-cong-ty",
    "/tin-tuc/doan-thanh-nien-cong-ty",
    "/tin-tuc/cong-doan-cong-ty",
    "/tin-tuc/tin-nganh-hang-khong",
    "/en/news",
    "/en/news/company-activities",
    "/en/news/company-party",
    "/en/news/company-youth-union",
    "/en/news/company-union",
    "/en/news/aviation-news"
  ];

  console.log("\n📋 URLs to test manually:");
  testUrls.forEach(url => {
    console.log(`🔗 http://localhost:3000${url}`);
  });
}

// Check current page
function checkCurrentPage() {
  console.log("\n📍 Current Page Analysis:");
  console.log("URL:", window.location.href);
  console.log("Pathname:", window.location.pathname);
  
  // Check if React components are loaded
  const newsItems = document.querySelectorAll('.newslist-card-minimal, .news-item, .whats-news-card');
  console.log("News items found on page:", newsItems.length);
  
  // Check loading states
  const loadingElements = document.querySelectorAll('[class*="loading"], [class*="spinner"]');
  console.log("Loading elements:", loadingElements.length);
  
  // Check for error messages
  const errorElements = document.querySelectorAll('[class*="error"], [class*="not-found"]');
  console.log("Error elements:", errorElements.length);
}

// Run tests
console.log("🚀 Starting Category Logic Tests...");
console.log("Copy and paste these functions in browser console to test:");
console.log("- testCategoryAPI() - Test API endpoints");
console.log("- testComponentLogic() - Test component logic");
console.log("- checkCurrentPage() - Check current page state");

// Auto-run basic checks
testComponentLogic();
checkCurrentPage();

// Instructions
console.log("\n📝 Manual Testing Instructions:");
console.log("1. Navigate to http://localhost:3000/tin-tuc");
console.log("2. Check if categories are showing in URL/navigation");
console.log("3. Click on different categories and verify URL changes");
console.log("4. Verify each category shows only relevant news");
console.log("5. Check search functionality within categories");
console.log("6. Test both Vietnamese and English versions");

// Expected behavior
console.log("\n✅ Expected Behavior:");
console.log("- /tin-tuc/hoat-dong-cong-ty should show only Company Activities news");
console.log("- /tin-tuc/dang-bo-cong-ty should show only Company Party news");
console.log("- Each category should show different news items");
console.log("- Search should work within category scope");
console.log("- Pagination should maintain category filter");
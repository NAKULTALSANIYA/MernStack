import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FoodImageGallery from './components/FoodImageGallery';
import FoodInformation from './components/FoodInformation';
import FoodDetailsTabs from './components/FoodDetailsTabs';
import RelatedItemsCarousel from './components/RelatedItemsCarousel';
import PopularityMetrics from './components/PopularityMetrics';
import NavigationControls from './components/NavigationControls';

const FoodDetailsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock food item data
  const foodItem = {
    id: 1,
    name: "Classic Beef Burger",
    description: `A mouth-watering classic beef burger made with premium ground beef, fresh lettuce, ripe tomatoes, pickles, and our signature sauce. Served on a toasted sesame seed bun with crispy golden fries.\n\nPerfect for lunch or dinner, this burger combines traditional flavors with high-quality ingredients to deliver an unforgettable dining experience.`,
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    category: "Burgers",
    cuisine: "American",
    dietaryInfo: ["Non-Vegetarian", "Contains Gluten"],
    ingredients: [
      "Premium Ground Beef",
      "Fresh Lettuce",
      "Ripe Tomatoes",
      "Pickles",
      "Sesame Seed Bun",
      "Signature Sauce",
      "Red Onion",
      "Cheese Slice"
    ],
    preparationTime: "15-20 minutes",
    calories: 650,
    rating: 4.5,
    reviewCount: 128,
    availability: "Available",
    tags: ["Popular", "Chef\'s Special"],
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    metrics: {
      totalOrders: 1247,
      weeklyOrders: 89,
      monthlyOrders: 342,
      averageRating: 4.5,
      totalReviews: 128,
      popularityRank: 3,
      categoryRank: 1,
      lastOrderTime: "2 hours ago",
      peakOrderTime: "7:00 PM - 9:00 PM",
      repeatCustomers: 78,
      favoriteCount: 156
    }
  };

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleItemNavigation = (itemId) => {
    // In a real app, this would fetch new item data
    console.log('Navigating to item:', itemId);
    // For demo purposes, we'll just reload the page with new ID
    window.location.href = `/food-details?id=${itemId}`;
  };

  // Custom breadcrumb for food details
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Food Management', path: '/food-details' },
    { label: foodItem?.category, path: `/food-details?category=${foodItem?.category?.toLowerCase()}` },
    { label: foodItem?.name, path: `/food-details/${foodItem?.id}`, isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      {/* Main Content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Navigation Controls */}
          <NavigationControls 
            currentItemId={foodItem?.id}
            onNavigate={handleItemNavigation}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Gallery */}
            <div className="space-y-6">
              <FoodImageGallery 
                images={foodItem?.images}
                foodName={foodItem?.name}
              />
              
              {/* Popularity Metrics - Desktop */}
              <div className="hidden lg:block">
                <PopularityMetrics foodItem={foodItem} />
              </div>
            </div>

            {/* Right Column - Food Information */}
            <div className="space-y-6">
              <FoodInformation foodItem={foodItem} />
              
              {/* Popularity Metrics - Mobile */}
              <div className="lg:hidden">
                <PopularityMetrics foodItem={foodItem} />
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="bg-card border border-border rounded-lg p-6">
            <FoodDetailsTabs foodItem={foodItem} />
          </div>

          {/* Related Items */}
          <div className="bg-card border border-border rounded-lg p-6">
            <RelatedItemsCarousel currentItemId={foodItem?.id} />
          </div>

          {/* Bottom Spacing */}
          <div className="h-8"></div>
        </div>
      </main>
    </div>
  );
};

export default FoodDetailsPage;
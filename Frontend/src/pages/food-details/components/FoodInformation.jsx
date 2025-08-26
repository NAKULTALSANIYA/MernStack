import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FoodInformation = ({ foodItem = null }) => {
  const defaultFoodItem = {
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
    tags: ["Popular", "Chef\'s Special"]
  };

  const item = foodItem || defaultFoodItem;

  const getDietaryBadgeColor = (dietary) => {
    const colors = {
      "Vegetarian": "bg-success text-success-foreground",
      "Vegan": "bg-success text-success-foreground",
      "Non-Vegetarian": "bg-error text-error-foreground",
      "Contains Gluten": "bg-warning text-warning-foreground",
      "Gluten-Free": "bg-primary text-primary-foreground",
      "Dairy-Free": "bg-accent text-accent-foreground"
    };
    return colors?.[dietary] || "bg-secondary text-secondary-foreground";
  };

  const getAvailabilityColor = (status) => {
    const colors = {
      "Available": "text-success",
      "Out of Stock": "text-error",
      "Limited": "text-warning"
    };
    return colors?.[status] || "text-text-secondary";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Tags */}
        {item?.tags && item?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                <Icon name="Star" size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Name and Rating */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{item?.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.floor(item?.rating) ? "text-warning fill-current" : "text-border"}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{item?.rating}</span>
              <span className="text-sm text-text-secondary">({item?.reviewCount} reviews)</span>
            </div>
            <div className={`text-sm font-medium ${getAvailabilityColor(item?.availability)}`}>
              <Icon name="Clock" size={14} className="inline mr-1" />
              {item?.availability}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">${item?.price}</span>
          {item?.originalPrice && item?.originalPrice > item?.price && (
            <>
              <span className="text-lg text-text-secondary line-through">${item?.originalPrice}</span>
              <span className="inline-flex items-center px-2 py-1 bg-error text-error-foreground text-sm font-medium rounded">
                {item?.discount}% OFF
              </span>
            </>
          )}
        </div>
      </div>
      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Description</h3>
        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
          {item?.description}
        </p>
      </div>
      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-surface rounded-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-text-secondary">
            <Icon name="ChefHat" size={16} />
            <span className="text-sm">Category</span>
          </div>
          <p className="font-medium text-foreground">{item?.category}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-text-secondary">
            <Icon name="Globe" size={16} />
            <span className="text-sm">Cuisine</span>
          </div>
          <p className="font-medium text-foreground">{item?.cuisine}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-text-secondary">
            <Icon name="Clock" size={16} />
            <span className="text-sm">Prep Time</span>
          </div>
          <p className="font-medium text-foreground">{item?.preparationTime}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-text-secondary">
            <Icon name="Zap" size={16} />
            <span className="text-sm">Calories</span>
          </div>
          <p className="font-medium text-foreground">{item?.calories} kcal</p>
        </div>
      </div>
      {/* Dietary Information */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Dietary Information</h3>
        <div className="flex flex-wrap gap-2">
          {item?.dietaryInfo?.map((dietary, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getDietaryBadgeColor(dietary)}`}
            >
              {dietary}
            </span>
          ))}
        </div>
      </div>
      {/* Ingredients */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Ingredients</h3>
        <div className="grid grid-cols-2 gap-2">
          {item?.ingredients?.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span className="text-text-secondary">{ingredient}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          iconName="Edit"
          iconPosition="left"
          className="flex-1"
          onClick={() => window.location.href = '/add-edit-food-item'}
        >
          Edit Item
        </Button>
        <Button
          variant="outline"
          iconName="Copy"
          iconPosition="left"
          className="flex-1"
        >
          Duplicate
        </Button>
        <Button
          variant="destructive"
          iconName="Trash2"
          iconPosition="left"
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FoodInformation;
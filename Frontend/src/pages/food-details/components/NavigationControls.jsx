import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ currentItemId = 1, onNavigate }) => {
  // Mock data for navigation - in real app this would come from API/context
  const allFoodItems = [
    { id: 1, name: "Classic Beef Burger", category: "Burgers" },
    { id: 2, name: "Chicken Deluxe Burger", category: "Burgers" },
    { id: 3, name: "Veggie Supreme Burger", category: "Burgers" },
    { id: 4, name: "BBQ Bacon Burger", category: "Burgers" },
    { id: 5, name: "Fish Fillet Burger", category: "Burgers" },
    { id: 6, name: "Double Cheese Burger", category: "Burgers" },
    { id: 7, name: "Spicy Jalapeño Burger", category: "Burgers" },
    { id: 8, name: "Margherita Pizza", category: "Pizza" },
    { id: 9, name: "Caesar Salad", category: "Salads" },
    { id: 10, name: "Chocolate Brownie", category: "Desserts" }
  ];

  const currentIndex = allFoodItems?.findIndex(item => item?.id === currentItemId);
  const previousItem = currentIndex > 0 ? allFoodItems?.[currentIndex - 1] : null;
  const nextItem = currentIndex < allFoodItems?.length - 1 ? allFoodItems?.[currentIndex + 1] : null;

  const handlePrevious = () => {
    if (previousItem) {
      if (onNavigate) {
        onNavigate(previousItem?.id);
      } else {
        window.location.href = `/food-details?id=${previousItem?.id}`;
      }
    }
  };

  const handleNext = () => {
    if (nextItem) {
      if (onNavigate) {
        onNavigate(nextItem?.id);
      } else {
        window.location.href = `/food-details?id=${nextItem?.id}`;
      }
    }
  };

  const handleBackToList = () => {
    window.location.href = '/food-details';
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
      {/* Back to List */}
      <Button
        variant="outline"
        iconName="ArrowLeft"
        iconPosition="left"
        onClick={handleBackToList}
      >
        Back to Food List
      </Button>
      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        {/* Previous Item */}
        <div className="flex items-center gap-2">
          {previousItem ? (
            <Button
              variant="outline"
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <div className="text-left">
                <div className="text-xs text-text-secondary">Previous</div>
                <div className="text-sm font-medium text-foreground truncate max-w-32">
                  {previousItem?.name}
                </div>
              </div>
            </Button>
          ) : (
            <div className="text-sm text-text-secondary">No previous item</div>
          )}
        </div>

        {/* Current Position */}
        <div className="text-center px-4">
          <div className="text-xs text-text-secondary">Item</div>
          <div className="text-sm font-medium text-foreground">
            {currentIndex + 1} of {allFoodItems?.length}
          </div>
        </div>

        {/* Next Item */}
        <div className="flex items-center gap-2">
          {nextItem ? (
            <Button
              variant="outline"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              <div className="text-right">
                <div className="text-xs text-text-secondary">Next</div>
                <div className="text-sm font-medium text-foreground truncate max-w-32">
                  {nextItem?.name}
                </div>
              </div>
            </Button>
          ) : (
            <div className="text-sm text-text-secondary">No next item</div>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          title="Print Details"
        >
          <Icon name="Printer" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="Share Item"
        >
          <Icon name="Share2" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="Add to Favorites"
        >
          <Icon name="Heart" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
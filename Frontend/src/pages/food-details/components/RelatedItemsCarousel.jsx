import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedItemsCarousel = ({ currentItemId = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const relatedItems = [
    {
      id: 2,
      name: "Chicken Deluxe Burger",
      price: 11.99,
      originalPrice: 13.99,
      image: "https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.3,
      category: "Burgers",
      isPopular: true
    },
    {
      id: 3,
      name: "Veggie Supreme Burger",
      price: 9.99,
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.1,
      category: "Burgers",
      isVegetarian: true
    },
    {
      id: 4,
      name: "BBQ Bacon Burger",
      price: 14.99,
      originalPrice: 16.99,
      image: "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      category: "Burgers",
      isNew: true
    },
    {
      id: 5,
      name: "Fish Fillet Burger",
      price: 12.49,
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.2,
      category: "Burgers"
    },
    {
      id: 6,
      name: "Double Cheese Burger",
      price: 15.99,
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      category: "Burgers",
      isPopular: true
    },
    {
      id: 7,
      name: "Spicy Jalapeño Burger",
      price: 13.49,
      image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      category: "Burgers"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, relatedItems?.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleItemClick = (itemId) => {
    // Navigate to the selected item's detail page
    window.location.href = `/food-details?id=${itemId}`;
  };

  const renderItemBadge = (item) => {
    if (item?.isNew) {
      return (
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
          New
        </span>
      );
    }
    if (item?.isPopular) {
      return (
        <span className="absolute top-2 left-2 bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded">
          Popular
        </span>
      );
    }
    if (item?.isVegetarian) {
      return (
        <span className="absolute top-2 left-2 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
          Veggie
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">You might also like</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {relatedItems?.map((item) => (
            <div
              key={item?.id}
              className="flex-shrink-0 w-1/4 bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 cursor-pointer group"
              onClick={() => handleItemClick(item?.id)}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {renderItemBadge(item)}
                
                {/* Quick Add Button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Plus"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {item?.name}
                </h4>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(item?.rating) ? "text-warning fill-current" : "text-border"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{item?.rating}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">${item?.price}</span>
                  {item?.originalPrice && item?.originalPrice > item?.price && (
                    <span className="text-sm text-text-secondary line-through">
                      ${item?.originalPrice}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="text-xs text-text-secondary">
                  {item?.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 })?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItemsCarousel;
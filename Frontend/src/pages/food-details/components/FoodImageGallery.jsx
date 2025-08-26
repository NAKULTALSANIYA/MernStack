import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FoodImageGallery = ({ images = [], foodName = "Food Item" }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const defaultImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const imageList = images?.length > 0 ? images : defaultImages;
  const selectedImage = imageList?.[selectedImageIndex];

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? imageList?.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev === imageList?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-surface rounded-lg overflow-hidden group">
        <div className="aspect-square w-full">
          <Image
            src={selectedImage}
            alt={`${foodName} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-110' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
        </div>

        {/* Navigation Arrows */}
        {imageList?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="ZoomIn" size={14} className="inline mr-1" />
          Click to zoom
        </div>

        {/* Image Counter */}
        {imageList?.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {selectedImageIndex + 1} / {imageList?.length}
          </div>
        )}
      </div>
      {/* Thumbnail Gallery */}
      {imageList?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${foodName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Share Options */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <span className="text-sm text-text-secondary">Share:</span>
        <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200">
          <Icon name="Facebook" size={16} className="text-text-secondary hover:text-primary" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200">
          <Icon name="Twitter" size={16} className="text-text-secondary hover:text-primary" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200">
          <Icon name="Instagram" size={16} className="text-text-secondary hover:text-primary" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200">
          <Icon name="Link" size={16} className="text-text-secondary hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

export default FoodImageGallery;
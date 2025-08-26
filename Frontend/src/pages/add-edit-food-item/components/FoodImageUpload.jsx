import React, { useState, useRef } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FoodImageUpload = ({ 
  images = [], 
  onImagesChange, 
  maxImages = 5, 
  error = null 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    setUploading(true);
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 5 * 1024 * 1024
    );

    if (validFiles?.length + images?.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      setUploading(false);
      return;
    }

    const newImages = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name,
      size: file?.size
    }));

    setTimeout(() => {
      onImagesChange([...images, ...newImages]);
      setUploading(false);
    }, 500);
  };

  const removeImage = (imageId) => {
    const updatedImages = images?.filter(img => img?.id !== imageId);
    onImagesChange(updatedImages);
  };

  const onButtonClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-green-500 bg-green-50 scale-105'
            : error
            ? 'border-red-400 bg-red-50' :'border-gray-300 hover:border-green-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Select a file or drag and drop here
            </h3>
            <p className="text-base text-gray-600 mb-4">
              JPG, PNG or GIF, file size no more than 5MB
            </p>
            <p className="text-sm text-gray-500">
              Maximum {maxImages} images • First image will be the main display
            </p>
          </div>

          <button
            onClick={onButtonClick}
            disabled={uploading}
            className={`px-8 py-3 rounded-lg font-medium text-base transition-all duration-200 ${
              uploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :'bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200'
            }`}
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </div>
            ) : (
              'Select File'
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 text-base text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images?.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Uploaded Images ({images?.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images?.map((image, index) => (
              <div
                key={image?.id}
                className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square">
                  <Image
                    src={image?.url}
                    alt={`Food image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Primary Badge */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm">
                    Primary
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image?.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-700 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-sm font-medium truncate">{image?.name}</p>
                  <p className="text-xs text-gray-300">
                    {(image?.size / 1024 / 1024)?.toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Image Tips for Better Results
        </h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>First image will be used as the primary display image</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Use high-quality images with good lighting and clear focus</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Square aspect ratio (1:1) works best for consistency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Show the food from different angles for better presentation</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FoodImageUpload;
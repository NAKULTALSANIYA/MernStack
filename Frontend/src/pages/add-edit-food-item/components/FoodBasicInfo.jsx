import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FoodBasicInfo = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const categoryOptions = [
    { value: 'all-menu', label: 'All Menu' },
    { value: 'burgers', label: 'Burgers' },
    { value: 'sandwich', label: 'Sandwich' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'dessert', label: 'Dessert' }
  ];

  const cuisineOptions = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'indian', label: 'Indian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' }
  ];

  const dietaryOptions = [
    { value: 'none', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'keto', label: 'Keto Friendly' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' }
  ];

  const spiceLevelOptions = [
    { value: 'none', label: 'Not Spicy' },
    { value: 'mild', label: 'Mild' },
    { value: 'medium', label: 'Medium' },
    { value: 'hot', label: 'Hot' },
    { value: 'extra-hot', label: 'Extra Hot' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Basic Information
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              label="Food Name"
              type="text"
              placeholder="Enter name"
              value={formData?.name || ''}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-lg h-12 text-base font-medium"
            />
            {errors?.name && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors?.name}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Select
                label="Food Category"
                placeholder="All Menu"
                options={categoryOptions}
                value={formData?.category || ''}
                onChange={(value) => handleInputChange('category', value)}
                error={errors?.category}
                required
                className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors?.category && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors?.category}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Select
                label="Food Cuisine"
                placeholder="Select cuisine"
                options={cuisineOptions}
                value={formData?.cuisine || ''}
                onChange={(value) => handleInputChange('cuisine', value)}
                error={errors?.cuisine}
                searchable
                className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              Food Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter description"
              value={formData?.description || ''}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none text-base ${
                errors?.description 
                  ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500' :'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500'
              }`}
            />
            {errors?.description && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors?.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          Pricing & Availability
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-900">
                Food Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                <input
                  type="number"
                  placeholder="20"
                  value={formData?.price || ''}
                  onChange={(e) => handleInputChange('price', e?.target?.value)}
                  min="0"
                  step="0.01"
                  className={`w-full h-12 pl-8 pr-4 border rounded-lg transition-all duration-200 text-base font-medium ${
                    errors?.price 
                      ? 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500' :'border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
              </div>
              {errors?.price && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors?.price}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Select
                label="Discount"
                placeholder="Discount"
                options={[
                  { value: 'none', label: 'No Discount' },
                  { value: '5', label: '5% Off' },
                  { value: '10', label: '10% Off' },
                  { value: '15', label: '15% Off' },
                  { value: '20', label: '20% Off' },
                  { value: 'custom', label: 'Custom Amount' }
                ]}
                value={formData?.discountType || ''}
                onChange={(value) => handleInputChange('discountType', value)}
                className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Preparation Time (minutes)"
              type="number"
              placeholder="15"
              value={formData?.prepTime || ''}
              onChange={(e) => handleInputChange('prepTime', e?.target?.value)}
              min="1"
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            <Input
              label="Serving Size"
              type="text"
              placeholder="1 person"
              value={formData?.servingSize || ''}
              onChange={(e) => handleInputChange('servingSize', e?.target?.value)}
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* Dietary & Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          Dietary Information
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Food Diet"
              placeholder="BG"
              options={dietaryOptions}
              value={formData?.dietary || 'none'}
              onChange={(value) => handleInputChange('dietary', value)}
              multiple
              description="Select all that apply"
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            <Select
              label="Spice Level"
              placeholder="Select spice level"
              options={spiceLevelOptions}
              value={formData?.spiceLevel || 'none'}
              onChange={(value) => handleInputChange('spiceLevel', value)}
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Calories (Optional)"
              type="number"
              placeholder="0"
              value={formData?.calories || ''}
              onChange={(e) => handleInputChange('calories', e?.target?.value)}
              min="0"
              description="Per serving"
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            <Input
              label="Protein (g)"
              type="number"
              placeholder="0"
              value={formData?.protein || ''}
              onChange={(e) => handleInputChange('protein', e?.target?.value)}
              min="0"
              step="0.1"
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            <Input
              label="Carbs (g)"
              type="number"
              placeholder="0"
              value={formData?.carbs || ''}
              onChange={(e) => handleInputChange('carbs', e?.target?.value)}
              min="0"
              step="0.1"
              className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodBasicInfo;
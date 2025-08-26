import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FoodBasicInfo from './components/FoodBasicInfo';
import FoodIngredients from './components/FoodIngredients';
import FoodImageUpload from './components/FoodImageUpload';
import FoodFormActions from './components/FoodFormActions';
import Icon from '../../components/AppIcon';

const AddEditFoodItem = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Check if we're editing (would normally come from URL params or props)
  const isEditing = location?.pathname?.includes('edit') || location?.search?.includes('edit=true');
  const editingItemId = new URLSearchParams(location.search)?.get('id');

  // Mock data for editing
  const mockEditData = {
    id: editingItemId || '1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and our special sauce on a toasted bun',
    price: '12.99',
    discountPrice: '10.99',
    category: 'burgers',
    cuisine: 'american',
    dietary: ['none'],
    spiceLevel: 'none',
    prepTime: '15',
    servingSize: '1 person',
    calories: '650',
    protein: '28',
    carbs: '45'
  };

  const mockEditIngredients = [
    'Beef Patty', 'Lettuce', 'Tomato', 'Onion', 'Cheese', 'Burger Bun', 'Special Sauce'
  ];

  const mockEditAllergens = ['gluten', 'dairy'];

  const mockEditImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      name: 'burger-main.jpg',
      size: 2048000
    }
  ];

  // Form state
  const [formData, setFormData] = useState(isEditing ? mockEditData : {
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    // Removed unnecessary fields
  });

  const [ingredients, setIngredients] = useState(isEditing ? mockEditIngredients : []);
  const [allergens, setAllergens] = useState(isEditing ? mockEditAllergens : []);
  const [images, setImages] = useState(isEditing ? mockEditImages : []);
  const [errors, setErrors] = useState({});

  // Track changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(isEditing ? mockEditData : {}) ||
                      ingredients?.length > 0 || 
                      allergens?.length > 0 || 
                      images?.length > 0;
    setHasUnsavedChanges(hasChanges);
  }, [formData, ingredients, allergens, images, isEditing]);

  // Enhanced validation with better error messages
  const validateForm = () => {
    const newErrors = {};

    // Food name validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'Food name is required';
    } else if (formData?.name?.trim()?.length < 3) {
      newErrors.name = 'Food name must be at least 3 characters';
    } else if (formData?.name?.trim()?.length > 50) {
      newErrors.name = 'Food name cannot exceed 50 characters';
    }

    // Category validation
    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    // Price validation
    if (!formData?.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Price must be greater than $0';
    } else if (parseFloat(formData?.price) > 999.99) {
      newErrors.price = 'Price cannot exceed $999.99';
    }

    // Discount validation
    if (formData?.discountPrice && parseFloat(formData?.discountPrice) >= parseFloat(formData?.price)) {
      newErrors.discountPrice = 'Discount price must be less than regular price';
    }

    // Description validation
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData?.description?.trim()?.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    // Image validation
    if (images?.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    // Preparation time validation
    if (formData?.prepTime && (parseInt(formData?.prepTime) < 1 || parseInt(formData?.prepTime) > 240)) {
      newErrors.prepTime = 'Preparation time must be 1-240 minutes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[class*="border-red"]');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSaving(true);
    
    try {
      const apiUrl = isEditing ? `/api/products/${editingItemId}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url: apiUrl,
        data: {
          ...formData,
          ingredients,
          allergens,
          image_url: images[0]?.url // Assuming the first image is the main one
        }
      });

      const successMessage = isEditing 
        ? `✅ "${formData?.name}" has been updated successfully!`
        : `✅ "${formData?.name}" has been added to your menu!`;
      
      // Create and show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
      notification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="font-medium">${successMessage}</span>
      `;
      document.body?.appendChild(notification);
      
      setTimeout(() => {
        notification?.remove();
        window.location.href = '/food-details';
      }, 2000);
      
    } catch (error) {
      console.error('Error saving food item:', error);
      
      // Show error notification
      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
      errorNotification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <span class="font-medium">❌ Error saving food item. Please try again.</span>
      `;
      document.body?.appendChild(errorNotification);
      
      setTimeout(() => errorNotification?.remove(), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndAddNew = async () => {
    if (!validateForm()) {
      return;
    }
    
    await handleSave();
    // Reset form for new item
    setFormData({
      name: '',
      description: '',
      price: '',
      discountPrice: '',
      category: '',
      cuisine: '',
      dietary: [],
      spiceLevel: 'none',
      prepTime: '',
      servingSize: '',
      calories: '',
      protein: '',
      carbs: ''
    });
    setIngredients([]);
    setAllergens([]);
    setImages([]);
    setErrors({});
    setHasUnsavedChanges(false);
    setActiveTab('basic');
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        '⚠️ You have unsaved changes that will be lost. Are you sure you want to leave?'
      );
      if (!confirmed) return;
    }
    window.location.href = '/food-details';
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'ingredients', label: 'Ingredients', icon: 'ChefHat' },
    { id: 'images', label: 'Images', icon: 'Image' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Food Management', path: '/food-details' },
    { label: isEditing ? `Edit ${formData?.name || 'Food Item'}` : 'Add New Item', path: '/add-edit-food-item', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Enhanced Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isEditing ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditing ? 'Edit Food Item' : 'Add New Food Item'}
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  {isEditing 
                    ? 'Update the food item details and save changes to your menu' :'Create a new delicious food item for your restaurant menu'
                  }
                </p>
              </div>
            </div>

            {/* Enhanced Status Indicator */}
            {isEditing && (
              <div className="flex items-center gap-3 text-base text-blue-700 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 w-fit">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Currently Editing: <span className="font-semibold">{formData?.name || 'Untitled Item'}</span>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Tabs */}
          <div className="lg:hidden mb-8">
            <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Desktop: Show all sections, Mobile: Show active tab */}
              <div className={`${activeTab !== 'basic' ? 'hidden lg:block' : ''}`}>
                <FoodBasicInfo
                  formData={formData}
                  onFormChange={setFormData}
                  errors={errors}
                />
              </div>

              <div className={`${activeTab !== 'ingredients' ? 'hidden lg:block' : ''}`}>
                <FoodIngredients
                  ingredients={ingredients}
                  onIngredientsChange={setIngredients}
                  allergens={allergens}
                  onAllergensChange={setAllergens}
                  errors={errors}
                />
              </div>

              <div className={`${activeTab !== 'images' ? 'hidden lg:block' : ''}`}>
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Food Images
                  </h3>
                  <FoodImageUpload
                    images={images}
                    onImagesChange={setImages}
                    error={errors?.images}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Preview */}
            <div className="space-y-8">
              <FoodFormActions
                onSave={handleSave}
                onCancel={handleCancel}
                onSaveAndAddNew={handleSaveAndAddNew}
                isEditing={isEditing}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
                isValid={Object.keys(errors)?.length === 0}
              />

              {/* Enhanced Preview Card */}
              {(formData?.name || images?.length > 0) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    Live Preview
                  </h3>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {images?.length > 0 && (
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={images?.[0]?.url}
                          alt="Food preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {formData?.name || 'Untitled Food Item'}
                      </h4>
                      
                      {formData?.description && (
                        <p className="text-base text-gray-600 mb-4 line-clamp-3">
                          {formData?.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {formData?.price && (
                          <div className="flex items-center gap-2">
                            {formData?.discountPrice && (
                              <span className="text-base text-gray-500 line-through">
                                ${formData?.price}
                              </span>
                            )}
                            <span className="text-xl font-bold text-green-600">
                              ${formData?.discountPrice || formData?.price}
                            </span>
                          </div>
                        )}
                        
                        {formData?.prepTime && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formData?.prepTime}min
                          </div>
                        )}
                      </div>
                      
                      {ingredients?.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Ingredients:</span> {ingredients?.slice(0, 3)?.join(', ')}
                            {ingredients?.length > 3 && ` +${ingredients?.length - 3} more`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEditFoodItem;
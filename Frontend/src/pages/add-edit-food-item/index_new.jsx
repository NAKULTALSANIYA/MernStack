import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import Sidebar from '../../components/ui/Sidebar'; // Import Sidebar component

const API_URL = 'http://localhost:5000/api/products';

const AddEditFoodItem = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const isEditing = location?.pathname?.includes('edit') || location?.search?.includes('edit=true');
  const editingItemId = new URLSearchParams(location.search)?.get('id');

  const mockEditData = {
    id: editingItemId || '1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and our special sauce on a toasted bun',
    price: '12.99',
    discountPrice: '10.99',
    category: 'burgers',
    image_url: 'https://example.com/image.jpg',
    ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Onion', 'Cheese'],
  };

  const [formData, setFormData] = useState(isEditing ? mockEditData : {
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    image_url: '',
    ingredients: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(isEditing ? mockEditData : {});
    setHasUnsavedChanges(hasChanges);
  }, [formData, isEditing]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) {
      newErrors.name = 'Food name is required';
    }
    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData?.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Price must be greater than $0';
    }
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData?.ingredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      const firstErrorElement = document.querySelector('[class*="border-red"]');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSaving(true);
    
    try {
      const apiUrl = isEditing ? `${API_URL}/${editingItemId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await axios({
        method,
        url: apiUrl,
        data: {
          ...formData,
          ingredients,
        }
      });

      const successMessage = isEditing 
        ? `✅ "${formData?.name}" has been updated successfully!`
        : `✅ "${formData?.name}" has been added to your menu!`;
      
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 p-4">
        {/* Other components and JSX */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mb-4">
          Toggle Sidebar
        </button>
      </div>
    </div>
  );
};

export default AddEditFoodItem;

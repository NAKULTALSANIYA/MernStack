import React, { useState } from 'react';



import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FoodIngredients = ({ 
  ingredients = [], 
  onIngredientsChange, 
  allergens = [], 
  onAllergensChange, 
  errors = {},
  cuisine = '',
  onCuisineChange
}) => {
  const [newIngredient, setNewIngredient] = useState('');

  const ingredientOptions = [
    { value: 'beef-patty', label: 'Beef Patty' },
    { value: 'chicken-breast', label: 'Chicken Breast' },
    { value: 'lettuce', label: 'Lettuce' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'onion', label: 'Onion' },
    { value: 'cheese', label: 'Cheese' },
    { value: 'bacon', label: 'Bacon' },
    { value: 'mushrooms', label: 'Mushrooms' },
    { value: 'peppers', label: 'Peppers' },
    { value: 'pickles', label: 'Pickles' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'spinach', label: 'Spinach' }
  ];

  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'asian', label: 'Asian' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'indian', label: 'Indian' },
    { value: 'french', label: 'French' },
    { value: 'thai', label: 'Thai' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' }
  ];

  const commonAllergens = [
    { id: 'gluten', label: 'Gluten', description: 'Contains wheat, barley, rye' },
    { id: 'dairy', label: 'Dairy', description: 'Contains milk products' },
    { id: 'eggs', label: 'Eggs', description: 'Contains eggs' },
    { id: 'nuts', label: 'Tree Nuts', description: 'Contains almonds, walnuts, etc.' },
    { id: 'peanuts', label: 'Peanuts', description: 'Contains peanuts' },
    { id: 'soy', label: 'Soy', description: 'Contains soy products' },
    { id: 'fish', label: 'Fish', description: 'Contains fish' },
    { id: 'shellfish', label: 'Shellfish', description: 'Contains shellfish' },
    { id: 'sesame', label: 'Sesame', description: 'Contains sesame seeds' }
  ];

  const addIngredient = () => {
    if (newIngredient?.trim() && !ingredients?.includes(newIngredient?.trim())) {
      onIngredientsChange([...ingredients, newIngredient?.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients?.filter((_, i) => i !== index);
    onIngredientsChange(updatedIngredients);
  };

  const handleAllergenChange = (allergenId, checked) => {
    if (checked) {
      onAllergensChange([...allergens, allergenId]);
    } else {
      onAllergensChange(allergens?.filter(id => id !== allergenId));
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-6">
      {/* Ingredients Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          Food Ingredients
        </h3>
        
        <div className="space-y-6">
          {/* Ingredient Selection */}
          <Select
            label="Select Ingredients"
            placeholder="Select ingredients"
            options={ingredientOptions}
            value={ingredients}
            onChange={onIngredientsChange}
            multiple
            searchable
            className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />

          {/* Add Custom Ingredient */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              Add Custom Ingredient
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter ingredient name"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                />
              </div>
              <button
                onClick={addIngredient}
                disabled={!newIngredient?.trim()}
                className="px-6 h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium text-base flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* Ingredients List */}
          {ingredients?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-900">
                Added Ingredients ({ingredients?.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {ingredients?.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
                  >
                    <span className="text-base font-medium text-gray-900">{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(index)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ingredients?.length === 0 && (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-base font-medium">No ingredients added yet</p>
              <p className="text-sm">Select from the dropdown or add custom ingredients</p>
            </div>
          )}
        </div>
      </div>

      {/* Cuisine Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Food Cuisine
        </h3>
        
        <Select
          label="Select Cuisine Type"
          placeholder="Select cuisine"
          options={cuisineOptions}
          value={cuisine || ''}
          onChange={onCuisineChange}
          searchable
          className="h-12 text-base border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Allergen Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          Allergen Information
        </h3>
        <p className="text-base text-gray-600 mb-6">
          Select all allergens that are present in this food item to help customers make informed choices.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonAllergens?.map((allergen) => (
            <div key={allergen?.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Checkbox
                checked={allergens?.includes(allergen?.id)}
                onChange={(e) => handleAllergenChange(allergen?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <label className="text-base font-medium text-gray-900 cursor-pointer">
                  {allergen?.label}
                </label>
                <p className="text-sm text-gray-600">
                  {allergen?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {allergens?.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-base font-semibold text-yellow-800">
                Allergen Warning
              </span>
            </div>
            <p className="text-sm text-yellow-800">
              This item contains: {allergens?.map(id => 
                commonAllergens?.find(a => a?.id === id)?.label
              )?.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Quick Add Suggestions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-base font-semibold text-green-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Quick Add Common Ingredients
        </h4>
        <div className="flex flex-wrap gap-3">
          {['Salt', 'Black Pepper', 'Olive Oil', 'Garlic', 'Onion', 'Butter', 'Cheese', 'Tomato']?.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => {
                if (!ingredients?.includes(ingredient)) {
                  onIngredientsChange([...ingredients, ingredient]);
                }
              }}
              disabled={ingredients?.includes(ingredient)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium ${
                ingredients?.includes(ingredient)
                  ? 'bg-green-100 border-green-300 text-green-800 cursor-not-allowed opacity-75' 
                  : 'bg-white border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodIngredients;
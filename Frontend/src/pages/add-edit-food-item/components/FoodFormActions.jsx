import React from 'react';
import Button from '../../../components/ui/Button';


const FoodFormActions = ({ 
  onSave, 
  onCancel, 
  onSaveAndAddNew,
  isEditing = false, 
  isSaving = false, 
  hasUnsavedChanges = false,
  isValid = true 
}) => {
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (confirmed) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Action Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {isEditing ? 'Update Food Item' : 'Save Food Item'}
        </h3>
        
        <div className="space-y-4">
          {/* Primary Save Button */}
          <button
            onClick={onSave}
            disabled={!isValid || isSaving}
            className={`w-full h-12 rounded-lg font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 ${
              !isValid || isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :'bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200 shadow-sm hover:shadow-md'
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isEditing ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isEditing ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
                </svg>
                {isEditing ? 'Update' : 'Upload'}
              </>
            )}
          </button>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 h-12 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 font-medium text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>

            {!isEditing && (
              <button
                onClick={onSaveAndAddNew}
                disabled={!isValid || isSaving}
                className={`flex-1 h-12 rounded-lg font-medium text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                  !isValid || isSaving
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-200' :'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Save & Add New
              </button>
            )}
          </div>
        </div>

        {/* Status Indicators */}
        {hasUnsavedChanges && (
          <div className="mt-4 flex items-center gap-3 text-base text-amber-700 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You have unsaved changes
          </div>
        )}

        {!isValid && (
          <div className="mt-4 flex items-center gap-3 text-base text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Please fix the errors above before saving
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => window.location.href = '/food-details'}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Food List
          </button>

          <button
            onClick={() => window.location.href = '/add-edit-food-item'}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Form
          </button>

          <button
            onClick={() => {
              const data = JSON.stringify({
                timestamp: new Date()?.toISOString(),
                action: isEditing ? 'edit' : 'create'
              });
              localStorage.setItem('food_form_draft', data);
              alert('Form progress saved as draft');
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save as Draft
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Preview
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need Help?
        </h4>
        <p className="text-sm text-blue-800 mb-4">
          Having trouble with the form? Check out these helpful resources:
        </p>
        <div className="space-y-2">
          <a
            href="/help"
            className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Food Management Guide
          </a>
          <a
            href="/help"
            className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Image Upload Best Practices
          </a>
        </div>
      </div>
    </div>
  );
};

export default FoodFormActions;
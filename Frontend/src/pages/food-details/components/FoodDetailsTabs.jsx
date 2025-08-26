import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FoodDetailsTabs = ({ foodItem = null }) => {
  const [activeTab, setActiveTab] = useState('nutrition');

  const defaultNutrition = {
    calories: 650,
    protein: "28g",
    carbs: "45g",
    fat: "35g",
    fiber: "4g",
    sugar: "8g",
    sodium: "890mg",
    cholesterol: "75mg"
  };

  const defaultPreparation = {
    steps: [
      "Season the ground beef with salt, pepper, and garlic powder",
      "Form the beef into patties and let rest for 10 minutes",
      "Heat the grill or pan to medium-high heat",
      "Cook patties for 4-5 minutes on each side",
      "Toast the buns lightly on the grill",
      "Assemble with fresh vegetables and signature sauce",
      "Serve immediately with crispy fries"
    ],
    tips: [
      "Don't press down on the patties while cooking",
      "Let the meat rest before serving for better juices",
      "Use fresh, high-quality ingredients for best taste"
    ]
  };

  const defaultReviews = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      rating: 5,
      date: "2025-08-20",
      comment: "Absolutely delicious! The beef was perfectly cooked and the sauce was amazing. Will definitely order again.",
      helpful: 12
    },
    {
      id: 2,
      customerName: "Mike Chen",
      rating: 4,
      date: "2025-08-18",
      comment: "Great burger overall. The fries were crispy and hot. Only wish the portion was a bit larger for the price.",
      helpful: 8
    },
    {
      id: 3,
      customerName: "Emily Davis",
      rating: 5,
      date: "2025-08-15",
      comment: "Best burger in town! Fresh ingredients, perfect seasoning, and excellent service. Highly recommended!",
      helpful: 15
    },
    {
      id: 4,
      customerName: "John Smith",
      rating: 4,
      date: "2025-08-12",
      comment: "Solid burger with good flavor. The bun was perfectly toasted and the vegetables were fresh.",
      helpful: 6
    }
  ];

  const tabs = [
    { id: 'nutrition', label: 'Nutrition', icon: 'Activity' },
    { id: 'preparation', label: 'Preparation', icon: 'ChefHat' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' }
  ];

  const renderNutritionContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(defaultNutrition)?.map(([key, value]) => (
          <div key={key} className="bg-surface p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-text-secondary capitalize">{key}</div>
          </div>
        ))}
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-text-secondary">
          <Icon name="Info" size={16} className="inline mr-2" />
          Nutritional values are approximate and may vary based on preparation methods and ingredients.
        </p>
      </div>
    </div>
  );

  const renderPreparationContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Preparation Steps</h4>
        <div className="space-y-3">
          {defaultPreparation?.steps?.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <p className="text-text-secondary">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Chef's Tips</h4>
        <div className="space-y-2">
          {defaultPreparation?.tips?.map((tip, index) => (
            <div key={index} className="flex gap-3">
              <Icon name="Lightbulb" size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviewsContent = () => (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-surface p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Customer Reviews</h4>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < 4 ? "text-warning fill-current" : "text-border"}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.5</span>
            <span className="text-sm text-text-secondary">({defaultReviews?.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {defaultReviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">{review?.customerName}</h5>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < review?.rating ? "text-warning fill-current" : "text-border"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">{review?.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-text-secondary mb-3">{review?.comment}</p>
            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1 text-text-secondary hover:text-foreground transition-colors duration-200">
                <Icon name="ThumbsUp" size={14} />
                Helpful ({review?.helpful})
              </button>
              <button className="text-text-secondary hover:text-foreground transition-colors duration-200">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return renderNutritionContent();
      case 'preparation':
        return renderPreparationContent();
      case 'reviews':
        return renderReviewsContent();
      default:
        return renderNutritionContent();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FoodDetailsTabs;
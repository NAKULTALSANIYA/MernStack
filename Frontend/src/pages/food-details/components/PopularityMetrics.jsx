import React from 'react';
import Icon from '../../../components/AppIcon';

const PopularityMetrics = ({ foodItem = null }) => {
  const defaultMetrics = {
    totalOrders: 1247,
    weeklyOrders: 89,
    monthlyOrders: 342,
    averageRating: 4.5,
    totalReviews: 128,
    popularityRank: 3,
    categoryRank: 1,
    lastOrderTime: "2 hours ago",
    peakOrderTime: "7:00 PM - 9:00 PM",
    repeatCustomers: 78,
    favoriteCount: 156
  };

  const metrics = foodItem?.metrics || defaultMetrics;

  const getPopularityLevel = (rank) => {
    if (rank <= 5) return { level: "High", color: "text-success", icon: "TrendingUp" };
    if (rank <= 15) return { level: "Medium", color: "text-warning", icon: "Minus" };
    return { level: "Low", color: "text-error", icon: "TrendingDown" };
  };

  const popularity = getPopularityLevel(metrics?.popularityRank);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Popularity Metrics</h3>
        <div className={`flex items-center gap-1 ${popularity?.color}`}>
          <Icon name={popularity?.icon} size={16} />
          <span className="text-sm font-medium">{popularity?.level}</span>
        </div>
      </div>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-foreground">{formatNumber(metrics?.totalOrders)}</div>
          <div className="text-sm text-text-secondary">Total Orders</div>
        </div>
        <div className="bg-surface p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-foreground">{metrics?.weeklyOrders}</div>
          <div className="text-sm text-text-secondary">This Week</div>
        </div>
        <div className="bg-surface p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-foreground">#{metrics?.popularityRank}</div>
          <div className="text-sm text-text-secondary">Overall Rank</div>
        </div>
        <div className="bg-surface p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-foreground">#{metrics?.categoryRank}</div>
          <div className="text-sm text-text-secondary">In Category</div>
        </div>
      </div>
      {/* Detailed Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Last Order</span>
          </div>
          <span className="text-sm font-medium text-foreground">{metrics?.lastOrderTime}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Peak Hours</span>
          </div>
          <span className="text-sm font-medium text-foreground">{metrics?.peakOrderTime}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Repeat" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Repeat Customers</span>
          </div>
          <span className="text-sm font-medium text-foreground">{metrics?.repeatCustomers}%</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Heart" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Added to Favorites</span>
          </div>
          <span className="text-sm font-medium text-foreground">{metrics?.favoriteCount} times</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Monthly Orders</span>
          </div>
          <span className="text-sm font-medium text-foreground">{metrics?.monthlyOrders}</span>
        </div>
      </div>
      {/* Performance Indicator */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Performance Insight</span>
        </div>
        <p className="text-sm text-text-secondary">
          This item is performing {popularity?.level?.toLowerCase()} compared to other menu items. 
          {metrics?.popularityRank <= 5 && " Consider featuring it in promotions."}
          {metrics?.popularityRank > 15 && " Consider reviewing pricing or ingredients."}
        </p>
      </div>
    </div>
  );
};

export default PopularityMetrics;
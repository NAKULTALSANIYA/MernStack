import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import FoodDetailsPage from './pages/food-details';
import AddEditFoodItem from './pages/add-edit-food-item';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddEditFoodItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food-details" element={<FoodDetailsPage />} />
        <Route path="/add-edit-food-item" element={<AddEditFoodItem />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

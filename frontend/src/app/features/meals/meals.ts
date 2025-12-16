import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './meals.html',
  styleUrls: ['./meals.scss']
})
export class MealsComponent {

  mealPlan = [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', name: 'Oats & Fruits', calories: 300 },
        { type: 'Lunch', name: 'Rice & Vegetables', calories: 500 },
        { type: 'Dinner', name: 'Grilled Chicken', calories: 400 }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', name: 'Egg Toast', calories: 350 },
        { type: 'Lunch', name: 'Chapati & Dal', calories: 450 },
        { type: 'Dinner', name: 'Salad & Soup', calories: 300 }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { type: 'Breakfast', name: 'Smoothie Bowl', calories: 320 },
        { type: 'Lunch', name: 'Brown Rice & Veg Curry', calories: 480 },
        { type: 'Dinner', name: 'Paneer Stir Fry', calories: 380 }
      ]
    },
    {
      day: 'Thursday',
      meals: [
        { type: 'Breakfast', name: 'Idli & Sambar', calories: 350 },
        { type: 'Lunch', name: 'Chicken Rice', calories: 520 },
        { type: 'Dinner', name: 'Vegetable Soup', calories: 300 }
      ]
    },
    {
      day: 'Friday',
      meals: [
        { type: 'Breakfast', name: 'Peanut Butter Toast', calories: 340 },
        { type: 'Lunch', name: 'Curd Rice & Salad', calories: 460 },
        { type: 'Dinner', name: 'Grilled Fish', calories: 390 }
      ]
    },
    {
      day: 'Saturday',
      meals: [
        { type: 'Breakfast', name: 'Upma', calories: 330 },
        { type: 'Lunch', name: 'Veg Biryani', calories: 550 },
        { type: 'Dinner', name: 'Fruit Salad', calories: 280 }
      ]
    },
    {
      day: 'Sunday',
      meals: [
        { type: 'Breakfast', name: 'Dosa & Chutney', calories: 360 },
        { type: 'Lunch', name: 'Chicken Biryani', calories: 600 },
        { type: 'Dinner', name: 'Light Soup', calories: 250 }
      ]
    }
  ];
}

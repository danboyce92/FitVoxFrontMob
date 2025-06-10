import axios from "axios";

import { WorkoutPlan } from "@/types/types";

// const API_URL = "http://192.168.1.223:5678/workout-plans";
const API_URL = "http://localhost:5678/workout-plans";

// const API_URL_EX = "http://192.168.1.223:5678/exercises";
const API_URL_EX = "http://localhost:5678/exercises";

export const getWorkoutPlan = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    throw error;
  }
};

export const getAllWorkoutPlans = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    throw error;
  }
};

export const createWorkoutPlan = async (data: WorkoutPlan) => {
  try {
    const response = await axios.post(API_URL, data);

    return response.data;
  } catch (error) {
    console.error("Error creating workout plan:", error);
    throw error;
  }
};

export const updateWorkoutPlan = async (id: number, data: WorkoutPlan) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating workout plan:", error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting workout plan:", error);
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await axios.get(API_URL_EX);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    throw error;
  }
};

export default {
  getWorkoutPlan,
  getAllWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};

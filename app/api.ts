import axios from "axios";

import { WorkoutPlan, WorkoutRecord } from "@/types/types";

const WORKOUTRECORDS = "workout-records";
const WORKOUTPLANS = "workout-plans";
const EXERCISES = "exercises";

const API_URL = "http://192.168.1.223:5678/";
// const API_URL = "http://localhost:5678/";

export const getWorkoutPlan = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}${WORKOUTPLANS}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    throw error;
  }
};

export const getAllWorkoutPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}${WORKOUTPLANS}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    throw error;
  }
};

export const createWorkoutPlan = async (data: WorkoutPlan) => {
  try {
    const response = await axios.post(`${API_URL}${WORKOUTPLANS}`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating workout plan:", error);
    throw error;
  }
};

export const updateWorkoutPlan = async (id: number, data: WorkoutPlan) => {
  try {
    const response = await axios.put(`${API_URL}${WORKOUTPLANS}/${id}`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating workout plan:", error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}${WORKOUTPLANS}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting workout plan:", error);
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await axios.get(`${API_URL}${EXERCISES}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    throw error;
  }
};

// WORKOUT RECORDS

export const getAllWorkoutRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}${WORKOUTRECORDS}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout records:", error);
    throw error;
  }
};

export const getWorkoutRecord = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}${WORKOUTRECORDS}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching workout record:", error);
    throw error;
  }
};

export const createWorkoutRecord = async (data: WorkoutRecord) => {
  try {
    const response = await axios.post(`${API_URL}${WORKOUTRECORDS}`, data);

    return response.data;
  } catch (error) {
    console.error("Error creating workout record:", error);
    throw error;
  }
};

export const updateWorkoutRecord = async (id: number, data: WorkoutRecord) => {
  try {
    const response = await axios.put(`${API_URL}${WORKOUTRECORDS}/${id}`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating workout record:", error);
    throw error;
  }
};

export const deleteWorkoutRecord = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}${WORKOUTRECORDS}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting workout record:", error);
    throw error;
  }
};

export default {
  getWorkoutPlan,
  getAllWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getAllWorkoutRecords,
  getWorkoutRecord,
  createWorkoutRecord,
  updateWorkoutRecord,
  deleteWorkoutRecord,
};

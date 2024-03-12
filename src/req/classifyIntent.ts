// // utils/classifyIntent.js

import axios from "axios";

const ClassifyUrl = "http://127.0.0.1:8000/classify_intent"

export async function classifyIntent(userQuery: string) {
    try {
      // Make an HTTP request to the Python API endpoint for intent classification
      const response = await axios.post(ClassifyUrl, { query: userQuery });
      const { intent } = response.data;
      return intent;
    } catch (error) {
      throw new Error('Failed to classify intent');
    }
  }

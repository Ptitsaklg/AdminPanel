import axios from 'axios';
import { URL_MEALS_BY_FIRST_LETTER, URL_MEALS_BY_ID } from '@/constants';

export const getRecipesByLetter = async () => {
  const data = await axios.get(URL_MEALS_BY_FIRST_LETTER);
  return data?.data?.meals;
};

export const getRecipeById = async (id) => {
  const data = await axios.get(`${URL_MEALS_BY_ID}${id}`);
  return data?.data?.meals[0];
};

export const createRecipe = () => {

};

export const updateRecipe = () => {

};
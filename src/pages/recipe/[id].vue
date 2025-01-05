<template>
  <v-container>
    <v-row  justify="space-between">
      <v-col cols="auto">
        <div class="title">{{ isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</div>
      </v-col>
      <v-col cols="auto">
        <v-btn color="teal" @click="createOrUpdateRecipe">Сохранить</v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>

    <v-row  justify="space-between">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Название рецепта"
          min-width="200"
          hide-details="false"
          v-model="recipeUpdated.strMeal"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Регион"
          min-width="200"
          hide-details="false"
          :items="areas"
          v-model="recipeUpdated.strArea"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Категория"
          min-width="200"
          hide-details="false"
          :items="categories"
          v-model="recipeUpdated.strCategory"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea 
          label="Описание рецепта"
          v-model="recipeUpdated.strInstructions"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <b>Ингредиенты</b>
      </v-col>
    </v-row>
    <v-row
      v-for="(ingredient, index) in recipeIngredients"
      :key="`${ingredient.id}-${index}`"
      class="d-flex align-center"
    >
      <v-col cols="1">
        {{ index + 1}}.
      </v-col>
      <v-col>
        <v-text-field
          label="Ингредиент"
          min-width="200"
          hide-details="false"
          density="compact"
          v-model="recipeIngredients[index].title"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Количество"
          min-width="200"
          hide-details="false"
          density="compact"
          v-model="recipeIngredients[index].measure"
        ></v-text-field>
      </v-col>
      <v-col cols="auto" >
        <v-btn 
          color="#E53935" 
          size="36"
          icon="mdi-delete-outline" 
          @click="() => removeIngredient(index)"
        ></v-btn>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-end mb-2">
      <v-col cols="auto" >
        <v-btn color="teal" @click="addIngredient">Добавить ингредиент</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { RecipeService, CommonService } from "@/services";
import { useRootStore } from '@/stores/root.js';
  
const route = useRoute();
const rootStore = useRootStore();
const recipeId = route?.params.id;
const recipe = ref(RecipeService.getEmptyRecipe());
const recipeUpdated = ref(RecipeService.getEmptyRecipe());
const isCreatingMode = ref(true);
const recipeIngredients = ref([CommonService.getEmptyIngredient()]);
const areas = computed(() => {
  return rootStore.areas.map(area => area.strArea)
});
const categories = computed(() => {
  return rootStore.categories.map(category => category.strCategory)
});

const fetchReсipe = async () => {
  try {
    const data = await RecipeService.getRecipeById(recipeId);
    recipe.value = { ...data };
    recipeUpdated.value = { ...data };
    isCreatingMode.value = false;
  } catch(err) {
    console.error(err);
    recipe.value = [];
  } 
};

const normalizeRecipeIngredients = () => {
  const normalizeIngredients = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe.value[`strIngredient${i}`]) {
      const ingr = {
        id: Math.random().toString(36).slice(2),
        title: recipe.value[`strIngredient${i}`],
        measure: recipe.value[`strMeasure${i}`]
      }

      normalizeIngredients.push(ingr);
    }
  }

  recipeIngredients.value = normalizeIngredients;
};

const denormalizeRecipeIngredients = (recipe) => {
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeIngredients.value[i - 1]

    if (ingredient?.title && ingredient?.measure) {
      recipe[`strIngredient${i}`] = ingredient.title
      recipe[`strMeasure${i}`] = ingredient.measure
    } else {
      recipe[`strIngredient${i}`] = ''
      recipe[`strMeasure${i}`] = ''
    }
  }
};

const addIngredient = () => {
  recipeIngredients.value.push(CommonService.getEmptyIngredient())
};

const removeIngredient = (index) => {
  recipeIngredients.value.splice(index, 1);
};

const createOrUpdateRecipe = () => {
  isCreatingMode.value ? createRecipe() : updateRecipe() 
};

const createRecipe = async () => {
  try {
    const params = {...recipeUpdated.value}
    denormalizeRecipeIngredients(params)
    await RecipeService.createRecipe()
  } catch (err) {
    console.error(err)
  }
};

const updateRecipe = async () => {
  try {
    const params = {...recipeUpdated.value}
    denormalizeRecipeIngredients(params)
    await RecipeService.updateRecipe()
  } catch (err) {
    console.error(err)
  }
};

onMounted(async () => {
  if (parseInt(recipeId)) {
    await fetchReсipe();
    normalizeRecipeIngredients();
  }
})
</script>

<style lang="sass" scoped>
.title
  font-weight: 700
  font-size: 24px
  letter-spacing: 1px

</style>
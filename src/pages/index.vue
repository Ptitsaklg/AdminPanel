<template>
  <v-container>
    <v-row  justify="space-between">
      <v-col cols="auto">
        <div class="title">Рецепты</div>
      </v-col>
      <v-col cols="auto">
        <router-link :to="getRecipePath('new')">
          <v-btn color="teal">Добавить рецепт</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>

    <v-data-table 
      :items="filteredRecipes"
      :headers="headers"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <template v-slot:item.strMealThumb="{ item }">
        <router-link :to="getRecipePath(item.idMeal)">
          <v-img 
            :src="item.strMealThumb" 
            alt="Фото блюда" 
            :width="72"
            class="my-1"
          >
          </v-img>
        </router-link>
      </template>

      <template v-slot:item.strTags="{ value }">
        <v-chip 
          v-for="(val, idx) in value.split(',')"
          :key="idx"
          color="primary"
          class="ma-1"
        >
          {{ val }}
        </v-chip>
    </template>

    </v-data-table>

    <!-- <div>{{ recipes }}</div> -->
  </v-container>
</template>

<script setup>
import { RecipeService } from "@/services";

const loading = ref(false);
const recipes = ref([]);

const headers = [
  { title: 'ID', value: 'idMeal' },
  { title: 'Фото', value: 'strMealThumb' },
  { title: 'Название блюда', value: 'strMeal', sortable: true },
  { title: 'Регион', value: 'strArea', sortable: true },
  { title: 'Категория', value: 'strCategory', sortable: true },
  { title: 'Тэги', value: 'strTags' },
];

const filteredRecipes = computed(() => {
  if (!Array.isArray(recipes.value)) {
    return [];
  }
  return recipes.value.map(recipe => ({
    idMeal: recipe.idMeal || 'Неизвестно',
    strMealThumb: recipe.strMealThumb || 'Неизвестно',
    strMeal: recipe.strMeal || 'Без названия',
    strArea: recipe.strArea || 'Неизвестно',
    strCategory: recipe.strCategory || 'Неизвестно',
    strTags: recipe.strTags ?? 'Нет тегов'
  }));
});

const fetchReсipes = async () => {
  try {
    loading.value = true;
    recipes.value = await RecipeService.getRecipesByLetter();
  } catch(err) {
    console.error(err);
    recipes.value = [];
  } finally {
    loading.value = false;
  }
};

const getRecipePath = (id) => {
  return `/recipe/${id}`;
};

onMounted(() => {
  fetchReсipes();
});
</script>

<style lang="sass" scoped>
.title
  font-weight: 700
  font-size: 24px
  letter-spacing: 1px

</style>
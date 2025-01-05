<template>
  <v-container>
    <v-data-table 
      :items="categories"
      :headers="headers"
      items-per-page="25"
    ></v-data-table>
  </v-container>
</template>
  
  <script setup>
  import { useRootStore } from "@/stores/root.js";

  const rootStore = useRootStore();
  const categories = computed(() => rootStore.categories);

  const headers = [
  { title: 'Категории', value: 'strCategory' },
];
  </script>
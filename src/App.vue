<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRootStore } from './stores/root';

const rootStore = useRootStore();

onMounted(() => {
  rootStore.getAreas();
  rootStore.getCategories();
  rootStore.getIngredients();
});
</script>

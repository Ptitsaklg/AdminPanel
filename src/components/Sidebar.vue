<template>
  <v-navigation-drawer 
    color="#282828"
    v-model="drawer"
    app
    width="80"
    :permanent=true
    :floating=true
  >
    <v-list lines="two">
      <v-list-item title="Admin"></v-list-item>
      <v-divider class="my-4"></v-divider>

      <v-list-item>
        <router-link to="/">
          <v-tooltip text="Рецепты">
            <template v-slot:activator="{ props }">
              <v-icon :class="['custom-icon', $route.path === '/' ? 'active' : '']" v-bind="props">mdi-notebook-edit-outline</v-icon>
            </template>
          </v-tooltip>
        </router-link>
      </v-list-item>

      <v-list-item>
        <router-link to="/categories">
          <v-tooltip text="Категории">
            <template v-slot:activator="{ props }">
              <v-icon :class="['custom-icon', $route.path === '/categories' ? 'active' : '']" v-bind="props">mdi-shape-plus-outline</v-icon>
            </template>
          </v-tooltip>
        </router-link>
      </v-list-item>


    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const drawer = ref(true)
</script>


<style lang="sass" scoped>
.custom-icon
  color: rgba(255, 255, 255, 0.45)
  font-size: 40px

.active
  color: rgba(255, 255, 255)
  font-size: 40px

</style>
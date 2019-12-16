<template>
  <v-container>
    <template v-if="list.length">
      <v-row>
        <v-col  
          cols="6"
          md="4" 
          v-for="movie in list" :key="movie.id">
          <MovieCard
            :item="movie"
          />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'MoviesList',
  components: {
    MovieCard,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
  },
};
</script>

<style scoped>

</style>

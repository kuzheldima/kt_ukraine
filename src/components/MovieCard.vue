<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="imageUrl"
    >
      <v-card-title>{{ item.title }}</v-card-title>
    </v-img>

    <v-card-subtitle 
      class="pb-0"
    >
      {{item.release_date}}
    </v-card-subtitle>
    <v-rating 
      readonly 
      :value="itemRating"
    ></v-rating>
    <v-card-text class="text--primary">
      <v-btn 
        color="primary" 
        @click="$router.push(`/movie/${item.id}`)"
      >
        Show Details
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    itemRating() {
      return this.item.vote_average.toFixed() / 2;
    },
    imageUrl() {
      return process.env.VUE_APP_IMAGE_URL + this.item.poster_path;
    }
  },
};
</script>
<template>
  <div>
  	<MoviesList
  		:list="movies"
  	/>
  	<div class="text-center">
  		<v-pagination
        class="mb-10 mt-10"
  			v-model="page"
  			:length="pages"
  			total-visible="10"
  			@input="load"
  		></v-pagination>
  	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue'

export default {
  components: {
    MoviesList,
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapGetters('movies', ['movies', 'pages']),
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$store.dispatch('movies/FETCH_MOVIES', this.page );
    },
  }
}
</script>
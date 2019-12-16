<template>
	<div>
	  <v-parallax
	    dark
	    :src="posterUrl"
	    class="poster"
	    height="400"
	  >
	    <v-row
	      align="center"
	      justify="center"
	      class="poster-content"
	    >
	      <v-col class="text-center" cols="12">
	        <h1>{{ movie.title }}</h1>
	      </v-col>
	    </v-row>
	  </v-parallax>
	  <v-container>
	  	<v-row>
	  		<v-col cols="4">
				  <v-carousel 
				  	hide-delimiters
				  >
				    <v-carousel-item
				      v-for="(image,i) in images"
				      :key="i"
				      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image.file_path}`"
				      reverse-transition="fade-transition"
				      transition="fade-transition"
				    ></v-carousel-item>
				  </v-carousel>
	  		</v-col>
	  		<v-col cols="8">
	  			<v-row>
	  				<v-col cols="8">
		  				<h2>{{ movie.original_title }}</h2>
		  				<v-rating 
		  					v-if="itemRating"
		  					class="mb-3" 
		  					readonly 
		  					:value="itemRating"
		  				></v-rating>
		  				<p>{{ movie.overview }}</p>
	  				</v-col>
	  				<v-col cols="4">
	  					  <v-card
							    class="mx-auto"
							    max-width="400"
							    tile
							  >
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Status</v-list-item-title>
							        <v-list-item-subtitle>{{ movie.status }}</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Release Date</v-list-item-title>
							        <v-list-item-subtitle>{{ movie.release_date }}</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Original Language</v-list-item-title>
							        <v-list-item-subtitle>{{ movie.original_language }}</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Production Countries</v-list-item-title>
							        <v-list-item-subtitle 
							        	v-for="(country, i) in movie.production_countries"
							        	:key="i"
							        >
							        	{{ country.name }}
							       	</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Budget</v-list-item-title>
							        <v-list-item-subtitle>{{ movie.budget }} $</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Genres</v-list-item-title>
							        <div class="chips">
							        	<v-chip 
							        		class="ma-1" 
							        		small 
							        		v-for="(genre, i) in movie.genres"
							        		:key="i"
							        	>
							        		{{ genre.name }}
							        	</v-chip>
							        </div>
							      </v-list-item-content>
							    </v-list-item>
							    <v-list-item>
							      <v-list-item-content>
							        <v-list-item-title>Runtime</v-list-item-title>
							        <v-list-item-subtitle>{{ (movie.runtime / 60).toFixed(2) }}</v-list-item-subtitle>
							      </v-list-item-content>
							    </v-list-item>
							  </v-card>
	  				</v-col>
	  			</v-row>
	  		</v-col>
	  	</v-row>
		  <v-row v-if="similarMovies.length">
		    <v-col cols="12">
		      <v-card>
		        <v-container fluid>
		          <v-row>
		          	<v-col
		          		cols="12"
		          	>
		          		<h2>Similar Movies</h2>
		          	</v-col>
		            <v-col
		              v-for="similarMovie in similarMovies"
		              :key="similarMovie.id"
		              class="d-flex child-flex"
		              cols="3"
		            >
		              <v-card 
		              	flat 
		              	tile 
		              	class="d-flex similar-movie-holder"
		              	@click="$router.push(`/movie/${similarMovie.id}`), getData()"
		              >
		                <v-img
		                  :src="`https://image.tmdb.org/t/p/w250_and_h141_face${similarMovie.backdrop_path}`"
		                  class="grey lighten-2"
		                >
		                </v-img>
		                <span class="similar-title">{{ similarMovie.title }}</span>
		              </v-card>
		            </v-col>
		          </v-row>
		        </v-container>
		      </v-card>
		    </v-col>
		  </v-row>
	  </v-container>
	</div>
</template>

<script>
import { getMovie, getMovieImages, getSimilarMovies } from '@/api/movies';

export default {
  data: () => ({
  	movie: {},
  	images: [],
  	similarMovies: []
  }),
  computed: {
    posterUrl() {
    	let url;
    	if (this.movie && this.movie.poster_path) {
    		url = process.env.VUE_APP_POSTER_URL + this.movie.poster_path;
    	}
    	return url;
    },
    itemRating() {
    	let rating = 0;
    	if (this.movie.vote_average) {
    		rating = this.movie.vote_average.toFixed() / 2;
    	}
    	return rating;
    },
  },
  methods: {
  	async getData() {
	    this.movie = await getMovie(this.$route.params.id);
	    this.similarMovies = await getSimilarMovies(this.$route.params.id);
	    this.images = await getMovieImages(this.$route.params.id);
  	}
  },
  mounted() {
  	this.getData();
  },

}
</script>

<style scope>
	.poster {
		position: relative;
	}
	.poster:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 2;
	}
	.poster-content {
		position: relative;
		z-index: 4;
	}
	.sub-title {
		display: block;
		font-size: 18px;
	}
	.similar-title {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		color: #fff;
		padding: 5px 10px;
		opacity: 0;
		transition: 0.5s;
	}
	.similar-movie-holder:hover .similar-title {
		opacity: 1;
	}
	h1 {
		font-size: 60px;
	}
</style>
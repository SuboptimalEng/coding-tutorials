<template>
  <div
    class="antialiased mt-1 flex flex-row justify-center text-center text-gray-700 font-sans font-light"
  >
    <div class="flex flex-col justify-center">
      <!-- available sections -->
      <div class="flex flex-row justify-center">
        <button
          class="m-5 p-2 rounded bg-red-500"
          @click="changeSection('tinder')"
        >
          Tinder
        </button>
        <button
          class="m-5 p-2 rounded bg-gray-300"
          @click="changeSection('disliked')"
        >
          Disliked
        </button>
        <button
          class="m-5 p-2 rounded bg-green-500"
          @click="changeSection('liked')"
        >
          Liked
        </button>
      </div>

      <!-- liked section -->
      <div v-if="section === 'liked'">
        <div v-if="likedGifs.length === 0">No liked gifs 😭</div>
        <div
          v-else
          v-for="likedGif in likedGifs.slice().reverse()"
          v-bind:key="likedGif"
        >
          <img :src="likedGif.images.original.url" alt="" class="m-5 w-80" />
        </div>
      </div>

      <!-- disliked section -->
      <div v-else-if="section === 'disliked'">
        <div v-if="dislikedGifs.length === 0">No disliked gifs 😇</div>
        <div
          v-else
          v-for="dislikedGif in dislikedGifs.slice().reverse()"
          v-bind:key="dislikedGif"
        >
          <img :src="dislikedGif.images.original.url" alt="" class="m-5 w-80" />
        </div>
      </div>

      <!-- tinder section -->
      <div v-else>
        <div class="flex justify-center">
          <button class="text-6xl" @click="swipeLeft">❌</button>

          <div v-if="!Object.keys(gif).length">loading...</div>
          <div v-else>
            <img :src="gif.images.original.url" alt="" class="mx-5 w-80" />
          </div>

          <button class="text-6xl" @click="swipeRight">✅</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './assets/styles/index.css';
import _ from 'lodash';
import { GiphyFetch } from '@giphy/js-fetch-api';

export default {
  name: 'App',

  data() {
    return {
      section: 'tinder',
      dislikedGifs: [],
      likedGifs: [],
      gif: {},
    };
  },

  async created() {
    await this.loadRandomGif();
  },

  methods: {
    async loadRandomGif() {
      const gf = new GiphyFetch(process.env.VUE_APP_GIPHY_API_KEY);
      const { data: gif } = await gf.random({ tag: 'movies' });
      this.gif = gif;
    },

    changeSection(section) {
      this.section = section;
    },

    gifIsNotSaved(gifArray, currentGifId) {
      return !_.some(gifArray, (gif) => gif.id === currentGifId);
    },

    async swipeRight() {
      if (this.gifIsNotSaved(this.likedGifs, this.gif.id)) {
        this.likedGifs.push(this.gif);
        if (this.likedGifs.length > 3) {
          this.likedGifs.shift();
        }
      }
      await this.loadRandomGif();
    },

    async swipeLeft() {
      if (this.gifIsNotSaved(this.dislikedGifs, this.gif.id)) {
        this.dislikedGifs.push(this.gif);
        if (this.dislikedGifs.length > 3) {
          this.dislikedGifs.shift();
        }
      }
      await this.loadRandomGif();
    },
  },
};
</script>

<style>
#app {
  /* font-sans */
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */

  /* antialiased */
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */

  /* text-center */
  /* text-align: center; */

  /* text-gray-800 */
  /* color: #2c3e50; */

  /* mt-20 */
  /* margin-top: 60px; */
}
</style>

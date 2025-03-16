<template>
    <div class="quran flex flex-col min-h-screen bg-gray-100">
      <!-- Navbar -->
      <nav class="bg-green-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">Quran Anywhere</h1>
          <div>
            <router-link to="/" class="mr-4 hover:underline">Home</router-link>
            <router-link to="/quran" class="hover:underline">Read Quran</router-link>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="flex-grow container mx-auto p-6">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Quran Surahs</h2>
        <div v-if="surahs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link
            v-for="surah in surahs"
            :key="surah.number"
            :to="{ name: 'SurahDetail', params: { number: surah.number } }"
            class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition block"
          >
            <h3 class="text-xl font-medium text-gray-800">
              {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
            </h3>
            <p class="text-gray-600">Verses: {{ surah.numberOfAyahs }}</p>
          </router-link>
        </div>
        <p v-else-if="error" class="text-red-600">{{ error }}</p>
        <p v-else class="text-gray-600">Loading Surahs...</p>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Quran Anywhere. Built with Vue.js.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "QuranPage",
    data() {
      return {
        surahs: [],
        error: null,
      };
    },
    mounted() {
      this.fetchSurahs();
    },
    methods: {
      async fetchSurahs() {
        try {
          const response = await axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani");
          if (response.data.code === 200) {
            this.surahs = response.data.data.surahs;
          } else {
            this.error = "Failed to load Surahs.";
          }
        } catch (error) {
          this.error = "An error occurred while fetching the Quran data.";
          console.error(error);
        }
      },
    },
  };
  </script>

<style scoped>
/* Add custom styles if needed */
</style>
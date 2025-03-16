<template>
    <div class="quran flex flex-col min-h-screen" :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-gray-100'">
      <!-- Navbar -->
      <nav class="bg-green-700 text-white p-4 shadow-lg sticky top-0 z-10" :class="darkMode ? 'bg-gray-800' : 'bg-green-700'">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold tracking-tight">Quran Anywhere</h1>
          <div class="space-x-6 flex items-center">
            <router-link to="/" class="hover:text-green-200 transition duration-300">Home</router-link>
            <router-link to="/quran" class="hover:text-green-200 transition duration-300">Read Quran</router-link>
            <button @click="toggleDarkMode" class="text-2xl" :class="darkMode ? 'text-yellow-400' : 'text-gray-200'">
              {{ darkMode ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="flex-grow container mx-auto p-6">
        <h2 class="text-4xl font-bold mb-6 animate-fade-in" :class="darkMode ? 'text-white' : 'text-gray-800'">Quran Surahs</h2>
        
        <!-- Search Bar -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Surahs by name or number..."
          class="w-full p-3 mb-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 shadow-sm"
          :class="darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'"
        />
  
        <!-- Bookmarked Verses Section -->
        <div v-if="bookmarkedVerses.length > 0" class="mb-10">
          <h3 class="text-2xl font-semibold mb-4" :class="darkMode ? 'text-white' : 'text-gray-800'">Bookmarked Verses</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="bookmark in bookmarkedVerses"
              :key="`${bookmark.surah}-${bookmark.verse}`"
              class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 relative"
              :class="darkMode ? 'bg-gray-800' : 'bg-white'"
            >
              <router-link
                :to="{ name: 'SurahDetail', params: { number: bookmark.surah } }"
                class="block"
              >
                <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-gray-800'">
                  Surah {{ bookmark.surah }}, Verse {{ bookmark.verse }}
                </h3>
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- Favorite Surahs Section -->
        <div v-if="favoriteSurahs.length > 0" class="mb-10">
          <h3 class="text-2xl font-semibold mb-4" :class="darkMode ? 'text-white' : 'text-gray-800'">Favorite Surahs</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="surah in favoriteSurahs"
              :key="surah.number"
              class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 relative"
              :class="darkMode ? 'bg-gray-800' : 'bg-white'"
            >
              <router-link
                :to="{ name: 'SurahDetail', params: { number: surah.number } }"
                class="block"
              >
                <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-gray-800'">
                  {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
                </h3>
                <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Verses: {{ surah.numberOfAyahs }}</p>
              </router-link>
              <button
                @click="toggleFavorite(surah.number)"
                class="absolute top-3 right-3 text-yellow-500 hover:text-yellow-600 transition duration-200"
              >
                <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
              </button>
            </div>
          </div>
        </div>
  
        <!-- All Surahs Section -->
        <div v-if="filteredSurahs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="surah in filteredSurahs"
            :key="surah.number"
            class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 relative"
            :class="darkMode ? 'bg-gray-800' : 'bg-white'"
          >
            <router-link
              :to="{ name: 'SurahDetail', params: { number: surah.number } }"
              class="block"
            >
              <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-gray-800'">
                {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
              </h3>
              <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Verses: {{ surah.numberOfAyahs }}</p>
            </router-link>
            <button
              @click="toggleFavorite(surah.number)"
              class="absolute top-3 right-3"
              :class="isFavorite(surah.number) ? 'text-yellow-500' : 'text-gray-400'"
            >
              <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
            </button>
          </div>
        </div>
        <p v-else-if="error" class="text-lg text-red-600">{{ error }}</p>
        <p v-else-if="surahs.length === 0" class="text-lg" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">Loading Surahs...</p>
        <p v-else class="text-lg" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">No Surahs match your search.</p>
      </main>
  
      <!-- Footer -->
      <footer class="p-6 text-center" :class="darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-900 text-white'">
        <p class="text-sm">© 2025 Quran Anywhere. Built with Vue.js.</p>
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
        searchQuery: "",
        favoriteSurahNumbers: [],
        bookmarkedVerses: [],
        darkMode: false,
        error: null,
      };
    },
    computed: {
      filteredSurahs() {
        if (!this.searchQuery) return this.surahs;
        const query = this.searchQuery.toLowerCase();
        return this.surahs.filter(
          (surah) =>
            surah.englishName.toLowerCase().includes(query) ||
            surah.name.toLowerCase().includes(query) ||
            surah.number.toString().includes(query)
        );
      },
      favoriteSurahs() {
        return this.surahs.filter((surah) => this.isFavorite(surah.number));
      },
    },
    mounted() {
      this.loadFavorites();
      this.loadVerseBookmarks();
      this.loadDarkMode();
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
      toggleFavorite(surahNumber) {
        const index = this.favoriteSurahNumbers.indexOf(surahNumber);
        if (index === -1) this.favoriteSurahNumbers.push(surahNumber);
        else this.favoriteSurahNumbers.splice(index, 1);
        this.saveFavorites();
      },
      isFavorite(surahNumber) {
        return this.favoriteSurahNumbers.includes(surahNumber);
      },
      saveFavorites() {
        localStorage.setItem("favoriteSurahs", JSON.stringify(this.favoriteSurahNumbers));
      },
      loadFavorites() {
        const savedFavorites = localStorage.getItem("favoriteSurahs");
        if (savedFavorites) this.favoriteSurahNumbers = JSON.parse(savedFavorites);
      },
      saveVerseBookmarks() {
        localStorage.setItem("bookmarkedVerses", JSON.stringify(this.bookmarkedVerses));
      },
      loadVerseBookmarks() {
        const savedBookmarks = localStorage.getItem("bookmarkedVerses");
        if (savedBookmarks) this.bookmarkedVerses = JSON.parse(savedBookmarks);
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem("darkMode", this.darkMode);
      },
      loadDarkMode() {
        this.darkMode = localStorage.getItem("darkMode") === "true";
      },
    },
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  </style>
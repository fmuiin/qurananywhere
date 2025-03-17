<template>
  <div class="quran flex flex-col min-h-screen transition-colors duration-300"
    :class="darkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'">
    <!-- Navbar -->
    <nav class="p-4 shadow-lg sticky top-0 z-10 transition-colors duration-300"
      :class="darkMode ? 'bg-dark-nav' : 'bg-primary-blue'">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-tight text-white">Quran Anywhere</h1>
        <div class="space-x-6 flex items-center">
          <router-link to="/" class="text-white hover:text-secondary-green transition duration-300">Home</router-link>
          <router-link to="/quran" class="text-white hover:text-secondary-green transition duration-300">Read
            Quran</router-link>
          <button @click="toggleDarkMode" class="text-2xl" :class="darkMode ? 'text-accent-gold' : 'text-white'">
            <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-6">
      <h2 class="text-4xl font-bold mb-6 animate-fade-in" :class="darkMode ? 'text-white' : 'text-primary-blue'">Quran
        Surahs</h2>

      <!-- Search Bar -->
      <input v-model="searchQuery" type="text" placeholder="Search Surahs by name or number..."
        class="w-full p-3 mb-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-green transition duration-200 shadow-sm"
        :class="darkMode ? 'bg-dark-nav border-gray-700 text-dark-text' : 'bg-white border-primary-blue text-light-text'" />

      <!-- Bookmarked Verses Section -->
      <div v-if="bookmarkedVerses.length > 0" class="mb-10">
        <h3 class="text-2xl font-semibold mb-4" :class="darkMode ? 'text-white' : 'text-primary-blue'">Bookmarked Verses
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="bookmark in bookmarkedVerses" :key="`${bookmark.surah}-${bookmark.verse}`"
            class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            :class="darkMode ? 'bg-dark-nav' : 'bg-white'">
            <router-link :to="{ name: 'SurahDetail', params: { number: bookmark.surah } }" class="block">
              <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-primary-blue'">
                Surah {{ bookmark.surah }}, Verse {{ bookmark.verse }}
              </h3>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Favorite Surahs Section -->
      <div v-if="favoriteSurahs.length > 0" class="mb-10">
        <h3 class="text-2xl font-semibold mb-4" :class="darkMode ? 'text-white' : 'text-primary-blue'">Favorite Surahs
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="surah in favoriteSurahs" :key="surah.number"
            class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 relative"
            :class="darkMode ? 'bg-dark-nav' : 'bg-white'">
            <router-link :to="{ name: 'SurahDetail', params: { number: surah.number } }" class="block">
              <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-primary-blue'">
                {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
              </h3>
              <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Verses: {{ surah.numberOfAyahs }}</p>
            </router-link>
            <button @click="toggleFavorite(surah.number)"
              class="absolute top-3 right-3 text-accent-gold hover:scale-110 transition duration-200">
              <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- All Surahs Section -->
      <div v-if="filteredSurahs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="surah in filteredSurahs" :key="surah.number"
          class="p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 relative"
          :class="darkMode ? 'bg-dark-nav' : 'bg-white'">
          <router-link :to="{ name: 'SurahDetail', params: { number: surah.number } }" class="block">
            <h3 class="text-xl font-medium" :class="darkMode ? 'text-white' : 'text-primary-blue'">
              {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
            </h3>
            <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Verses: {{ surah.numberOfAyahs }}</p>
          </router-link>
          <button @click="toggleFavorite(surah.number)"
            class="absolute top-3 right-3 hover:scale-110 transition duration-200"
            :class="isFavorite(surah.number) ? 'text-accent-gold' : 'text-gray-400'">
            <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
          </button>
        </div>
      </div>
      <p v-else-if="error" class="text-lg text-red-600">{{ error }}</p>
      <p v-else-if="surahs.length === 0" class="text-lg" :class="darkMode ? 'text-dark-text' : 'text-light-text'">
        Loading Surahs...</p>
      <p v-else class="text-lg" :class="darkMode ? 'text-dark-text' : 'text-light-text'">No Surahs match your search.
      </p>
    </main>

    <!-- Footer -->
    <footer class="p-6 text-center transition-colors duration-300"
      :class="darkMode ? 'bg-dark-bg text-dark-text' : 'bg-primary-blue text-white'">
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
        const response = await axios.get("https://api.alquran.cloud/v1/quran/quran-uthmani");
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
.bg-primary-blue {
  background-color: #1E3A8A;
}

.bg-secondary-green {
  background-color: #047857;
}

.text-light-text {
  color: #1E3A8A;
}

.bg-light-bg {
  background-color: #F0F7FA;
}

.bg-dark-bg {
  background-color: #1F2937;
}

.bg-dark-nav {
  background-color: #374151;
}

.text-dark-text {
  color: #E5E7EB;
}

.text-accent-gold {
  color: #D4AF37;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
</style>
<template>
  <div class="surah-detail flex flex-col min-h-screen transition-colors duration-300"
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
      <router-link to="/quran"
        class="hover:text-primary-blue transition duration-200 mb-6 inline-block text-lg font-medium"
        :class="darkMode ? 'text-secondary-green' : 'text-secondary-green'">
        ← Back to Surahs
      </router-link>
      <div v-if="surah" class="animate-fade-in">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-4xl font-bold" :class="darkMode ? 'text-white' : 'text-primary-blue'">
            {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
          </h2>
          <button @click="toggleFavorite(surah.number)" class="text-2xl hover:scale-110 transition duration-200"
            :class="isFavorite(surah.number) ? 'text-accent-gold' : 'text-gray-400'">
            <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
          </button>
        </div>
        <p class="mb-6 text-lg" :class="darkMode ? 'text-dark-text' : 'text-light-text'">Verses: {{ surah.numberOfAyahs
          }}</p>
        <div class="mb-8">
          <button @click="playSurah"
            class="bg-secondary-green text-white py-2 px-6 rounded-full hover:bg-primary-blue transition duration-300 shadow-md hover:shadow-lg">
            Play Surah
          </button>
          <audio ref="audioPlayer" controls class="mt-4 w-full rounded-lg shadow-sm"
            :class="darkMode ? 'bg-dark-nav' : 'bg-white'"></audio>
        </div>
        <div v-if="loading" class="text-lg" :class="darkMode ? 'text-dark-text' : 'text-light-text'">Loading verses...
        </div>
        <div v-else-if="error" class="text-lg text-red-600">{{ error }}</div>
        <div v-else class="space-y-6">
          <div v-for="(ayah, index) in surah.ayahs" :key="ayah.number" @click="playSingleAyah(index)"
            class="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer relative"
            :class="darkMode ? 'bg-dark-nav' : 'bg-white'">
            <p class="text-xl font-arabic" :class="darkMode ? 'text-white' : 'text-primary-blue'">{{ ayah.numberInSurah
              }}. {{ ayah.text }}</p>
            <p v-if="englishAyahs[index]" class="text-md mt-3" :class="darkMode ? 'text-dark-text' : 'text-light-text'">
              {{ englishAyahs[index].numberInSurah }}. {{ englishAyahs[index].text }}
            </p>
            <button @click.stop="toggleVerseBookmark(surah.number, ayah.numberInSurah)"
              class="absolute top-3 right-3 text-2xl hover:scale-110 transition duration-200"
              :class="isVerseBookmarked(surah.number, ayah.numberInSurah) ? 'text-accent-gold' : 'text-gray-400'">
              <i :class="isVerseBookmarked(surah.number, ayah.numberInSurah) ? 'fas fa-star' : 'far fa-star'"></i>
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-lg" :class="darkMode ? 'text-dark-text' : 'text-light-text'">Loading Surah...</p>
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
  name: "SurahDetailPage",
  data() {
    return {
      surah: null,
      englishAyahs: [],
      audioAyahs: [],
      currentAyahIndex: 0,
      favoriteSurahNumbers: [],
      bookmarkedVerses: [],
      darkMode: false,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.loadFavorites();
    this.loadVerseBookmarks();
    this.loadDarkMode();
    this.fetchSurah();
  },
  methods: {
    async fetchSurah() {
      const surahNumber = this.$route.params.number;
      this.loading = true;
      this.error = null;

      try {
        const arabicResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const englishResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`);
        const audioResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);

        if (
          arabicResponse.data.code === 200 &&
          englishResponse.data.code === 200 &&
          audioResponse.data.code === 200
        ) {
          this.surah = arabicResponse.data.data;
          this.englishAyahs = englishResponse.data.data.ayahs;
          this.audioAyahs = audioResponse.data.data.ayahs;
        } else {
          this.error = "Failed to load Surah, translation, or audio.";
        }
      } catch (error) {
        this.error = "An error occurred while fetching the Surah.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    playSurah() {
      this.currentAyahIndex = 0;
      this.playCurrentAyah();
      
      // Add event listener to play next ayah when current one ends
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.addEventListener('ended', this.playNextAyah);
    },
    playSingleAyah(index) {
      // Remove previous event listener if exists
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.removeEventListener('ended', this.playNextAyah);
      
      this.currentAyahIndex = index;
      this.playCurrentAyah();
    },
    playCurrentAyah() {
      if (this.audioAyahs[this.currentAyahIndex]) {
        const audioPlayer = this.$refs.audioPlayer;
        audioPlayer.src = this.audioAyahs[this.currentAyahIndex].audio;
        audioPlayer.play();
      }
    },
    playNextAyah() {
      if (this.currentAyahIndex < this.audioAyahs.length - 1) {
        this.currentAyahIndex++;
        this.playCurrentAyah();
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
    toggleVerseBookmark(surahNumber, verseNumber) {
      const bookmark = { surah: surahNumber, verse: verseNumber };
      const index = this.bookmarkedVerses.findIndex(
        (b) => b.surah === surahNumber && b.verse === verseNumber
      );
      if (index === -1) this.bookmarkedVerses.push(bookmark);
      else this.bookmarkedVerses.splice(index, 1);
      this.saveVerseBookmarks();
    },
    isVerseBookmarked(surahNumber, verseNumber) {
      return this.bookmarkedVerses.some(
        (b) => b.surah === surahNumber && b.verse === verseNumber
      );
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

.font-arabic {
  font-family: "Scheherazade", serif;
  font-size: 1.75rem;
  direction: rtl;
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
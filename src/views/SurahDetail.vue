<template>
    <div class="surah-detail flex flex-col min-h-screen"
        :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-gray-100'">
        <!-- Navbar -->
        <nav class="bg-green-700 text-white p-4 shadow-lg sticky top-0 z-10"
            :class="darkMode ? 'bg-gray-800' : 'bg-green-700'">
            <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold tracking-tight">Quran Anywhere</h1>
                <div class="space-x-6 flex items-center">
                    <router-link to="/" class="hover:text-green-200 transition duration-300">Home</router-link>
                    <router-link to="/quran" class="hover:text-green-200 transition duration-300">Read
                        Quran</router-link>
                    <button @click="toggleDarkMode" class="text-2xl"
                        :class="darkMode ? 'text-yellow-400' : 'text-gray-200'">
                        {{ darkMode ? '☀️' : '🌙' }}
                    </button>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-grow container mx-auto p-6">
            <router-link to="/quran"
                class="text-green-600 hover:text-green-700 transition duration-200 mb-6 inline-block text-lg font-medium"
                :class="darkMode ? 'text-green-400' : 'text-green-600'">
                ← Back to Surahs
            </router-link>
            <div v-if="surah" class="animate-fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-4xl font-bold" :class="darkMode ? 'text-white' : 'text-gray-800'">
                        {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
                    </h2>
                    <button @click="toggleFavorite(surah.number)"
                        :class="isFavorite(surah.number) ? 'text-yellow-500' : 'text-gray-400'"
                        class="text-3xl hover:scale-110 transition duration-200">
                        <i :class="isFavorite(surah.number) ? 'fas fa-star' : 'far fa-star'"></i>
                    </button>
                </div>
                <p class="mb-6 text-lg" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Verses: {{
                    surah.numberOfAyahs }}</p>
                <div class="mb-8">
                    <button @click="playSurah"
                        class="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg">
                        Play Surah
                    </button>
                    <audio ref="audioPlayer" controls class="mt-4 w-full rounded-lg shadow-sm"></audio>
                </div>
                <div v-if="loading" class="text-lg" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">Loading
                    verses...</div>
                <div v-else-if="error" class="text-lg text-red-600">{{ error }}</div>
                <div v-else class="space-y-6">
                    <div v-for="(ayah, index) in surah.ayahs" :key="ayah.number" @click="playSingleAyah(index)"
                        class="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer relative"
                        :class="darkMode ? 'bg-gray-800' : 'bg-white'">
                        <p class="text-xl font-arabic" :class="darkMode ? 'text-white' : 'text-gray-800'">{{
                            ayah.numberInSurah }}. {{ ayah.text }}</p>
                        <p v-if="englishAyahs[index]" class="text-md mt-3"
                            :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
                            {{ englishAyahs[index].numberInSurah }}. {{ englishAyahs[index].text }}
                        </p>
                        <button @click.stop="toggleVerseBookmark(surah.number, ayah.numberInSurah)"
                            class="absolute top-3 right-3 text-2xl hover:scale-110 transition duration-200 group"
                            :class="isVerseBookmarked(surah.number, ayah.numberInSurah) ? 'text-yellow-500' : 'text-gray-400'">
                            <i
                                :class="isVerseBookmarked(surah.number, ayah.numberInSurah) ? 'fas fa-star' : 'far fa-star'"></i>
                            <span
                                class="absolute right-0 top-10 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition duration-200">Bookmark</span>
                        </button>
                    </div>
                </div>
            </div>
            <p v-else class="text-lg" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">Loading Surah...</p>
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
                const arabicResponse = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}`);
                const englishResponse = await axios.get(
                    `http://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`
                );
                const audioResponse = await axios.get(
                    `http://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
                );

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
        },
        playSingleAyah(index) {
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
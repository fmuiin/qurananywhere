<template>
    <div class="surah-detail flex flex-col min-h-screen bg-gray-100">
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
            <div v-if="surah">
                <router-link to="/quran" class="text-green-600 hover:underline mb-4 inline-block">
                    ← Back to Surahs
                </router-link>
                <h2 class="text-3xl font-semibold text-gray-800 mb-4">
                    {{ surah.number }}. {{ surah.englishName }} ({{ surah.name }})
                </h2>

                <p class="text-gray-600 mb-6">Verses: {{ surah.numberOfAyahs }}</p>
                <div v-if="loading" class="text-gray-600">Loading verses...</div>
                <div v-else-if="error" class="text-red-600">{{ error }}</div>
                <div v-else class="space-y-4">
                    <div v-for="ayah in surah.ayahs" :key="ayah.number" class="bg-white p-4 rounded-lg shadow">
                        <p class="text-lg text-gray-800">{{ ayah.numberInSurah }}. {{ ayah.text }}</p>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-600">Loading Surah...</p>
        </main>

        <!-- <router-link to="/quran" class="text-green-600 hover:underline mb-4 inline-block">
            ← Back to Surahs
        </router-link> -->

        <!-- Footer -->
        <footer class="bg-gray-800 text-white p-4 text-center">
            <p>© 2025 Quran Anywhere. Built with Vue.js.</p>
        </footer>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SurahDetailPage",
    data() {
        return {
            surah: null, // Store the selected Surah data
            loading: false,
            error: null,
        };
    },
    mounted() {
        this.fetchSurah();
    },
    methods: {
        async fetchSurah() {
            const surahNumber = this.$route.params.number; // Get Surah number from route params
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}`);
                if (response.data.code === 200) {
                    this.surah = response.data.data;
                } else {
                    this.error = "Failed to load Surah.";
                }
            } catch (error) {
                this.error = "An error occurred while fetching the Surah.";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
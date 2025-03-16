<template>
    <div class="home flex flex-col min-h-screen" :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-gray-100'">
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
  
      <!-- Hero Section -->
      <section class="flex-grow flex items-center justify-center py-16 px-6">
        <div class="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" :class="darkMode ? 'text-white' : 'text-gray-800'">
            Explore the Quran, Anytime, Anywhere
          </h1>
          <p class="text-xl mb-8" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
            A modern app to read, listen, search, and bookmark the Holy Quran with ease.
          </p>
          <router-link
            to="/quran"
            class="inline-block bg-green-600 text-white py-3 px-10 rounded-full hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
          >
            Start Reading
          </router-link>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="py-16" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-12" :class="darkMode ? 'text-white' : 'text-gray-800'">Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-gray-700' : 'bg-white'">
              <div class="text-green-600 text-4xl mb-4">📖</div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-gray-800'">Read Quran</h3>
              <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Access all 114 Surahs with Arabic text and English translations.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-gray-700' : 'bg-white'">
              <div class="text-green-600 text-4xl mb-4">🎧</div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-gray-800'">Listen to Recitations</h3>
              <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Play individual verses or entire Surahs with beautiful recitations.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-gray-700' : 'bg-white'">
              <div class="text-green-600 text-4xl mb-4">🔍</div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-gray-800'">Search Surahs</h3>
              <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Quickly find Surahs by name or number with real-time search.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-gray-700' : 'bg-white'">
              <div class="text-green-600 text-4xl mb-4">⭐</div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-gray-800'">Bookmark Favorites</h3>
              <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">Save your favorite Surahs and verses for easy access.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call to Action -->
      <section class="py-16 bg-green-700 text-white text-center" :class="darkMode ? 'bg-gray-700' : 'bg-green-700'">
        <h3 class="text-3xl font-semibold mb-4">Ready to Begin?</h3>
        <p class="text-lg mb-6 max-w-xl mx-auto" :class="darkMode ? 'text-gray-200' : 'text-white'">
          Dive into the Quran with a seamless and intuitive experience.
        </p>
        <router-link
          to="/quran"
          class="inline-block bg-white text-green-700 py-3 px-10 rounded-full hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
          :class="darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-green-700'"
        >
          Explore Now
        </router-link>
      </section>
  
      <!-- Footer -->
      <footer class="p-6 text-center" :class="darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-900 text-white'">
        <p class="text-sm">© 2025 Quran Anywhere. Built with Vue.js.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
    data() {
      return {
        darkMode: false,
      };
    },
    mounted() {
      this.loadDarkMode();
    },
    methods: {
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
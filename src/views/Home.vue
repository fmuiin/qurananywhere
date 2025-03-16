<template>
    <div class="home flex flex-col min-h-screen transition-colors duration-300" :class="darkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'">
      <!-- Navbar -->
      <nav class="p-4 shadow-lg sticky top-0 z-10 transition-colors duration-300" :class="darkMode ? 'bg-dark-nav' : 'bg-primary-blue'">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold tracking-tight text-white">Quran Anywhere</h1>
          <div class="space-x-6 flex items-center">
            <router-link to="/" class="text-white hover:text-secondary-green transition duration-300">Home</router-link>
            <router-link to="/quran" class="text-white hover:text-secondary-green transition duration-300">Read Quran</router-link>
            <button @click="toggleDarkMode" class="text-2xl" :class="darkMode ? 'text-accent-gold' : 'text-white'">
              <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>
          </div>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <section class="flex-grow flex items-center justify-center py-16 px-6">
        <div class="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" :class="darkMode ? 'text-white' : 'text-primary-blue'">
            Explore the Quran, Anytime, Anywhere
          </h1>
          <p class="text-xl mb-8 font-light" :class="darkMode ? 'text-dark-text' : 'text-light-text'">
            A modern app to read, listen, search, and bookmark the Holy Quran with ease.
          </p>
          <router-link
            to="/quran"
            class="inline-block bg-secondary-green text-white py-3 px-10 rounded-full hover:bg-primary-blue transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
          >
            Start Reading
          </router-link>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="py-16 transition-colors duration-300" :class="darkMode ? 'bg-dark-nav' : 'bg-white'">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-12" :class="darkMode ? 'text-white' : 'text-primary-blue'">Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-dark-bg' : 'bg-light-bg'">
              <div class="text-secondary-green text-4xl mb-4"><i class="fas fa-book"></i></div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-primary-blue'">Read Quran</h3>
              <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Access all 114 Surahs with Arabic text and English translations.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-dark-bg' : 'bg-light-bg'">
              <div class="text-secondary-green text-4xl mb-4"><i class="fas fa-headphones"></i></div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-primary-blue'">Listen to Recitations</h3>
              <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Play individual verses or entire Surahs with beautiful recitations.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-dark-bg' : 'bg-light-bg'">
              <div class="text-secondary-green text-4xl mb-4"><i class="fas fa-search"></i></div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-primary-blue'">Search Surahs</h3>
              <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Quickly find Surahs by name or number with real-time search.</p>
            </div>
            <div class="text-center p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1" :class="darkMode ? 'bg-dark-bg' : 'bg-light-bg'">
              <div class="text-secondary-green text-4xl mb-4"><i class="fas fa-star"></i></div>
              <h3 class="text-xl font-semibold mb-2" :class="darkMode ? 'text-white' : 'text-primary-blue'">Bookmark Favorites</h3>
              <p :class="darkMode ? 'text-dark-text' : 'text-light-text'">Save your favorite Surahs and verses for easy access.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call to Action -->
      <section class="py-16 text-center transition-colors duration-300" :class="darkMode ? 'bg-dark-nav text-white' : 'bg-secondary-green text-white'">
        <h3 class="text-3xl font-semibold mb-4">Ready to Begin?</h3>
        <p class="text-lg mb-6 max-w-xl mx-auto">Dive into the Quran with a seamless and intuitive experience.</p>
        <router-link
          to="/quran"
          class="inline-block bg-primary-blue text-white py-3 px-10 rounded-full hover:bg-primary-blue transition duration-300 shadow-md hover:shadow-lg text-lg font-semibold"
          :class="darkMode ? 'text-dark-nav bg-secondary-green' : 'text-secondary-green hover:bg-primary-blue hover:text-white'"
        >
          Explore Now
        </router-link>
      </section>
  
      <!-- Footer -->
      <footer class="p-6 text-center transition-colors duration-300" :class="darkMode ? 'bg-dark-bg text-dark-text' : 'bg-primary-blue text-white'">
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
  .bg-primary-blue { background-color: #1E3A8A; }
  .bg-secondary-green { background-color: #047857; }
  .text-light-text { color: #1E3A8A; }
  .bg-light-bg { background-color: #F0F7FA; }
  .bg-dark-bg { background-color: #1F2937; }
  .bg-dark-nav { background-color: #374151; }
  .text-dark-text { color: #E5E7EB; }
  .text-accent-gold { color: #D4AF37; }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
  </style>
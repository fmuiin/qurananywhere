<template>
    <div class="home flex flex-col min-h-screen bg-gray-100">
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
      <main class="flex-grow flex items-center justify-center">
        <div class="text-center p-6">
          <h2 class="text-4xl font-semibold text-gray-800 mb-4">
            Access the Quran Anytime, Anywhere
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            Read, search, and bookmark verses with ease.
          </p>
          <router-link
            to="/quran"
            class="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Get Started
          </router-link>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Quran Anywhere. Built with Vue.js.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage", // Changed from "Home" to "HomePage"
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
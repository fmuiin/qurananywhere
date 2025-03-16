# Quran Anywhere

![Quran Anywhere Logo](https://via.placeholder.com/150) <!-- Replace with your logo URL if you have one -->

A modern, responsive web application built with Vue.js to explore the Holy Quran. Read, listen, search, and bookmark Surahs and verses with an elegant Islamic blue-green themed interface. Perfect for users seeking a seamless Quran experience anytime, anywhere.

## Features

- **Read Quran**: Access all 114 Surahs with Arabic text and English translations.
- **Listen to Recitations**: Play individual verses or entire Surahs with audio recitations by Sheikh Mishary Rashid Alafasy.
- **Search Surahs**: Quickly find Surahs by name or number with real-time search functionality.
- **Bookmark Favorites**: Save favorite Surahs and specific verses for easy access, stored in `localStorage`.
- **Dark Mode**: Toggle between light and dark themes with a smooth transition, inspired by an Islamic blue-green palette.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.

## Screenshots

| Home Page (Light Mode) | Quran Page (Dark Mode) | Surah Detail (Light Mode) |
|-----------------------|------------------------|---------------------------|
| ![Home Light](https://via.placeholder.com/300x200.png?text=Home+Light) | ![Quran Dark](https://via.placeholder.com/300x200.png?text=Quran+Dark) | ![Surah Light](https://via.placeholder.com/300x200.png?text=Surah+Light) |

*Note: Replace placeholders with actual screenshots after deployment.*

## Demo

Check out the live demo: [Quran Anywhere Demo](#) <!-- Replace with your deployed URL -->

## Tech Stack

- **Frontend**: Vue.js 3, Vue Router
- **Styling**: Tailwind CSS with custom Islamic blue-green theme
- **Icons**: Font Awesome
- **API**: [Al Quran Cloud API](http://api.alquran.cloud/)
- **Storage**: Browser `localStorage` for favorites and bookmarks
- **Build Tool**: Vite

## Installation

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/quran-anywhere.git
   cd quran-anywhere
   Install Dependencies:


2. **Install Dependencies**:
   ```bash
   npm install
   
3. **Run the Development Server**:
   ```bash
   npm run serve

4. **Open your browser and navigate to**:
   ```bash
   http://localhost:8080
   
## Usage

Home Page: Start your journey with an overview of features and a "Start Reading" button.

Quran Page: Browse all Surahs, search, and view your bookmarked verses and favorite Surahs.

Surah Detail Page: Read verses, listen to recitations, and bookmark specific verses with a star icon.

### Dark Mode
Toggle dark mode using the sun/moon icon in the navbar. Your preference is saved across sessions.

## Project Structure

- `public/`: Contains publicly accessible files
  - `index.html`: The main HTML file
  - `favicon.ico`: The website favicon

- `src/`: Source code directory
  - `assets/`: Static assets like images and logos
  - `components/`: Reusable Vue components
  - `views/`: Page-level Vue components
    - `Home.vue`: Home page component
    - `Quran.vue`: Quran page component
    - `SurahDetail.vue`: Surah detail page component
  - `App.vue`: The root Vue component
  - `main.js`: The entry point of the application
  - `router.js`: Vue Router configuration

- `.gitignore`: Specifies intentionally untracked files to ignore
- `package.json`: Defines project dependencies and scripts
- `README.md`: Project documentation and information

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m "Add your feature").
4. Push to the branch (git push origin feature/your-feature).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Al Quran Cloud API for providing Quran data and audio.
- Vue.js and Tailwind CSS for an amazing development experience.
- Font Awesome for icons.

## Contact
For questions or feedback, reach out to me:
- GitHub: your-username
- Email: your-email@example.com


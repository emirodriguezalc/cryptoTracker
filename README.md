# Cryptocurrency Tracker App

This is a mobile application that fetches and displays information about the top 10 cryptocurrencies by market cap. The app utilizes the CoinGecko API to retrieve cryptocurrency data and provides various features for users to explore and search for specific cryptocurrencies.

## Requirements

To run and use the Cryptocurrency Tracker app, you need to have the following:

- Node.js (v12 or higher)
- Expo CLI (installation guide: https://docs.expo.io/get-started/installation/)
- iOS or Android device or emulator

## Required Features

1. Fetch and Display Top 10 Cryptocurrencies:
   - The app fetches data from the CoinGecko API or any other public API of your choice to retrieve the top 10 cryptocurrencies by market cap. ✅
   - The following information is displayed for each cryptocurrency:
     - Name
     - Symbol
     - Current price in USD
     - Market cap rank
     - 24-hour price change percentage
     - 7-day price change percentage

2. Detailed Cryptocurrency Information: ✅
   - Users can tap on a cryptocurrency to view more detailed information.
   - The detailed information includes:
     - Price in multiple currencies (USD, EUR, GBP, etc.)
     - Market cap
     - 24-hour trading volume
     - Circulating supply
     - Total supply (if available)
     - All-time high price
     - All-time low price
     - Price chart (last 30 days)

3. Search Functionality: ✅
   - Users can search for a specific cryptocurrency by name or symbol.
   - The search results display the same information as the top 10 list.
   - Tapping on a search result shows the detailed information view.

4. Performance Optimization:❌
   - The application implements efficient data fetching, caching, and state management techniques to optimize performance.
   - Data is fetched and updated in a way that minimizes redundant requests.
   - Caching mechanisms are used to store and reuse fetched data when appropriate.
   - State management techniques ensure smooth and responsive user experience.

5. Cross-Platform Compatibility:❌
   - The application is developed to work seamlessly on both iOS and Android platforms.
   - It is compatible with iOS and Android devices and emulators.

6. Clean and Modular Code:❌
   - The codebase is organized in a clean and modular manner.
   - Components and functions are structured and named intuitively.
   - Code is well-documented, making it easy to understand and maintain.

## Bonus features

1. Implement pagination or infinite scrolling to load more cryptocurrencies as the user scrolls down the list.✅
2. Add a feature for users to mark their favorite cryptocurrencies and view them in a separate list.❌
3. Make the application responsive to work on iPad and smartphone.❌

## Getting Started

To get started with the Cryptocurrency Tracker app, follow these steps:

1. Install Node.js from the official website: https://nodejs.org
2. Install Expo CLI by running the following command in your terminal:
   ```
   npm install -g expo-cli
   ```
3. Clone the repository and navigate to the project directory:
   ```
   git clone <repository-url>
   cd cryptocurrency-tracker-app
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   expo start
   ```
6. Use the Expo app on your iOS or Android device, or use an emulator, to scan the QR code displayed in the terminal or in the Expo DevTools.

## Comments

### Overview
I really enjoyed working on this technical challenge because the API provided was straightforward and easy to use. It allowed me to focus more on the implementation logic and user interface.

### Environment Setup
I encountered some challenges while setting up the environment for the project. Although I initially attempted to avoid using Expo, I ran into issues with Ruby on my M1 Mac. As a result, I had to adjust my approach and utilize Expo to ensure a smooth development experience. Unfortunately, this took up a significant portion of my time, causing some delays in the overall progress.

### Time Investment
I dedicated approximately 8 to 10 hours to complete the technical challenge. This includes time spent on environment setup, coding, debugging, and refining the implementation.

### Areas for Improvement
If I had more time, there are several areas I would focus on enhancing:

1. Code Modularity: I would refactor the codebase to make it more modular. Currently, some files are quite lengthy, and splitting them into smaller, reusable components would improve readability and maintainability.

2. Separation of Concerns: The fetching of data is currently implemented within the components. To improve code organization and separation of concerns, I would isolate the data fetching logic into separate modules or utilities.

3. Testing: Given more time, I would invest additional effort into writing comprehensive tests, especially for data handling and component behavior. This would help ensure the reliability and stability of the application.

4. Improved Price Chart: The 30-day price chart could be further improved to provide more valuable insights to the users. Exploring additional charting libraries or enhancing the existing charting component would be beneficial in making the chart more informative and visually appealing.

5. Style Enhancements: While working within the given time constraints, I incorporated some colors from the provided style guide. However, given more time, I would invest in refining the overall styles, ensuring a more cohesive and visually pleasing user interface. Also, the stylesheets for each component are not DRY.

6. Animations and Images: To enhance the user experience, I would add animations and leverage appropriate images where applicable. These elements can bring life to the application and make it more engaging for users.

7. Add spinners

8. Collaborating with a Designer LOL

### Conclusion
Overall, I found this technical challenge to be engaging and rewarding. It allowed me to showcase my skills in API integration, component development, and problem-solving. Given more time, I would focus on refining various aspects of the application to further enhance its performance and visual appeal.
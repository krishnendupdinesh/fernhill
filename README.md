# Fernhill Plants — MERN-style embeddable chat widget

A runnable React + Express demo. It uses mock in-memory product data, so MongoDB is **not required** for the starter. The Express API can later be connected to MongoDB. The assistant has **chat only** (no Shop/Cart tabs); the product catalogue and cart remain on the host website. Chat can recommend products and add them to the host-page cart. Voice input uses the browser SpeechRecognition API, and voice responses use SpeechSynthesis.

## Requirements
- Node.js 18+ and npm
- Chrome or Edge recommended for speech recognition; allow microphone permission

## Run locally
1. Unzip the project and open a terminal in the `fernhill` folder.
2. Install root helper:
   ```bash
   npm install
   npm run install:all
   ```
3. Start the API and React app together:
   ```bash
   npm run dev
   ```
4. Open the Vite URL shown in the terminal (normally http://localhost:5173). The API runs at http://localhost:4000.

You can also start them separately in two terminals using `npm run dev --prefix server` and `npm run dev --prefix client`.

## Project structure
```
fernhill/
  package.json
  README.md
  server/
    package.json
    index.js              # Express mock API: products, chat, checkout
  client/
    package.json
    index.html
    src/
      main.jsx
      App.jsx              # shop, host cart, floating chat widget
      styles.css
```

## Features
- Responsive Fernhill storefront and floating launcher
- Chat-only assistant panel with suggested questions
- Mock plant-care and recommendation replies from Express
- Product recommendations rendered inside chat, with Add buttons
- Catalogue and cart stay on the website, not in chatbot tabs
- Browser voice input and optional spoken responses
- Mock checkout creates a demo order; no real payment is processed

## Notes
- The starter uses in-memory data, not MongoDB persistence. Restarting the server resets the mock catalogue; refreshing the browser resets the cart.
- To add MongoDB later, install `mongoose`, define a Product model, and replace the `products` array in `server/index.js` with database queries.
- For an actual AI assistant, replace the rule-based `/api/chat` route with a server-side model API call. Keep API keys on the server, never in the React app.
- Speech recognition support varies by browser and usually requires localhost or HTTPS.

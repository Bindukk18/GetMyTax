# GetMyTax — Indian Income Tax Calculator (FY 2025-26)

A clean, modern, and completely client-side single-page application for salaried Indians to calculate their income tax for FY 2025-26. 

GetMyTax helps users compare the **Old** vs **New** tax regimes side-by-side, find out which one saves them more money, and see their TDS refund or payable status—all with zero jargon and completely securely.

## ✨ Features
- **Side-by-Side Comparison**: Automatically calculates your tax liability under both Old and New regimes simultaneously.
- **Actionable Verdict**: Clearly tells you which regime is better and exactly how much you save.
- **Live Preview Panel**: Watch your estimated tax update in real-time as you enter your salary, deductions, and investments.
- **Complete Privacy**: 100% client-side calculation. No data is stored, tracked, or sent to any server.
- **Comprehensive Coverage**: Handles basic salary, HRA, rent, 80C investments, NPS, health insurance (80D), home loan interest (24b), and TDS.

## 🛠️ Tech Stack
- **Framework**: React 18 (via Vite)
- **Styling**: Tailwind CSS 3.4
- **Typography**: Inter (Google Fonts)
- **State Management**: React `useState` (No Redux or Context required for the flat step structure)
- **Routing**: Internal state-based routing (No React Router)

## 🚀 How to Run Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Bindukk18/GetMyTax.git
   cd GetMyTax
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## 📁 Project Structure
- `src/App.jsx` - Main state manager holding all user inputs and step progression logic.
- `src/taxEngine.js` - The core mathematical engine containing tax brackets, standard deductions, and rules for FY 2025-26.
- `src/components/steps/` - Individual screens for each step of the data entry process.
- `src/components/TaxPreviewPanel.jsx` - The live side-panel showing real-time calculations.

## 📝 License
This project is open-source and free to use.

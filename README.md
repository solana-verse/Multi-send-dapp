# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Multi-Send dApp

A powerful Solana multi-send application that allows you to send SOL or SPL tokens to multiple recipients in a single transaction.

## Features

### 🚀 Core Functionality

- **Multi-recipient transfers**: Send to unlimited recipients in one transaction
- **Token support**: SOL, USDC, USDT, and custom SPL tokens
- **Real-time validation**: Address and amount validation with visual feedback
- **Transaction summary**: Live calculation of totals and fees

### 💼 Wallet Integration (Ready for Implementation)

- Wallet connection support (Phantom, Solflare, etc.)
- Secure transaction signing
- Balance checking

### 📊 Bulk Operations

- **CSV Import**: Import recipient lists from CSV files
- **Template Download**: Get a sample CSV format
- **Quick Actions**: Set equal amounts, clear all recipients

### 🎨 User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern gradient design with glass morphism
- **Real-time Feedback**: Input validation and status indicators
- **Smooth Animations**: Polished transitions and hover effects

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── App.css                   # Custom styles and animations
├── components/
│   ├── WalletButton.tsx      # Wallet connection component
│   ├── RecipientCard.tsx     # Individual recipient input card
│   ├── TransactionSummary.tsx # Transaction overview display
│   ├── CSVImport.tsx         # Bulk import functionality
│   └── QuickActions.tsx      # Utility action buttons
└── main.tsx                  # Application entry point
```

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project**

   ```bash
   cd "multi-send dapp"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage Guide

### Basic Transfer

1. Connect your wallet using the "Connect Wallet" button
2. Select the token type (SOL, USDC, USDT, or Custom)
3. Add recipients by clicking "Add Recipient"
4. Enter wallet addresses and amounts for each recipient
5. Review the transaction summary
6. Click "Send Tokens" to execute

### Bulk Import via CSV

1. Click "Template" to download a sample CSV file
2. Fill in your recipient data following the format: `address,amount`
3. Click "Import CSV" and select your file
4. Review imported data and make any adjustments
5. Proceed with the transaction

### Quick Actions

- **Set Equal Amounts**: Distribute a total amount equally among all recipients
- **Clear All**: Reset all recipient data

## CSV Format

Your CSV file should follow this format:

```csv
address,amount
7BgBvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGx,0.5
8CgBvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGy,1.0
9DhCvyjrZX8YKHKPgE9xuFuW4vbMxAQj6G5RRVJx9mGz,0.25
```

## Implementation Notes

### Ready for Solana Integration

The UI is fully prepared for Solana integration. Key integration points:

1. **Wallet Connection** (`WalletButton.tsx`)

   - Ready for @solana/wallet-adapter-react
   - Placeholder functions for connect/disconnect

2. **Transaction Building** (`App.tsx`)

   - Transaction data structure is prepared
   - Validation logic is in place
   - Ready for Solana Web3.js integration

3. **Token Support**
   - SOL transfers ready for native implementation
   - SPL token transfers ready for token program integration
   - Custom token mint address support

### Suggested Next Steps for Development

1. **Install Solana dependencies**:

   ```bash
   npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
   ```

2. **Integrate wallet adapter**
3. **Implement transaction building**
4. **Add error handling and success notifications**
5. **Implement balance checking**
6. **Add transaction confirmation tracking**

## Security Features

- ✅ Client-side validation
- ✅ Address format verification
- ✅ Amount validation
- ✅ No private key exposure
- ✅ Local-only transaction signing (when implemented)

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Note**: This is the UI implementation. Solana blockchain integration will be added in the next phase of development.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

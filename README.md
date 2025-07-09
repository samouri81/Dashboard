# Reach Labs Marketing Dashboard

A comprehensive marketing audit and strategic review platform built with React and Vite.

## Features

- **7 Audit Sections**: Digital Marketing, Social Media, CRM & Retention, UX/UI & Technical, Analytics & KPIs, Competitor Benchmarking, Strategic Recommendations
- **44 Checklist Items** with industry benchmarks
- **Real-time Progress Tracking**
- **Critical/Needs Work Flagging System**
- **Auto-save Functionality**
- **PDF Export Capability**
- **Client Management**
- **Responsive Design**

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Local Storage** for data persistence
- **Modern ES6+** JavaScript

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reach-labs-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start development server:
```bash
npm run dev
# or
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment

### Vercel Deployment

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"

3. **Build Settings (Auto-detected):**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Manual Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── App.jsx         # Main application component
├── App.css         # Application styles
├── main.jsx        # Application entry point
└── index.css       # Global styles
```

## Key Files

- **App.jsx**: Main dashboard component with all functionality
- **App.css**: Custom styling matching Reach Labs brand
- **package.json**: Dependencies and scripts
- **vite.config.js**: Vite configuration
- **index.html**: HTML template

## Customization

### Colors
The dashboard uses Reach Labs brand colors defined in CSS variables:
```css
:root {
  --cyan: #48cafb;
  --blue-1: #4c96f8;
  --blue-2: #45a7f9;
  --blue-3: #49b9fa;
  --black: #000000;
  --white: #ffffff;
}
```

### Fonts
- **Headings**: Montserrat (Google Fonts)
- **Body**: Open Sans (Google Fonts)

## Data Storage

The dashboard uses browser localStorage to persist:
- Audit progress for each client
- Checklist item states
- Notes and comments
- Section summaries
- Client list

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Private - Reach Labs Internal Use Only

## Support

For technical support, contact the development team.


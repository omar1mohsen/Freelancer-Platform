# Freelancer Platform - Next.js TypeScript Application

A modern, responsive freelancer marketplace built with Next.js, TypeScript, Ant Design, and Tailwind CSS. Features internationalization (Arabic/English), advanced filtering, sorting, and a clean, professional design.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful UI
- **Internationalization**: Full Arabic and English support with RTL layout
- **Advanced Filtering**: Service options, seller details, budget, delivery time
- **Smart Search**: Location-based search functionality  
- **Dynamic Sorting**: Most rated, lowest rated, highest/lowest price
- **State Management**: Zustand for efficient state handling
- **Modern Tech Stack**: Next.js 15, TypeScript, Ant Design, SCSS modules
- **Production Ready**: Clean code structure and best practices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Ant Design + Tailwind CSS + SCSS Modules
- **State Management**: Zustand
- **Internationalization**: next-intl
- **Icons**: Ant Design Icons
- **Build Tools**: PostCSS, Autoprefixer

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd freelancer-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🌍 Internationalization

The application supports both English and Arabic languages with:
- RTL layout for Arabic
- Localized content and UI elements
- Language switcher in footer
- URL-based locale routing (`/en/`, `/ar/`)

## 🎨 Design Features

- **Modern UI**: Clean, professional design matching the reference
- **Responsive Grid**: Adaptive freelancer card layout
- **Smooth Animations**: Hover effects and transitions
- **Accessible**: Proper contrast and semantic markup
- **Cross-browser**: Compatible with all modern browsers

## 📁 Project Structure

```
freelancer-platform/
├── app/
│   └── [lng]/                # App router with locale folders (e.g., en, ar)
│       ├── page.tsx         # Home page with search & results
│       ├── error.tsx        # Error boundary page
│       ├── layout.tsx       # Root layout
│       ├── loading.tsx      # Loading indicator
│       └── [...not_found]/  # Fallback 404 page
├── assets/                   # Static assets (images, logos)
├── components/               # Reusable components
│   ├── layout/              # Header, footer, and layout parts
│   ├── pagesComponents/     # Page-specific UI sections
│   ├── sharedComponents/    # Shared reusable components
│   └── UiComponents/        # UI primitives & utilities (buttons, loaders, etc.)
├── data/                     # Mock data and constants
├── hooks/                    # Custom React hooks
├── i18n/                     # Internationalization config & translations
├── public/                   # Public static files
├── store/                    # Zustand state management
├── styles/                   # Global SCSS/CSS styles
├── types/                    # TypeScript types and interfaces
├── utils/                    # Utility functions
├── .env                      # Environment variables
├── middleware.ts             # Next.js middleware for locale handling
├── next-env.d.ts             # Next.js type definitions
└── main.scss                 # Main global SCSS file
# Internationalization files
```

## 🔧 Configuration Files

- **next.config.js**: Next.js configuration with i18n
- **tailwind.config.js**: Tailwind CSS customization
- **i18n.ts**: Internationalization setup
- **middleware.ts**: Route localization middleware

## 🚀 Deployment

The application is ready for deployment on:

- **Vercel** (recommended): `vercel --prod`
- **Netlify**: Build command: `npm run build`
- **Any static hosting**: After `npm run build && npm run export`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Key Components

### FreelancerCard
- Profile image with hover effects
- Rating system with stars
- Pricing information
- Call-to-action button

### SearchFilters  
- Location-based search
- Multiple filter categories
- Dynamic sorting options
- Responsive layout

### Footer
- Comprehensive link sections
- Social media integration
- Language switcher
- Company information

## 🔍 State Management

Using Zustand for:
- Freelancer data management
- Filter state handling
- Search functionality
- Sorting logic

## 📄 License

This project is created for assessment purposes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
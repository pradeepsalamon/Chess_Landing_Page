# GrandMaster Chess Academy

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, responsive website for **NEXA Chess Academy** - a professional online chess training platform offering expert coaching for beginners, intermediate, and advanced players.

## 📖 About

This is a Next.js-based web application that showcases chess training programs, manages demo class bookings, and handles student registrations. The website features a beautiful UI with smooth animations and a fully functional booking system.

## ✨ Features

- **📱 Responsive Design** - Mobile-first, works seamlessly on all devices
- **🎓 Program Showcase** - Display of chess training programs for different skill levels
- **⏰ Session Management** - Clear information about class timings and schedules
- **🎯 Demo Classes** - Easy booking system for free demo classes
- **📊 Admin Dashboard** - Track and manage student registrations
- **📸 Gallery** - Visual showcase of academy activities
- **💬 Testimonials** - Student success stories and reviews
- **✉️ Contact System** - Easy way for prospects to reach out
- **🎨 Smooth Animations** - Framer Motion-powered interactive elements

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.2.6 with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4 with PostCSS
- **Animations**: [Framer Motion](https://www.framer.com/motion) 12.38.0
- **React**: 19.2.4
- **Linting**: ESLint 9

## 📦 Installation

### Prerequisites
- Node.js 18.17+ 
- npm or yarn or pnpm

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd naren
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   └── api/
│       ├── admin/
│       │   └── registrations/ # Admin registrations API
│       ├── book-demo/         # Demo booking API
│       └── register-demo/     # Demo registration API
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProgramsSection.tsx
│   ├── ClassTypesSection.tsx
│   ├── SessionTimingSection.tsx
│   ├── SundayTrainingSection.tsx
│   ├── WhyChooseUsSection.tsx
│   ├── DemoClassSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── StatsSection.tsx
│   ├── GallerySection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
└── data/
    └── demo-registrations/   # Registration data files
```

## 🔌 API Routes

### Demo Registration
- `POST /api/register-demo` - Register for a demo class
- `POST /api/book-demo` - Book a demo session

### Admin
- `GET /api/admin/registrations` - Fetch all registrations
- `Admin Dashboard` - View at `/admin`

## 🎨 Key Components

- **Navbar** - Navigation menu with branding
- **HeroSection** - Eye-catching landing section
- **ProgramsSection** - Display available chess programs
- **ClassTypesSection** - Different class options (beginner, intermediate, advanced)
- **SessionTimingSection** - Class schedule information
- **DemoClassSection** - Call-to-action for demo bookings
- **WhyChooseUsSection** - Academy benefits and USPs
- **TestimonialsSection** - Student reviews and success stories
- **GallerySection** - Photo gallery of activities
- **ContactSection** - Contact form and information
- **FloatingElements** - Animated background elements

## 📊 Data Management

Student registrations are stored in:
```
data/demo-registrations/registrations_YYYY-MM-DD.jsonl
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

## 🚢 Deployment

This project can be easily deployed on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

For other deployment options, refer to [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 📝 Development Notes

- The project uses TypeScript for type safety
- Tailwind CSS with PostCSS for styling
- Framer Motion for smooth animations
- Modular component structure for easy maintenance

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of NEXA Chess Academy.

---

**Happy Coding!** ♟️

# ShopHub-Website

# ShopHub - Premium E-Commerce Platform

A modern, feature-rich e-commerce website built with Next.js 15, featuring 3D graphics, advanced UI components, and a complete shopping experience.

## 🚀 Features

- **3D Interactive Hero Section** - Built with React Three Fiber and Drei
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Advanced Shopping Cart** - Context-based state management with persistence
- **Product Catalog** - Categorized products with filtering and sorting
- **Modern UI Components** - Built with shadcn/ui and Radix UI primitives
- **Theme Support** - Dark/light mode with next-themes
- **TypeScript** - Full type safety throughout the application
- **Performance Optimized** - Next.js 15 with App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1 + CSS Variables
- **UI Components**: shadcn/ui + Radix UI
- **3D Graphics**: React Three Fiber + Drei
- **State Management**: React Context + useReducer
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Geist + Manrope (Google Fonts)

## 📁 Project Structure

```
ecommerce-site_2/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact information
│   ├── product/[id]/      # Individual product pages
│   ├── shop/              # Product catalog
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Site footer
│   └── theme-provider.tsx # Theme context
├── lib/                  # Utility functions and contexts
│   ├── cart-context.tsx  # Shopping cart state management
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
└── public/               # Static assets and images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-site_2
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Key Components

### 3D Hero Section
The homepage features an interactive 3D scene with:
- Floating animated sphere with distortion effects
- 3D text rendering
- Orbit controls for user interaction
- Dynamic loading with Suspense

### Shopping Cart
- Context-based state management
- Local storage persistence
- Quantity controls with stock limits
- Real-time total calculations

### Product Catalog
- Category-based filtering
- Multiple sorting options
- Responsive grid layout
- Product badges and ratings

## 🎯 Features in Detail

- **Responsive Navigation** - Mobile-friendly navigation with cart integration
- **Product Management** - Add, remove, and update cart items
- **Checkout Process** - Streamlined checkout flow
- **Contact & About** - Company information pages
- **Modern Design** - Clean, professional e-commerce aesthetic

## 🔧 Configuration

The project uses several configuration files:
- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js configuration

## 📦 Dependencies

### Core Dependencies
- Next.js 15.2.4
- React 19
- TypeScript 5
- Tailwind CSS 4.1

### UI & Animation
- shadcn/ui components
- Radix UI primitives
- Framer Motion (via Tailwind)
- Lucide React icons

### 3D & Graphics
- React Three Fiber
- Three.js
- @react-three/drei

## 🌟 Highlights

- **Modern Architecture** - Built with the latest Next.js App Router
- **Performance** - Optimized with Next.js 15 features
- **Accessibility** - Built on Radix UI primitives
- **Developer Experience** - TypeScript, ESLint, and modern tooling
- **Responsive Design** - Mobile-first approach
- **3D Graphics** - Interactive 3D elements for enhanced UX



---

Built with ❤️ using Next.js, React, and modern web technologies.

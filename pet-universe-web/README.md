# P4Pet - Pet Universe Platform

A comprehensive pet services platform built with Next.js 15, featuring pet care services, marketplace, inventory management, and admin dashboard.

## 🚀 Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## ✨ Features

### Pet Owner Features
- **Pet Management**: Add and manage multiple pets with detailed profiles
- **Service Booking**: Book veterinary, grooming, training, and pet sitting services
- **Product Shopping**: Browse and purchase pet supplies and accessories
- **Marketplace**: Find pets for adoption, sale, or breeding
- **Dashboard**: Comprehensive overview of pets, appointments, and orders

### Service Provider Features
- **Provider Onboarding**: Easy registration and verification process
- **Service Management**: Create and manage service offerings
- **Booking Management**: Handle appointments and customer requests
- **Profile Management**: Business profile with ratings and reviews

### Admin Features
- **User Management**: Manage customers and service providers
- **Service Management**: Approve and manage service listings
- **Inventory Management**: Track stock levels, manage suppliers
- **Marketplace Management**: Moderate listings and manage features
- **Booking Management**: Oversee all platform bookings
- **Analytics Dashboard**: Comprehensive platform statistics

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with Glassmorphism effects
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Netlify with automated CI/CD
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kdadks/PetUniverse.git
   cd PetUniverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/petuniverse"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Accounts

### Admin Access
- **Email**: `admin@petuniverse.com`
- **Password**: `admin123`

### Pet Owner Access
- **Email**: `owner@test.com`
- **Password**: `owner123`

### Service Provider Access
- **Email**: `provider@test.com`
- **Password**: `provider123`

## 📦 Deployment

### Netlify Deployment

1. **Connect to GitHub**
   - Fork this repository
   - Connect your Netlify account to GitHub
   - Select this repository for deployment

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

3. **Set Environment Variables**
   Add these environment variables in Netlify:
   ```
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-site.netlify.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   DATABASE_URL=your-production-database-url
   ```

4. **Deploy**
   Push to main branch to trigger automatic deployment.

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy the 'out' directory to your hosting provider
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
├── src/
│   ├── app/                 # App Router pages and API routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API endpoints
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Pet owner dashboard
│   │   └── ...
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   └── ...
│   ├── lib/                # Utilities and configurations
│   └── ...
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions
└── ...
```

## 🎨 Design Features

- **Glassmorphic UI**: Modern glass-like interface with blur effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: WCAG compliant components
- **Dark Mode Ready**: Prepared for theme switching

## 🔐 Security

- **Authentication**: Secure NextAuth.js implementation
- **Role-based Access**: Admin, Provider, and Customer roles
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM security
- **XSS Protection**: Sanitized inputs and outputs

## 📊 Admin Features

### Dashboard Analytics
- User registration trends
- Revenue tracking
- Service booking metrics
- Inventory status monitoring

### Management Capabilities
- **User Management**: View, activate, deactivate users
- **Provider Management**: Approve/reject service providers
- **Service Management**: Moderate service listings
- **Inventory Management**: Stock tracking and supplier management
- **Marketplace Management**: Pet listing moderation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Lucide for beautiful icons
- Prisma for the excellent ORM

## 📞 Support

For support, email [support@p4pet.com](mailto:support@p4pet.com) or create an issue on GitHub.

---

**Built with ❤️ for pet lovers everywhere** 🐾

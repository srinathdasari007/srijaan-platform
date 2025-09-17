# Srijaan - Creative Solutions Platform

A comprehensive creative solutions platform built with React, TypeScript, and Supabase. This platform offers training programs, recruitment services, branding solutions, and employee management features.

## 🚀 Features

### Public Features
- **Creative Services**: Training, Staffing, Branding, and Design services
- **Workshop Management**: Browse and register for creative workshops
- **Success Stories**: Client testimonials and case studies
- **Partner Brands**: Showcase of partner companies
- **Contact Form**: Integrated with Google Sheets for lead management

### Employee Portal
- **Dashboard**: Real-time attendance tracking and overview
- **Attendance Management**: Check-in/out, break tracking, and history
- **Leave Management**: Apply for leaves and track balance
- **Time Tracking**: Comprehensive work and break time monitoring

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd srijaan-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

This project uses Supabase as the backend. The database schema includes:

- **contact_submissions**: Store contact form submissions
- **employees**: Employee profiles and information
- **attendance_logs**: Daily attendance records
- **break_logs**: Break time tracking
- **leave_requests**: Leave applications and status
- **documents**: Employee documents storage
- **learning_progress**: Training progress tracking

### Migration Files
The project includes comprehensive migration files in `supabase/migrations/` that set up:
- Contact form functionality
- Employee management system
- Attendance tracking
- Leave management
- Email configuration

## 🔧 Configuration

### Google Sheets Integration

1. **Create Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Create new project with the webhook code (see contact form integration guide)

2. **Deploy as Web App**
   - Set execution permissions
   - Copy the webhook URL

3. **Configure Supabase**
   - Add `GOOGLE_SHEETS_WEBHOOK_URL` environment variable in Supabase Edge Functions

### Supabase Edge Functions

The project includes a contact form edge function at `supabase/functions/contact-form/` that:
- Validates form data
- Stores submissions in database
- Sends data to Google Sheets
- Handles CORS properly

## 🎨 Design System

### Colors
- **Primary Purple**: `#4A148C`
- **Brand Yellow**: `#FFD700`
- **Brand Magenta**: `#FF00FF`
- **Brand Cyan**: `#00FFFF`

### Components
- Responsive design with mobile-first approach
- Consistent spacing using 8px grid system
- Modern animations and micro-interactions
- Glass morphism effects for premium feel

## 📱 Pages & Routes

### Public Routes
- `/` - Home page with hero, services, stats, portfolio
- `/workshops` - Workshop listings and registration
- `/checkout` - Workshop payment processing
- `/success-stories` - Client testimonials and case studies

### Employee Routes
- `/employee/dashboard` - Main dashboard with time tracking
- `/employee/attendance` - Detailed attendance management
- `/employee/leaves` - Leave application and management

## 🔐 Authentication

Currently configured for demo purposes with direct access to employee features. The system includes:
- Supabase Auth integration
- Row Level Security (RLS) policies
- Demo user setup for testing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The project is optimized for static hosting platforms:
- Automatic code splitting
- Optimized bundle sizes
- Progressive loading

### Supabase Deployment
- Edge functions are automatically deployed
- Database migrations can be applied via Supabase CLI
- Environment variables configured in Supabase dashboard

## 📊 Performance Optimizations

- **Code Splitting**: Vendor and icon chunks separated
- **Image Optimization**: External image URLs from Unsplash/Pexels
- **Bundle Analysis**: Terser minification and CSS optimization
- **Lazy Loading**: Route-based code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: marketing.srijaan@gmail.com
- Create an issue in this repository

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Public website with services showcase
  - Workshop management system
  - Employee portal with attendance tracking
  - Contact form with Google Sheets integration

---

Built with ❤️ by the Srijaan team
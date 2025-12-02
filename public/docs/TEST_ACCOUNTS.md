# 🔐 PetUniverse Test Accounts

## Quick Access Links

- **Sign In:** [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- **Customer Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Service Provider Dashboard:** [http://localhost:3000/provider/dashboard](http://localhost:3000/provider/dashboard)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

**Note:** To access dashboards, you must first sign in at `/auth/signin` with one of the test accounts below.

---

## 👤 Test Accounts

### 1. **CUSTOMER ACCOUNT** 🐕

**Use Case:** Browse services, book appointments, manage pets, shop products

```
Email: customer@petuniverse.com
Password: customer123
Role: CUSTOMER
```

**Access:**
- ✅ Customer Dashboard (`/dashboard`)
- ✅ Browse Services (`/services`)
- ✅ Book Services
- ✅ Marketplace (`/marketplace`)
- ✅ Shop Products (`/products`)
- ✅ Pet Management
- ✅ View Orders & Bookings
- ❌ Provider Dashboard (Blocked)
- ❌ Admin Dashboard (Blocked)

**What You Can Test:**
- View and book services
- Browse marketplace for pets
- Shop for pet products
- Add and manage your pets
- View booking history
- Rate and review services
- Update profile settings

---

### 2. **SERVICE PROVIDER ACCOUNT** 💼

**Use Case:** Manage services, handle bookings, update profile, upload media

```
Email: provider@petuniverse.com
Password: provider123
Role: SERVICE_PROVIDER
```

**Access:**
- ✅ Provider Dashboard (`/provider/dashboard`)
- ✅ Manage Services (`/provider/dashboard/services`)
  - Create new services
  - Edit existing services
  - Delete services
  - Toggle service visibility
- ✅ Profile Management (`/provider/dashboard/profile`)
  - Edit basic information
  - Update business details
  - Set business hours
  - Manage gallery & videos
  - Add certifications
- ✅ View Bookings
- ✅ Manage Clients
- ✅ View Reviews
- ✅ Analytics Dashboard
- ❌ Customer Dashboard (Blocked)
- ❌ Admin Dashboard (Blocked)

**What You Can Test:**
- **Service Management (CRUD):**
  - Create new service with pricing
  - Edit service details
  - Add/remove service features
  - Upload service images
  - Toggle active/inactive status
  - Delete services

- **Profile Management:**
  - Update business information
  - Add specialties & certifications
  - Set business hours (7 days)
  - Upload gallery photos
  - Add service videos
  - Manage contact details

- **Dashboard Features:**
  - View booking statistics
  - Track revenue
  - Monitor ratings
  - Manage appointments
  - Respond to reviews

---

### 3. **ADMIN ACCOUNT** 👑

**Use Case:** Platform management, user moderation, analytics, system configuration

```
Email: admin@petuniverse.com
Password: admin123
Role: ADMIN
```

**Access:**
- ✅ Admin Dashboard (`/admin`)
- ✅ User Management
  - View all users
  - Activate/Deactivate accounts
  - Manage roles
- ✅ Service Provider Management
  - Approve/Reject providers
  - View provider details
  - Monitor service quality
- ✅ Service Management
  - Moderate service listings
  - Review reported content
- ✅ Marketplace Management
  - Pet listing moderation
  - Verify sellers
- ✅ Inventory Management
  - Product catalog
  - Stock tracking
  - Supplier management
- ✅ Booking Management
  - View all bookings
  - Handle disputes
- ✅ Analytics Dashboard
  - Platform statistics
  - Revenue tracking
  - User growth metrics
- ✅ Full Platform Access
- ❌ Cannot access customer-specific features (like booking services)
- ❌ Cannot access provider-specific features (like creating services)

**What You Can Test:**
- Platform-wide analytics
- User account management
- Service provider verification
- Content moderation
- System configuration
- Revenue reports
- Booking oversight
- Marketplace moderation

---

## 🛣️ Route Protection Summary

### Public Routes (No Authentication Required)
- `/` - Home page
- `/services` - Browse services
- `/services/[id]` - Service details
- `/marketplace` - Browse marketplace
- `/products` - Shop products
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up
- `/provider/[slug]` - Public provider profiles

### Customer-Only Routes
- `/dashboard` - Customer dashboard
- `/dashboard/*` - Customer features
- `/pets` - Pet management
- `/bookings` - View bookings
- `/orders` - View orders

### Provider-Only Routes
- `/provider/dashboard` - Provider dashboard
- `/provider/dashboard/services` - Service CRUD
- `/provider/dashboard/profile` - Profile management
- `/provider/dashboard/bookings` - Booking management
- `/provider/dashboard/clients` - Client management
- `/provider/dashboard/reviews` - Review management
- `/provider/dashboard/analytics` - Analytics

### Admin-Only Routes
- `/admin` - Admin dashboard
- `/admin/*` - All admin features

---

## 🔒 Security Features

### Route Protection Rules:

1. **Admin Dashboard (`/admin`)**
   - Only accessible by users with `role: ADMIN`
   - Redirects to `/auth/signin` if not authenticated
   - Redirects to `/dashboard` if authenticated but not admin

2. **Provider Dashboard (`/provider`)**
   - Only accessible by users with `role: SERVICE_PROVIDER`
   - Redirects to `/auth/signin` if not authenticated
   - Redirects to `/provider/onboarding` if authenticated but not a provider yet
   - Redirects to `/dashboard` if authenticated as customer

3. **Customer Dashboard (`/dashboard`)**
   - Only accessible by users with `role: CUSTOMER`
   - Redirects to `/auth/signin` if not authenticated
   - Redirects to appropriate dashboard if different role

---

## 🧪 Testing Scenarios

### Scenario 1: Customer Journey
1. Login with customer account
2. Browse services at `/services`
3. View service details
4. Check provider profile
5. Book a service
6. View booking in dashboard
7. Leave a review

### Scenario 2: Provider Journey
1. Login with provider account
2. Go to `/provider/dashboard`
3. Click "Manage Services"
4. Create a new service
5. Upload images (mock)
6. Set pricing and duration
7. Go to "Edit Profile"
8. Update business hours
9. Add certifications
10. Upload gallery photos
11. View public profile

### Scenario 3: Admin Journey
1. Login with admin account
2. Access `/admin`
3. View platform statistics
4. Manage users
5. Review provider applications
6. Moderate marketplace listings
7. Check revenue analytics
8. Manage inventory

### Scenario 4: Role Protection Testing
1. Login as customer
2. Try to access `/provider/dashboard` (should be blocked)
3. Try to access `/admin` (should be blocked)
4. Logout
5. Login as provider
6. Try to access `/admin` (should be blocked)
7. Access `/provider/dashboard` (should work)

---

## 📝 Default Data for Each Account

### Customer Account Includes:
- 2 sample pets (Max - Dog, Luna - Cat)
- 1 past booking
- 1 upcoming booking
- Cart with 2 items

### Provider Account Includes:
- 3 sample services:
  - Premium Dog Grooming ($75)
  - Cat Grooming & Bath ($65)
  - Puppy First Grooming ($50)
- 8 gallery images
- 4 demo videos
- Complete business profile
- 5 specialties
- 4 certifications
- Business hours set
- 5 customer reviews

### Admin Account Includes:
- Access to all platform data
- 100+ users to manage
- 50+ service providers
- 200+ services
- 150+ marketplace listings
- Complete analytics data

---

## 🚀 Quick Start Testing

### Step 1: Start the Application
```bash
npm run dev
```

### Step 2: Open Browser
```
http://localhost:3000
```

### Step 3: Test Each Role

**Test Customer:**
1. Go to Sign In: `http://localhost:3000/auth/signin`
2. Use: `customer@petuniverse.com` / `customer123`
3. You'll be redirected to: `/dashboard`

**Test Provider:**
1. Go to Sign In: `http://localhost:3000/auth/signin`
2. Use: `provider@petuniverse.com` / `provider123`
3. You'll be redirected to: `/provider/dashboard`

**Test Admin:**
1. Go to Sign In: `http://localhost:3000/auth/signin`
2. Use: `admin@petuniverse.com` / `admin123`
3. You'll be redirected to: `/admin`

---

## 🔧 Setting Up Test Accounts

### Automatic Setup (Local Storage)

Test accounts are automatically initialized when you first load the application. The mock data is stored in browser localStorage until Supabase database is implemented.

**No setup required!** Just start the application and sign in with any of the test accounts above.

The following data is automatically created:
- 3 user accounts (Customer, Provider, Admin)
- 2 sample pets for the customer account
- 3 sample services for the provider account
- Complete provider profile with gallery and videos

To reset the test data, clear your browser's localStorage:
```javascript
// In browser console
localStorage.clear()
// Then refresh the page
```

---

## 🎯 Features to Test by Role

### ✅ Customer Features
- [ ] Browse services
- [ ] View service details
- [ ] View provider profiles
- [ ] Book services
- [ ] Manage pets
- [ ] Shop products
- [ ] Browse marketplace
- [ ] View booking history
- [ ] Leave reviews
- [ ] Update profile

### ✅ Provider Features
- [ ] Create new service
- [ ] Edit service
- [ ] Delete service
- [ ] Toggle service visibility
- [ ] Upload service images
- [ ] Set pricing
- [ ] Update business profile
- [ ] Set business hours
- [ ] Add specialties
- [ ] Add certifications
- [ ] Upload gallery photos
- [ ] Add videos
- [ ] View bookings
- [ ] Manage clients
- [ ] Respond to reviews

### ✅ Admin Features
- [ ] View all users
- [ ] Activate/deactivate users
- [ ] Approve service providers
- [ ] Moderate services
- [ ] Moderate marketplace
- [ ] Manage inventory
- [ ] View analytics
- [ ] Track revenue
- [ ] Monitor platform health

---

## 🐛 Troubleshooting

### Can't Access Dashboard?
- Check if you're logged in
- Verify your role matches the route
- Clear browser cookies and try again

### Redirected After Login?
- Normal behavior - you're being sent to your role's dashboard
- Customer → `/dashboard`
- Provider → `/provider/dashboard`
- Admin → `/admin`

### "Access Denied" Message?
- Your role doesn't have permission for that route
- Use the correct test account for the feature you want to test

---

## 📞 Support

If you encounter any issues with test accounts:
1. Check the console for error messages
2. Verify database connection
3. Ensure NextAuth is configured correctly
4. Check environment variables

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Platform:** PetUniverse - Every Pet. Every Need. Every Professional.

🐾

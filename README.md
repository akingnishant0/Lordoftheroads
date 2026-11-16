# Lord of the Road 🛣️

India-focused travel management platform featuring multi-role access portals, centralized lead distribution, package builder, regional branch hierarchy, agent commission wallet, and PWA capabilities.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM**: [Prisma 6](https://www.prisma.io/)
- **Database**: PostgreSQL (compatible with Neon.tech, Supabase, local Postgres)
- **Authentication**: [NextAuth v5](https://authjs.dev/) (Credentials provider, JWT strategy)
- **Icons**: [@heroicons/react v2](https://heroicons.com/)
- **Password Security**: bcryptjs
- **PWA**: Manifest & Service Worker offline fallback support
- **Internationalization**: Bilingual (English & Hindi) LanguageContext

---

## 📋 Prerequisites

Before running the project locally, ensure you have:
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm** or **pnpm** / **yarn**
- **PostgreSQL Database**: Local PostgreSQL instance or a free serverless cloud database from [Neon.tech](https://neon.tech/)

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-org/lord-of-the-road.git
cd "Lordoftheroads booking"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment file and configure your database and authentication secrets:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/lordoftheroads?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars-long"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run Prisma database migrations
```bash
npx prisma migrate dev --name init
```

### 5. Seed initial data
Populate initial branch offices, users, agent profiles, and commission rules:
```bash
npx prisma db seed
```

### 6. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

The database seed provides four pre-configured accounts (one for each role):

| Role | Email | Password | Assigned Branch / Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@lordoftheroad.in` | `Admin@123` | Pan-India System Access |
| **Office Admin** | `office@lordoftheroad.in` | `Admin@123` | Delhi Regional Branch (`LOTR-DEL-01`) |
| **Travel Agent** | `agent@lordoftheroad.in` | `Admin@123` | Rahul Travels (Delhi Coverage: `110001`-`03`) |
| **Customer** | `customer@lordoftheroad.in` | `Admin@123` | End User / Traveler |

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma         # Full multi-phase Prisma schema
│   └── seed.ts               # Database seed script for default accounts & offices
├── public/
│   ├── manifest.json         # PWA Web App Manifest
│   └── sw.js                 # PWA Service Worker caching shell
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx    # Auth centered card layout
│   │   │   ├── login/        # Sign in page with role-based routing
│   │   │   └── register/     # Customer registration page with auto-login
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx    # Responsive shell layout (Sidebar, Header, MobileNav)
│   │   │   ├── admin/        # SuperAdmin control center
│   │   │   ├── office/       # Regional branch admin overview
│   │   │   ├── agent/        # Travel agent workspace & wallet
│   │   │   └── customer/     # Traveler package browser & custom trip CTA
│   │   ├── globals.css       # Tailwind v4 theme configurations
│   │   ├── layout.tsx        # Server root layout with Inter font & PWA meta
│   │   ├── page.tsx          # Public landing page with services & bilingual toggle
│   │   └── providers.tsx     # Client provider wrapper (Session + Language)
│   ├── components/
│   │   ├── layout/           # Sidebar, Header, MobileNav components
│   │   └── ui/               # Reusable UI primitives (Button, Input, Card)
│   ├── i18n/
│   │   └── LanguageContext.tsx # Bilingual state manager (EN / HI)
│   └── lib/
│       ├── auth.ts           # NextAuth v5 server configuration
│       ├── prisma.ts         # Singleton PrismaClient instance
│       └── utils.ts          # Helper utilities (cn, getDashboardPath)
```

---

## 🗺️ Phase Roadmap

- ✅ **Phase 1: Foundation & Auth** — Multi-role authentication (NextAuth v5 + bcrypt), bilingual UI (EN + HI), 20-model Prisma schema, and PWA setup.
- ✅ **Phase 2: Unified Lead CRM** — Lead model, 48h phone/email deduplication, automatic nearest branch routing by pin code, Pipeline Kanban & Table view, notes timeline, follow-up reminders, and CSV export.
- ✅ **Phase 3: Lead Integrations** — Separate adapter modules with admin toggle (Facebook/Instagram Lead Ads webhook, Google Ads lead form, Justdial email/webhook, Booking.com/MMT stubs, and Generic API Webhook with live payload logs).
- ⏳ **Phase 4: Agent & Office Network** — KYC onboarding, pin-code coverage manager, office locator for customers, agent portal, commission engine, wallet ledger, payout requests.
- ⏳ **Phase 5: Packages, Bookings & Payments** — Itinerary builder with approval workflow, bookings linked to leads, invoice PDF, Razorpay test mode, WhatsApp & SMS alerts.
- ⏳ **Phase 6: Insurance & Store** — IRDAI compliant referral tracker, travel accessory store and orders.
- ⏳ **Phase 7: Quality & Launch** — End-to-end integration test suite, security audit, Docker & VPS production deployment.

---

## 📄 License

Private and Confidential. Proprietary software for **Lord of the Road Travel Technologies**. All rights reserved.

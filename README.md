# Project Title: Bank of Azad Jammu & Kashmir - Next Generation Website

## Overview

This project is the development of a new, modern website for the Bank of Azad Jammu & Kashmir. The primary goal is to create a user-friendly, secure, and technologically advanced online presence for the bank.

## Key Features & Technologies

- **Framework:** Laravel 12 (PHP `^8.2`)
- **Frontend:** React (`^2.0.11` via `@inertiajs/react`), TypeScript
- **UI Library:** Inertia.js (`^2.0` for Laravel, `^2.0.11` for React)
- **Styling:** Tailwind CSS (default with Laravel 11+), Mobile Responsive Design
- **Authentication:** Native Laravel authentication
- **Permissions:** `spatie/laravel-permission` (`^6.18`)
- **Query Building:** `spatie/laravel-query-builder` (`^6.3`)
- **Routing in JS:** Tighten/Ziggy (`^2.4`)
- **Database:** Postgresql
- **Deployment:** (Specify your deployment environment, e.g., Docker, AWS, etc.)

## Project Goals

- Enhance customer experience with a modern and intuitive interface.
- Provide comprehensive information about banking products and services.
- Ensure high levels of security and data protection.
- Improve operational efficiency through streamlined online processes.
- Leverage the latest web technologies for a robust and scalable platform.

## Development Environment

- **PHP:** `^8.2`
- **Node.js:** `^22.15.21` (or latest LTS)
- **Package Managers:** Composer, Bun
- **Build Tool:** Vite
- **Linting:** ESLint
- **Code Formatting:** Prettier
- **Dev Tools:** Laravel Tinker, Larastan, PHP CS Fixer, Pail, Pint, Sail

## Project Features

This comprehensive banking website includes the following key modules:

### Core Banking Features

- **Product Management**: Complete product catalog with schemes and attributes
- **Service Management**: Banking services with detailed descriptions and attributes
- **Branch Network**: Branch locations with services offered
- **Financial Reports**: Annual reports, financial highlights, and downloadable documents
- **Board & Management**: Information about directors and management team
- **News & Announcements**: Latest updates and bank announcements
- **Career Portal**: Job opportunities and career information
- **Customer Support**: Contact forms and customer service information

### Technical Features

- **Multi-role Authentication**: Admin, Manager, and User roles with permissions
- **Search Functionality**: Advanced search across all content
- **File Management**: Upload and manage documents, images, and reports
- **Regional Management**: Districts, divisions, and regional organization
- **Content Management**: Dynamic pages and menu management
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Search engine friendly URLs and meta tags

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP**: `^8.2` with extensions (mbstring, xml, curl, bcmath, intl, gd, zip)
- **Node.js**: `^22.15.21` (LTS recommended)
- **Composer**: Latest version
- **Bun**: Package manager (alternative to npm/yarn)
- **PostgreSQL**: Database server
- **Git**: Version control

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Genexis
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install JavaScript Dependencies

```bash
bun install
# or alternatively
npm install
```

### 4. Environment Configuration

```bash
# Copy the environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### Required Environment Variables

The following environment variables must be configured in your `.env` file:

**Basic Application Settings:**

```env
APP_NAME="Bank of AJK"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost
APP_TIMEZONE=Asia/Karachi
APP_LOCALE=en
```

**Database Configuration:**

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=genexis_bank
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Bank Contact Information:**

```env
BANK_BRANCHES_COUNT=50
CONTACT_PHONE="+92.5822.924244"
CONTACT_EMAIL="info@bankajk.com"
CONTACT_ADDRESS="Head Office, Bank Square, Chattar Domel, Muzaffarabad, AJK, Pakistan"
```

**Marquee Text Content:**

```env
MARQUEE_ACHIEVEMENT_TEXT="Celebrating 25+ years of banking excellence"
MARQUEE_SERVICES_TEXT="Comprehensive banking solutions for everyone"
MARQUEE_SUPPORT_TEXT="24/7 customer support available"
MARQUEE_DIGITAL_TEXT="Digital banking made simple and secure"
MARQUEE_CONTACT_TEXT="Connect with us anytime, anywhere"
MARQUEE_NETWORK_TEXT="Nationwide branch network at your service"
```

**Social Media Links:**

```env
SOCIAL_FACEBOOK_URL="https://www.facebook.com/BAJKOfficial/"
SOCIAL_TWITTER_URL="https://x.com/BAJKOfficial"
SOCIAL_INSTAGRAM_URL="https://www.instagram.com/bajkofficial/"
SOCIAL_LINKEDIN_URL="https://www.linkedin.com/company/bank-of-azad-kashmir/"
SOCIAL_YOUTUBE_URL="https://www.youtube.com/channel/UCrHL1opwCxp_owjSivhA2iw"
```

**Mail Configuration:**

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS="noreply@bankajk.com"
MAIL_FROM_NAME="${APP_NAME}"
```

**Optional: Loan Calculator Settings:**

```env
# Personal Loan
LOAN_RATE_PERSONAL=14.0

# Advance Salary Loan
LOAN_MIN_ADVANCE_SALARY=10000
LOAN_MAX_ADVANCE_SALARY=3000000
LOAN_TENURE_MIN_ADVANCE_SALARY=1
LOAN_TENURE_MAX_ADVANCE_SALARY=48
LOAN_RATE_SALARY=15.0

# Car Loan
LOAN_MIN_CAR=100000
LOAN_MAX_CAR=3000000
LOAN_TENURE_MIN_CAR=12
LOAN_TENURE_MAX_CAR=60
LOAN_RATE_CAR=12.5

# House Loan
LOAN_MIN_HOUSE=500000
LOAN_MAX_HOUSE=10000000
LOAN_TENURE_MIN_HOUSE=12
LOAN_TENURE_MAX_HOUSE=240
LOAN_RATE_HOUSE=11.5
```

See the complete `.env.example` file for all available configuration options including cache, session, queue, and third-party service configurations.

#### Environment Variable Categories

The `.env.example` file includes over 100 environment variables organized into the following categories:

- **Core Application**: Basic Laravel settings, debug mode, timezone, locale
- **Database**: PostgreSQL, MySQL, SQLite configurations with connection pooling
- **Authentication**: User model, password reset, session timeout settings
- **Cache & Session**: Redis, Memcached, database-based caching and sessions
- **Queue Management**: Database, Redis, Beanstalkd, SQS queue configurations
- **Mail Services**: SMTP, Postmark, SES, Resend email providers
- **File Storage**: Local, S3, public disk configurations
- **Logging**: Stack, daily, Slack, Papertrail logging options
- **Search Services**: Algolia, Meilisearch, Typesense configurations
- **Bank-Specific**: Contact info, branch count, social media links, marquee text
- **Loan Calculator**: Interest rates, loan limits, tenure settings for various loan types
- **Third-Party Services**: AWS, Slack, social media integrations
- **Performance**: Redis clustering, connection pooling, cache prefixes

### 5. Database Setup

Configure your database in the `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=genexis_bank
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations and seeders:

```bash
# Run database migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed

# Create storage link for file uploads
php artisan storage:link
```

### 6. Build Assets

For development:

```bash
# Start the development server with hot reload
bun run dev
# or
npm run dev
```

For production:

```bash
# Build optimized assets
bun run build
# or
npm run build
```

### 7. Start the Application

```bash
# Start Laravel development server
php artisan serve
```

Your application will be available at `http://localhost:8000`

### 8. Default Credentials

After seeding, you can login with:

- **Admin**: admin@example.com / password
- **Manager**: manager@example.com / password
- **User**: user@example.com / password

## Development Workflow

### Code Quality Tools

This project includes several tools to maintain code quality:

```bash
# PHP Code Style (Laravel Pint)
./vendor/bin/pint

# PHP Static Analysis (Larastan)
./vendor/bin/phpstan analyse

# PHP Code Sniffer
./vendor/bin/phpcs

# JavaScript/TypeScript Linting
bun run lint
# or fix automatically
bun run lint:fix

# Format code with Prettier
bun run format

# Type checking
bun run types

# Run all checks
bun run ci
```

### Testing

```bash
# Run PHP tests with Pest
php artisan test

# Run specific test file
php artisan test tests/Feature/UserTest.php

# Run tests with coverage
php artisan test --coverage
```

### Database Management

```bash
# Create a new migration
php artisan make:migration create_table_name

# Create a new model with migration
php artisan make:model ModelName -m

# Create a factory
php artisan make:factory ModelNameFactory

# Create a seeder
php artisan make:seeder TableNameSeeder

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

### File Generation Commands

```bash
# Create a controller
php artisan make:controller ControllerName

# Create a request class
php artisan make:request RequestName

# Create a resource
php artisan make:resource ResourceName

# Create a policy
php artisan make:policy PolicyName

# Create a service class
php artisan make:service ServiceName

# Create a view
php artisan make:view view-name
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/     # Application controllers
│   ├── Middleware/      # Custom middleware
│   └── Requests/        # Form request validation
├── Models/              # Eloquent models
├── Policies/            # Authorization policies
├── Services/            # Business logic services
└── Traits/              # Reusable traits

resources/
├── js/                  # React components and TypeScript
├── css/                 # Stylesheets
└── views/               # Blade templates

routes/
├── web.php             # Web routes
├── auth.php            # Authentication routes
├── settings.php        # Settings routes
└── console.php         # Console commands
```

## Contribution Guidelines

We welcome contributions to this project! Please follow these guidelines:

### Getting Started

1. **Fork the repository** and create your feature branch from `main`
2. **Follow the coding standards** outlined below
3. **Write tests** for any new functionality
4. **Update documentation** as needed

### Coding Standards

#### PHP/Laravel Standards

- Follow **PSR-12** coding standards
- Use **Laravel's naming conventions**:
    - Models: `PascalCase` (e.g., `BankService`)
    - Controllers: `PascalCase` + `Controller` (e.g., `BankServiceController`)
    - Methods: `camelCase` (e.g., `getUserData`)
    - Variables: `camelCase` (e.g., `$userData`)
- Use **type hints** and **return types** where possible
- Write **meaningful commit messages**
- Use **Laravel's built-in features** (Eloquent, Collections, etc.)

#### Frontend Standards

- Follow **React** and **TypeScript** best practices
- Use **functional components** with hooks
- Implement **proper TypeScript typing**
- Follow **Tailwind CSS** utility-first approach
- Use **Radix UI** components when available
- Maintain **responsive design** principles

#### Database Standards

- Use **descriptive migration names**
- Follow **alphabetical order** for pivot tables (e.g., `project_role` not `role_project`)
- Include **proper indexes** and **foreign key constraints**
- Use **meaningful column names**

### Code Review Process

1. **Create a Pull Request** with a clear title and description
2. **Link any related issues** in the PR description
3. **Ensure all tests pass** and code quality checks are green
4. **Request review** from at least one maintainer
5. **Address feedback** promptly and professionally

### Bug Reports

When reporting bugs, please include:

- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Environment details** (OS, PHP version, browser, etc.)
- **Screenshots** or error messages if applicable

### Feature Requests

For new features:

- **Describe the problem** you're trying to solve
- **Propose a solution** with implementation details
- **Consider backward compatibility**
- **Discuss performance implications**

### Development Setup for Contributors

1. Follow the standard **Getting Started** guide above
2. Set up **pre-commit hooks**:
    ```bash
    # Install pre-commit hooks
    composer install --dev
    ```
3. **Run tests** before submitting:
    ```bash
    php artisan test
    bun run ci
    ```

## Deployment

### Production Environment

1. **Optimize for production**:

    ```bash
    composer install --optimize-autoloader --no-dev
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    bun run build
    ```

2. **Set proper permissions**:

    ```bash
    chmod -R 755 storage bootstrap/cache
    ```

3. **Configure web server** (Nginx/Apache) to point to the `public` directory

### Environment Variables

Key production environment variables:

**Application Settings:**

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
APP_KEY=base64:your-production-key
APP_TIMEZONE=Asia/Karachi
```

**Database Configuration:**

```env
DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_DATABASE=production_db
DB_USERNAME=production_user
DB_PASSWORD=secure_password
```

**Mail Configuration:**

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_FROM_ADDRESS="noreply@bankajk.com"
MAIL_FROM_NAME="Bank of AJK"
```

**Performance & Caching:**

```env
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=your-redis-host
REDIS_PASSWORD=your-redis-password
```

**File Storage:**

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket-name
```

**Bank Configuration:**

```env
BANK_BRANCHES_COUNT=50
CONTACT_PHONE="+92.5822.924244"
CONTACT_EMAIL="info@bankajk.com"
CONTACT_ADDRESS="Head Office, Bank Square, Chattar Domel, Muzaffarabad, AJK, Pakistan"
```

For a complete list of all environment variables, refer to the `.env.example` file which contains over 100 configuration options for various Laravel features, third-party services, and bank-specific settings.

## Security

- **Keep dependencies updated** regularly
- **Use environment variables** for sensitive configuration
- **Implement proper validation** on all user inputs
- **Follow Laravel security best practices**
- **Regular security audits** with `composer audit`

## Support

For support and questions:

- **Documentation**: Check this README and Laravel documentation
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Email**: [your-support-email@domain.com]

## License

This project is proprietary software developed for the Bank of Azad Jammu & Kashmir. All rights reserved.

## Changelog

### Version 1.0.0 (Current)

- Initial release with core banking features
- React + TypeScript frontend
- Laravel 12 backend
- PostgreSQL database
- Spatie packages integration

## Application Snapshots

This document provides an overview of key application pages based on the provided snapshots.

### Contact Us Page

![Contact Us Page](public/screenshots/contact_us_page.png)

**Key Features:**

- Multiple contact methods: Call Center, Email Support, Operations, HR/MD.
- "Send us a Message" form with fields: Name, E-Mail, Phone, District, Tehsil, Place, Category, Subject, Message.
- Head Office address and contact details.
- Business Hours information.
- Link to Branch Locator.

### Banking Services / Homepage Snippet

![Banking Services Page](public/screenshots/banking_services_page.png)

**Key Features:**

- "Car Finance" banner.
- Overview of Banking Services with statistics (Branches, Customers, Rs 50B+ Deposits, Employees).
- Sections for Consumer Finance, Commercial / SME Finances, Agriculture Finances, Micro Finances, each with key benefits and available products.
- Additional Banking Solutions: Deposit Accounts, Term Deposits, Online Banking, Locker Facility.
- Call to action to "Find Nearest Branch" and "Call".
- "Latest News & Updates" section.

---

**Note:**
To view these images, please ensure you have saved your snapshot images as:

- `contact_us_page.png`
- `banking_services_page.png`
  and placed them into the `/Users/alirazamarchal/Herd/Genexis/public/screenshots/` directory.
  The Markdown file references them using relative paths like `public/screenshots/contact_us_page.png`.

---

_This README was last updated on June 13, 2025._

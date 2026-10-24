# Graph Report - resources  (2026-10-25)

## Corpus Check
- 282 files · ~140,395 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1304 nodes · 4538 edges · 95 communities (82 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Product and Service Pages
- Public Website UI
- Admin and Change Requests
- Content Editing Forms
- Admin Access Management
- Application Navigation
- Service Attribute Lists
- Chunked File Uploads
- Branch and Board Forms
- Tabular Report Lists
- News and Carousel Content
- Header Navigation Components
- User Preference Settings
- Product and Carousel Forms
- UI Controls and Inputs
- Authentication and Bank Services
- Loan and SME Products
- Location and Content Cards
- Reports and Management Views
- Public Tables and Schedules
- Region and Permission Forms
- Management and Schedule Forms
- Branch Maps and Contacts
- Branch and Region Editing
- Homepage Bank Services
- Admin Application Shell
- Website Footer Links
- Download and Career Forms
- Deposit Banking Products
- Contact and Product Lists
- Location and Highlight Forms
- Product Accounts and Uploads
- Breadcrumb and Global Search
- User Identity Components
- Branch Locator and Network
- Inertia Shared Types
- Authentication Layout Branding
- Executive Profiles
- Dashboard Overview
- Loan Calculator
- Breadcrumb Navigation
- Board Committee Cards
- Product Scheme Listing
- Product Scheme Details
- Board Director Profiles
- Organization Chart
- Branch Creation
- Branch Directory
- News Article Details
- Product Scheme Creation
- Product Scheme Editing
- Account Product Details
- Commercial Finance Component
- Bank Service Directory
- About Us Pages
- Menu Creation
- Menu Editing
- User Creation
- Committee Details
- Branch Details
- Branch Service Listings
- Branch Service Details
- Contact Creation
- Contact Editing
- District Directory
- Product Type Directory
- Product Type Details
- Product Account Creation
- Product Account Editing
- Shared Type Definitions
- Bank Service Editing
- Public Careers Listing
- Contact Submission Details
- Download Library
- Financial Highlights
- Management Directory
- Scheme Attribute Editing
- Product Type Creation
- Public Downloads
- Public Charge Schedules
- Region Directory
- Service Details
- Navbar Message Listing
- Interactive Branch Map
- Scheme Attribute Details
- Customer Testimonials
- Loan Calculator Button
- Icon UI Component
- Placeholder Pattern

## God Nodes (most connected - your core abstractions)
1. `Button()` - 145 edges
2. `cn()` - 140 edges
3. `Heading()` - 129 edges
4. `Input()` - 106 edges
5. `Card()` - 99 edges
6. `CardContent()` - 99 edges
7. `CardHeader()` - 89 edges
8. `CardTitle()` - 89 edges
9. `Label()` - 73 edges
10. `Badge()` - 68 edges

## Surprising Connections (you probably didn't know these)
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  js/components/ui/breadcrumb.tsx → js/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  js/components/ui/dialog.tsx → js/lib/utils.ts
- `NavigationMenuContent()` --calls--> `cn()`  [EXTRACTED]
  js/components/ui/navigation-menu.tsx → js/lib/utils.ts
- `NavigationMenuViewport()` --calls--> `cn()`  [EXTRACTED]
  js/components/ui/navigation-menu.tsx → js/lib/utils.ts
- `NavigationMenuLink()` --calls--> `cn()`  [EXTRACTED]
  js/components/ui/navigation-menu.tsx → js/lib/utils.ts

## Import Cycles
- None detected.

## Communities (95 total, 7 thin omitted)

### Community 0 - "Product and Service Pages"
Cohesion: 0.00
Nodes (32): AuditInfo(), AuditRecord, formatDateTime(), Separator(), AnnualReport, Props, BankService, Props (+24 more)

### Community 1 - "Public Website UI"
Cohesion: 0.00
Nodes (26): RemittanceAttribute, RemittanceService, AddressMarqueeSectionProps, TopNavbar(), TopNavbarMessage, TopNavbarProps, BreadcrumbItem, MenuItem (+18 more)

### Community 2 - "Admin and Change Requests"
Cohesion: 0.00
Nodes (33): RejectChangeDialog(), RejectChangeDialogProps, Alert(), AlertDescription(), AlertTitle(), alertVariants, Dialog(), DialogClose() (+25 more)

### Community 3 - "Content Editing Forms"
Cohesion: 0.00
Nodes (21): Label(), Switch, breadcrumbs, AboutUs, Props, BoardOfDirector, Props, Career (+13 more)

### Community 4 - "Admin Access Management"
Cohesion: 0.00
Nodes (24): DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuSeparator(), DropdownMenuTrigger(), breadcrumbs, Permission, Props (+16 more)

### Community 5 - "Application Navigation"
Cohesion: 0.00
Nodes (30): coreNavItems, footerNavItems, sidebarGroups, NavFooter(), NavUser(), Sidebar(), SidebarContent(), SidebarContext (+22 more)

### Community 6 - "Service Attribute Lists"
Cohesion: 0.00
Nodes (24): Select(), SelectContent(), SelectItem(), SelectTrigger(), SelectValue(), breadcrumbs, MenuItem, Props (+16 more)

### Community 7 - "Chunked File Uploads"
Cohesion: 0.00
Nodes (19): Phase, recall(), remember(), storageKey(), UploadField(), UploadFieldProps, backoffDelay(), ChunkedUpload (+11 more)

### Community 8 - "Branch and Board Forms"
Cohesion: 0.00
Nodes (23): Checkbox(), breadcrumbs, Permission, Props, Permission, Props, Role, BoardMember (+15 more)

### Community 9 - "Tabular Report Lists"
Cohesion: 0.00
Nodes (22): DataTableProps, Table(), TableBody(), TableCell(), TableHead(), breadcrumbs, formatDate(), Index() (+14 more)

### Community 10 - "News and Carousel Content"
Cohesion: 0.00
Nodes (22): BankHeroCarousel(), BankHeroCarouselProps, CarouselSlide, FALLBACKS, SafeImage(), SafeImageKind, SafeImageProps, Service (+14 more)

### Community 11 - "Header Navigation Components"
Cohesion: 0.00
Nodes (25): AppHeader(), AppHeaderProps, mainNavItems, rightNavItems, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem() (+17 more)

### Community 12 - "User Preference Settings"
Cohesion: 0.00
Nodes (17): AppearanceToggleDropdown(), AppearanceToggleTab(), HeadingSmall(), Appearance, applyTheme(), handleSystemThemeChange(), initializeTheme(), mediaQuery() (+9 more)

### Community 13 - "Product and Carousel Forms"
Cohesion: 0.00
Nodes (15): BreadcrumbItem, Heading(), HeadingProps, breadcrumbs, breadcrumbs, CarouselForm, Contact, Props (+7 more)

### Community 14 - "UI Controls and Inputs"
Cohesion: 0.00
Nodes (22): Icon(), IconProps, Textarea, CardFooter(), DropdownMenuCheckboxItem(), DropdownMenuRadioItem(), DropdownMenuShortcut(), DropdownMenuSubContent() (+14 more)

### Community 15 - "Authentication and Bank Services"
Cohesion: 0.00
Nodes (11): InputError(), LinkProps, TextLink(), AuthLayout(), LoginForm, LoginProps, RegisterForm, ResetPasswordForm (+3 more)

### Community 16 - "Loan and SME Products"
Cohesion: 0.00
Nodes (18): LoanCalculatorBanner(), LoanCalculatorBannerProps, LoanSchemesComponent(), LoanSchemesComponentProps, ProductScheme, ProductSchemeAttribute, ProductScheme, ProductSchemeAttribute (+10 more)

### Community 17 - "Location and Content Cards"
Cohesion: 0.00
Nodes (14): CardHeader(), CardTitle(), AboutUs, Props, MenuItem, Props, AnnualReport, Props (+6 more)

### Community 18 - "Reports and Management Views"
Cohesion: 0.00
Nodes (13): Button(), buttonVariants, breadcrumbs, Carousel, Props, FinancialReport, reportFields, Management (+5 more)

### Community 19 - "Public Tables and Schedules"
Cohesion: 0.00
Nodes (18): Table(), TableProps, Tbody(), Td(), Th(), Thead(), Tr(), Career (+10 more)

### Community 20 - "Region and Permission Forms"
Cohesion: 0.00
Nodes (11): Card(), Permission, Props, BankService, Props, District, Props, Region (+3 more)

### Community 21 - "Management and Schedule Forms"
Cohesion: 0.00
Nodes (11): Textarea(), breadcrumbs, breadcrumbs, ManagementForm, Management, ManagementForm, Props, Props (+3 more)

### Community 22 - "Branch Maps and Contacts"
Cohesion: 0.00
Nodes (14): BranchLocation, BranchLocationsMap(), directionsUrl(), embedUrl(), Props, Tab, typeLabel(), JsonRequestError (+6 more)

### Community 23 - "Branch and Region Editing"
Cohesion: 0.00
Nodes (12): AppLayoutProps, Branch, BranchForm, District, Props, Region, Division, Props (+4 more)

### Community 24 - "Homepage Bank Services"
Cohesion: 0.00
Nodes (14): BankService, InteractiveBAJKServices(), Props, ServiceCard, getCategoryColor(), getCategoryIcon(), NewsAnnouncement, NewsAnnouncements() (+6 more)

### Community 25 - "Admin Application Shell"
Cohesion: 0.00
Nodes (11): AppContent(), AppContentProps, AppShell(), AppShellProps, AppSidebar(), AppSidebarHeader(), Breadcrumbs(), FlashMessages() (+3 more)

### Community 26 - "Website Footer Links"
Cohesion: 0.00
Nodes (10): BottomBar(), ContactInfo(), Footer(), FooterProps, LogoSection(), LogoSectionProps, QuickLinkItem, quickLinkItems (+2 more)

### Community 27 - "Download and Career Forms"
Cohesion: 0.00
Nodes (7): FormErrorSummary(), Input(), breadcrumbs, breadcrumbs, DownloadItem, Props, breadcrumbs

### Community 28 - "Deposit Banking Products"
Cohesion: 0.00
Nodes (10): BankingAccountComponent(), BankingAccountComponentProps, ProductScheme, ProductSchemeAttribute, ProductScheme, ProductSchemeAttribute, Props, ProductScheme (+2 more)

### Community 29 - "Contact and Product Lists"
Cohesion: 0.00
Nodes (10): Badge(), badgeVariants, Branch, breadcrumbs, Contact, Props, breadcrumbs, ProductScheme (+2 more)

### Community 30 - "Location and Highlight Forms"
Cohesion: 0.00
Nodes (9): CardContent(), breadcrumbs, breadcrumbs, Division, Props, RegionForm, breadcrumbs, Props (+1 more)

### Community 31 - "Product Accounts and Uploads"
Cohesion: 0.00
Nodes (12): TableRow(), breadcrumbs, Product, ProductType, ProductTypeAccount, Props, badgeVariant(), breadcrumbs (+4 more)

### Community 32 - "Breadcrumb and Global Search"
Cohesion: 0.00
Nodes (10): BreadcrumbItem, breadcrumbItems, BreadcrumbNav(), BreadcrumbNavProps, Header(), HeaderProps, MenuItem, GlobalSearch() (+2 more)

### Community 33 - "User Identity Components"
Cohesion: 0.00
Nodes (9): Avatar(), AvatarFallback(), AvatarImage(), DropdownMenuGroup(), UserInfo(), UserMenuContent(), UserMenuContentProps, useInitials() (+1 more)

### Community 34 - "Branch Locator and Network"
Cohesion: 0.00
Nodes (9): Branch, BranchLocator(), District, Props, Region, Branch, District, Props (+1 more)

### Community 35 - "Inertia Shared Types"
Cohesion: 0.00
Nodes (8): Auth, BreadcrumbItem, MenuItem, NavGroup, NavItem, SharedData, SocialLinks, User

### Community 36 - "Authentication Layout Branding"
Cohesion: 0.00
Nodes (5): AppLogo(), AppLogoIcon(), AuthLayoutProps, AuthSimpleLayout(), AuthLayoutProps

### Community 37 - "Executive Profiles"
Cohesion: 0.00
Nodes (5): ExecutiveCard(), ExecutiveCardProps, ManagementMember, AboutUsProps, ManagementMember

### Community 38 - "Dashboard Overview"
Cohesion: 0.00
Nodes (8): CardDescription(), AttentionItem, breadcrumbs, Dashboard(), formatDateTime(), Messages, Props, Stat

### Community 39 - "Loan Calculator"
Cohesion: 0.00
Nodes (8): monthlyInstalment(), BankRates, EMISchedule, InsuranceOptions, LoanCalculator(), LoanCalculatorProps, LoanType, ProfitRate

### Community 40 - "Breadcrumb Navigation"
Cohesion: 0.00
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 41 - "Board Committee Cards"
Cohesion: 0.00
Nodes (6): BodCommittee, CommitteeCard(), CommitteeCardProps, Member, BodCommittee, Member

### Community 42 - "Product Scheme Listing"
Cohesion: 0.00
Nodes (6): breadcrumbs, Product, ProductScheme, ProductType, ProductTypeAccount, Props

### Community 43 - "Product Scheme Details"
Cohesion: 0.00
Nodes (6): Product, ProductScheme, ProductSchemeAttribute, ProductType, ProductTypeAccount, Props

### Community 44 - "Board Director Profiles"
Cohesion: 0.00
Nodes (4): BoardOfDirector, BodCard(), BodCardProps, BoardOfDirector

### Community 45 - "Organization Chart"
Cohesion: 0.00
Nodes (4): Division, OrganogramPageProps, Region, RegionBranchCounts

### Community 46 - "Branch Creation"
Cohesion: 0.00
Nodes (5): BranchForm, breadcrumbs, District, Props, Region

### Community 47 - "Branch Directory"
Cohesion: 0.00
Nodes (5): Branch, breadcrumbs, District, Props, Region

### Community 48 - "News Article Details"
Cohesion: 0.00
Nodes (6): formatDate(), getCategoryColor(), NewsAnnouncement, NewsDetail(), Props, RelatedNews

### Community 49 - "Product Scheme Creation"
Cohesion: 0.00
Nodes (5): breadcrumbs, Product, ProductType, ProductTypeAccount, Props

### Community 50 - "Product Scheme Editing"
Cohesion: 0.00
Nodes (5): Product, ProductScheme, ProductType, ProductTypeAccount, Props

### Community 51 - "Account Product Details"
Cohesion: 0.00
Nodes (5): Product, ProductScheme, ProductType, ProductTypeAccount, Props

### Community 52 - "Commercial Finance Component"
Cohesion: 0.00
Nodes (4): apiData, CommercialFinance, CommercialFinanceData, CommercialFinanceProps

### Community 53 - "Bank Service Directory"
Cohesion: 0.00
Nodes (4): DropdownMenu(), BankService, breadcrumbs, Props

### Community 54 - "About Us Pages"
Cohesion: 0.00
Nodes (4): TableHeader(), AboutUs, breadcrumbs, Props

### Community 55 - "Menu Creation"
Cohesion: 0.00
Nodes (4): breadcrumbs, MenuForm, ParentMenu, Props

### Community 56 - "Menu Editing"
Cohesion: 0.00
Nodes (4): MenuForm, MenuItem, ParentMenu, Props

### Community 57 - "User Creation"
Cohesion: 0.00
Nodes (4): breadcrumbs, Permission, Props, Role

### Community 58 - "Committee Details"
Cohesion: 0.00
Nodes (4): BoardMember, BodCommittee, ManagementMember, Props

### Community 59 - "Branch Details"
Cohesion: 0.00
Nodes (4): Branch, District, Props, Region

### Community 60 - "Branch Service Listings"
Cohesion: 0.00
Nodes (4): Branch, BranchService, breadcrumbs, Props

### Community 61 - "Branch Service Details"
Cohesion: 0.00
Nodes (4): AvailabilityHours, Branch, BranchService, Props

### Community 62 - "Contact Creation"
Cohesion: 0.00
Nodes (4): Branch, breadcrumbs, ContactForm, Props

### Community 63 - "Contact Editing"
Cohesion: 0.00
Nodes (4): Branch, Contact, ContactForm, Props

### Community 64 - "District Directory"
Cohesion: 0.00
Nodes (4): breadcrumbs, District, Props, Region

### Community 65 - "Product Type Directory"
Cohesion: 0.00
Nodes (4): breadcrumbs, Product, ProductType, Props

### Community 66 - "Product Type Details"
Cohesion: 0.00
Nodes (4): Product, ProductType, ProductTypeAccount, Props

### Community 67 - "Product Account Creation"
Cohesion: 0.00
Nodes (4): breadcrumbs, Product, ProductType, Props

### Community 68 - "Product Account Editing"
Cohesion: 0.00
Nodes (4): Product, ProductType, ProductTypeAccount, Props

### Community 69 - "Shared Type Definitions"
Cohesion: 0.00
Nodes (5): App.Models, @inertiajs/core, PageProps, TopNavbarMessage, User

### Community 70 - "Bank Service Editing"
Cohesion: 0.00
Nodes (3): BankService, BankServiceForm, Props

### Community 71 - "Public Careers Listing"
Cohesion: 0.00
Nodes (3): Career, PaginationLink, Props

### Community 73 - "Download Library"
Cohesion: 0.00
Nodes (3): breadcrumbs, DownloadItem, Props

### Community 74 - "Financial Highlights"
Cohesion: 0.00
Nodes (3): breadcrumbs, FinancialHighlight, Props

### Community 75 - "Management Directory"
Cohesion: 0.00
Nodes (3): breadcrumbs, Management, Props

### Community 76 - "Scheme Attribute Editing"
Cohesion: 0.00
Nodes (3): ProductScheme, ProductSchemeAttribute, Props

### Community 77 - "Product Type Creation"
Cohesion: 0.00
Nodes (3): breadcrumbs, Product, Props

### Community 78 - "Public Downloads"
Cohesion: 0.00
Nodes (3): PaginatedPublicDownloads, PublicDownload, PublicDownloadsPublicProps

### Community 79 - "Public Charge Schedules"
Cohesion: 0.00
Nodes (3): PaginatedScheduleOfCharges, ScheduleOfCharge, ScheduleOfChargesPublicProps

### Community 80 - "Region Directory"
Cohesion: 0.00
Nodes (3): breadcrumbs, Props, Region

### Community 81 - "Service Details"
Cohesion: 0.00
Nodes (3): Props, Service, ServiceAttribute

### Community 82 - "Navbar Message Listing"
Cohesion: 0.00
Nodes (3): breadcrumbs, Props, TopNavbarMessage

## Knowledge Gaps
- **561 isolated node(s):** `AboutUs`, `OrganizationStats`, `Props`, `ServiceCard`, `BoardOfDirector` (+556 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 773 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SafeImage()` connect `News and Carousel Content` to `Product and Service Pages`, `Breadcrumb and Global Search`, `Content Editing Forms`, `Admin Access Management`, `Service Attribute Lists`, `News Article Details`, `Service Details`, `Reports and Management Views`, `Homepage Bank Services`, `Committee Details`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Controls and Inputs` to `Product and Service Pages`, `Admin and Change Requests`, `Content Editing Forms`, `Admin Access Management`, `Application Navigation`, `Service Attribute Lists`, `Branch and Board Forms`, `Tabular Report Lists`, `Header Navigation Components`, `User Preference Settings`, `Authentication and Bank Services`, `Location and Content Cards`, `Reports and Management Views`, `Region and Permission Forms`, `Management and Schedule Forms`, `Admin Application Shell`, `Download and Career Forms`, `Contact and Product Lists`, `Location and Highlight Forms`, `Product Accounts and Uploads`, `User Identity Components`, `Dashboard Overview`, `Breadcrumb Navigation`, `About Us Pages`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Button()` connect `Reports and Management Views` to `Product and Service Pages`, `Admin and Change Requests`, `Content Editing Forms`, `Admin Access Management`, `Application Navigation`, `Service Attribute Lists`, `Chunked File Uploads`, `Branch and Board Forms`, `Tabular Report Lists`, `News and Carousel Content`, `Header Navigation Components`, `User Preference Settings`, `Product and Carousel Forms`, `UI Controls and Inputs`, `Authentication and Bank Services`, `Location and Content Cards`, `Region and Permission Forms`, `Management and Schedule Forms`, `Branch and Region Editing`, `Download and Career Forms`, `Contact and Product Lists`, `Location and Highlight Forms`, `Product Accounts and Uploads`, `Product Scheme Listing`, `Product Scheme Details`, `Branch Creation`, `Branch Directory`, `Product Scheme Creation`, `Product Scheme Editing`, `Account Product Details`, `Bank Service Directory`, `About Us Pages`, `Menu Creation`, `Menu Editing`, `User Creation`, `Committee Details`, `Branch Details`, `Branch Service Listings`, `Branch Service Details`, `Contact Creation`, `Contact Editing`, `District Directory`, `Product Type Directory`, `Product Type Details`, `Product Account Creation`, `Product Account Editing`, `Bank Service Editing`, `Contact Submission Details`, `Download Library`, `Financial Highlights`, `Management Directory`, `Scheme Attribute Editing`, `Product Type Creation`, `Region Directory`, `Service Details`, `Navbar Message Listing`, `Scheme Attribute Details`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `AboutUs`, `OrganizationStats`, `Props` to the rest of the system?**
  _561 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Product and Service Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05536723163841808 - nodes in this community are weakly interconnected._
- **Should `Public Website UI` be split into smaller, more focused modules?**
  _Cohesion score 0.04716981132075472 - nodes in this community are weakly interconnected._
- **Should `Admin and Change Requests` be split into smaller, more focused modules?**
  _Cohesion score 0.0821256038647343 - nodes in this community are weakly interconnected._
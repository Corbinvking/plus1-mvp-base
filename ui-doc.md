# Plus One UI Documentation

## Navigation Structure

### Main Dashboard Layout
- Persistent Sidebar (collapsible)
  - Logo/Brand
  - Main Navigation Links:
    - Dashboard (`/dashboard`)
    - My Learning (`/dashboard/learning`)
    - Profile (`/dashboard/profile`)
    - Settings (`/dashboard/settings`)
    - Logout (`/login`)
  - User Profile Quick Access

### Page Structure
1. Dashboard Page (`/dashboard`)
   - Quick Action Cards
     - Continue Learning
     - Browse Courses
   - Featured Courses Gallery
     - Course Cards with:
       - Course Image
       - Title
       - Description
       - Duration
       - Level
       - Call-to-action

2. Learning Page (`/dashboard/learning`)
3. Profile Page (`/dashboard/profile`)
4. Settings Page (`/dashboard/settings`)

## Component Architecture

### Core Layout Components
- `Sidebar`
  - `SidebarBody`
  - `SidebarLink`
- `Logo` / `LogoIcon`
- `Dashboard`

### UI Components
1. Course Gallery System
   ```tsx
   CourseGallery
   ├── Carousel
   │   └── CarouselContent
   │       └── CarouselItem
   │           └── CourseCard
   ```

2. Navigation Components
   ```tsx
   Sidebar
   ├── SidebarBody
   └── SidebarLink
   ```

### Key Features
- Responsive layout
- Dark mode support
- Animated transitions
- Interactive hover states
- Carousel navigation
- Collapsible sidebar

## Styling Structure
- Uses Tailwind CSS
- Dark mode classes (`dark:`)
- Responsive breakpoints:
  - `sm:` - Small devices
  - `md:` - Medium devices
  - `lg:` - Large devices
  - `xl:` - Extra large devices

## Known Dependencies
- Next.js
- React
- Framer Motion
- Lucide React (icons)
- Tailwind CSS
- shadcn/ui components

Would you like me to use agent mode to provide a more detailed analysis of:
1. Complete file structure
2. All dependencies from package.json
3. Additional components and pages
4. Configuration files and settings?

</assistant_message>
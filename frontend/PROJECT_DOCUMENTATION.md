# Airtel Mobile Recharge Web Application

A professional mobile recharge web application built with **React**, **Tailwind CSS**, and **Context API**.

## 🎯 Project Objectives Completed

### ✅ 1. Tailwind CSS Setup & Usage
- Configured Tailwind CSS with custom Airtel brand colors
- Applied consistent styling throughout the application
- Implemented responsive design patterns
- Created custom utility classes and animations

### ✅ 2. Props Implementation
All components use props for dynamic rendering:
- **Navbar**: Receives `onLoginClick` prop
- **Sidebar**: Receives `isOpen` and `onClose` props
- **PlanCard**: Receives `plan`, `onSelect`, `isSelected` props
- **RechargeForm**: Receives `selectedPlan`, `onClose` props
- **LoginModal**: Receives `isOpen`, `onClose` props
- **Hero**: Receives `onRechargeClick` prop

### ✅ 3. State Management with useState
Components implementing local state:
- **Navbar**: Menu toggle state (`isMenuOpen`)
- **Sidebar**: Active menu state (`activeMenu`)
- **App.jsx**: 
  - Sidebar visibility (`isSidebarOpen`)
  - Login modal state (`isLoginModalOpen`)
  - Recharge form state (`isRechargeFormOpen`)
  - Selected plan state (`selectedPlan`)
- **RechargeForm**: Form data state
- **LoginModal**: Form data state

### ✅ 4. Global State with Context API
Created comprehensive `AppContext` managing:
- **Theme**: Light/Dark mode toggle
- **User**: Login state, user info (name, phone)
- **Recharge History**: Transaction records
- **Cart**: Shopping cart functionality
- **Notifications**: Toast notification system

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with user authentication
│   ├── Footer.jsx          # Footer with links and info
│   ├── Sidebar.jsx         # Side navigation menu
│   ├── Hero.jsx            # Hero section with CTA
│   ├── PlanCard.jsx        # Reusable plan card component
│   ├── RechargeForm.jsx    # Recharge form modal
│   ├── LoginModal.jsx      # User login modal
│   └── Notification.jsx    # Toast notifications
├── context/
│   └── AppContext.jsx      # Global state management
├── App.jsx                 # Main application component
├── main.jsx                # App entry point with Provider
└── index.css               # Tailwind config & animations
```

## 🎨 Features Implemented

### State Management (useState)
1. **Menu Toggles**: Mobile menu, sidebar visibility
2. **Modal Controls**: Login modal, recharge form modal
3. **Form State**: Login form, recharge form data
4. **Selection State**: Active menu item, selected plan

### Props Usage
1. **Event Handlers**: Click handlers passed as props
2. **Data Props**: Plan data, user data, theme data
3. **Visibility Props**: Modal open/close states
4. **Selection Props**: Active states for styling

### Context API Features
1. **Theme Management**: Toggle between light/dark mode
2. **User Authentication**: Login/logout functionality
3. **Recharge History**: Track all recharges
4. **Notification System**: Global toast notifications
5. **Cart Management**: Add/remove items from cart

## 🚀 Key Components

### 1. Navbar Component
- Dynamic user greeting when logged in
- Theme toggle button
- Login/Logout functionality
- Mobile responsive menu

### 2. Sidebar Component
- Context-aware menu items
- User profile display
- Recent recharge history
- Active menu highlighting

### 3. PlanCard Component
- Dynamic plan rendering with props
- Selected state highlighting
- Featured plan badge
- Hover animations

### 4. RechargeForm Component
- Form state management
- Context integration for user data
- Validation logic
- Success notifications

### 5. LoginModal Component
- Controlled form inputs
- Context API for global login
- Form validation
- Animated modal

### 6. Notification Component
- Auto-dismiss functionality
- Multiple notification types
- Animated entrance/exit
- Global notification queue

## 🎯 React Concepts Demonstrated

### useState Examples
```javascript
// In App.jsx
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [selectedPlan, setSelectedPlan] = useState(null);

// In Navbar.jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

### Props Examples
```javascript
// Passing props
<Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
<PlanCard plan={plan} onSelect={handlePlanSelect} isSelected={selected} />

// Receiving props
const Navbar = ({ onLoginClick }) => { ... }
const PlanCard = ({ plan, onSelect, isSelected }) => { ... }
```

### Context API Usage
```javascript
// Creating context
const AppContext = createContext();

// Provider
<AppProvider>
  <App />
</AppProvider>

// Consuming context
const { user, theme, login, logout } = useAppContext();
```

## 🎨 Tailwind CSS Features

### Custom Theme Colors
```javascript
colors: {
  airtel: {
    red: '#e60102',
    darkRed: '#c4000f',
    yellow: '#ffeb3b',
  }
}
```

### Custom Components
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- Custom animations: fade-in, scale-in, slide-in

### Responsive Design
- Mobile-first approach
- Breakpoint utilities (sm, md, lg)
- Grid and flexbox layouts

## 📦 Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

## 🌟 Features

- ✅ User Authentication (Login/Logout)
- ✅ Plan Selection & Comparison
- ✅ Recharge Form with Validation
- ✅ Theme Toggle (Light/Dark Mode)
- ✅ Responsive Design
- ✅ Toast Notifications
- ✅ Recharge History Tracking
- ✅ Mobile Sidebar Navigation
- ✅ Animated UI Components
- ✅ Context-based Global State

## 🔧 Technologies Used

- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Context API** - State Management

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎓 Learning Outcomes

This project demonstrates:
1. ✅ Component-based architecture
2. ✅ Props drilling and lifting state up
3. ✅ useState hook for local state
4. ✅ Context API for global state
5. ✅ Tailwind CSS utility-first approach
6. ✅ Responsive web design
7. ✅ Form handling and validation
8. ✅ Modal management
9. ✅ Animation and transitions
10. ✅ Code organization and structure

---

**Built with ❤️ using React + Tailwind CSS + Context API**

# 🍱 Mom's Special - Home-Style Tiffin Service

**Mom's Special** is a premium, beautifully designed web application for a local tiffin service in Gandhinagar. It bridges the gap between traditional home-cooked food and modern convenience, offering users an easy way to view menus, calculate costs, and order meals.

## 🌟 Key Features

*   **🎨 Premium Rebranding:** A complete visual identity overhaul to "Mom's Special" with a warm, trustworthy, and appetising design.
*   **📋 Weekly Menu:** A beautiful, animated tab-based menu for Lunch (Detailed Thali) and Dinner (Light Meals), including special weekend items.
*   **🚚 Delivery Area Checker:** An interactive tool on the Contact page that instantly tells users if delivery is available in their sector (Sector 6 & 7) or if it's pickup-only.
*   **🧮 Subscription Cost Calculator:** A smart slider on the Pricing page allowing users to estimate their monthly expenses based on meal type (Basic/Full) and number of days.
*   **💬 Testimonials:** "Mom's Wall of Love" showcasing authentic reviews to build trust.
*   **🔔 Floating Trial Button:** A sticky "Book Trial Meal" button that appears on scroll to boost conversions.
*   **📱 WhatsApp Integration:** Direct "Click-to-Chat" buttons for ordering and inquiries with pre-filled messages.
*   **📢 Promotional Banner:** A dismissible "Today's Special" notification bar at the top of the site.

## 🛠️ Tech Stack

*   **Frontend:** React.js (Vite)
*   **Styling:** Tailwind CSS, Shadcn UI
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Routing:** React Router DOM
*   **Management:** `npm`, `git`

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sarthak-bhuptani/Mom-sspecial
    cd Mom-sspecial
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:8080` (or the port shown in your terminal) to view the app.

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components (Navbar, Footer, Buttons, etc.)
│   ├── ui/             # Shadcn UI primitives
│   ├── CostCalculator.tsx
│   ├── FloatingTrialButton.tsx
│   └── Testimonials.tsx
├── pages/              # Main route pages
│   ├── Home.tsx        # Hero, Features, Testimonials
│   ├── Menu.tsx        # Weekly Menu Tables
│   ├── Pricing.tsx     # Plans & Calculator
│   ├── Contact.tsx     # Delivery Checker & Info
│   └── About.tsx       # Brand Story & Values
├── App.tsx             # Main Application Component
└── main.tsx            # Entry Point
```

## 📍 Contact & Location

*   **Address:** Sector-6A, Block No 431/2, Nr. Ambaji Mata Temple, Gandhinagar.
*   **Phone:** +91 74360 59291
*   **Service Areas:**  
    *   *Lunch Delivery:* Sector 6 & 7  
    *   *Pickup:* Sector 6A (All meals)

---

### 👨‍💻 Developed By

Made with ❤️ by Sarthak towards healthy, home-style food.

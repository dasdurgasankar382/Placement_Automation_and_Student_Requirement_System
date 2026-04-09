# Development Q&A Log

This document serves as a central repository for tracking important questions, decisions, and development context for the frontend application. 

It is structured to clearly capture:
1. **What was asked:** The original question, requirement, or problem statement.
2. **What is the answer:** The technical solution, proposed approach, or direct response.
3. **Why it is here:** The context, rationale, or business logic behind the answer.

---

## Log Entries

*(New entries can be added below this line)*

### Handling Text Color in Dark Mode
- **What I asked:** When using a dark theme, how can the text color be made light or which color should be visible?
- **What is the answer:** When a dark background is applied, you need to change the text to a light color (like pure white `#FFFFFF` or a soft off-white/light gray like `text-gray-100` or `text-gray-200` in Tailwind CSS) for it to be visible. In Tailwind CSS, you handle this by using the `dark:` prefix: `<p className="text-gray-900 dark:text-gray-100">Hello</p>`.
- **Why it is here:** By default, browser text is dark (often black or dark gray). If you change the background to dark without explicitly telling the text to become light, the text will vanish into the background. The `dark:` prefix allows the colors to swap dynamically when the theme flips.

### Fixing Tailwind v4 Class-based Dark Mode
- **What I asked:** Why are the `dark:` prefixes not working when the theme is toggled?
- **What is the answer:** We updated `src/index.css` to define the dark variant properly for Tailwind CSS v4 using: `@variant dark (&:where(.dark, .dark *));`.
- **Why it is here:** By default, Tailwind v4 uses OS-level preferences (media queries) for dark mode. To make it listen to the `class="dark"` injected by our `ThemeContext.jsx`, we have to define a custom variant. Using `&:where(.dark, .dark *)` ensures that any element with `.dark`, and all its children, correctly apply the dark utilities without breaking CSS specificity.

### Example Entry
- **What I asked:** How are we managing global state for the theme (Light/Dark mode)?
- **What is the answer:** We are using a React `ThemeContext` (`src/context/ThemeContext.jsx`) which wraps the application and provides theme values and a toggle function.
- **Why it is here:** Centralizing the theme logic prevents prop-drilling, ensures consistent styling across all components, and makes it easier to persist user preferences.

---

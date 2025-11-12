# Habit Tracker – Dynamic Web Application

## Overview

This project is part of the **Dynamic Web Applications with JavaScript** course. It is a **Habit Tracker** that helps users monitor daily habits, visualize progress, 
and manage data locally using `localStorage`. The app runs entirely in the browser—no server required. The students were provided with a default code which we edited
and modified to our vision, trying to understand the code and the wat to edit the code as well as possible. 

---

## Features

### Default Code Provided
- Add habits and display them in a weekly view.
- Toggle completion for each day.
- Calculate streaks.
- Data persistence using `localStorage`.
- Basic UI with HTML, CSS, and JavaScript.
- Reset all data if so desire


### My Enhancements
- **Calendar View with Month Navigation**  
  Visual overview of habits across the month with color-coded indicators.
- **Habit Filter in Calendar**  
  Filter habits dynamically using checkboxes.
- **Dark Mode Toggle**  
  Switch between light and dark themes with a floating button.
- **Improved UI Styling**  
  Modern design with responsive layout and hover effects.
- **Data Management Tools**  
  Export/Import habits as JSON and reset all data.

---

### Structure
```
habit-tracker/
├── index.html             # Main HTML file
│   └──  styles.css        # CSS styles
│   └── app.js             # Main JavaScript file
├── screenshots/
│    ├── Adding functions to .js file.png       # Going through .js file and editing it
│    ├── Commiting to GitHub.png                # Commiting to Git repository often
│    ├── Doing the .css file.png                # Doing the syling for the page
│    ├── Habit Tracker.png                      # Example of the functional page
│    ├── Starting with html code.png            # Ready code that was provided for us ready for work
└── README.md              # Project documentation
```

---

### How to run it?

Please Use the following Github Pages link: https://github.com/stefanbeatovic/habit-tracker.

if preferred to use locally:
- Save all files to your local computer/Clone Repository

git clone https://github.com/stefanbeatovic/habit-tracker
- Open index.html in your preffered browser
- See console output by opening browser developer tools to verify if errors. Shortcuts for Windows/Linux: Press F12 or Ctrl + Shift + I. Shortcuts for Mac: Press Cmd + Opt + I
- Enjoy using the site, view demo video for explanation on how it works.

---

Screenshots are found in the separate folder of the process. 

---

### Self assessment

#### A. Core Functionality (10 points)

- Primary user stories run end to end without blockers (4 pts). Users can add habits, track weekly progress, view calendar, filter habits, toggle dark mode, and manage data (export/import/reset). Everything works as intended.
Score: 4/4
- Error handling for invalid input, network or empty data with clear user feedback (2 pts). Minimal error handling. Empty habit names are ignored silently (no feedback). Import uses try/catch for invalid JSON, which is good. No network calls, so no network error handling needed.
Score: 1/2
- State and navigation remain consistent across actions and refreshes where expected (2 pts). LocalStorage persists habits and dark mode across refresh. Calendar navigation works correctly.
Score: 2/2
- Empty and loading states shown where relevant to avoid blank screens (2 pts). Weekly view shows “No habits yet” placeholder when empty. Calendar shows empty grid but no loading indicator (acceptable since no async data).
Score: 1/2

Total for A: 8/10
(Excellent functionality, minor gaps in error feedback and loading states.)

#### B. Code Quality and Architecture (5 points)

- Small functions and clear separation of concerns (2 pts). Functions like render(), renderCalendar(), loadHabitData() show good modularity.
Score: 2/2
- Naming and comments communicate intent (1 pt). After adding comments, clarity improved. Original code had minimal comments.
Score: 0.5/1
- Consistency in formatting and linting (1 pt). Code is readable but no evidence of Prettier/ESLint usage.
Score: 0.5/1
- Defensive coding such as null checks and try/catch where appropriate (1 pt). Import logic uses try/catch. Some null checks present.
Score: 1/1

Total for B: 4/5
(Good structure and clarity, minor gaps in linting and initial comments.)

#### C. UX and Accessibility (5 points)
- Responsive layout works on mobile and desktop (1 pt). CSS Grid and Flexbox used; layout adapts well.
Score: 1/1
- Keyboard support with visible focus and logical tab order (1 pt). Weekly habit buttons have aria-label and respond to Enter/Space.
Score: 1/1
- Form usability with validation messages and helpful labels (1 pt). Placeholder text present, but no validation messages for empty input.
Score: 0.5/1
- Contrast and semantics meet accessibility expectations (1 pt). Good color contrast; headings and landmarks used properly.
Score: 1/1
- Perceived performance with spinners or skeletons (1 pt). No loading indicators; minor layout shifts when rendering.
Score: 0.5/1

Total for C: 4/5
(Strong UX and accessibility, minor gaps in validation and performance cues.)

#### D. Data Handling and Persistence (4 points)
- Reads and writes safely to localStorage (1 pt). Safe read/write with sensible defaults.
Score: 1/1
- Schema awareness with basic validation (1 pt). Checks for Array.isArray(state.habits) before import.
Score: 1/1
- Security hygiene escapes user-generated output (1 pt). Missing. Habit names are inserted directly into DOM without escaping (XSS risk).
Score: 0/1
- Resilience with try/catch and fallbacks (1 pt). Import logic uses try/catch for invalid JSON.
Score: 1/1

Total for D: 3/4
(Mostly safe and reliable, but missing XSS protection.)

#### E. Documentation (3 points)
README includes features, run steps for macOS, screenshots, GitHub link, live URL, reflection, and self-assessment. Architecture and limitations documented.
Score: 3/3
(Complete and clear documentation.)

#### F. Deployment (3 points)
- Project deployed on GitHub Pages with working live URL and repository link in README.
Score: 3/3
(Live and tidy deployment.)

#### G. Demo Video & Git Documentation (5 points)
- Video not yet provided; timestamps missing.
Score: 0/5
(Pending video submission.)

### Final Score: 25/35
Breakdown:

- Core Functionality: 8/10
- Code Quality: 4/5
- UX & Accessibility: 4/5
- Data Handling: 3/4
- Documentation: 3/3
- Deployment: 3/3
- Demo Video: 0/5

---

### Reflection

Building this Habit Tracker was an insightful experience that strengthened my understanding of DOM manipulation, state management, and localStorage. 
Initially, the provided code offered a simple weekly habit view, which was functional but limited. My goal was to enhance usability and visualization 
without breaking the original structure.

The most challenging part was implementing the calendar view with month navigation and habit filtering. It required careful handling of dates, dynamic 
rendering, and mapping habits to specific days. I also introduced color-coded indicators for habits, which improved clarity in the calendar.

Adding dark mode was another interesting task. It involved toggling CSS classes and ensuring that all UI elements adapted correctly, including buttons, 
text, and calendar cells. Persisting the theme choice using localStorage made the feature user-friendly.

Finally, I focused on data management by enabling export/import functionality and reset options. These additions make the app practical for long-term use.

Overall, this project taught me how to progressively enhance an existing codebase, maintain clean structure, and implement interactive features that improve
user experience. It reinforced the importance of planning UI changes and writing reusable, maintainable JavaScript code.
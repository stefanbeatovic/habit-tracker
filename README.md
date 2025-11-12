Habit Tracker – Dynamic Web Application

Overview
This project is part of the **Dynamic Web Applications with JavaScript** course. It is a **Habit Tracker** that helps users monitor daily habits, visualize progress, 
and manage data locally using `localStorage`. The app runs entirely in the browser—no server required.

---

Features

Default Code Provided**
- Add habits and display them in a weekly view.
- Toggle completion for each day.
- Calculate streaks.
- Data persistence using `localStorage`.
- Basic UI with HTML, CSS, and JavaScript.

My Enhancements**
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

How to run it?

Please Use the following Github Pages link: https://github.com/stefanbeatovic/habit-tracker.

if preferred to use locally:
- Save all files to your local computer/Clone Repository

git clone https://github.com/stefanbeatovic/habit-tracker
- Open index.html in your preffered browser
- See console output by opening browser developer tools to verify if errors. Shortcuts for Windows/Linux: Press F12 or Ctrl + Shift + I. Shortcuts for Mac: Press Cmd + Opt + I
- Enjoy using the site, view demo video for explanation on how it works.

Screenshots:


📝 Reflection (200–300 words)
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
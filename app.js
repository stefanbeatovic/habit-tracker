// Get reference to rows container
const rows = document.getElementById("rows");

// Load saved state from localStorage, or create empty state
let state = JSON.parse(localStorage.getItem("habitTrackerState")) || { habits: [] };

// Get today's date as "YYYY-MM-DD"
function todayKey() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

// Get array of last 7 dates for the week view
function getWeekKeys() {
  const keys = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    keys.push(date.toISOString().split("T")[0]);
  }
  return keys;
}

const weekKeys = getWeekKeys();

// Create new habit object
function newHabit(name) {
  return {
    id: Math.random().toString(36).slice(2, 9),
    name: name,
    log: {}
  };
}

// Save state to localStorage
function saveState(stateObj) {
  localStorage.setItem("habitTrackerState", JSON.stringify(stateObj));
}

// Calculate how many days in a row habit was completed
function computeStreak(habit) {
  let count = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split("T")[0];
    if (habit.log[key]) {
      count++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return count;
}

// =====================================================================
// === 1. RENDER UI: Dynamic DOM Generation (State Reconciliation) ===
// This function completely rebuilds the habit tracker table in the browser
// It is called every time the data changes (add, toggle, delete, import, etc.)
// It uses the current 'state' object to generate fresh HTML: no templates!
// =====================================================================
// render(): The master function that draws the entire UI from scratch
function render() {
  // Clear previous HTML
  rows.innerHTML = "";

  // Show "No habits yet" message if empty
  if (state.habits.length === 0) {
    // Create placeholder row
    const row = document.createElement("div");
    row.setAttribute("style", "display:grid;grid-template-columns:1.6fr repeat(7,.9fr) .8fr 1fr;align-items:center;border-bottom:1px solid #eef2f6;");
    
    // Add habit name column
    const nameCol = document.createElement("div");
    nameCol.setAttribute("style", "padding:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;");
    nameCol.textContent = "No habits yet";
    row.appendChild(nameCol);
    
    // Add empty day columns for alignment
    weekKeys.forEach(() => {
      const col = document.createElement("div");
      col.setAttribute("style", "padding:10px;text-align:center;");
      row.appendChild(col);
    });
    
    // Add streak column (0 for empty state)
    const streakCol = document.createElement("div");
    streakCol.setAttribute("style", "padding:10px;font-variant-numeric:tabular-nums;");
    streakCol.textContent = "0";
    row.appendChild(streakCol);
    
    // Add actions column
    const actionsCol = document.createElement("div");
    actionsCol.setAttribute("style", "padding:10px;color:#66788a;");
    actionsCol.textContent = "Add a habit";
    row.appendChild(actionsCol);
    
    // Show placeholder and exit
    rows.appendChild(row);
    return;
  }

  // Loop through each habit and create a row
  state.habits.forEach(h => {
    // Create habit row
    const row = document.createElement("div");
    row.setAttribute("style", "display:grid;grid-template-columns:1.6fr repeat(7,.9fr) .8fr 1fr;align-items:center;border-bottom:1px solid #eef2f6;");

    // Add habit name
    const nameCol = document.createElement("div");
    nameCol.setAttribute("style", "padding:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;");
    nameCol.textContent = h.name;
    row.appendChild(nameCol);

    // Add day columns (7 days for the week)
    weekKeys.forEach(k => {
      const col = document.createElement("div");
      col.setAttribute("style", "padding:10px;text-align:center;");

      // Create clickable button for each day
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `${h.name} on ${k}`);
      btn.setAttribute("role", "checkbox");

      // Check if this day is marked complete
      const checked = !!h.log[k];
      btn.setAttribute("aria-checked", String(checked));
      btn.textContent = checked ? "Yes" : "";

      // Store habit ID and date for the click handler
      btn.dataset.habitId = h.id;
      btn.dataset.dateKey = k;

      // Style button green if completed
      btn.setAttribute(
        "style",
        "display:flex;align-items:center;justify-content:center;width:36px;height:36px;margin:auto;border-radius:8px;border:1px solid #dbe7f0;cursor:pointer;user-select:none;background:"+(checked?"#e9f8ef":"#fff")+";color:"+(checked?"#1e9e4a":"inherit")+";font-weight:"+(checked?"700":"400")+";"
      );

      // Click to toggle day
      btn.addEventListener("click", onToggleDay);

      // Space/Enter keys also toggle
      btn.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });

      col.appendChild(btn);
      row.appendChild(col);
    });

    // Streak counter
    const streakCol = document.createElement("div");
    streakCol.setAttribute("style", "padding:10px;font-variant-numeric:tabular-nums;");
    streakCol.textContent = String(computeStreak(h));
    row.appendChild(streakCol);

    // Action buttons
    const actions = document.createElement("div");
    actions.setAttribute("style", "padding:10px;display:flex;gap:8px;flex-wrap:wrap;");

    // Tick today button
    const tick = document.createElement("button");
    tick.type = "button";
    tick.textContent = "Tick today";
    tick.setAttribute("style", "background:#fff;border:1px solid #dbe7f0;color:#0b3b58;padding:6px 10px;border-radius:8px;cursor:pointer;");
    tick.addEventListener("click", () => toggleLog(h.id, todayKey()));
    actions.appendChild(tick);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.style.cssText = "padding:6px 12px;border:none;background:#fee;color:#c00;border-radius:4px;cursor:pointer;font-weight:700;";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete "${h.name}"?`)) {
        state.habits = state.habits.filter(x => x.id !== h.id);
        saveState(state);
        render();
      }
    });
    actions.appendChild(deleteBtn);
    
    row.appendChild(actions);
    rows.appendChild(row);
  });
}


// =====================================================================
// EVENT HANDLING & STATE MUTATION
// =====================================================================

// Toggle a habit's log for a specific date
function onToggleDay(e) {
  const btn = e.currentTarget;
  const habitId = btn.dataset.habitId;
  const dateKey = btn.dataset.dateKey;
  toggleLog(habitId, dateKey);
}

// Add or remove a date from habit log
function toggleLog(habitId, dateKey) {
  const habit = state.habits.find(h => h.id === habitId);
  if (habit) {
    habit.log[dateKey] = !habit.log[dateKey];
    saveState(state);
    render();
  }
}

// Add new habit via form
// =====================================================================
document.getElementById("habit-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("habit-name");
  const name = input.value.trim();
  if (!name) return;
  
  state.habits.push(newHabit(name));
  saveState(state);
  input.value = "";
  render();
});

// Data management
// =====================================================================

// Export habits as JSON file
document.getElementById("export-json").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "habits-export.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Import habits from JSON file
document.getElementById("import-json").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data.habits)) throw new Error("Invalid format");
    
    state = data;
    saveState(state);
    render();
    alert("Import complete. Data loaded.");
  } catch (err) {
    alert("Import failed. Please check the JSON file format.");
  }
  e.target.value = "";
});

// Reset all data
document.getElementById("reset-all").addEventListener("click", () => {
  if (!confirm("Delete all habits and logs?")) return;
  
  state = { habits: [] };
  saveState(state);
  render();
  alert("All data reset.");
});

// Start the app on page load
render();

/* ===========================
   Calendar View + Habit Colors + Dark Mode Toggle
=========================== */

// DOM references for calendar and filter UI
const calendarGrid = document.getElementById("calendar-grid"); // Container for calendar days
const monthYearDisplay = document.getElementById("calendar-month-year"); // Displays current month/year
const prevMonthBtn = document.getElementById("prev-month"); // Button to go to previous month
const nextMonthBtn = document.getElementById("next-month"); // Button to go to next month
const habitFilterContainer = document.getElementById("habit-filter"); // Container for habit filter checkboxes

// Track current month/year and selected habits for filtering
let currentDate = new Date();
let selectedHabits = new Set(); // Stores habits chosen by user for filtering in calendar view

// Predefined color palette for habits (used for visual distinction in calendar)
const habitColors = [
  "#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#E91E63", "#3F51B5", "#009688", "#FFC107"
];
const habitColorMap = {}; // Maps each habit to a unique color from the palette

/* Load habit data from localStorage
   Returns an array of { habit, date } for completed days */
function loadHabitData() {
  const state = JSON.parse(localStorage.getItem("habitTrackerState") || "{}");

  if (!state.habits || !Array.isArray(state.habits)) return [];

  const result = [];

  // Loop through habits and collect completed dates
  state.habits.forEach(habit => {
    if (habit.log && typeof habit.log === "object") {
      Object.entries(habit.log).forEach(([date, completed]) => {
        if (completed === true) {
          result.push({ habit: habit.name, date });
        }
      });
    }
  });

  return result;
}

/* Get all unique habits and assign colors */
function getAllHabits(data) {
  const habits = new Set(data.map(entry => entry.habit));
  const all = Array.from(habits);

  // Assign colors from palette to each habit
  all.forEach((habit, i) => {
    if (!habitColorMap[habit]) {
      habitColorMap[habit] = habitColors[i % habitColors.length];
    }
  });

  return all;
}

/* Render habit filter checkboxes
   Allows user to filter calendar by selected habits */
function renderHabitFilter() {
  const data = loadHabitData();
  const habits = getAllHabits(data);
  habitFilterContainer.innerHTML = "";

  if (!habits.length) {
    habitFilterContainer.innerHTML = "<p>No habits found yet. Add or complete some habits to see them here.</p>";
    return;
  }

  // Create checkbox + color dot for each habit
  habits.forEach(habit => {
    const label = document.createElement("label");
    label.style.display = "inline-flex";
    label.style.alignItems = "center";
    label.style.gap = "5px";
    label.style.marginRight = "12px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = habit;

    const colorDot = document.createElement("span");
    colorDot.style.display = "inline-block";
    colorDot.style.width = "12px";
    colorDot.style.height = "12px";
    colorDot.style.borderRadius = "50%";
    colorDot.style.backgroundColor = habitColorMap[habit];

    // Update selected habits and re-render calendar on change
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        selectedHabits.add(habit);
      } else {
        selectedHabits.delete(habit);
      }
      renderCalendar();
    });

    label.appendChild(checkbox);
    label.appendChild(colorDot);
    label.append(habit);
    habitFilterContainer.appendChild(label);
  });
}

/* Render calendar view
   Displays days of current month with habit completion indicators */
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const prevDays = firstDay.getDay(); // Days from previous month to fill grid
  const totalDays = lastDay.getDate(); // Total days in current month
  const nextDays = 6 - lastDay.getDay(); // Days from next month to fill grid

  // Update month/year display
  monthYearDisplay.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  calendarGrid.innerHTML = "";

  // Load habit completion data
  const habitCompletions = loadHabitData();

  // Apply filter if habits are selected
  const filtered = selectedHabits.size > 0
    ? habitCompletions.filter(entry => selectedHabits.has(entry.habit))
    : habitCompletions;

  // Map dates to habits completed on that day
  const dayMap = {};
  filtered.forEach(entry => {
    if (!dayMap[entry.date]) dayMap[entry.date] = [];
    dayMap[entry.date].push(entry.habit);
  });

  // Helper: Create a day cell with habit color dots
  const makeDay = (dayNum, isOtherMonth = false) => {
    const day = document.createElement("div");
    day.classList.add("calendar-day");
    if (isOtherMonth) day.classList.add("other-month");

    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    const habitsOnDay = dayMap[fullDate];

    day.textContent = dayNum;

    // Add color dots for habits completed on this day
    if (habitsOnDay) {
      habitsOnDay.forEach(habit => {
        const colorDot = document.createElement("span");
        colorDot.style.display = "inline-block";
        colorDot.style.width = "8px";
        colorDot.style.height = "8px";
        colorDot.style.borderRadius = "50%";
        colorDot.style.marginLeft = "3px";
        colorDot.style.backgroundColor = habitColorMap[habit];
        day.appendChild(colorDot);
      });
    }

    calendarGrid.appendChild(day);
  };

  // Render previous month days
  for (let x = prevDays; x > 0; x--) {
    makeDay(prevLastDay.getDate() - x + 1, true);
  }

  // Render current month days
  for (let i = 1; i <= totalDays; i++) {
    makeDay(i);
  }

  // Render next month days
  for (let j = 1; j <= nextDays; j++) {
    makeDay(j, true);
  }
}

/* Month navigation buttons */
prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

/* Initialize calendar and filter on page load */
renderHabitFilter();
renderCalendar();

/* DARK MODE TOGGLE BUTTON
   Adds a floating button to toggle dark mode and saves preference */
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙"; // Moon icon for dark mode
darkModeBtn.id = "dark-mode-toggle";
document.body.appendChild(darkModeBtn);

// Toggle dark mode and update button icon
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Restore dark mode state from localStorage on page load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️";
}

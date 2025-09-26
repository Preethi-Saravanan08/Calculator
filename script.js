const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('button');
const themeToggle = document.getElementById('theme-toggle');
let memory = 0;

// Handle button clicks
buttons.forEach(btn => {
  if (!btn.id) { // Ignore clear/del/theme
    btn.addEventListener('click', () => handleInput(btn.textContent, btn));
  }
});

// Handle special buttons
document.getElementById('clear').addEventListener('click', () => {
  display.value = '';
  history.textContent = '';
});

document.getElementById('del').addEventListener('click', () => {
  display.value = display.value.slice(0, -1);
});

document.getElementById('mplus').addEventListener('click', () => {
  memory += parseFloat(display.value) || 0;
});

document.getElementById('mminus').addEventListener('click', () => {
  memory -= parseFloat(display.value) || 0;
});

document.getElementById('mr').addEventListener('click', () => {
  display.value += memory;
});

document.getElementById('mc').addEventListener('click', () => {
  memory = 0;
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
});

// Input logic
function handleInput(value, btn = null) {
  if (btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
  }

  if (value === '=') {
    try {
      if (display.value.trim() === '') return;

      let expr = display.value
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/√/g, "Math.sqrt")
        .replace(/x²/g, "**2")
        .replace(/\^/g, "**");

      let result = Function('"use strict"; return (' + expr + ')')();
      history.textContent = display.value + " =";
      display.value = result;
    } catch {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", ".", "(", ")"].includes(e.key)) {
    display.value += e.key;
  } 
  else if (e.key === "Enter") {
    handleInput("=");
  } 
  else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } 
  else if (e.key === "Escape") {
    display.value = "";
  }
});

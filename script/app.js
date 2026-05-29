// Tab switching functionaliteit
function switchTab(n) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item')[n].classList.add('active');

  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  const tabs = ['home', 'stats', 'goals', 'settings', 'ai'];
  document.getElementById(tabs[n]).classList.add('active');
}

// Profiel scherm openen/sluiten
function openProfile() {
  document.getElementById('profile-screen').style.display = 'flex';
}

function closeProfile() {
  document.getElementById('profile-screen').style.display = 'none';
}

// AI Chat functionaliteit
function sendMessage() {
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('messages');
  
  if (!input.value.trim()) return;

  messages.innerHTML += `<div class="message user">${input.value}</div>`;
  messages.scrollTop = messages.scrollHeight;

  const text = input.value.toLowerCase();
  input.value = '';

  // AI antwoord simuleren
  setTimeout(() => {
    let reply = "Bedankt voor je bericht!";
    if (text.includes("stap")) reply = "Je hebt vandaag 8.421 stappen gezet. Nog even doorzetten!";
    if (text.includes("water")) reply = "Je hebt 1.6 liter water gedronken. Nog 0.9 liter te gaan!";
    if (text.includes("slaap")) reply = "Je slaapt goed! Zorg dat je voldoende water drinkt.";
    if (text.includes("calorie")) reply = "Je bent goed op schema met je calorieën!";
    
    messages.innerHTML += `<div class="message ai">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  const aiInput = document.getElementById('ai-input');
  if (aiInput) {
    aiInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  
  // Load saved settings (name, theme)
  loadSettings();
});

// Toggle dark theme and persist
function toggleTheme(enable) {
  if (enable) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  }
}

function saveSettings() {
  const name = document.getElementById('user-name').value || 'Alex';
  const notifs = document.getElementById('notif-toggle').checked;
  localStorage.setItem('userName', name);
  localStorage.setItem('notifications', notifs ? '1' : '0');
  // simple feedback
  alert('Instellingen opgeslagen');
}

function loadSettings() {
  const name = localStorage.getItem('userName');
  if (name) document.getElementById('user-name').value = name;

  const notifs = localStorage.getItem('notifications');
  if (notifs !== null) document.getElementById('notif-toggle').checked = notifs === '1';

  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.getElementById('dark-mode-toggle').checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Markeer doel als voltooid
function completeGoal(id) {
  if (id === 'steps') {
    const bar = document.getElementById('goal-steps');
    const btn = document.getElementById('goal-steps-btn');
    bar.style.width = '100%';
    bar.textContent = '100%';
    btn.disabled = true;
    btn.textContent = 'Voltooid';
  }
  if (id === 'water') {
    const bar = document.getElementById('goal-water');
    const btn = document.getElementById('goal-water-btn');
    bar.style.width = '100%';
    bar.textContent = '100%';
    btn.disabled = true;
    btn.textContent = 'Voltooid';
  }
}

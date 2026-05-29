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

const translations = {
  nl: {
    pageTitle: 'Wellness • App',
    greeting: 'Goedemorgen, {name} 👋',
    settingsTitle: 'Instellingen',
    nameLabel: 'Naam',
    languageLabel: 'Taal',
    darkModeLabel: 'Donkere modus',
    notifLabel: 'Notificaties',
    saveButton: 'Opslaan',
    settingsSaved: 'Instellingen opgeslagen',
    statsTitle: 'Stats',
    goalsTitle: 'Doelen',
    aiTitle: 'Wellness AI Coach',
    aiPlaceholder: 'Typ je bericht...',
    aiGreeting: 'Hoi {name}! Hoe kan ik je helpen?',
    profileTitle: 'Profiel',
    profileInfo: 'Alex de Vries - 28 jaar',
    profileBack: 'Terug',
    navHome: 'Home',
    navStats: 'Stats',
    navGoals: 'Doelen',
    navSettings: 'Instellingen',
    navAi: 'AI',
    homeStepsTitle: 'Stappen vandaag',
    homeSleepTitle: 'Slaap',
    homeCaloriesTitle: 'Calorieën',
    statsWeeklyStepsLabel: 'Wekelijkse stappen',
    statsAverageSleepLabel: 'Gemiddelde slaap',
    statsAverageCaloriesLabel: 'Gemiddelde calorieën',
    goalStepsLabel: '10.000 stappen per dag',
    goalWaterLabel: 'Drink 2L water',
    goalMarkButton: 'Markeer',
    goalDoneButton: 'Voltooid'
  },
  en: {
    pageTitle: 'Wellness • App',
    greeting: 'Good morning, {name} 👋',
    settingsTitle: 'Settings',
    nameLabel: 'Name',
    languageLabel: 'Language',
    darkModeLabel: 'Dark mode',
    notifLabel: 'Notifications',
    saveButton: 'Save',
    settingsSaved: 'Settings saved',
    statsTitle: 'Stats',
    goalsTitle: 'Goals',
    aiTitle: 'Wellness AI Coach',
    aiPlaceholder: 'Type your message...',
    aiGreeting: 'Hi {name}! How can I help you?',
    profileTitle: 'Profile',
    profileInfo: 'Alex de Vries - 28 years',
    profileBack: 'Back',
    navHome: 'Home',
    navStats: 'Stats',
    navGoals: 'Goals',
    navSettings: 'Settings',
    navAi: 'AI',
    homeStepsTitle: 'Steps today',
    homeSleepTitle: 'Sleep',
    homeCaloriesTitle: 'Calories',
    statsWeeklyStepsLabel: 'Weekly steps',
    statsAverageSleepLabel: 'Average sleep',
    statsAverageCaloriesLabel: 'Average calories',
    goalStepsLabel: '10,000 steps per day',
    goalWaterLabel: 'Drink 2L water',
    goalMarkButton: 'Mark',
    goalDoneButton: 'Done'
  }
};

function applyLanguage(lang) {
  const trans = translations[lang] || translations.nl;
  const name = document.getElementById('user-name').value || 'Alex';

  document.title = trans.pageTitle;
  document.documentElement.lang = lang === 'en' ? 'en' : 'nl';
  document.getElementById('header-greeting').textContent = trans.greeting.replace('{name}', name);
  document.getElementById('settings-title').textContent = trans.settingsTitle;
  document.getElementById('label-name').textContent = trans.nameLabel;
  document.getElementById('label-language').textContent = trans.languageLabel;
  document.getElementById('label-dark-mode').textContent = trans.darkModeLabel;
  document.getElementById('label-notif').textContent = trans.notifLabel;
  document.getElementById('save-settings-btn').textContent = trans.saveButton;
  document.getElementById('stats-title').textContent = trans.statsTitle;
  document.getElementById('goals-title').textContent = trans.goalsTitle;
  document.getElementById('ai-title').textContent = trans.aiTitle;
  document.getElementById('ai-input').placeholder = trans.aiPlaceholder;
  const initialAi = document.querySelector('#messages .message.ai');
  if (initialAi) initialAi.textContent = trans.aiGreeting.replace('{name}', name);

  const maybeGreeting = document.getElementById('header-greeting');
  if (maybeGreeting) maybeGreeting.textContent = trans.greeting.replace('{name}', name);

  document.getElementById('profile-title').textContent = trans.profileTitle;
  document.getElementById('profile-info').textContent = trans.profileInfo;
  document.getElementById('profile-back-btn').textContent = trans.profileBack;
  document.getElementById('nav-home').textContent = trans.navHome;
  document.getElementById('nav-stats').textContent = trans.navStats;
  document.getElementById('nav-goals').textContent = trans.navGoals;
  document.getElementById('nav-settings').textContent = trans.navSettings;
  document.getElementById('nav-ai').textContent = trans.navAi;
  document.getElementById('home-steps-title').textContent = trans.homeStepsTitle;
  document.getElementById('home-sleep-title').textContent = trans.homeSleepTitle;
  document.getElementById('home-calories-title').textContent = trans.homeCaloriesTitle;
  document.getElementById('stats-weekly-steps-label').textContent = trans.statsWeeklyStepsLabel;
  document.getElementById('stats-average-sleep-label').textContent = trans.statsAverageSleepLabel;
  document.getElementById('stats-average-calories-label').textContent = trans.statsAverageCaloriesLabel;
  document.getElementById('goal-steps-label').textContent = trans.goalStepsLabel;
  document.getElementById('goal-water-label').textContent = trans.goalWaterLabel;

  const stepsBtn = document.getElementById('goal-steps-btn');
  const waterBtn = document.getElementById('goal-water-btn');
  stepsBtn.textContent = stepsBtn.disabled ? trans.goalDoneButton : trans.goalMarkButton;
  waterBtn.textContent = waterBtn.disabled ? trans.goalDoneButton : trans.goalMarkButton;

  document.getElementById('language-nl').classList.toggle('active', lang === 'nl');
  document.getElementById('language-en').classList.toggle('active', lang === 'en');
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  applyLanguage(lang);
}

function saveSettings() {
  const name = document.getElementById('user-name').value || 'Alex';
  const notifs = document.getElementById('notif-toggle').checked;
  localStorage.setItem('userName', name);
  localStorage.setItem('notifications', notifs ? '1' : '0');
  const currentLanguage = localStorage.getItem('language') || 'nl';
  alert(translations[currentLanguage].settingsSaved);
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

  const language = localStorage.getItem('language') || 'nl';
  setLanguage(language);
}

// Markeer doel als voltooid
function completeGoal(id) {
  const currentLanguage = localStorage.getItem('language') || 'nl';
  const doneText = translations[currentLanguage].goalDoneButton;

  if (id === 'steps') {
    const bar = document.getElementById('goal-steps');
    const btn = document.getElementById('goal-steps-btn');
    bar.style.width = '100%';
    bar.textContent = '100%';
    btn.disabled = true;
    btn.textContent = doneText;
  }
  if (id === 'water') {
    const bar = document.getElementById('goal-water');
    const btn = document.getElementById('goal-water-btn');
    bar.style.width = '100%';
    bar.textContent = '100%';
    btn.disabled = true;
    btn.textContent = doneText;
  }
}

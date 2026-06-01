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
    const input = el('ai-input');
    const messages = el('messages');
    if (!input || !input.value.trim()) return;
    const text = input.value;
    messages.insertAdjacentHTML('beforeend', `<div class="message user">${escapeHtml(text)}</div>`);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
    setTimeout(() => {
      const t = text.toLowerCase();
      const reply = t.includes('stap') ? 'Je hebt vandaag 8.421 stappen gezet. Nog even doorzetten!'
        : t.includes('water') ? 'Je hebt 1.6 liter water gedronken. Nog 0.9 liter te gaan!'
        : t.includes('slaap') ? 'Je slaapt goed! Zorg dat je voldoende water drinkt.'
        : t.includes('calorie') ? 'Je bent goed op schema met je calorieën!'
        : 'Bedankt voor je bericht!';
      messages.insertAdjacentHTML('beforeend', `<div class="message ai">${escapeHtml(reply)}</div>`);
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

// Small helpers to keep code short and safe
const el = id => document.getElementById(id);
const setText = (id, txt) => { const node = el(id); if (!node) return; if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') node.placeholder = txt; else node.textContent = txt; };
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]);

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
    const name = el('user-name') && el('user-name').value ? el('user-name').value : 'Alex';
    document.title = trans.pageTitle;
    document.documentElement.lang = lang === 'en' ? 'en' : 'nl';

    // map of elementId -> translationKey (placeholder flag optional)
    const map = [
      ['header-greeting','greeting'],['settings-title','settingsTitle'],['label-name','nameLabel'],['label-language','languageLabel'],['label-dark-mode','darkModeLabel'],['label-notif','notifLabel'],['save-settings-btn','saveButton'],['stats-title','statsTitle'],['goals-title','goalsTitle'],['ai-title','aiTitle'],['profile-title','profileTitle'],['profile-info','profileInfo'],['profile-back-btn','profileBack'],['nav-home','navHome'],['nav-stats','navStats'],['nav-goals','navGoals'],['nav-settings','navSettings'],['nav-ai','navAi'],['home-steps-title','homeStepsTitle'],['home-sleep-title','homeSleepTitle'],['home-calories-title','homeCaloriesTitle'],['stats-weekly-steps-label','statsWeeklyStepsLabel'],['stats-average-sleep-label','statsAverageSleepLabel'],['stats-average-calories-label','statsAverageCaloriesLabel'],['goal-steps-label','goalStepsLabel'],['goal-water-label','goalWaterLabel']
    ];

    map.forEach(([id,key]) => {
      const text = (trans[key] || '').replace('{name}', name);
      // ai-input uses placeholder
      if (id === 'ai-input') setText(id, text); else setText(id, text);
    });

    // ai input placeholder and initial ai message
    if (el('ai-input')) el('ai-input').placeholder = trans.aiPlaceholder;
    const aiMsg = document.querySelector('#messages .message.ai');
    if (aiMsg) aiMsg.textContent = trans.aiGreeting.replace('{name}', name);

    // buttons that depend on disabled state
    ['goal-steps-btn','goal-water-btn'].forEach(btnId => {
      const btn = el(btnId); if (!btn) return;
      btn.textContent = btn.disabled ? trans.goalDoneButton : trans.goalMarkButton;
    });

    el('language-nl') && el('language-nl').classList.toggle('active', lang === 'nl');
    el('language-en') && el('language-en').classList.toggle('active', lang === 'en');
  }

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  applyLanguage(lang);
}

function saveSettings() {
    const name = el('user-name') && el('user-name').value ? el('user-name').value : 'Alex';
    const notifs = el('notif-toggle') && el('notif-toggle').checked;
    localStorage.setItem('userName', name);
    localStorage.setItem('notifications', notifs ? '1' : '0');
    const currentLanguage = localStorage.getItem('language') || 'nl';
    alert(translations[currentLanguage].settingsSaved);
}

function loadSettings() {
    const name = localStorage.getItem('userName'); if (name && el('user-name')) el('user-name').value = name;
    const notifs = localStorage.getItem('notifications'); if (notifs !== null && el('notif-toggle')) el('notif-toggle').checked = notifs === '1';
    const theme = localStorage.getItem('theme'); if (theme === 'dark' && el('dark-mode-toggle')) { el('dark-mode-toggle').checked = true; document.documentElement.setAttribute('data-theme', 'dark'); }
    const language = localStorage.getItem('language') || 'nl'; setLanguage(language);
}

// Markeer doel als voltooid
  function completeGoal(id) {
    const currentLanguage = localStorage.getItem('language') || 'nl';
    const doneText = translations[currentLanguage].goalDoneButton;
    const mapping = { steps: ['goal-steps','goal-steps-btn'], water: ['goal-water','goal-water-btn'] };
    const m = mapping[id]; if (!m) return;
    const bar = el(m[0]); const btn = el(m[1]); if (bar) { bar.style.width = '100%'; bar.textContent = '100%'; }
    if (btn) { btn.disabled = true; btn.textContent = doneText; }
  }

const fs = require('fs');

const path = 'c:/Users/saravanan/Documents/New folder/pages/technologies.html';

let content = fs.readFileSync(path, 'utf8');

const replacements = [
  {
    old: '<div class="tech-item-icon">🌐</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">🎨</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02345 19.1649 5.2443 19.25 5.47458 19.25H7C7.41421 19.25 7.75 18.9142 7.75 18.5V17C7.75 15.6193 8.86929 14.5 10.25 14.5H11.5C12.8807 14.5 14 15.6193 14 17V18.5C14 20.433 12.433 22 10.5 22H12Z"></path><circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"></circle><circle cx="11.5" cy="7.5" r="1.5" fill="currentColor"></circle><circle cx="16.5" cy="9.5" r="1.5" fill="currentColor"></circle></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">⚡</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">⚛️</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);"><circle cx="12" cy="12" r="2"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" transform="rotate(60 12 12)"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" transform="rotate(120 12 12)"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">🟢</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-purple);"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">☕</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-purple);"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><path d="M6 1v3"></path><path d="M10 1v3"></path><path d="M14 1v3"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">☁️</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-magenta);"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">☸️</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-magenta);"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v7M12 15v7M2 12h7M15 12h7"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">📐</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);"><path d="M20 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1.707-.707l16 16a1 1 0 0 1 .293.707z"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">🔍</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-purple);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">📈</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-magenta);"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg></div>'
  },
  {
    old: '<div class="tech-item-icon">🦀</div>',
    new: '<div class="tech-item-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-purple);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>'
  }
];

for (const rep of replacements) {
  content = content.split(rep.old).join(rep.new);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully replaced all emojis with premium modern SVG icons inside technologies.html!');

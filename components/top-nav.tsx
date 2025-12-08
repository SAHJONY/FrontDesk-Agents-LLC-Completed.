export default function TopNav() {
  return `
    <div class="flex items-center gap-2">
      <button id="lang-btn" class="px-3 py-2 text-sm rounded-md hover:bg-gray-100">🌐 EN</button>
      <button id="theme-btn" class="p-2 rounded-md hover:bg-gray-100">🌙</button>
    </div>
    <script>
      const langBtn = document.getElementById('lang-btn');
      const themeBtn = document.getElementById('theme-btn');
      langBtn.addEventListener('click', () => {
        langBtn.textContent = langBtn.textContent.includes('EN') ? '🌐 ES' : '🌐 EN';
      });
      themeBtn.addEventListener('click', () => {
        themeBtn.textContent = themeBtn.textContent === '🌙' ? '☀️' : '🌙';
      });
    </script>
  `;
}

# Fix the import in top-nav.tsx
sed -i 's/import LanguageSwitcher from "\.\/LanguageSwitcher";/import { LanguageSwitcher } from "\.\/LanguageSwitcher";/' app/components/top-nav.tsx

# Also check MainNav.tsx if you haven't already
sed -i 's/import LanguageSwitcher from "\.\/LanguageSwitcher";/import { LanguageSwitcher } from "\.\/LanguageSwitcher";/' app/components/MainNav.tsx

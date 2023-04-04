import LocaleSwitcher from './LocaleSwitcher';

export default function Footer() {
  return (
    <footer className="w-full bg-white-100 dark:bg-dark-200 border-y border-white-300 dark:border-dark-300 py-3">
      <LocaleSwitcher />
    </footer>
  );
}

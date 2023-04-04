import LocaleSwitcher from './LocaleSwitcher';

export default function Footer() {
  return (
    <footer className="bg-white-100 dark:bg-dark-200 border-y border-white-300 dark:border-dark-300 py-3 mt-20">
      <LocaleSwitcher />
    </footer>
  );
}

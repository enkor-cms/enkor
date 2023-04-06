export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export function getEnumValues<T extends string>(...values: T[]): readonly T[] {
  return values;
}

export function getFirstItem<T>(value: T | T[]): T {
  if (Array.isArray(value)) {
    return value[0];
  } else {
    return value;
  }
}

export function formatDateString(date: string): string {
  return new Date(date).toLocaleDateString();
}

export const formatDate = (date: Date): string => {
  const now = new Date();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  if (date.getTime() - now.getTime() > 7 * 24 * 60 * 60 * 1000) {
    // if the date is more than 7 days in the future, add the day of the week to the date
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${dayOfWeek}, ${month} ${dayOfMonth}`;
  } else {
    // otherwise, format the date as "day of week : 8:00 AM"
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${dayOfWeek}#${formattedHours}:${formattedMinutes} ${ampm}`;
  }
};

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
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

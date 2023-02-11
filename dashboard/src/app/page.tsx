'use client';

import { Button } from '@/components/common/button/Button';
import { useState } from 'react';

export default function Page() {
  const [loading, setloading] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
      <Button title="Button" size="medium" disabled />
      <Button title="Button" icon="bolt" />
      <Button title="Button" icon="bolt" iconFill isLoader />
      <Button title="Button" style="alert" />
      <Button
        title="Button"
        style="alert"
        isLoader={loading}
        onClick={() => setloading(!loading)}
      />
    </div>
  );
}

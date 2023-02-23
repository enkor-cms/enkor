'use client';

export default function Page({ params }) {
  return (
    <div className="flex flex-col justify-center items-center">
      {params.slug}
    </div>
  );
}

'use client';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      {params.slug}
    </div>
  );
}

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600">About Us</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the About Page.
      </p>
      <Link href="/" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Go Back Home
      </Link>
    </div>
  );
}

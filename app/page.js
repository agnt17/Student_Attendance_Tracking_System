"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/api/auth/login?post_login_redirect_url=/dashboard');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-5 text-center bg-black">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to the Student Attendance Tracking System</h1>
      <p className="text-lg mb-6 text-gray-600">
        Track, manage, and monitor student attendance efficiently with our powerful and easy-to-use platform.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
      >
        Get Started
      </button>
    </div>
  );
}

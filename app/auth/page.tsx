"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Loader2 } from "lucide-react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar");
      provider.addScope("https://www.googleapis.com/auth/calendar.events");
      const result = await signInWithPopup(auth, provider);

      // Store the access token for Google Calendar API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        localStorage.setItem("googleAccessToken", credential.accessToken);
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8 animate-fade-in-up">
          <div>
            <img
              src="/logo.png"
              alt="Coldpen Calendar Logo"
              className="w-10 h-10"
            />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Coldpen Calender
          </span>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm animate-fade-in-up animation-delay-200 hover:shadow-3xl transition-all duration-500">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome to Coldpen Calender
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              Sign in with Google to start creating AI-powered content and sync
              with your calendar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 text-base bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              size="lg"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {loading ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center animate-fade-in-up animation-delay-400">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@coldpen.io"
              className="text-blue-600 hover:underline font-medium transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

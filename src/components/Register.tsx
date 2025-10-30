import React, { useState } from "react";
import { signUpWithEmail, signInWithGoogle } from "../firebase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Props {
  onAuthenticate: (email: string) => void;
  onNavigate: (page: string) => void;
}

export default function Register({ onAuthenticate, onNavigate }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd: string) => {
    const strong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return strong.test(pwd);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    if (password !== confirm) return toast.error("Passwords do not match");
    if (!validatePassword(password))
      return toast.error("Password must include uppercase, lowercase, number & min 8 chars");

    setLoading(true);
    try {
      const user = await signUpWithEmail(email, password);
      if (user) {
        onAuthenticate(user.email ?? "");
        toast.success("Account created successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onAuthenticate(user.email ?? "");
        toast.success("Signed in with Google");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-blue-50 via-white to-cyan-100"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Create your OceanIQ Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Confirm Password</label>
            <Input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full border-gray-300 hover:bg-gray-50 transition"
            >
              Continue with Google
            </Button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline font-medium"
              onClick={() => onNavigate("login")}
            >
              Sign In
            </button>
          </p>
        </form>
      </div>

      <Toaster richColors position="top-center" />
    </motion.div>
  );
}

import React, { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "../firebase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

interface LoginProps {
    onAuthenticate: (email: string) => void;
    onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticate, onNavigate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const resetErrors = () => {
        setEmailError(null);
        setPasswordError(null);
    };

    const validateInputs = (): boolean => {
        resetErrors();
        let ok = true;
        if (!email || !email.includes("@")) {
            setEmailError("Please enter a valid email address.");
            ok = false;
        }
        if (!password || password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            ok = false;
        }
        return ok;
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const user = await signInWithEmail(email, password);
            if (user) {
                toast.success("Welcome back 👋");
                onAuthenticate(user.email ?? "");
            } else {
                toast.error("Invalid credentials.");
            }
        } catch (err: any) {
            console.error("Email sign-in error:", err);
            toast.error(err?.message || "Sign-in failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const user = await signInWithGoogle();
            if (user) {
                toast.success(`Signed in as ${user.email}`);
                onAuthenticate(user.email ?? "");
            } else {
                toast("Redirecting to Google sign-in...");
            }
        } catch (err: any) {
            console.error("Google sign-in error:", err);
            toast.error(err?.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div
                className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
                aria-busy={loading}
            >
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-1">
                    OceanIQ
                </h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Sign in to access marine analytics and insights
                </p>

                <form onSubmit={handleEmailSignIn} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md px-3 py-2"
                            aria-invalid={!!emailError}
                            aria-describedby={emailError ? "email-error" : undefined}
                            required
                        />
                        {emailError && (
                            <p id="email-error" className="mt-1 text-xs text-red-600">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md px-3 py-2"
                            aria-invalid={!!passwordError}
                            aria-describedby={passwordError ? "password-error" : undefined}
                            required
                        />
                        {passwordError && (
                            <p id="password-error" className="mt-1 text-xs text-red-600">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                            aria-disabled={loading}
                        >
                            {loading ? "Signing in…" : "Sign In"}
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onNavigate("register")}
                            className="w-full border border-sky-200 py-2 rounded-md text-sky-700 hover:bg-sky-50"
                        >
                            Create account
                        </Button>

                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            aria-label="Sign in with Google"
                            className="w-full bg-white border border-gray-300 text-gray-800 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-200"
                        >
                            {/* Google "G" logo (multicolor) */}
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                <path d="M17.64 9.2045c0-.638-.057-1.251-.163-1.84H9v3.481h4.844c-.209 1.126-.846 2.081-1.806 2.722v2.264h2.919c1.709-1.574 2.701-3.893 2.701-6.627z" fill="#4285F4"/>
                                <path d="M9 18c2.43 0 4.47-.804 5.96-2.17l-2.92-2.264c-.808.542-1.84.866-3.04.866-2.337 0-4.316-1.578-5.026-3.698H.98v2.327C2.47 15.98 5.48 18 9 18z" fill="#34A853"/>
                                <path d="M3.974 10.734a5.417 5.417 0 010-3.468V4.94H.98a9 9 0 000 8.12l2.994-2.326z" fill="#FBBC04"/>
                                <path d="M9 3.579c1.321 0 2.51.455 3.447 1.347l2.585-2.585C13.462.98 11.423 0 9 0 5.48 0 2.47 2.02.98 4.94l2.994 2.327C4.684 5.157 6.663 3.579 9 3.579z" fill="#EA4335"/>
                            </svg>

                            <span>{loading ? "Connecting…" : "Sign in with Google"}</span>
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Forgot password?{" "}
                        <button
                            type="button"
                            onClick={() => toast("Password reset coming soon!")}
                            className="text-sky-600 hover:underline"
                        >
                            Reset
                        </button>
                    </p>
                </div>
            </div>

            <Toaster position="bottom-center" richColors />
        </div>
    );
};

export default Login;

import React from "react";
import { signOut as firebaseSignOut } from "../firebase";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

interface ProfileProps {
    email?: string;
    onSignedOut?: () => void;
}

const mockStats = {
    reports: 12,
    chats: 34,
    contributions: 7,
};

const mockActivity = [
    { id: 1, text: "Reported water quality near Pier 7", time: "2 days ago" },
    { id: 2, text: "Chatted with OceanAI about species prediction", time: "4 days ago" },
    { id: 3, text: "Uploaded images for species ID", time: "1 week ago" },
];

const Profile: React.FC<ProfileProps> = ({ email, onSignedOut }) => {
    const displayName = email ? email.split("@")[0] : "Guest";

    const handleSignOut = async () => {
        try {
            await firebaseSignOut();
            toast.success("Signed out");
            onSignedOut && onSignedOut();
        } catch (err: any) {
            console.error("Sign out error", err);
            toast.error(err?.message || "Could not sign out");
        }
    };

    return (
        <main
            role="main"
            aria-labelledby="profile-heading"
            className="min-h-screen bg-slate-50 py-12 px-4 sm:py-16 sm:px-6 lg:px-8 flex justify-center"
        >
            <div className="w-full max-w-4xl">
                <section className="bg-white shadow-sm rounded-lg p-6 sm:p-8 mb-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 rounded-full ring-2 ring-slate-100" alt={displayName} />
                        <div>
                            <h1 id="profile-heading" className="text-2xl font-semibold">
                                {displayName}
                            </h1>
                            <p className="text-sm text-gray-600">{email ?? "Not signed in"}</p>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                className="hidden sm:inline-flex"
                                onClick={() => toast("Edit profile coming soon")}
                                aria-label="Edit profile"
                            >
                                Edit
                            </Button>

                            <Button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
                                onClick={handleSignOut}
                                aria-label="Sign out"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-6 flex flex-col items-center text-center">
                        <h3 className="text-sm text-gray-500">Reports</h3>
                        <p className="text-2xl font-bold mt-2">{mockStats.reports}</p>
                    </Card>

                    <Card className="p-6 flex flex-col items-center text-center">
                        <h3 className="text-sm text-gray-500">Chats</h3>
                        <p className="text-2xl font-bold mt-2">{mockStats.chats}</p>
                    </Card>

                    <Card className="p-6 flex flex-col items-center text-center">
                        <h3 className="text-sm text-gray-500">Contributions</h3>
                        <p className="text-2xl font-bold mt-2">{mockStats.contributions}</p>
                    </Card>
                </section>

                <section className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Recent activity</h2>
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-sm px-2 py-1"
                            onClick={() => toast("Filter not implemented")}
                            aria-label="Filter activities"
                        >
                            Filter
                        </Button>
                    </div>

                    <ul className="space-y-3">
                        {mockActivity.length === 0 && (
                            <li className="text-sm text-gray-500">No recent activity</li>
                        )}

                        {mockActivity.map((a) => (
                            <li
                                key={a.id}
                                className="flex items-start justify-between bg-slate-50 rounded-md p-3 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                            >
                                <div>
                                    <p className="text-sm text-slate-800">{a.text}</p>
                                    <time className="text-xs text-gray-400 block mt-1" dateTime={a.time}>
                                        {a.time}
                                    </time>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <Toaster position="bottom-center" richColors />
        </main>
    );
};

export default Profile;

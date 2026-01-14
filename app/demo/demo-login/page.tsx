// app/demo-login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Users, ArrowRight, Sparkles } from "lucide-react";

export default function DemoLoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"owner" | "client" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (role: "owner" | "client") => {
    setSelectedRole(role);
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (role === "owner") {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome Back To FrontDesk Agents
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Secure, owner-grade access to your AI receptionist, analytics and configuration.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Owner/Admin Card */}
          <button
            onClick={() => handleRoleSelection("owner")}
            disabled={isLoading}
            className={`group relative p-8 rounded-2xl border-2 transition-all text-left ${
              selectedRole === "owner"
                ? "border-sky-500 bg-sky-500/10"
                : "border-slate-700 bg-slate-800/50 hover:border-sky-500/50 hover:bg-slate-800/80"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Owner / Admin access
              </h2>
              
              <p className="text-slate-400 mb-6">
                Full platform control, analytics, workforce management, and configuration settings.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Revenue analytics & insights
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  AI agent configuration
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Workforce management
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Billing & subscriptions
                </li>
              </ul>

              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                {isLoading && selectedRole === "owner" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    Loading dashboard...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </div>
          </button>

          {/* Client/Team Card */}
          <button
            onClick={() => handleRoleSelection("client")}
            disabled={isLoading}
            className={`group relative p-8 rounded-2xl border-2 transition-all text-left ${
              selectedRole === "client"
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800/80"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Client / Team dashboard
              </h2>
              
              <p className="text-slate-400 mb-6">
                View your performance metrics, call history, and customer interactions.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Call analytics & history
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Customer interactions
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Performance metrics
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Team collaboration
                </li>
              </ul>

              <div className="flex items-center gap-2 text-purple-400 font-semibold">
                {isLoading && selectedRole === "client" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    Loading dashboard...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Info Notice */}
        <div className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-sky-400">Demo Mode:</span> For production, connect this screen to Supabase auth or your existing login provider. 
            For now, it simply routes you to the correct console.
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProvider } from "@/store/Provider";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { loginSchema } from "@/utils/schemas";


export default function Login() {
  const { isLoggedIn, setIsLoggedIn, setUser } = useProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [isLoggedIn, router])

  async function handleLogin(e) {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    toast.loading("Logging in...");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.dismiss();

      if (result?.error) {
        setGeneralError(result.code || "Login failed");

        const status = result.status;
        if (status === 401) {
          toast.error("Invalid credentials.");
        } else {
          toast.error(result.code || "Login failed");
        }
        return;
      }


      if (result?.ok) {
        toast.success("Login Successful!");
        router.push('/');
        router.refresh();
      } else {
        toast.error("Something went wrong.");
      }

    } catch (err) {
      toast.dismiss();
      console.error('login error', err);
      setGeneralError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm rounded-lg p-8 text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
        <p className="text-sm text-gray-300 mb-6">Log in to continue to Moviezland.</p>

        {generalError && <div className="mb-4 text-sm text-red-500 bg-red-500/10 p-3 rounded border border-red-500/20">{generalError}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 rounded bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 rounded bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </label>

          <button type="submit" className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transform">Log in</button>
        </form>

        <div className="mt-6 text-center text-gray-300 text-sm">
          Don't have an account? <Link href="/signup" className="text-indigo-400 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

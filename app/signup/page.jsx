"use client"
import { useProvider } from "@/store/Provider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const {setUser, isLoggedIn, setIsLoggedIn, user} = useProvider();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(()=> {
    if (isLoggedIn) router.push('/');
  },[isLoggedIn])                                                   
  function handleSignup(e){
    e.preventDefault();
    if(!name || !email || !password){
      setError("All fields are required.");
      return;
    }
    if(password.length < 6){
      setError("Password must be at least 6 characters.");
      return;
    }

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    }).then(async res => {
      const data = await res.json();
      if(!res.ok){
        setError(data?.error || 'Signup failed');
        return;
      }
      console.log(data);
     
       setUser(
        {
          name:  data.name,
          email: data.email,
          favorites : data.favorites,
          id:  data.id,
        }
        )
        setIsLoggedIn(true);
      
      router.push('/');
    }).catch(err => {
      console.error('signup error', err);
      setError('Network error');
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm rounded-lg p-8 text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
        <p className="text-sm text-gray-300 mb-6">Sign up to save favorites and get personalized recommendations.</p>

        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Name</span>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>

          <button type="submit" className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition">Create account</button>
        </form>

        <div className="mt-6 text-center text-gray-300 text-sm">
          Already have an account? <Link href="/login" className="text-indigo-400 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}

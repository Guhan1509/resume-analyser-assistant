

import { UserButton, SignInButton, Show } from "@clerk/nextjs";


export default function Home() {





  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Resume Analyser
        </h1>
        <div className="flex items-center space-x-4">
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/" />
          </Show>
        </div>
      </header>

      <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-center p-8 text-center mt-12 sm:mt-24">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome to your Dashboard.
          </h2>
          <p className="max-w-xl text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            You are successfully authenticated. You can now use the power of AI to analyze your resume and ace your upcoming interviews.
          </p>
          
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 shadow-md">
              Upload Resume
            </button>
            <button className="px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-200 shadow-sm">
              View Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const {data:session, isPending} = useSession();
console.log(session?.user)

  const formSubmit = async (e) => {
    e.preventDefault();

    //  1. form data গুলা collect করলাম।  চাইলে user কে console.log করে দেকতে পারি
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    

    //Form field validation
    if (!user.name | !user.email | !user.password || !user.role) {
      toast.error("Please fill in all fields");
      return;
    }

    //Name validation

    if (user.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      role:user.role,
    });

    if (error) {
      toast.error("Account is not create");
      return;
    }

    toast.success("Account created successfully!");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-20 text-white">
      <Card className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#171719] px-6 py-7 shadow-none">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Fill in the fields below to get started
          </p>
        </div>

        <div className="my-7 h-px bg-white/10" />

        <form onSubmit={formSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/10 focus:bg-white/5"
          />

          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/10 focus:bg-white/5"
          />

          <input
            name="password"
            type="password"
            placeholder="Choose a password"
            className="h-12 w-full rounded-xl border border-transparent bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/10 focus:bg-white/5"
          />

      <div className="space-y-3">
        <p  className="text-sm font-medium text-white/70" >Select Your Role</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
            <input type="radio" name="role" value='seeker' defaultChecked  className="accent-[#2F96EE]"/>
            Seeker
          </label>

           <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
            <input type="radio" name="role" value='recruiter'   className="accent-[#2F96EE]"/>
            Recruiter
          </label>

        </div>
      </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#2F96EE] text-sm font-semibold text-white hover:bg-[#2388df]"
          >
            Sign Up for Free
          </Button>
        </form>

        <div className="my-6 h-px bg-white/10" />

        <p className="text-center text-sm text-white/45">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-[#5CB8FF] underline"
          >
            Sign in instead
          </Link>
        </p>
      </Card>
    </main>
  );
}

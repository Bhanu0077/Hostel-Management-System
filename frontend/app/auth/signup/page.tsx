import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center p-4 md:p-6">
      <div className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0px_8px_24px_rgba(15,23,42,0.05)] lg:grid-cols-12">
        <section className="hidden bg-slate-50 p-10 lg:col-span-5 lg:block">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Start with a workspace your operations team can trust.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Set up your institution profile and manage student housing and collections in one dashboard.
          </p>
        </section>
        <section className="space-y-5 p-8 lg:col-span-7">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Create account</h2>
          <Input placeholder="Full name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone (+91)" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Create Account</Button>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600">
              Log In
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

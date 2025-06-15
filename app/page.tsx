import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Clock,
  Users,
  BarChart3,
  ArrowRight,
  Mail,
  Globe,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  TicketCheck,
  Check,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div>
              <Image
                src="/logo.png"
                alt="Coldpen Calendar Logo"
                width={50}
                height={50}
                className="rounded"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Coldpen Calendar
            </span>
          </div>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Supercharge Your Twitter Growth with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                Coldpen Calendar
              </span>
            </h1>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Effortlessly turn your ideas into engaging tweets, schedule them
              with AI, and track your growth. The all-in-one calendar for
              creators, founders, and indie hackers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link href="/auth">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                Start Creating Content
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
            <span className="text-3xl font-bold text-gray-900">+2,000</span>
            <span className="text-gray-500">Active Users</span>
          </div>
          <div className="flex flex-col items-center">
            <HeartHandshake className="h-10 w-10 text-pink-500 mb-2" />
            <span className="text-3xl font-bold text-gray-900">98%</span>
            <span className="text-gray-500">User Satisfaction</span>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="h-10 w-10 text-green-500 mb-2" />
            <span className="text-3xl font-bold text-gray-900">10x</span>
            <span className="text-gray-500">Faster Growth</span>
          </div>
        </div>
      </section>

      {/* Coldpen Promotion Section */}
      <section className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              We are <span className="text-cyan-400">Coldpen</span>
            </h2>
            <p className="text-xl mb-6 opacity-90 max-w-xl">
              <span className="font-bold text-cyan-300">coldpen.io</span> is the
              no-BS, affordable, and easy-to-use cold mailing platform built for
              founders, indie hackers, and small teams. Send cold emails that
              land, manage campaigns with zero fluff, and grow your business
              without breaking the bank.
            </p>
            <a
              href="https://coldpen.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                Try coldpen for Free
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          <div className="flex-1 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-yellow-400" />
              <span className="text-lg">30-day money back</span>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <span className="text-lg">Affordable for all teams</span>
            </div>
            <div className="flex items-center gap-4">
              <Check className="h-8 w-8 text-green-400" />
              <span className="text-lg">
                Sequences, A/B testing, Universal Inbox
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-pink-400" />
              <span className="text-lg">Loved by founders & indie hackers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need for Twitter success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From AI-generated content to seamless scheduling and analytics,
            Coldpen Calendar is your growth partner.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "AI Content Generation",
              description:
                "Share your highlights and let AI craft tweets tailored to your voice and audience.",
              gradient: "from-blue-500 to-cyan-500",
              delay: "animation-delay-100",
            },
            {
              icon: Clock,
              title: "Smart Scheduling",
              description:
                "Schedule tweets at optimal times and manage your content calendar with intelligent suggestions.",
              gradient: "from-purple-500 to-pink-500",
              delay: "animation-delay-200",
            },
            {
              icon: Users,
              title: "Audience Insights",
              description:
                "Understand your audience with analytics and tailor your content for maximum engagement.",
              gradient: "from-orange-500 to-red-500",
              delay: "animation-delay-300",
            },
            {
              icon: BarChart3,
              title: "Performance Tracking",
              description:
                "Track tweet performance and optimize your strategy with detailed analytics.",
              gradient: "from-red-500 to-pink-500",
              delay: "animation-delay-400",
            },
            {
              icon: Sparkles,
              title: "Content Curation",
              description:
                "Organize your best ideas with AI-powered suggestions and editing tools.",
              gradient: "from-indigo-500 to-purple-500",
              delay: "animation-delay-500",
            },
            {
              icon: Globe,
              title: "Google Calendar Sync",
              description:
                "Integrate with Google Calendar for reminders and never miss a posting opportunity.",
              gradient: "from-green-500 to-emerald-500",
              delay: "animation-delay-600",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm animate-fade-in-up ${feature.delay} group`}
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How Coldpen Calendar Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes. No learning curve, just results.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Globe,
              title: "Connect",
              desc: "Link your Google Calendar account directly.",
            },
            {
              icon: Sparkles,
              title: "Create",
              desc: "Describe your idea or highlight, let AI generate tweet drafts.",
            },
            {
              icon: Clock,
              title: "Schedule",
              desc: "Pick optimal times or let AI suggest the best slots.",
            },
            {
              icon: BarChart3,
              title: "Grow",
              desc: "Track performance and refine your strategy with insights.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center animate-fade-in-up"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <div className="font-semibold text-lg mb-1">{step.title}</div>
              <div className="text-gray-500">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-800 to-cyan-600 text-white py-20 animate-gradient-x">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to transform your Twitter presence?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Join thousands of creators using AI to grow their social media
              presence.
            </p>
            <Link href="/auth">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creators and founders love how Coldpen Calendar transforms their
            Twitter workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Alex Kim",
              role: "Indie Hacker",
              quote:
                "Coldpen Calendar helped me grow my audience 3x in just two months. The AI tweet generator is a game changer!",
              avatar: "/user.png",
            },
            {
              name: "Priya Shah",
              role: "Startup Founder",
              quote:
                "Scheduling and analytics are so easy. I finally have a content system that works for my busy days.",
              avatar: "/user.png",
            },
            {
              name: "Jordan Lee",
              role: "Content Creator",
              quote:
                "I love the seamless Google Calendar sync. Never miss a tweet, and my engagement is up 200%.",
              avatar: "/user.png",
            },
          ].map((t, i) => (
            <Card
              key={i}
              className="shadow-lg bg-white/80 backdrop-blur-sm p-8 flex flex-col items-center text-center animate-fade-in-up"
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={64}
                height={64}
                className="rounded-full mb-4 border-4 border-blue-100"
              />
              <p className="text-gray-700 italic mb-4">&quot;{t.quote}&quot;</p>
              <div className="font-bold text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </Card>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-6">
            <Image
              src="/logo.png"
              alt="Coldpen Calendar Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">Coldpen Calendar</span>
            <span className="text-gray-400">by</span>
            <a
              href="https://coldpen.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-400 hover:underline"
            >
              coldpen.io
            </a>
          </div>
          {/* <div className="flex items-center space-x-6 mb-4">
            <a
              href="https://twitter.com/coldpenio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M19.633 3.997a8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 19.104 2.3a8.224 8.224 0 0 1-2.605.996A4.107 4.107 0 0 0 9.85 6.03a11.654 11.654 0 0 1-8.457-4.287a4.106 4.106 0 0 0 1.27 5.482A4.073 4.073 0 0 1 .8 6.575v.052a4.108 4.108 0 0 0 3.292 4.025a4.093 4.093 0 0 1-1.852.07a4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 .98 17.54a11.616 11.616 0 0 0 6.29 1.844c7.547 0 11.675-6.155 11.675-11.49c0-.175-.004-.349-.012-.522A8.18 8.18 0 0 0 20 4.59a8.19 8.19 0 0 1-2.367.646z" />
              </svg>
              <span>@coldpenio</span>
            </a>
            <a
              href="https://linkedin.com/company/coldpen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M16.5 3A2.5 2.5 0 0 1 19 5.5v9A2.5 2.5 0 0 1 16.5 17h-13A2.5 2.5 0 0 1 1 14.5v-9A2.5 2.5 0 0 1 3.5 3h13zm-8.25 4.25h-2.5v7.5h2.5v-7.5zm-1.25-1.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5zm9 9h-2.5v-3.75c0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75v3.75h-2.5v-7.5h2.5v1.09c.41-.65 1.13-1.09 1.95-1.09c1.38 0 2.5 1.12 2.5 2.5v5z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div> */}
          <div className="text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Coldpen Calendar. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

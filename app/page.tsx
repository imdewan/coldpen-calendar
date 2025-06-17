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
  Github,
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
          <div className="flex gap-3">
            <Link
              href="https://github.com/imdewan/coldpen-calendar"
              target="_blank"
            >
              <Button
                variant="outline"
                className="border-gray-300 hover:border-gray-500 flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center ">
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
              with AI, and track your growth. 100% open source, free, and built
              for creators, founders, and indie hackers.
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
            <Link
              href="https://github.com/imdewan/coldpen-calendar"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-700 hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-gray-500 text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded-full font-semibold">
              Open Source & Free Forever
            </span>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              100% Open Source & Free
            </h2>
            <p className="text-xl mb-6 opacity-90 max-w-xl">
              Coldpen Calendar is built by the community, for the community. No
              paywalls, no hidden fees, no limits. Contribute, fork, or
              self-host — your workflow, your rules.
            </p>
            <a
              href="https://github.com/imdewan/coldpen-calendar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-gray-800 to-blue-600 hover:from-gray-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                Star on GitHub
              </Button>
            </a>
          </div>
          <div className="flex-1 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-yellow-400" />
              <span className="text-lg">MIT Licensed</span>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <span className="text-lg">Community Driven</span>
            </div>
            <div className="flex items-center gap-4">
              <Check className="h-8 w-8 text-green-400" />
              <span className="text-lg">Free Forever, No Credit Card</span>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-pink-400" />
              <span className="text-lg">Contributions Welcome</span>
            </div>
          </div>
        </div>
      </section>
      {/* Coldpen Promotion Section */}
      <section className="relative z-10 bg-gradient-to-br from-cyan-50 via-blue-100 to-indigo-50 text-gray-900 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          {/* Left: Illustration */}
          <div className="flex-1 flex justify-center items-center mb-10 md:mb-0 min-h-[320px]">
            <div className="relative w-full max-w-[480px] aspect-[16/10]">
              <Image
                src="https://coldpen.io/dashboard.png"
                alt="Coldpen Illustration"
                fill
                className="object-contain rounded-3xl shadow-2xl border-4 border-cyan-200"
                priority
                style={{ maxHeight: "100%" }}
              />
            </div>
          </div>
          {/* Right: Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Discover{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                coldpen.io
              </span>
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-gray-700">
              <span className="font-bold text-blue-700">coldpen.io</span> is the
              no-nonsense, affordable cold email platform for founders and indie
              hackers. Launch campaigns, track results, and grow your
              business—no bloat, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
              <a
                href="https://coldpen.io/features"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-cyan-400 hover:border-blue-600 hover:bg-cyan-50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-yellow-400" />
                <span className="text-base font-medium">
                  30-day money back guarantee
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-7 w-7 text-blue-500" />
                <span className="text-base font-medium">
                  Affordable for all teams
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-7 w-7 text-green-500" />
                <span className="text-base font-medium">
                  Sequences, A/B testing, Universal Inbox
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-7 w-7 text-pink-400" />
                <span className="text-base font-medium">
                  Loved by founders & indie hackers
                </span>
              </div>
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
              presence. 100% open source and free forever.
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
            <a
              href="https://github.com/imdewan/coldpen-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 flex items-center gap-1 hover:text-cyan-400"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Coldpen Calendar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

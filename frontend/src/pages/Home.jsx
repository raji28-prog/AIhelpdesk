import { Bot, ChevronRight, Zap, Shield, HelpCircle, BarChart3, Users, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide animate-pulse">
          <Zap className="h-3 w-3" />
          Introducing Phase 1 Foundation
        </div>

        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-200 via-slate-100 to-purple-200 bg-clip-text text-transparent">
            AI Smart Helpdesk Assistant
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-3xl sm:text-4xl md:text-5xl font-bold mt-2 inline-block">
            Automated Customer Support
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Experience support workflow automation built for speed and intelligence. Leveraging Fastify backend, Mongoose database pools, and dynamic React components.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 flex items-center gap-2 group cursor-pointer">
            Explore Documentation
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/80 text-slate-200 font-medium transition-all duration-200 cursor-pointer">
            Contact Support
          </button>
        </div>
      </section>

      {/* System Architecture Modules Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
            System Modules & Roadmap
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            These features represent upcoming phases in the multi-phase implementation roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Auth */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-xl w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">JWT Authentication</h3>
              <p className="text-sm text-slate-400">
                Secure authentication layer using JSON Web Tokens. Supports User, Support Agent, and Administrator permission levels.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-medium mt-6 flex items-center gap-1">
              Phase 2 Scope
            </div>
          </div>

          {/* Card 2: AI Chatbot */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl w-fit">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">AI Chatbot & FAQ RAG</h3>
              <p className="text-sm text-slate-400">
                Contextual chatbot interface fetching relevant answers from stored FAQs using vector embeddings or keyword mapping.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-medium mt-6 flex items-center gap-1">
              Phase 4 Scope
            </div>
          </div>

          {/* Card 3: Ticket routing */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-purple-500/10 text-purple-400 p-3 rounded-xl w-fit">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Classification & Routing</h3>
              <p className="text-sm text-slate-400">
                Automated classification of user tickets into categories and routing them to specialized agents using LLM intelligence.
              </p>
            </div>
            <div className="text-xs text-purple-400 font-medium mt-6 flex items-center gap-1">
              Phase 6 Scope
            </div>
          </div>

          {/* Card 4: Analytics */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-pink-500/10 text-pink-400 p-3 rounded-xl w-fit">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Admin & Analytics</h3>
              <p className="text-sm text-slate-400">
                Comprehensive analytics metrics plotting daily ticket count, average resolution time, and agent productivity graphs.
              </p>
            </div>
            <div className="text-xs text-pink-400 font-medium mt-6 flex items-center gap-1">
              Phase 8 Scope
            </div>
          </div>

          {/* Card 5: Knowledgebase */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-amber-500/10 text-amber-400 p-3 rounded-xl w-fit">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">FAQ Management</h3>
              <p className="text-sm text-slate-400">
                Interactive CRUD control system for administrators to curate, review, and modify support guidelines and documents.
              </p>
            </div>
            <div className="text-xs text-amber-400 font-medium mt-6 flex items-center gap-1">
              Phase 4 Scope
            </div>
          </div>

          {/* Card 6: Ticket flow */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-xl w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Ticket Lifecycle</h3>
              <p className="text-sm text-slate-400">
                Comprehensive state tracking of open, assigned, resolved, and closed requests, with automated customer feedback loops.
              </p>
            </div>
            <div className="text-xs text-cyan-400 font-medium mt-6 flex items-center gap-1">
              Phase 5 Scope
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

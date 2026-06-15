import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart2, Crosshair, PhoneCall, Bot, LayoutTemplate, 
  Map as MapIcon, Users, Bell, Zap, ChevronRight, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, TrendingUp, User, Lock, X,
  Sparkles, ClipboardCheck, Swords
} from 'lucide-react';

const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const CYCLING_WORDS = ['SEO Automation', 'Call Analysis', 'Competitor Intel', 'Lead Scoring', 'Content AI'];
const CyclingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % CYCLING_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500"
      >
        {CYCLING_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
};

const HEADLINE_PAIRS = [
  { line1: 'Stop Manual Work.',    line2: 'Start Smart Growth.' },
  { line1: 'Stop Wasted Hours.',   line2: 'Start Scaling Faster.' },
  { line1: 'Stop Missing Leads.',  line2: 'Start Converting More.' },
  { line1: 'Stop Slow Reports.',   line2: 'Start AI Automation.' },
];

const CyclingHeadline = () => {
  const [hIdx, setHIdx] = useState(0);
  useEffect(() => {
    // Initial word-in animation runs once, then start cycling after 3.5s
    const t = setTimeout(() => {
      const interval = setInterval(() => setHIdx(i => (i + 1) % HEADLINE_PAIRS.length), 3500);
      return () => clearInterval(interval);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const { line1, line2 } = HEADLINE_PAIRS[hIdx];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={hIdx}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mb-6"
      >
        {/* Line 1 — dark */}
        <div className="text-5xl md:text-[4.5rem] font-extrabold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
          {line1.split(' ').map((word, i) => (
            <motion.span
              key={`${hIdx}-l1-${i}`}
              initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </div>
        {/* Line 2 — gradient */}
        <div className="text-5xl md:text-[4.5rem] font-extrabold leading-[1.08] tracking-tight mt-1">
          {line2.split(' ').map((word, i) => (
            <motion.span
              key={`${hIdx}-l2-${i}`}
              initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const FeatureCard = ({ icon: Icon, title, badgeText, description, themeColor, delay }) => {
  let iconBg = "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400";
  let borderHover = "hover:border-orange-500/30";
  
  if (themeColor === "blue") {
    iconBg = "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400";
    borderHover = "hover:border-blue-500/30";
  } else if (themeColor === "indigo") {
    iconBg = "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400";
    borderHover = "hover:border-indigo-500/30";
  } else if (themeColor === "purple") {
    iconBg = "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400";
    borderHover = "hover:border-purple-500/30";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white dark:bg-slate-800 p-6 xl:p-8 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 ${borderHover} transition-all flex flex-col items-start h-full`}
    >
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">{badgeText}</span>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-1">{description}</p>
    </motion.div>
  );
};

const StepCard = ({ number, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative pl-12 md:pl-0"
  >
    <div className="md:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold">
      {number}
    </div>
    <div className="hidden md:flex w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 items-center justify-center font-bold mb-6 mx-auto text-xl">
      {number}
    </div>
    <div className="md:text-center">
      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  </motion.div>
);

export default function Landing() {
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeDemoTab, setActiveDemoTab] = useState('optimizer');

  useEffect(() => {
    const tabs = ['optimizer', 'audit', 'competitor', 'lsa'];
    const interval = setInterval(() => {
      setActiveDemoTab(prev => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Basic dark mode toggle logic based on a class or system pref, hardcoded to light for now but structured to support dark.
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       // setIsDark(true); // Default to light right now per previous preference, uncomment to enable auto-dark
    }
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleSignIn = () => {
    setShowLoginModal(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/dashboard.html';
  };

  const handleSignOut = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'} font-sans overflow-x-hidden transition-colors duration-300`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-24 md:h-28 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.img 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/logo.svg" 
              alt="Explore Media" 
              className="h-20 md:h-24 dark:invert"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">How it Works</a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Benefits</a>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button onClick={() => window.location.href='/dashboard.html'} className="text-sm font-medium text-slate-900 dark:text-white hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0">
                  Go to Dashboard
                </button>
                <button onClick={handleSignOut} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border-0">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={handleSignIn} className="text-sm font-medium text-slate-900 dark:text-white hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0">
                  Sign In
                </button>
                <button onClick={handleSignIn} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border-0">
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-orange-400/20 to-rose-400/20 blur-3xl opacity-50"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-bl from-blue-400/20 to-emerald-400/20 blur-3xl opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-2xl">
            {/* Glowing badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-400/30 text-orange-600 dark:text-orange-400 text-sm font-bold mb-8 backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"
              />
              <span className="pl-3">AI Automation Platform</span>
              <Zap size={14} className="text-orange-500" />
            </motion.div>

            {/* Headline — cycling word-by-word stagger */}
            <CyclingHeadline />

            {/* Cycling subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6 h-10 flex items-center gap-2"
            >
              <span className="text-slate-400 dark:text-slate-500 font-normal">Powered by</span>
              <CyclingWord />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-xl"
            >
              Automate your SEO, content, call tracking, reporting, and team workflows — all in one intelligent platform.
            </motion.p>

            {/* Animated stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { value: 20, suffix: '+', label: 'Hours saved / week' },
                { value: 98, suffix: '%', label: 'Audit Accuracy' },
                { value: 4, suffix: 'x', label: 'Faster reporting' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100 dark:shadow-none"
                >
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium tracking-wide">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Invite-only note */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-start gap-3 max-w-lg bg-gradient-to-r from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20 border border-orange-200/60 dark:border-orange-800/30 rounded-2xl px-5 py-4"
            >
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">Invite-Only Access</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Explore Media is currently operating on an invite-only model. Contact us for custom integrations or platform inquiries.
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[620px] flex items-center w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-rose-500/10 to-transparent blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/15 via-emerald-500/10 to-transparent blur-3xl rounded-full" />
            
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative z-10">
              <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-mono text-slate-400">exploremedia-hvac-audit-v1.0</div>
                <div className="w-12"></div>
              </div>

              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 p-2 gap-1 overflow-x-auto">
                {[
                  { id: 'optimizer', label: 'Optimizer', icon: Sparkles },
                  { id: 'audit', label: 'Audit Crawler', icon: ClipboardCheck },
                  { id: 'competitor', label: 'Competitor SEO', icon: Swords },
                  { id: 'lsa', label: 'LSA Analyzer', icon: PhoneCall }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeDemoTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDemoTab(tab.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border-0 cursor-pointer ${
                        isActive 
                          ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 h-[400px] overflow-hidden flex flex-col justify-between relative bg-white dark:bg-slate-900">
                <AnimatePresence mode="wait">
                  {activeDemoTab === 'optimizer' && (
                    <motion.div
                      key="optimizer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex-1 flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">Active City: Montgomery, AL</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">AC Repair Service Page Optimizer</h4>
                      </div>
                      
                      <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="border border-red-200 dark:border-red-950 bg-red-50/50 dark:bg-red-950/10 p-3 rounded-xl">
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Current copy:</span>
                          <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-1">
                            "We offer professional AC repair in Montgomery, Alabama. Our technicians are certified. Call us for service."
                          </p>
                        </div>
                        
                        <div className="border border-emerald-200 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/10 p-3 rounded-xl">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Gemini suggested rewrite:</span>
                          <p className="text-xs font-semibold text-slate-805 dark:text-slate-200 mt-1">
                            "Need emergency AC repair in Montgomery, AL? Our NATE-certified technicians provide 24/7 same-day HVAC repair, servicing all air conditioning models with upfront pricing and lifetime workmanship guarantees."
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-400">
                        <span>SEO Score Improvement</span>
                        <span className="font-bold text-emerald-500 text-sm">45% → 89%</span>
                      </div>
                    </motion.div>
                  )}

                  {activeDemoTab === 'audit' && (
                    <motion.div
                      key="audit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex-1 flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded">Target: precisionhvac.com</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Automated Website Crawler</h4>
                      </div>

                      <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                        {[
                          { text: 'Crawl website structure & site hierarchy', done: true },
                          { text: 'Lighthouse Page Speed diagnostics (Score: 94)', done: true },
                          { text: 'Broken redirect and 404 links scan', done: true },
                          { text: 'Triggering HighLevel webhook sync...', done: false }
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50 shadow-sm">
                            <div className="flex-shrink-0">
                              {step.done ? (
                                <CheckCircle2 size={16} className="text-emerald-500" />
                              ) : (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                  className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent"
                                />
                              )}
                            </div>
                            <span className={`text-xs ${step.done ? 'text-slate-600 dark:text-slate-300' : 'text-blue-500 font-semibold'}`}>
                              {step.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-400">
                        <span>Lighthouse Score</span>
                        <span className="font-bold text-emerald-500 text-sm">94/100</span>
                      </div>
                    </motion.div>
                  )}

                  {activeDemoTab === 'competitor' && (
                    <motion.div
                      key="competitor"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex-1 flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded">Competitor SEO Gap Analysis</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Organic Local Search Competitors</h4>
                      </div>

                      <div className="space-y-2 flex-1 flex flex-col justify-center">
                        {[
                          { domain: 'comfortmastershvac.com', traffic: '42.5k/mo', gap: 'High', color: 'bg-red-500' },
                          { domain: 'guardianairsolutions.com', traffic: '18.2k/mo', gap: 'Medium', color: 'bg-amber-500' },
                          { domain: 'southerncomforthvac.com', traffic: '29.1k/mo', gap: 'Critical', color: 'bg-red-500' }
                        ].map((comp, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50">
                            <div>
                              <div className="text-xs font-semibold text-slate-800 dark:text-slate-205">{comp.domain}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">Est. Traffic: {comp.traffic}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              Gap: {comp.gap}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-400">
                        <span>Keywords Audited</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">2,480</span>
                      </div>
                    </motion.div>
                  )}

                  {activeDemoTab === 'lsa' && (
                    <motion.div
                      key="lsa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex-1 flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest bg-purple-50 dark:bg-purple-950/20 px-2 py-0.5 rounded">Active Call Lead Verification</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">LSA / SEM Lead Analyzer</h4>
                      </div>

                      <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                            <span>Caller: (334) 555-0144</span>
                            <span className="text-purple-650 dark:text-purple-400">Google LSA</span>
                          </div>
                          <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            "Hi, I'm calling from SEO Grow. I wanted to speak to the owner about getting more leads for your AC repair business..."
                          </p>
                        </div>

                        <div className="bg-purple-50/50 dark:bg-purple-950/10 border border-purple-200 dark:border-purple-900 p-2.5 rounded-xl text-xs flex justify-between items-center">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Analysis result</span>
                            <span className="font-bold text-slate-808 dark:text-slate-200">Dispute Recommended</span>
                          </div>
                          <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">
                            Confidence: 98%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-400">
                        <span>Lead Cost Status</span>
                        <span className="font-bold text-red-500 text-sm">Charged ($45)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Core Platform Capabilities</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Continuous AI diagnostics and local keyword audits built specifically for local service businesses.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              icon={Sparkles}
              title="Service Page Optimizer"
              badgeText="Audit & Onboarding"
              description="Identify search content gaps instantly. Generates dynamic SEO briefs, local business schema markups, and NATE-certified copy suggestions using style-preserving Gemini AI rewrites."
              themeColor="orange"
              delay={0.1}
            />
            <FeatureCard 
              icon={ClipboardCheck}
              title="HVAC Website Audit"
              badgeText="Audit & Onboarding"
              description="Deploy lightning-fast diagnostics. Auto-crawls site hierarchy, compiles Lighthouse speed metrics, inspects layout responsiveness, checks broken redirect routes, and feeds CRM/HighLevel webhooks."
              themeColor="blue"
              delay={0.2}
            />
            <FeatureCard 
              icon={Swords}
              title="Competitor SEO Audit"
              badgeText="Competitor Analysis"
              description="Map out local competitors' search rankings. Analyze organic keywords, monitor search share changes, track domain authorities, and extract high-value local search queries."
              themeColor="indigo"
              delay={0.3}
            />
            <FeatureCard 
              icon={PhoneCall}
              title="LSA/SEM Call Analyzer"
              badgeText="Lead & Call Analysis"
              description="Stop wasting money on invalid leads. Fetches Google LSA phone leads, transcribes calls with speaker separation, automatically flags solicitors/spam using LLM context analysis, and syncs tasks to ClickUp."
              themeColor="purple"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">How It Works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Four simple steps to total operational clarity.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="grid md:grid-cols-4 gap-12 md:gap-6 relative">
              <StepCard number="1" title="Profile & Crawl" description="Perform comprehensive website structure crawls and audit competitor search metrics." delay={0.1} />
              <StepCard number="2" title="Track LSA Leads" description="Auto-retrieve lead details and raw call audio directly from Google Local Service Ads." delay={0.3} />
              <StepCard number="3" title="AI Content Generation" description="Let Gemini write style-preserved copy suggestions and qualify disputable spam calls." delay={0.5} />
              <StepCard number="4" title="Sync to ClickUp / CRM" description="Push tasks, link recommendations, schema templates, and dispute cases directly to ClickUp." delay={0.7} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Why Choose Us?</h2>
              <ul className="space-y-6">
                {[
                  { icon: Clock, text: "Save time: Recover 10–20+ hours per week per manager." },
                  { icon: ShieldCheck, text: "Reduce human errors: Perfect, continuous QA." },
                  { icon: Zap, text: "Faster decision making with actionable alerts." },
                  { icon: TrendingUp, text: "Improve lead quality & ROI dramatically." },
                  { icon: CheckCircle2, text: "All-in-one centralized automation system." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-center gap-4 text-xl text-slate-300"
                  >
                    <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
                      <item.icon size={24} />
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
               <h3 className="text-3xl font-bold mb-4">Start Automating Today</h3>
               <p className="text-slate-400 text-lg mb-8">Stop wasting time on repetitive work. Let the AI handle the data collection and formatting for you.</p>
               <div className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-md text-left mt-6">
                 <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                   <Zap className="text-orange-500" size={18} /> Enterprise Integrations & Support
                 </h4>
                 <p className="text-sm text-slate-300 leading-relaxed mb-4">
                   Unlock custom automated reporting, multi-channel API sync, and tailored SEO pipelines.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="flex-1">
             <img src="/logo.svg" alt="Explore Media" className="h-24 md:h-32 dark:invert opacity-80 mb-6" />
             <p className="text-slate-500 max-w-sm">
               Driving real, measurable results through automated intelligence. Stop manual work and start smart growth.
             </p>
          </div>
          <div className="flex gap-16 flex-wrap">
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Service Page Optimizer</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">HVAC Website Audit</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Competitor SEO Audit</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">LSA/SEM Call Analyzer</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Connect</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">GitHub</a></li>
                </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col items-center sm:flex-row justify-between gap-4">
          <div className="text-slate-500 text-sm text-center w-full">
            &copy; 2026 Explore Media. All Rights Reserved. | Privacy Policy | Internal Use Only | Montgomery, Alabama (River Region) | www.exploremedia.com
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 max-w-md w-full relative z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#142f45] dark:text-white">
                    Sign In
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Enter details to access your dashboard
                  </p>
                </div>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 transition-colors border-0 cursor-pointer flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="e.g. admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-[#142f45] dark:focus:border-white transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-[#142f45] dark:focus:border-white transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#142f45] dark:bg-white text-white dark:text-[#142f45] py-3.5 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer border-0 mt-2 shadow-lg shadow-slate-900/10 dark:shadow-white/5"
                >
                  Continue
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TrendUpIcon = (props) => <TrendingUp {...props} />;

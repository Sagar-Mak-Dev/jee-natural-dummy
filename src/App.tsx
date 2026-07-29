import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Menu, X, MapPin, Phone, Star, Quote } from 'lucide-react';

// --- Components ---  //

const Loader = () => {
  const fruits = ['🍇', '🥝', '🥥', '🍊', '🍋', '🍉'];
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0d241b] via-[#1B4332] to-[#081711] flex flex-col items-center justify-center overflow-hidden text-white select-none px-5"
    >
      {/* Ambient glowing backdrop */}
      <div className="absolute w-80 h-80 bg-[#52B788]/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F7C948]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Animated Bouncing Fruit Shots */}
      <div className="relative z-10 flex items-center justify-center gap-3 md:gap-5 text-4xl md:text-6xl mb-10">
        {fruits.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, y: 30, opacity: 0 }}
            animate={{ 
              scale: [0, 1.35, 1], 
              y: [30, -25, 0], 
              opacity: 1,
              rotate: [0, i % 2 === 0 ? 15 : -15, 0]
            }}
            transition={{ 
              duration: 0.65, 
              delay: i * 0.12,
              ease: "backOut"
            }}
            className="relative drop-shadow-[0_12px_15px_rgba(0,0,0,0.5)]"
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 + 0.8, ease: "easeInOut" }}
              className="inline-block"
            >
              {emoji}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Brand Identity Reveal */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-[#52B788] text-lg animate-spin" style={{ animationDuration: '8s' }}>🌿</span>
          <span className="text-xs md:text-sm tracking-[0.35em] font-extrabold uppercase text-[#52B788] drop-shadow">
            100% Real Fruit Shots Bar
          </span>
          <span className="text-[#52B788] text-lg animate-spin" style={{ animationDuration: '8s' }}>🌿</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-fredoka tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F9F5F0] to-[#52B788] drop-shadow-md pb-2"
        >
          Jee's Natural
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xs md:text-base text-[#F7C948] font-bold tracking-widest italic mt-1"
        >
          "Pure Nature. Zero Artifice."
        </motion.p>
      </div>

      {/* Squeezing Juice Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 w-64 md:w-80 mt-12"
      >
        <div className="flex justify-between text-[11px] font-extrabold uppercase tracking-wider text-[#52B788] mb-2 px-1">
          <span>Freshly Squeezing...</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-[#F7C948]"
          >
            🍇 🥥 🥝
          </motion.span>
        </div>
        <div className="w-full h-3.5 bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-inner overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-[#52B788] via-[#F7C948] to-[#52B788] rounded-full relative shadow-[0_0_15px_rgba(82,183,136,0.9)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Typewriter = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases]);

  return <span>{text}<span className="animate-pulse">|</span></span>;
};

const FloatingFruits = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const emojis = ['🍇', '🥝', '🥥', '🍊', '🍋'];

    type FruitParticle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      emoji: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    };

    const createParticle = (): FruitParticle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 20 + 15,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const updateParticle = (particle: FruitParticle) => {
      particle.y -= particle.speedY;
      particle.x += particle.speedX;
      particle.rotation += particle.rotationSpeed;
      if (particle.y < -50) {
        particle.y = canvas.height + 50;
        particle.x = Math.random() * canvas.width;
      }
    };

    const drawParticle = (particle: FruitParticle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.globalAlpha = particle.opacity;
      ctx.font = `${particle.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(particle.emoji, 0, 0);
      ctx.restore();
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let particlesArray: FruitParticle[] = [];
    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor(window.innerWidth / 30);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(createParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particlesArray) {
        updateParticle(particle);
        drawParticle(particle);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

const Counter = ({ target, isDecimal = false }: { target: number, isDecimal?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : Math.floor(count)}</span>;
};

// --- Main App Component ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Find Us', href: '#contact' },
  ];

  const menuItems = [
    { emoji: '🍇', name: 'Jamun Shot', tagline: '"The House Special"', price: 'Special' },
    { emoji: '🥝', name: 'Kiwi Shot', tagline: '"Tangy & Fresh"', price: 'Tangy' },
    { emoji: '🥥', name: 'Coconut Crunch', tagline: '"Signature Crunchy Treat"', price: 'Special' },
    { emoji: '🍊', name: 'Orange Shot', tagline: '"Pure Citrus Blast"', price: 'Fresh' },
    { emoji: '🍋', name: 'Lemon Ginger', tagline: '"Immunity Booster"', price: 'Healthy' },
    { emoji: '🍉', name: 'Watermelon Shot', tagline: '"Summer in a Glass"', price: 'Cool' },
    { emoji: '🥭', name: 'Mango Madness', tagline: '"Thick & Tropical"', price: 'Seasonal' },
    { emoji: '🍍', name: 'Pineapple Punch', tagline: '"Sweet Tangy Refresh"', price: 'Punchy' },
    { emoji: '🌴', name: 'Coconut Water', tagline: '"Natural Hydration"', price: 'Pure' },
  ];

  const reviews = [
    { text: "Nice place for fruit shots at a very reasonable price. The Jamun Shot is very special — must try!", name: "Rahul Patel", tag: "Jamun Shot 🍇" },
    { text: "Amazing flavours and textures. Tastes like real fruit. Highly recommend for shots lovers!", name: "Sneha Mehta", tag: "Kiwi Shot 🥝" },
    { text: "Very good taste and best part — no artificial flavour used at all. Love it!", name: "Amit Sharma", tag: "Coconut Crunch 🥥" }
  ];

  return (
    <div className="min-h-screen bg-cream text-[#2d3748] font-nunito overflow-x-hidden">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b-2 border-lime' : 'bg-gradient-to-b from-forest-dark/80 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <a href="#home" className={`font-fredoka text-xl sm:text-2xl flex items-center gap-2 transition-colors ${scrolled ? 'text-forest' : 'text-white'}`}>
            🌿 Jee's Natural
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`font-bold text-base tracking-wide relative group transition-colors ${scrolled ? 'text-forest hover:text-lime' : 'text-white/90 hover:text-white'}`}>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="tel:" className="bg-yellow text-forest font-extrabold px-5 py-2.5 rounded-full text-sm shadow-md hover:scale-105 transition-transform">
              📞 Call Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className={`w-7 h-7 ${scrolled ? 'text-forest' : 'text-white'}`} /> : <Menu className={`w-7 h-7 ${scrolled ? 'text-forest' : 'text-white'}`} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-forest font-bold text-lg py-2 border-b border-gray-50 flex items-center justify-between hover:text-lime transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-sm text-gray-300">→</span>
                  </a>
                ))}
                <a 
                  href="tel:" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 bg-yellow text-forest font-extrabold text-center py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  📞 Order via Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#0d241b] via-forest to-[#081711] flex items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
        <FloatingFruits />
        <div className="relative z-10 max-w-4xl mx-auto text-white flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/20 mb-6 sm:mb-8 text-xs sm:text-sm font-semibold tracking-wide text-yellow shadow-lg"
          >
            <span>📍 Nikol, Ahmedabad</span>
            <span className="text-white/40">•</span>
            <span className="text-white">Open till 11:30 PM</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.6 }} 
            className="font-fredoka text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cream to-lime/80 drop-shadow-sm"
          >
            Jee's Natural
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }} 
            className="text-lg sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-12 text-lime min-h-[3.5rem] sm:min-h-[3rem] flex items-center justify-center px-2"
          >
            <Typewriter phrases={["Jambu Shots & Coconut Crunch", "No Artificial Flavours. Ever.", "100% Real Fruit. Zero Artifice."]} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }} 
            className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4 sm:gap-5 mb-10 sm:mb-12 max-w-xs sm:max-w-none"
          >
            <a 
              href="tel:" 
              className="w-full sm:w-auto bg-yellow text-forest font-extrabold text-lg sm:text-xl px-8 py-4 sm:py-4.5 rounded-full shadow-[0_8px_25px_rgba(247,201,72,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(247,201,72,0.5)] active:translate-y-0 transition-all relative overflow-hidden group flex items-center justify-center gap-2.5 min-h-[54px]"
            >
              <span className="relative z-10">📞 Order Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
            </a>
            <a 
              href="#menu" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white font-extrabold text-lg sm:text-xl px-8 py-4 sm:py-4.5 rounded-full hover:bg-white hover:text-forest active:scale-95 transition-all flex items-center justify-center min-h-[54px]"
            >
              Explore Menu
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }} 
            className="inline-flex items-center gap-2.5 bg-white text-forest px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm shadow-2xl animate-[float_4s_ease-in-out_infinite] border border-lime/20"
          >
            <span className="text-yellow text-base">★</span>
            <span>4.6 Google Rating</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 underline">45+ Happy Reviews</span>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[80px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,112.25,187.8,89.81,232.63,72,277.6,64.5,321.39,56.44Z" className="fill-cream"></path>
          </svg>
        </div>
      </section>

      {/* Signature Section */}
      <section id="signature" className="py-16 sm:py-24 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#4c177a] via-purple to-[#330f52] text-white text-center rounded-[28px] sm:rounded-[36px] p-8 sm:p-16 md:p-20 shadow-[0_20px_50px_rgba(107,33,168,0.25)] border border-purple/30 relative overflow-hidden"
        >
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs sm:text-sm font-bold uppercase tracking-widest text-yellow mb-6 sm:mb-8 border border-white/10">
            👑 Signature Highlight
          </span>
          <h2 className="font-bricolage font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            Meet Our Star — The Jamun Shot 🍇
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 text-purple-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
            Ahmedabad ka favourite fruit shot. Made from 100% fresh Jamun (Indian Blackberry). Zero sugar syrup. Zero artificial essence. Pure authentic taste.
          </p>
          <div className="inline-flex items-center gap-3 bg-yellow text-forest text-lg sm:text-2xl font-extrabold px-8 py-4 sm:px-10 sm:py-4.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-default">
            <span>Must Try ⭐</span>
          </div>
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-18">
          <span className="text-lime font-extrabold tracking-wider uppercase text-xs sm:text-sm">Natural Menu</span>
          <h2 className="font-fredoka text-3xl sm:text-5xl text-forest mt-2">
            Fresh from Nature 🌿
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center border-t-8 border-lime shadow-[0_10px_30px_rgba(27,67,50,0.06)] hover:shadow-[0_20px_40px_rgba(27,67,50,0.12)] transition-shadow relative flex flex-col justify-between h-full border border-gray-100/80"
            >
              <div>
                <div className="text-6xl sm:text-7xl mb-5 drop-shadow-sm select-none">
                  {item.emoji}
                </div>
                <h3 className="font-fredoka text-2xl sm:text-3xl text-forest mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm sm:text-base italic mb-8 leading-relaxed">{item.tagline}</p>
              </div>
              <div className="pt-4 border-t border-gray-50 flex items-center justify-center">
                <span className="bg-yellow/90 text-forest px-6 py-2 rounded-full font-extrabold text-sm sm:text-base tracking-wide shadow-sm">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="bg-gradient-to-r from-forest-dark via-forest to-forest-dark text-white py-14 sm:py-20 px-4 sm:px-6 my-10 border-y border-lime/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 text-center">
          <div className="p-4">
            <div className="font-fredoka text-4xl sm:text-6xl text-lime mb-2 flex items-center justify-center gap-2">
              <span>🌿</span> <Counter target={0} />
            </div>
            <div className="font-bold tracking-wider uppercase text-xs sm:text-sm text-gray-300 mt-2">Artificial Flavours</div>
          </div>
          <div className="p-4">
            <div className="font-fredoka text-4xl sm:text-6xl text-lime mb-2 flex items-center justify-center gap-2">
              <span>⭐</span> <Counter target={4.6} isDecimal />
            </div>
            <div className="font-bold tracking-wider uppercase text-xs sm:text-sm text-gray-300 mt-2">Google Rating</div>
          </div>
          <div className="col-span-2 lg:col-span-1 p-4 border-t lg:border-t-0 border-white/10 pt-8 lg:pt-4">
            <div className="font-fredoka text-4xl sm:text-6xl text-lime mb-2 flex items-center justify-center gap-2">
              <Counter target={999} /><span>+</span>
            </div>
            <div className="font-bold tracking-wider uppercase text-xs sm:text-sm text-gray-300 mt-2">Happy Customers</div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-18">
          <span className="text-lime font-extrabold tracking-wider uppercase text-xs sm:text-sm">Our Promise</span>
          <h2 className="font-fredoka text-3xl sm:text-5xl text-forest mt-2">
            Why People Love Us 💚
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { icon: '🚫', title: 'No Artificial Flavours', desc: "We believe in pure taste. Zero syrups, zero chemical essences, just nature's authentic sweetness." },
            { icon: '🍓', title: '100% Real Fruit', desc: "Every shot is crushed and prepared from fresh, premium handpicked market fruits." },
            { icon: '💰', title: 'Super Affordable', desc: "Healthy natural drinks accessible for everyone. Prices reasonably range from Rs.1 to Rs.200." },
            { icon: '🌙', title: 'Open Late Night', desc: "Craving a refreshing midnight treat after box cricket? We are open daily until 11:30 PM." }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md border border-lime/20 rounded-2xl sm:rounded-3xl p-8 text-center hover:bg-white hover:border-lime/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl sm:text-6xl mb-6 inline-block select-none">{feature.icon}</div>
                <h3 className="font-fredoka text-xl sm:text-2xl text-forest mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f2ede4] relative overflow-hidden border-y border-lime/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-lime font-extrabold tracking-wider uppercase text-xs sm:text-sm bg-white px-4 py-1.5 rounded-full shadow-sm border border-lime/20">
              💬 Verified Testimonials
            </span>
            <h2 className="font-fredoka text-3xl sm:text-5xl text-forest mt-4 mb-4">
              What Customers Say ⭐
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Real feedback from fruit shot lovers across Ahmedabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(27,67,50,0.15)" }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_30px_rgba(27,67,50,0.06)] border border-gray-100 flex flex-col justify-between relative transition-all duration-300 group"
              >
                <Quote className="w-12 h-12 text-lime/10 absolute top-6 right-6 pointer-events-none group-hover:text-lime/20 transition-colors" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1 text-yellow text-lg">
                      ★★★★★
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200/60">
                      <span>✓</span> Google Review
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-base sm:text-lg italic mb-8 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-100/80 flex items-center justify-between">
                  <div>
                    <h3 className="font-fredoka text-forest text-lg sm:text-xl font-bold">{review.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Nikol, Ahmedabad</p>
                  </div>
                  <span className="text-xs font-bold bg-lime/15 text-forest px-3 py-1.5 rounded-full border border-lime/30 shrink-0">
                    {review.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-18">
          <span className="text-lime font-extrabold tracking-wider uppercase text-xs sm:text-sm">Location</span>
          <h2 className="font-fredoka text-3xl sm:text-5xl text-forest mt-2">
            Visit Our Shop 📍
          </h2>
        </div>

        <div className="bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_15px_40px_rgba(27,67,50,0.08)] border border-gray-100 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 min-h-[300px] sm:min-h-[420px] bg-gray-100 relative">
            <iframe 
              src="https://maps.google.com/maps?q=Jee's+Natural+Juice+Nikol+Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen 
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>

          <div className="lg:w-1/2 p-8 sm:p-14 lg:p-16 flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-lime/10 rounded-2xl text-forest shrink-0">
                <MapPin className="w-6 h-6 text-lime" />
              </div>
              <div>
                <h3 className="font-fredoka text-xl sm:text-2xl text-forest mb-1">Address</h3>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
                  Near Fire Station, Samshera Box Cricket,<br/>Nikol, Ahmedabad, Gujarat 380049
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-lime/10 rounded-2xl text-forest shrink-0">
                <Star className="w-6 h-6 text-lime" />
              </div>
              <div>
                <h3 className="font-fredoka text-xl sm:text-2xl text-forest mb-1">Timings</h3>
                <p className="text-gray-600 text-sm sm:text-lg">Open Daily Until 11:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-lime/10 rounded-2xl text-forest shrink-0">
                <Phone className="w-6 h-6 text-lime" />
              </div>
              <div>
                <h3 className="font-fredoka text-xl sm:text-2xl text-forest mb-1">Phone Number</h3>
                <p className="text-gray-600 text-sm sm:text-lg font-semibold"></p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:" 
                className="flex-1 bg-yellow text-forest font-extrabold text-center py-4 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all text-base min-h-[52px] flex items-center justify-center gap-2"
              >
                📞 Call Shop Now
              </a>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 bg-[#25D366] text-white font-extrabold text-center py-4 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all text-base min-h-[52px] flex items-center justify-center gap-2"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-dark text-white text-center pt-16 pb-10 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <a href="#home" className="font-fredoka text-3xl sm:text-4xl text-lime mb-3 hover:opacity-90 transition-opacity">
            🌿 Jee's Natural
          </a>
          <p className="text-base sm:text-xl text-gray-300 mb-6 font-medium">
            Pure Nature. Zero Artifice. 100% Real Fruit.
          </p>
          <div className="text-sm text-gray-400 space-y-1 mb-10">
            <p>Near Fire Station, Samshera Box Cricket, Nikol, Ahmedabad</p>
            <p>Call for Orders: <a href="tel:" className="text-yellow font-bold hover:underline"></a></p>
          </div>

          <div className="w-full border-t border-white/10 pt-8 text-xs sm:text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>&copy; 2025 Jee's Natural. All Rights Reserved.</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span>
              Designed &amp; Developed By{' '}<span className="text-yellow font-bold">SAGAR MAKWANA</span>
              
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */} 
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.45)] z-50 hover:scale-110 active:scale-95 transition-transform animate-[pulse_2.5s_infinite]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.061 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </div>
  );
}

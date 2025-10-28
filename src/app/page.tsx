'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const orbs: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }> = [];

    const orbCount = window.innerWidth < 768 ? 4 : 8;
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 150,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.2 + Math.random() * 0.15,
        hue: 200 + Math.random() * 40,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 60%, ${orb.opacity})`);
        gradient.addColorStop(0.4, `hsla(${orb.hue}, 100%, 50%, ${orb.opacity * 0.6})`);
        gradient.addColorStop(0.7, `hsla(${orb.hue}, 100%, 40%, ${orb.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 100%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();

        orb.x += orb.speedX;
        orb.y += orb.speedY;

        if (orb.x < -orb.radius) { orb.x = -orb.radius; orb.speedX *= -1; }
        if (orb.x > canvas.width + orb.radius) { orb.x = canvas.width + orb.radius; orb.speedX *= -1; }
        if (orb.y < -orb.radius) { orb.y = -orb.radius; orb.speedY *= -1; }
        if (orb.y > canvas.height + orb.radius) { orb.y = canvas.height + orb.radius; orb.speedY *= -1; }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    const subject = 'New Contact Form Submission';
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
    `.trim();

    const mailtoLink = `mailto:support@evolvemerchants.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Navigation */}
      <nav className="relative z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <button
            className="md:hidden text-black p-2 hover:bg-gray-100 rounded-lg transition-colors absolute left-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link href="/" className="flex items-center group mx-auto md:mx-0 md:ml-12">
            <img src="/ameritech-logo.svg" alt="Ameritech Payments" className="h-14 md:h-16 w-auto transform group-hover:scale-105 transition-transform duration-300" />
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-auto">
            <Link href="/" className="px-4 py-2 text-sm text-black font-semibold hover:text-[#1e40af] rounded-lg hover:bg-gray-100 transition-all relative group">
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/solutions" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Solutions
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Products
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/funding" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Funding
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <div className="ml-4 pl-4 border-l border-gray-300">
              <a href="tel:+18332069763" className="group relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 inline-flex items-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden relative z-20 bg-white border-b border-gray-200">
          <div className="px-6 py-4 flex flex-col gap-2 md:gap-3">
            <Link href="/" className="text-sm text-black font-semibold hover:text-[#1e40af] hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/solutions" className="text-sm text-black font-semibold hover:text-[#1e40af] hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/products" className="text-sm text-black font-semibold hover:text-[#1e40af] hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/funding" className="text-sm text-black font-semibold hover:text-[#1e40af] hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Funding</Link>
            <a href="tel:+18332069763" className="mt-2 p-3 hover:bg-gray-100 rounded-lg transition-all w-full inline-flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Hero Section with Dashboard */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-20 min-h-[85vh] md:min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Igniting Momentum. Redefining Payments. Ameri<span className="text-[#1e40af]">tech</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-6 md:mb-8 max-w-xl">
              Ameritech Payments—driven by what's next.
            </p>
            <a href="https://calendly.com/-evolvemerchants" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3.5 bg-white text-black text-base font-semibold rounded-full hover:bg-gray-200 transition-all touch-manipulation w-full sm:w-auto text-center">
              Book A Call
            </a>
          </div>

          {/* Revenue Dashboard - Sleek Minimal Design */}
          <div className="relative flex items-center justify-center order-2 lg:justify-end">
            <div className="absolute w-[240px] md:w-[380px] lg:w-[420px] h-[240px] md:h-[380px] lg:h-[420px] bg-[#1e40af]/40 rounded-full blur-[70px] md:blur-[100px] animate-pulse"></div>
            <div className="absolute w-[200px] md:w-[310px] lg:w-[340px] h-[200px] md:h-[310px] lg:h-[340px] bg-[#1e40af]/30 rounded-full blur-[50px] md:blur-[70px]"></div>
            <div className="relative w-full max-w-[380px] md:max-w-[480px] lg:max-w-[560px]">
              <div className="bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 border-2 border-[#1e40af] rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-2xl overflow-hidden" style={{boxShadow: '0 0 60px rgba(30, 64, 175, 0.15), 0 0 30px rgba(30, 64, 175, 0.1) inset, 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(30, 64, 175, 0.4) inset'}}>

                {/* Header */}
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#1e40af] rounded-full"></div>
                      <span className="text-[10px] md:text-xs lg:text-sm text-[#1e40af] font-bold tracking-[0.2em]">LIVE DASHBOARD</span>
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-600">12:34 PM</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5 md:gap-3.5 lg:gap-4 mb-3 md:mb-4 lg:mb-5">
                  <div className="border-l-3 border-[#1e40af] pl-3 md:pl-4 lg:pl-5">
                    <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 mb-1 tracking-wide font-semibold">TRANSACTIONS</div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-white">402</div>
                    <div className="text-[10px] md:text-xs lg:text-sm font-bold mt-1 text-[#1e40af]">+18%</div>
                  </div>
                  <div className="border-l-3 border-[#1e40af] pl-3 md:pl-4 lg:pl-5">
                    <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 mb-1 tracking-wide font-semibold">AVG</div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-white">$710</div>
                    <div className="text-[10px] md:text-xs lg:text-sm text-[#1e40af] font-bold mt-1">+12%</div>
                  </div>
                  <div className="border-l-3 border-[#1e40af] pl-3 md:pl-4 lg:pl-5">
                    <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 mb-1 tracking-wide font-semibold">SUCCESS</div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-white">96%</div>
                    <div className="text-[10px] md:text-xs lg:text-sm font-bold mt-1 text-[#1e40af]">+2%</div>
                  </div>
                </div>

                {/* Wave Chart */}
                <div className="mb-3 md:mb-4 lg:mb-5">
                  <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 mb-1.5 md:mb-2 tracking-wide font-semibold">7-DAY PERFORMANCE</div>
                  <div className="relative h-16 md:h-20 lg:h-24 bg-gradient-to-b from-[#1e40af]/20 to-transparent rounded-xl overflow-hidden border border-[#1e40af]/20">
                    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,60 Q50,50 100,55 T200,45 T300,35 T400,40 L400,100 L0,100 Z" fill="url(#waveGradient)"/>
                      <path d="M0,60 Q50,50 100,55 T200,45 T300,35 T400,40" fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round"/>
                      <circle cx="380" cy="40" r="4" fill="#1e40af">
                        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                </div>

                {/* Payment Methods - Minimal Style */}
                <div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 mb-1.5 md:mb-2 tracking-wide font-semibold">PAYMENT BREAKDOWN</div>

                  <div className="space-y-2 md:space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5 md:mb-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-lg flex items-center justify-center">
                            <span className="text-xs md:text-sm lg:text-base font-black text-[#1e40af]">V</span>
                          </div>
                          <span className="text-xs md:text-sm lg:text-base text-gray-400 font-semibold">Visa</span>
                        </div>
                        <span className="text-sm md:text-base font-bold text-white">$62,860</span>
                      </div>
                      <div className="h-1.5 md:h-2 lg:h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1e40af] rounded-full" style={{width: '35%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5 md:mb-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-lg flex items-center justify-center">
                            <span className="text-xs md:text-sm lg:text-base font-black text-[#1e40af]">A</span>
                          </div>
                          <span className="text-xs md:text-sm lg:text-base text-gray-400 font-semibold">Amex</span>
                        </div>
                        <span className="text-sm md:text-base font-bold text-white">$182,867</span>
                      </div>
                      <div className="h-1.5 md:h-2 lg:h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1e40af] rounded-full" style={{width: '64%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5 md:mb-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-lg flex items-center justify-center">
                            <span className="text-xs md:text-sm lg:text-base font-black text-[#1e40af]">M</span>
                          </div>
                          <span className="text-xs md:text-sm lg:text-base text-gray-400 font-semibold">Mastercard</span>
                        </div>
                        <span className="text-sm md:text-base font-bold text-white">$40,002</span>
                      </div>
                      <div className="h-1.5 md:h-2 lg:h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1e40af] rounded-full" style={{width: '22%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16 border-y border-gray-800/50 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-2">Trusted Technology</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-items-center">
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-base md:text-lg opacity-70 group-hover:opacity-100 transition-opacity tracking-wide"></div>
                <div className="text-[#1e40af] font-semibold text-xs md:text-sm -mt-1 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-base md:text-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity tracking-wider"></div>
              </div>
            </div>
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-base md:text-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-xl md:text-2xl opacity-80 group-hover:opacity-100 transition-opacity tracking-widest"></div>
              </div>
            </div>
            <div className="group w-full h-16 md:h-20 lg:h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-2 border-[#1e40af] rounded-xl flex items-center justify-center hover:bg-gray-800/40 transition-all duration-300 px-4 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-gray-300 font-semibold text-xs md:text-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-blue-400 font-bold text-base md:text-lg -mt-1 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-gray-500">

          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-16">
            <div className="text-xs md:text-sm text-blue-500 mb-3 md:mb-4 uppercase tracking-wider">Solutions</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Driving Scalable Growth Through<br />
              Advanced Payment Technology
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl px-2">
              From mobile readers to full POS systems, Ameritech equips you to accept payments your way—secure, simple, and cost-effective.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all touch-manipulation shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Low-Risk Processing</h3>
              <p className="text-sm md:text-base text-gray-400">
                Ameritech's low-risk processing is built for compliant businesses in retail, hospitality, and professional services. Enjoy fast approvals, clear pricing, and smooth integrations that make onboarding effortless.
              </p>
            </div>
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all touch-manipulation shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">High-Risk Processing</h3>
              <p className="text-sm md:text-base text-gray-400">
                From Medical Spas to Online Casinos, Ameritech navigates high-risk industries with precision. Our strong banking network, intelligent fraud protection, and tailored underwriting ensure your business stays approved and uninterrupted.
              </p>
            </div>
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all touch-manipulation shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Business Funding</h3>
              <p className="text-sm md:text-base text-gray-400">
                Ameritech's Business Funding solutions connect you with a nationwide network of 150+ direct lenders to secure fast, flexible capital tailored to your goals. Whether you're expanding, stabilizing cash flow, or launching new initiatives, Ameritech delivers competitive terms, rapid approvals, and personalized support.
              </p>
            </div>
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all touch-manipulation shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">ACH Processing</h3>
              <p className="text-sm md:text-base text-gray-400">
                Ameritech's ACH processing offers a secure, cost-effective way to move funds directly between bank accounts—ideal for recurring payments, invoicing, and B2B transactions. With fast settlement times and seamless integration, it's a reliable solution for businesses seeking efficient, low-cost payment alternatives.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-24 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-[#1e40af] to-[#1e40af] bg-clip-text text-transparent mb-2">
                117M
              </div>
              <div className="text-sm text-gray-500">Daily U.S. Card Transactions</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-[#1e40af] to-[#1e40af] bg-clip-text text-transparent mb-2">
                329M
              </div>
              <div className="text-sm text-gray-500">Daily U.S. Card Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative z-10 px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-sm text-[#1e40af] mb-4 uppercase tracking-wider">Products</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Payments that follow your business—<br />
              anytime, anywhere
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              From mobile card readers to enterprise-grade POS systems—Ameritech equips you to accept payments your way.
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
                <div className="text-center">
                  <div className="text-6xl mb-4"></div>
                  <div className="text-lg text-gray-400"></div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Payments</h3>
                <p className="text-gray-400 mb-6">
                  Process transactions on your phone, tablet, or desktop—no hardware needed.
                </p>
                <a href="#contact" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                  EXPLORE OPTIONS
                </a>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold mb-4">Terminal</h3>
                <p className="text-gray-400 mb-6">
                  All-in-one card readers, designed for mobility and precision.
                </p>
                <a href="#contact" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                  EXPLORE OPTIONS
                </a>
              </div>
              <div className="order-1 lg:order-2 bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
                <div className="text-center">
                  <div className="text-6xl mb-4"></div>
                  <div className="text-lg text-gray-400"></div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
                <div className="text-center">
                  <div className="text-6xl mb-4"></div>
                  <div className="text-lg text-gray-400"></div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">POS</h3>
                <p className="text-gray-400 mb-6">
                  POS technology that adapts to your business, not the other way around. Clear displays, intuitive interfaces, and seamless transactions.
                </p>
                <a href="#contact" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                  EXPLORE OPTIONS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Form */}
      <section id="contact" className="relative z-10 px-6 md:px-12 py-16 md:py-32 bg-gradient-to-b from-transparent via-[#1e40af]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-2">
            Move your business forward.
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Cut costs. Boost efficiency. Elevate every transaction. Ameritech builds agile payment solutions tailored to your business goals. Ready to innovate? Let's build something that moves your business forward.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl md:rounded-2xl p-6 md:p-12 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
            <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-[#1e40af]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 md:py-3.5 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all text-base touch-manipulation"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-[#1e40af]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-[#1e40af]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your business needs and how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-10 py-4 md:py-4.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] text-white rounded-xl font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-[#1e40af]/50 transition-all touch-manipulation"
              >
                SEND MESSAGE
              </button>

              <p className="text-sm text-gray-400 text-center">
                This will open your default email client. Or call us directly at{' '}
                <a href="tel:+18332069763" className="text-[#1e40af] hover:text-[#1e40af]/80 transition-colors">(833) 206-9763</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <Link href="/" className="flex items-center">
              <img src="/ameritech-logo.svg" alt="Ameritech Payments" className="h-10 w-auto" />
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
              <a href="mailto:support@evolvemerchants.com" className="text-gray-600 hover:text-[#1e40af] transition">
                support@evolvemerchants.com
              </a>
              <a href="tel:+18332069763" className="text-gray-600 hover:text-[#1e40af] transition">
                (833) 206-9763
              </a>
              <span className="text-gray-500">Mon-Fri 8AM - 5PM</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-500">
                © {new Date().getFullYear()} Ameritech Payments. All rights reserved.
              </div>
              <div className="flex gap-6">
                <Link href="/partners" className="text-gray-600 hover:text-[#1e40af] transition">Referral Partners</Link>
                <Link href="/privacy" className="text-gray-600 hover:text-[#1e40af] transition">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-600 hover:text-[#1e40af] transition">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

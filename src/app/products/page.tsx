'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
            <Link href="/" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/solutions" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Solutions
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm text-blue-600 font-semibold rounded-lg bg-gray-100 transition-all relative group">
              Products
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"></span>
            </Link>
            <Link href="/funding" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Funding
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-3/4 transition-all duration-300"></span>
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
          <div className="px-6 py-4 flex flex-col gap-2">
            <Link href="/" className="text-sm text-black font-semibold hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/solutions" className="text-sm text-black font-semibold hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/products" className="text-sm text-blue-600 font-semibold bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/funding" className="text-sm text-black font-semibold hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Funding</Link>
            <a href="tel:+18332069763" className="mt-2 p-3 hover:bg-gray-100 rounded-lg transition-all w-full inline-flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Payments that follow your business—<br />anytime, anywhere
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            From mobile card readers to enterprise-grade POS systems—Evolve equips you to accept payments your way: secure, seamless, and evolved.
          </p>
        </div>
      </section>

      {/* Products Sections */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Payments */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <div className="text-lg text-gray-400">Mobile Payment Interface</div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Payments</h3>
              <p className="text-gray-400 mb-6">
                Process transactions on your phone, tablet, or desktop—no hardware needed. Evolve's virtual payment solutions deliver flexibility and speed for businesses on the move.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Virtual Terminal for browser-based transactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Mobile app integration for iOS & Android</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Recurring billing and subscription management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Digital invoicing with payment links</span>
                </li>
              </ul>
              <a href="tel:+18332069763" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                EXPLORE OPTIONS
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold mb-4">Terminal</h3>
              <p className="text-gray-400 mb-6">
                All-in-one card readers, designed for mobility and precision. Accept chip, swipe, and contactless payments anywhere your business takes you.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Bluetooth & WiFi connectivity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">EMV chip and NFC contactless support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Long battery life for all-day use</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Compact, durable design</span>
                </li>
              </ul>
              <a href="tel:+18332069763" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                EXPLORE OPTIONS
              </a>
            </div>
            <div className="order-1 lg:order-2 bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-6xl mb-4">💳</div>
                <div className="text-lg text-gray-400">Card Terminal Device</div>
              </div>
            </div>
          </div>

          {/* POS */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-12 flex items-center justify-center min-h-[400px] hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="text-center">
                <div className="text-6xl mb-4">🖥️</div>
                <div className="text-lg text-gray-400">POS System Interface</div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">POS</h3>
              <p className="text-gray-400 mb-6">
                POS technology that adapts to your business, not the other way around. Clear displays, intuitive interfaces, and seamless transactions for retail, hospitality, and beyond.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Full inventory management integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Employee management and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Multi-location support with cloud sync</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1e40af] mt-1">✓</span>
                  <span className="text-gray-300">Customer loyalty program integration</span>
                </li>
              </ul>
              <a href="tel:+18332069763" className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
                EXPLORE OPTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* All Payment Types */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Payment Types. One Platform.</h2>
            <p className="text-xl text-gray-400">Accept every major payment method with confidence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💳</div>
              <h4 className="font-bold text-lg mb-2">Credit & Debit</h4>
              <p className="text-sm text-gray-400">Visa, Mastercard, Amex, Discover</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-lg mb-2">Mobile Wallets</h4>
              <p className="text-sm text-gray-400">Apple Pay, Google Pay, Samsung Pay</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🏦</div>
              <h4 className="font-bold text-lg mb-2">ACH / eCheck</h4>
              <p className="text-sm text-gray-400">Bank-to-bank transfers</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h4 className="font-bold text-lg mb-2">Alternative</h4>
              <p className="text-sm text-gray-400">BNPL, Crypto, A2A</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Evolve Hardware */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Evolve Hardware?</h2>
            <p className="text-xl text-gray-400">Built for reliability, designed for growth</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-bold text-xl mb-3">Bank-Level Security</h4>
              <p className="text-gray-400">End-to-end encryption, PCI-DSS compliance, and tokenization protect every transaction.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-xl mb-3">Lightning Fast</h4>
              <p className="text-gray-400">Process payments in seconds with high-speed processors and reliable connectivity.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-bold text-xl mb-3">Easy Integration</h4>
              <p className="text-gray-400">Seamless setup with your existing systems, plus 24/7 technical support.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-xl mb-3">Real-Time Reporting</h4>
              <p className="text-gray-400">Track sales, inventory, and customer data with powerful analytics dashboards.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-bold text-xl mb-3">Work Anywhere</h4>
              <p className="text-gray-400">Cloud-based systems let you manage your business from any device, anywhere.</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-xl mb-3">Competitive Pricing</h4>
              <p className="text-gray-400">Transparent rates with no hidden fees. Plus, free equipment options available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your payment systems?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's find the perfect hardware and software solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/-evolvemerchants" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold">
              Schedule a Demo
            </a>
            <a href="tel:+18332069763" className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all font-semibold">
              Call (833) 206-9763
            </a>
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
              <a href="mailto:support@evolvemerchants.com" className="text-gray-600 hover:text-blue-600 transition">
                support@evolvemerchants.com
              </a>
              <a href="tel:+18332069763" className="text-gray-600 hover:text-blue-600 transition">
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
                <Link href="/partners" className="text-gray-600 hover:text-blue-600 transition">Referral Partners</Link>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

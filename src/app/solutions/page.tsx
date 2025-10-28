'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function SolutionsPage() {
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
            <Link href="/solutions" className="px-4 py-2 text-sm text-blue-600 font-semibold rounded-lg bg-gray-100 transition-all relative group">
              Solutions
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"></span>
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm text-black font-semibold hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-all relative group">
              Products
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-3/4 transition-all duration-300"></span>
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
            <Link href="/solutions" className="text-sm text-blue-600 font-semibold bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/products" className="text-sm text-black font-semibold hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all py-3 px-4" onClick={() => setMobileMenuOpen(false)}>Products</Link>
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
            Smarter Payments with Ameritech
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-4">
            Select the solution that matches your business model.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            Whatever your goal—efficiency, savings, or flexibility—Ameritech Payments is built to support it.
          </p>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              <h3 className="text-2xl font-bold mb-4">Low-Risk Processing</h3>
              <p className="text-gray-400">
                Ameritech's low-risk processing is built for compliant businesses in retail, hospitality, and professional services. Enjoy fast approvals, clear pricing, and smooth integrations that make onboarding effortless.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              <h3 className="text-2xl font-bold mb-4">High-Risk Processing</h3>
              <p className="text-gray-400">
                From Medical Spas to Online Casinos, Ameritech navigates high-risk industries with precision. Strong banking networks, intelligent fraud protection, and tailored underwriting keep you approved.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              <h3 className="text-2xl font-bold mb-4">Business Funding</h3>
              <p className="text-gray-400">
                Ameritech's Business Funding solutions connect you with a nationwide network of 150+ direct lenders to secure fast, flexible capital tailored to your goals.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              <h3 className="text-2xl font-bold mb-4">ACH Processing</h3>
              <p className="text-gray-400">
                Ameritech's ACH processing offers a secure, cost-effective way to move funds directly between bank accounts—ideal for recurring payments, invoicing, and B2B transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-y border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Technology</h2>
            <p className="text-gray-400">Seamlessly connect with industry-leading platforms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-center">
                <div className="text-gray-300 font-bold text-lg"></div>
                <div className="text-blue-400 font-semibold text-sm"></div>
              </div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-gray-300 font-bold text-lg"></div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-gray-300 font-bold text-2xl tracking-wider"></div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-gray-300 font-bold text-lg"></div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-gray-300 font-bold text-2xl tracking-widest"></div>
            </div>
            <div className="w-full h-24 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl flex items-center justify-center hover:border-blue-600/40 transition-all">
              <div className="text-center">
                <div className="text-gray-300 font-semibold text-sm"></div>
                <div className="text-blue-400 font-bold text-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Industries */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
            <p className="text-gray-400">Powering payments for businesses across every industry</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-600/30 rounded-xl p-8 text-center hover:border-blue-600/50 transition-all">
              <div className="text-2xl font-bold">RETAIL</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-600/30 rounded-xl p-8 text-center hover:border-blue-600/50 transition-all">
              <div className="text-2xl font-bold">HOSPITALITY</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-600/30 rounded-xl p-8 text-center hover:border-blue-600/50 transition-all">
              <div className="text-2xl font-bold">HEALTHCARE</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-600/30 rounded-xl p-8 text-center hover:border-blue-600/50 transition-all">
              <div className="text-2xl font-bold">E-COMMERCE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Present */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Card Present</h2>
            <p className="text-xl text-gray-400 mb-2">On-Site Payment Solutions.</p>
            <p className="text-lg text-gray-400">Efficient, secure payment processing—right at the point of sale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Capabilities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Point-of-Sale Systems</li>
                <li>• Retail Checkout</li>
                <li>• Table-Side Payments</li>
                <li>• Drive-Thru Support</li>
                <li>• Multi-Lane Environments</li>
                <li>• Contactless Setup</li>
                <li>• Self-Service Terminals</li>
                <li>• Loyalty Programs</li>
              </ul>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Key Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Integrated PIN Pads</li>
                <li>• High-Speed Processors</li>
                <li>• Robust Connectivity</li>
                <li>• AI Fraud Prevention</li>
                <li>• Offline Mode</li>
                <li>• Real-Time Dashboards</li>
                <li>• Contactless Tap</li>
                <li>• EMV Compatibility</li>
              </ul>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Secure Methods</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• EMV Chip</li>
                <li>• Contactless</li>
                <li>• Magstripe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Card Not Present */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Card Not Present</h2>
            <p className="text-xl text-gray-400 mb-2">Process transactions from any location, with ease.</p>
            <p className="text-lg text-gray-400">Online, Mobile, and Remote Payment Solutions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Capabilities</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• E-commerce</li>
                <li>• Mobile Integration</li>
                <li>• Recurring Billing</li>
                <li>• Virtual Terminals</li>
                <li>• Hosted Payment Pages</li>
                <li>• Online Invoicing</li>
                <li>• API-Driven Flows</li>
                <li>• Subscription Tools</li>
              </ul>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Key Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• QuickBooks Integration</li>
                <li>• BNPL Support</li>
                <li>• Crypto Acceptance</li>
                <li>• A2A Transfers</li>
                <li>• Mobile Wallet Support</li>
                <li>• API Access</li>
                <li>• PCI Compliance</li>
                <li>• Multi-Currency</li>
              </ul>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Secure Methods</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Tokenization</li>
                <li>• 3D Secure</li>
                <li>• AVS & CVV</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Stay ahead with smarter payment tech.</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <svg className="w-7 h-7 text-[#1e40af] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-lg font-semibold">Eliminate Processing Fees</div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-7 h-7 text-[#1e40af] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-lg font-semibold">Custom Solutions for Any Industry</div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-7 h-7 text-[#1e40af] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-lg font-semibold">Next-Day Funding</div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-7 h-7 text-[#1e40af] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="text-lg font-semibold">Lower Costs with ACH</div>
            </div>
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

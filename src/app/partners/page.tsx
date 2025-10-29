'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function PartnersPage() {
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

  const handlePartnerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      partnerType: formData.get('partnerType'),
      message: formData.get('message'),
    };

    const subject = 'New Referral Partner Application';
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Partner Type: ${data.partnerType}

Message:
${data.message}
    `.trim();

    const mailtoLink = `mailto:Partners@ameritechpayments.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <Link href="/solutions" className="px-4 py-2 text-sm text-black font-semibold hover:text-[#1e40af] rounded-lg hover:bg-gray-100 transition-all relative group">
              Solutions
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm text-black font-semibold hover:text-[#1e40af] rounded-lg hover:bg-gray-100 transition-all relative group">
              Products
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#1e40af] to-[#1e40af] group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
            <Link href="/funding" className="px-4 py-2 text-sm text-black font-semibold hover:text-[#1e40af] rounded-lg hover:bg-gray-100 transition-all relative group">
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
          <div className="px-6 py-4 flex flex-col gap-2">
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

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Referral Partner Program
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Partner with Ameritech Payments and earn by referring merchants to our payment processing solutions.
          </p>
          <a href="#apply" className="inline-block px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-all font-semibold">
            BECOME A PARTNER
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Benefits</h2>
            <p className="text-gray-400">Why partner with Ameritech Payments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="w-14 h-14 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Approvals</h3>
              <p className="text-gray-400">Quick merchant approval process with dedicated underwriting support. Get your clients up and running fast.</p>
            </div>

            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="w-14 h-14 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
              <p className="text-gray-400">Personal account manager, marketing materials, and 24/7 partner support to help you succeed.</p>
            </div>

            <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-xl p-8 hover:shadow-lg hover:shadow-[#1e40af]/20 transition-all shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
              <div className="w-14 h-14 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#1e40af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Full Product Suite</h3>
              <p className="text-gray-400">Offer payment processing, POS systems, terminals, business funding, and more. One-stop solution for merchants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 md:px-12 py-12 md:py-16 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Simple, transparent partnership process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1e40af]">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Apply</h3>
              <p className="text-gray-400">Submit your partner application online. Quick approval process.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1e40af]">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Refer</h3>
              <p className="text-gray-400">Start referring merchants.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1e40af]/10 border-2 border-[#1e40af]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#1e40af]">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Earn</h3>
              <p className="text-gray-400">Receive monthly commissions on all active merchants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section id="apply" className="relative z-10 px-6 md:px-12 py-16 md:py-24 bg-gradient-to-b from-transparent via-[#1e40af]/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply to Become a Partner</h2>
            <p className="text-gray-400">Join our growing network of successful referral partners</p>
          </div>

          <div className="bg-gray-900/30 border-2 border-[#1e40af] rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(30,64,175,0.12),0_0_20px_rgba(30,64,175,0.08),0_0_20px_rgba(30,64,175,0.4)_inset]">
            <form onSubmit={handlePartnerSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all"
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
                    Phone Number <span className="text-[#1e40af]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
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
                <label htmlFor="partnerType" className="block text-sm font-medium text-gray-300 mb-2">
                  Partner Type <span className="text-[#1e40af]">*</span>
                </label>
                <select
                  id="partnerType"
                  name="partnerType"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all"
                >
                  <option value="">Select Partner Type</option>
                  <option value="independent-agent">Independent Sales Agent</option>
                  <option value="iso">ISO / Payment Facilitator</option>
                  <option value="business-consultant">Business Consultant</option>
                  <option value="accountant">Accountant / CPA</option>
                  <option value="attorney">Attorney / Legal Professional</option>
                  <option value="software-provider">Software Provider</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Tell us about your referral network <span className="text-[#1e40af]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all resize-none"
                  placeholder="Describe your business, client base, and why you would make a great partner..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-10 py-4 bg-gradient-to-r from-[#1e40af] to-[#1e40af] text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#1e40af]/50 transition-all"
              >
                SUBMIT APPLICATION
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
              <a href="mailto:Partners@ameritechpayments.com" className="text-gray-600 hover:text-[#1e40af] transition">
                Partners@ameritechpayments.com
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

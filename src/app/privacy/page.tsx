'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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

      {/* Content */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="text-sm text-gray-400 mb-12"><strong>Effective Date:</strong> October 29, 2025</div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ameritech Payments, LLC (referred to as "Ameritech Payments," "we," "us," or "our") is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, share, and protect your information when you visit our website or engage with our products and services. By using our website or services, you consent to the terms outlined in this Privacy Policy.
              </p>
              <p className="text-gray-300 leading-relaxed">
                If you do not agree with these terms, please do not use our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect personal and non-personal information in various ways:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>When you create an account, register for services, or subscribe to our newsletter</li>
                <li>When you contact us via email or other channels</li>
                <li>When you provide information in exchange for free resources or downloads</li>
                <li>When you complete surveys or enter contests</li>
                <li>Through cookies and similar technologies when you interact with our website</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Personal information may include your name, address, email, phone number, payment details, and account preferences. Non-personal information includes device data, IP addresses, and browsing activity.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Provide our services, process transactions, and fulfill orders</li>
                <li>Communicate with you about our products and services</li>
                <li>Personalize your website experience and improve functionality</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraud and unauthorized use</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Sharing Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell or rent your personal information. We may share it with third parties in specific cases:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>With service providers (e.g., email platforms, payment processors) to deliver services</li>
                <li>As required by law, legal processes, or law enforcement</li>
                <li>In the event of a business transaction such as a merger or sale</li>
                <li>With your consent, for purposes disclosed at the time of sharing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Your Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your data:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>The right to access and correct personal information</li>
                <li>The right to request deletion of your data, subject to legal or contractual obligations</li>
                <li>The right to opt out of marketing communications</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, email us at <a href="mailto:support@evolvemerchants.com" className="text-[#1e40af] hover:underline">support@evolvemerchants.com</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Data Retention and Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your data only as long as necessary to provide services, comply with legal obligations, or resolve disputes. We implement reasonable security measures, including encryption, to protect your data from unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed">
                Our website uses cookies to enhance your experience. Cookies are small data files stored on your device that allow us to recognize you and improve website functionality. You can control cookies through your browser settings. Disabling cookies may limit certain features of our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children without parental consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                As a U.S.-based company, your information may be stored and processed in the United States. By using our website, you consent to the transfer of your data to the U.S.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Updates to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in technology, regulations, or our business practices. Updates will be posted on our website, and we may notify you via email of significant changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from this Privacy Policy will be resolved through binding arbitration in accordance with the laws of the United States. Arbitration will be conducted in accordance with the American Arbitration Association rules.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions or concerns about this Privacy Policy, contact us at:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>Email: <a href="mailto:support@evolvemerchants.com" className="text-[#1e40af] hover:underline">support@evolvemerchants.com</a></p>
                <p>Phone: <a href="tel:+18332069763" className="text-[#1e40af] hover:underline">(833) 206-9763</a></p>
                <p>Address: Ameritech Payments, LLC</p>
              </div>
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

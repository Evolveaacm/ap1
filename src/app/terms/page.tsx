'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
          <div className="text-sm text-gray-400 mb-12">Last Updated: October 29, 2025</div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using the Ameritech Payments website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Services Provided</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ameritech Payments provides payment processing services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Credit and debit card processing</li>
                <li>ACH and eCheck processing</li>
                <li>Point of sale (POS) systems and terminals</li>
                <li>Virtual terminal and payment gateway services</li>
                <li>Business funding solutions</li>
                <li>Payment processing for both low-risk and high-risk merchants</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Merchant Agreement</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Upon approval as a merchant, you will enter into a separate Merchant Processing Agreement that governs the specific terms of your payment processing services. This agreement will include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Processing rates and fees</li>
                <li>Settlement terms and timing</li>
                <li>Chargeback procedures and responsibilities</li>
                <li>Prohibited business types and transactions</li>
                <li>Compliance and regulatory requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Account Security</h2>
              <p className="text-gray-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify Ameritech Payments of any unauthorized use of your account or any other breach of security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Compliance Requirements</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All merchants must comply with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>PCI DSS (Payment Card Industry Data Security Standard)</li>
                <li>Card network rules and regulations</li>
                <li>Federal and state laws regarding payment processing</li>
                <li>Anti-money laundering (AML) and Know Your Customer (KYC) requirements</li>
                <li>Industry-specific regulations applicable to your business</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">6. Fees and Charges</h2>
              <p className="text-gray-300 leading-relaxed">
                All fees, rates, and charges will be disclosed in your Merchant Processing Agreement. Fees may include but are not limited to: transaction fees, monthly fees, equipment fees, chargeback fees, and early termination fees. You agree to pay all applicable fees in accordance with the terms of your agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">7. Chargebacks and Disputes</h2>
              <p className="text-gray-300 leading-relaxed">
                You are responsible for all chargebacks and disputes related to transactions processed through your account. We reserve the right to debit your account or establish a reserve to cover potential chargeback liabilities. You agree to provide all necessary documentation and assistance in resolving disputes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">8. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                Either party may terminate the service agreement with written notice as specified in your Merchant Processing Agreement. Ameritech Payments reserves the right to immediately suspend or terminate your account if we believe you have violated these terms, engaged in fraudulent activity, or pose an unacceptable risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">9. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Ameritech Payments shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services. Our total liability shall not exceed the fees paid by you in the three months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">10. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify and hold harmless Ameritech Payments, its affiliates, and service providers from any claims, damages, losses, liabilities, and expenses arising from your use of our services, your violation of these terms, or your violation of any rights of another party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">11. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All content, trademarks, service marks, and logos displayed on the Ameritech Payments website are the property of Ameritech Payments or their respective owners. You may not use, reproduce, or distribute any content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">12. Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">13. Modifications</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services following any changes constitutes acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">14. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the United States and the state in which Ameritech Payments is headquartered, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">15. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-gray-300">
                <p>Email: <a href="mailto:support@evolvemerchants.com" className="text-[#1e40af] hover:underline">support@evolvemerchants.com</a></p>
                <p>Phone: <a href="tel:+18332069763" className="text-[#1e40af] hover:underline">(833) 206-9763</a></p>
                <p>Hours: Monday - Friday, 8:00 AM - 5:00 PM</p>
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

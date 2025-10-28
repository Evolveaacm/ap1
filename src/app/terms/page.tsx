import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link href="/" className="flex items-center">
            <img src="/ameritech-logo.svg" alt="Ameritech Payments" className="h-12 md:h-14 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-black font-semibold hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-lg text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-lg">
          <p className="text-gray-600">
            By using Ameritech Payments services, you agree to these terms and conditions.
          </p>
          <p className="text-gray-600 mt-4">
            For questions about our terms, please contact us at <a href="mailto:support@evolvemerchants.com" className="text-blue-600 hover:underline">support@evolvemerchants.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

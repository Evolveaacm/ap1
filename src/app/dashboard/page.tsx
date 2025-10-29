'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-3">
      {/* Modern Dashboard - Darker Blue Theme */}
      <div className="relative w-full max-w-[420px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-25 rounded-full blur-[60px]"></div>

        <div className="relative bg-gradient-to-br from-gray-900/95 via-blue-950/30 to-gray-900/95 backdrop-blur-xl border-2 border-blue-900/50 rounded-xl p-3 shadow-2xl" style={{boxShadow: '0 0 50px rgba(15, 23, 42, 0.6), 0 0 25px rgba(30, 58, 138, 0.4) inset'}}>

          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h2 className="text-sm font-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">DASHBOARD</h2>
              <p className="text-[8px] text-gray-500">Real-time metrics</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[8px] text-gray-500">Live</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-2.5">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-blue-900/30 rounded-lg p-2 hover:border-blue-800/50 transition-all">
                <div className="text-[8px] text-blue-400 mb-0.5 uppercase tracking-wider font-semibold">Trans</div>
                <div className="text-lg font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">402</div>
                <div className="text-[8px] text-green-400 font-bold mt-0.5">↑ 18%</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-blue-800/30 rounded-lg p-2 hover:border-blue-700/50 transition-all">
                <div className="text-[8px] text-blue-400 mb-0.5 uppercase tracking-wider font-semibold">Avg</div>
                <div className="text-lg font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">$710</div>
                <div className="text-[8px] text-green-400 font-bold mt-0.5">↑ 12%</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-blue-900/30 rounded-lg p-2 hover:border-blue-800/50 transition-all">
                <div className="text-[8px] text-blue-400 mb-0.5 uppercase tracking-wider font-semibold">Success</div>
                <div className="text-lg font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">96%</div>
                <div className="text-[8px] text-green-400 font-bold mt-0.5">↑ 2%</div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-900/30 rounded-lg p-2.5 mb-2.5">
            <div className="text-[9px] text-blue-400 mb-1.5 uppercase tracking-wider font-semibold">7-Day Performance</div>
            <div className="relative h-16 bg-gradient-to-br from-blue-950/20 via-blue-900/20 to-blue-950/20 rounded-lg overflow-hidden">
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="brandFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 Q50,50 100,55 T200,45 T300,35 T400,40 L400,100 L0,100 Z" fill="url(#brandFill)"/>
                <path d="M0,60 Q50,50 100,55 T200,45 T300,35 T400,40" fill="none" stroke="url(#brandGradient)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-blue-900/30 rounded-lg p-2.5">
            <div className="text-[9px] text-blue-400 mb-2 uppercase tracking-wider font-semibold">Payment Breakdown</div>

            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent rounded-lg blur"></div>
                <div className="relative bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg p-2 border-l-3 border-blue-900">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-900 to-blue-800 rounded flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-black text-white">V</span>
                      </div>
                      <span className="text-[10px] text-white font-semibold">Visa</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white">$62,860</div>
                      <div className="text-[8px] text-blue-400">35%</div>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-900 to-blue-800 rounded-full transition-all duration-500" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-transparent rounded-lg blur"></div>
                <div className="relative bg-gradient-to-r from-blue-800/20 to-transparent rounded-lg p-2 border-l-3 border-blue-800">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-800 to-blue-900 rounded flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-black text-white">A</span>
                      </div>
                      <span className="text-[10px] text-white font-semibold">Amex</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white">$182,867</div>
                      <div className="text-[8px] text-blue-400">64%</div>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-800 to-blue-900 rounded-full transition-all duration-500" style={{width: '64%'}}></div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent rounded-lg blur"></div>
                <div className="relative bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg p-2 border-l-3 border-blue-900">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-900 to-blue-800 rounded flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-black text-white">M</span>
                      </div>
                      <span className="text-[10px] text-white font-semibold">Mastercard</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white">$40,002</div>
                      <div className="text-[8px] text-blue-400">22%</div>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-900 to-blue-800 rounded-full transition-all duration-500" style={{width: '22%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function StockDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [error, setError] = useState('');

  // Stock data for the table
  const stockData = [
    { id: 1, symbol: 'AAPL', company: 'Apple Inc.', price: 178.25, change: '+2.34%', volume: '52.3M' },
    { id: 2, symbol: 'GOOGL', company: 'Alphabet Inc.', price: 142.89, change: '+1.12%', volume: '28.7M' },
    { id: 3, symbol: 'MSFT', company: 'Microsoft Corp.', price: 412.56, change: '-0.45%', volume: '31.2M' },
    { id: 4, symbol: 'AMZN', company: 'Amazon.com Inc.', price: 178.35, change: '+3.21%', volume: '45.8M' },
    { id: 5, symbol: 'TSLA', company: 'Tesla Inc.', price: 242.18, change: '-1.67%', volume: '98.4M' },
    { id: 6, symbol: 'NVDA', company: 'NVIDIA Corp.', price: 495.22, change: '+5.43%', volume: '52.1M' },
    { id: 7, symbol: 'META', company: 'Meta Platforms Inc.', price: 489.74, change: '+2.89%', volume: '18.9M' },
    { id: 8, symbol: 'JPM', company: 'JPMorgan Chase & Co.', price: 198.45, change: '+0.76%', volume: '12.4M' },
    { id: 9, symbol: 'NFLX', company: 'Netflix Inc.', price: 612.43, change: '+1.58%', volume: '14.7M' },
    { id: 10, symbol: 'ORCL', company: 'Oracle Corp.', price: 115.29, change: '-0.72%', volume: '9.3M' },
    { id: 11, symbol: 'INTC', company: 'Intel Corp.', price: 42.87, change: '+0.91%', volume: '33.5M' },
    { id: 12, symbol: 'IBM', company: 'International Business Machines', price: 173.12, change: '+0.54%', volume: '6.8M' },
    { id: 13, symbol: 'KO', company: 'Coca-Cola Co.', price: 59.23, change: '-0.36%', volume: '18.2M' },
    { id: 14, symbol: 'PEP', company: 'PepsiCo Inc.', price: 167.48, change: '+0.27%', volume: '10.1M' },
    { id: 15, symbol: 'WMT', company: 'Walmart Inc.', price: 159.84, change: '+1.09%', volume: '8.9M' },
    { id: 16, symbol: 'BAC', company: 'Bank of America Corp.', price: 32.75, change: '-0.14%', volume: '52.9M' },
    { id: 17, symbol: 'DIS', company: 'The Walt Disney Company', price: 91.43, change: '+2.41%', volume: '23.4M' },
    { id: 18, symbol: 'ADBE', company: 'Adobe Inc.', price: 567.12, change: '-1.12%', volume: '4.9M' }

  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignup) {
      // Signup logic
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[username]) {
        setError('Username already exists');
        return;
      }
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', username);
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[username] === password) {
        localStorage.setItem('currentUser', username);
        setIsLoggedIn(true);
        setCurrentUser(username);
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser('');
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">StockHub</h1>
              <p className="text-slate-400">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg"
              >
                {isSignup ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">StockHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Hello,</p>
                <p id="username-display" className="text-lg font-semibold text-white">{currentUser}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition duration-200 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-1">S&P 500</p>
              <p className="text-2xl font-bold text-white mb-1">4,783.45</p>
              <p className="text-green-400 text-sm">+1.24%</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-1">NASDAQ</p>
              <p className="text-2xl font-bold text-white mb-1">15,095.14</p>
              <p className="text-green-400 text-sm">+2.01%</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-1">DOW JONES</p>
              <p className="text-2xl font-bold text-white mb-1">37,248.35</p>
              <p className="text-red-400 text-sm">-0.33%</p>
            </div>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Top Stocks</h2>
          </div>
          <div className="overflow-x-auto">
            <table id="stock-table" className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {stockData.map((stock) => (
                  <tr key={stock.id} className="hover:bg-slate-750 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-blue-400">{stock.symbol}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{stock.company}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-semibold text-white">${stock.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm text-slate-400">{stock.volume}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer class="bg-gray-900 border border-gray-800">
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex justify-center text-teal-600 sm:justify-start">
        <span class="text-lg font-bold">Stock Hub</span>
      </div>

      <p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
        Copyright © 2025. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}
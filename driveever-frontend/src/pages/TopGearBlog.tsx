import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, User, MessageCircle, Facebook, Twitter, Instagram, Youtube, Mail, Share2, ChevronRight, Home, FileText, BarChart3 } from 'lucide-react'

const TopGearBlog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="text-sm font-medium text-gray-600">Top Gear</div>
            <div className="text-sm text-gray-500">The Ultimate Car Blog</div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-driveever-blue hover:text-blue-800">Top Gear</Link>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-driveever-blue">News</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Reviews</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Sell your car</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Value your car</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Car reviews</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Car buying</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Electric cars</a>
                <a href="#" className="text-gray-700 hover:text-driveever-blue">Buy a car online</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-driveever-blue" />
              <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-driveever-blue" />
              <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-driveever-blue" />
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-driveever-blue hover:underline">Home</Link></li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li><a href="#" className="text-driveever-blue hover:underline">Car Reviews & News</a></li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li><a href="#" className="text-driveever-blue hover:underline">News</a></li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-600">New Tesla Model 3 Performance: Specs, price and release info</li>
            </ol>
          </nav>
          
          {/* Quick Navigation */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/vehicle-check" className="inline-flex items-center px-3 py-1 bg-driveever-blue text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
              <FileText className="w-3 h-3 mr-1" />
              Vehicle Check
            </Link>
            <Link to="/learner-dashboard" className="inline-flex items-center px-3 py-1 bg-driveever-green text-white text-xs rounded-full hover:bg-green-700 transition-colors">
              <BarChart3 className="w-3 h-3 mr-1" />
              Learner Dashboard
            </Link>
            <Link to="/dashboard" className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-xs rounded-full hover:bg-gray-700 transition-colors">
              <BarChart3 className="w-3 h-3 mr-1" />
              Main Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              New Tesla Model 3 Performance: Specs, price and release info
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              An all-new high-performance Model 3 will be revealed at the famous Munich Motor show
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Tesla Model 3 Performance Interior"
              className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-driveever-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TG</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">By Top Gear Team</p>
                <p className="text-sm text-gray-600">Published 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-driveever-blue hover:bg-gray-100 rounded-full">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Tesla has announced an all-new high-performance version of the Model 3, set to debut at the Munich Motor Show. 
                The new Model 3 Performance promises to deliver even more power, range, and cutting-edge technology than its predecessor.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Design and models available</h2>
              <p>
                The new Model 3 Performance features a refreshed design language that builds on Tesla's minimalist aesthetic. 
                The front end gets a new grille design that's more aerodynamic, while the overall silhouette remains instantly recognizable. 
                Tesla has also introduced new wheel designs and color options specifically for the Performance variant.
              </p>

              <div className="my-8">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Tesla Model 3 Performance Exterior"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Interior and tech</h2>
              <p>
                Inside, the Model 3 Performance gets Tesla's latest MBUX Hyperscreen system, which spans the entire width of the dashboard. 
                The interior space has been optimized for both driver and passengers, with premium materials throughout. 
                Ambient lighting can be customized to match your mood, and the sound system has been upgraded for an even more immersive experience.
              </p>

              <div className="my-8">
                <img 
                  src="https://images.unsplash.com/photo-1606152421802-db97b7c7a1f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Tesla Model 3 Performance Dashboard"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Batteries and range</h2>
              <p>
                The new Model 3 Performance is built on Tesla's latest electric platform, featuring improved battery technology 
                that delivers up to 350 miles of range on a single charge. The charging system has also been upgraded, 
                supporting faster DC fast charging for shorter stop times on long journeys.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Price and release</h2>
              <p>
                Tesla has announced that the new Model 3 Performance will start at £65,000, with deliveries beginning in March 2024. 
                The company is already taking pre-orders, with early adopters getting priority delivery and exclusive access to 
                Tesla's Supercharger network.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What other cars from Tesla are due this year?</h2>
              <p>
                Tesla has a busy year ahead, with the Model Y refresh, the new Cybertruck, and updates to the Model S and Model X 
                all expected to launch throughout 2024. The company is also working on its next-generation platform, 
                which will underpin future models.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What other cars will this compete with?</h2>
              <p>
                The new Model 3 Performance will face stiff competition from the BMW i4 M50, Mercedes-AMG EQE, and Audi RS e-tron GT. 
                However, Tesla's established charging network and over-the-air update capability give it a significant advantage 
                in the electric performance car segment.
              </p>
            </div>
          </div>
        </article>

        {/* Search Section */}
        <section className="my-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Top Gear for...</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-driveever-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              New cars
            </button>
            <button className="bg-driveever-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Used cars
            </button>
            <button className="bg-driveever-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Car leasing
            </button>
          </div>
        </section>

        {/* Related Articles */}
        <section className="my-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Other articles related to Electric cars</h3>
          <div className="space-y-4">
            {[
              "Sustainability Newsletter - September 2024",
              "Choosing the right EV for £120,000",
              "Electric car charging: Everything you need to know",
              "Best electric SUVs for families in 2024",
              "Tesla vs BMW: Electric car comparison"
            ].map((title, index) => (
              <a key={index} href="#" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 hover:text-driveever-blue">{title}</h4>
              </a>
            ))}
          </div>
          <button className="mt-4 text-driveever-blue font-semibold hover:underline">
            View more articles
          </button>
        </section>

        {/* Related Topics */}
        <section className="my-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Topics</h3>
          <div className="flex flex-wrap gap-3">
            {["Electric cars", "Coming Soon", "Tesla", "Performance", "SUVs", "Technology"].map((topic, index) => (
              <button key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-driveever-blue hover:text-white transition-colors">
                {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="my-12 bg-driveever-blue rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Send me great Top Gear offers and the latest vehicle reviews</h3>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <input 
              type="email" 
              placeholder="e.g. name@example.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-driveever-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Sign up
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-2">
            By signing up, you agree to our Terms and Conditions and Privacy Policy. 
            You can unsubscribe at any time.
          </p>
        </section>

        {/* Social Media Follow */}
        <section className="my-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow us on social media</h3>
          <div className="flex space-x-4">
            <button className="p-3 bg-gray-100 rounded-full hover:bg-driveever-blue hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-driveever-blue hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-driveever-blue hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-driveever-blue hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6">Top Gear</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">Security & trust</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                    <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Community</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">About Top Gear</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h5 className="font-semibold mb-2">Help us improve our website</h5>
                <button className="bg-driveever-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send feedback
                </button>
              </div>
              <div className="flex space-x-4 mb-6">
                <button className="p-2 bg-gray-700 rounded-full hover:bg-driveever-blue transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-700 rounded-full hover:bg-driveever-blue transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-700 rounded-full hover:bg-driveever-blue transition-colors">
                  <Youtube className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-700 rounded-full hover:bg-driveever-blue transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-gray-300">
                <p>© 2024 Top Gear. All rights reserved.</p>
                <p className="mt-2">Top Gear is part of the DriveEver family of brands.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TopGearBlog

import Link from 'next/link';
import { ChartBarIcon, ShieldCheckIcon, TicketIcon, UserGroupIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen text-center flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 shadow-md bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-orange-500 text-2xl font-bold flex items-center gap-2">
            <TicketIcon className="h-8 w-8" />
            Ticketing System
          </h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-grow flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">
            Revolutionize Your <span className="text-orange-500">Support</span> Management
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-150">
            Empower your team with AI-enhanced ticket resolution, real-time analytics, and seamless collaboration.
          </p>

          <div className="flex justify-center space-x-6 animate-fade-in delay-300">
            <Link href="/login" className="primary-button">
              Get Started
            </Link>
            <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 mx-auto max-w-6xl bg-gray-800/50 rounded-xl p-4 shadow-xl animate-fade-in">
            <div className="bg-gray-700 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Dashboard Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div className="card hover-scale">
            <ChartBarIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold mb-2">95%</h3>
            <p className="text-gray-300">Faster Resolution Time</p>
          </div>
          <div className="card hover-scale">
            <UserGroupIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold mb-2">10k+</h3>
            <p className="text-gray-300">Active Users</p>
          </div>
          <div className="card hover-scale">
            <ShieldCheckIcon className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-3xl font-bold mb-2">99.9%</h3>
            <p className="text-gray-300">Uptime Guarantee</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Smart Automation', icon: TicketIcon, desc: 'AI-powered ticket routing and prioritization' },
              { title: 'Real-time Analytics', icon: ChartBarIcon, desc: 'Live dashboard with actionable insights' },
              { title: 'Team Collaboration', icon: UserGroupIcon, desc: 'Built-in chat and comment system' },
              { title: 'Custom Workflows', icon: ShieldCheckIcon, desc: 'Tailor processes to your needs' },
              { title: 'Multi-channel Support', icon: ChatBubbleLeftRightIcon, desc: 'Email, chat, and social integration' },
              { title: '24/7 Support', icon: QuestionMarkCircleIcon, desc: 'Round-the-clock technical assistance' },
            ].map((feature, index) => (
              <div key={index} className="card hover-scale p-8">
                <feature.icon className="h-12 w-12 text-orange-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CTO, TechCorp',
                text: 'The ticketing system transformed our support operations. Resolution times dropped by 40% in the first month!',
                avatar: '👩💼',
              },
              {
                name: 'Michael Chen',
                role: 'Support Manager',
                text: 'Intuitive interface and powerful features. Our team adoption was seamless and immediate.',
                avatar: '👨💻',
              },
            ].map((testimonial, index) => (
              <div key={index} className="card hover-scale p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-orange-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="w-full bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto py-16">
          <div className="grid md:grid-cols-4 gap-8 text-left">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TicketIcon className="h-6 w-6 mr-2 text-orange-500" />
                Ticketing System
              </h3>
              <p className="text-gray-400">Empowering teams with intelligent support solutions since 2023.</p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="footer-link">Features</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">Cookie Policy</a></li>
                <li><a href="#" className="footer-link">GDPR</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="text-gray-400">support@ticketsys.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">💼</a>
                  <a href="#" className="social-icon">📘</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Ticketing System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
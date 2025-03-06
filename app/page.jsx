import Link from 'next/link';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  TicketIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon, 
  QuestionMarkCircleIcon, 
  ArrowPathIcon, 
  LifebuoyIcon, 
  ClockIcon,
  EyeIcon  
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full text-center flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-grow flex flex-col items-center justify-center pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-yellow-300">
            Excellent Ticket Support with
            <span className="text-orange-500 dark:text-orange-400 block mt-2">
              Modern Ticketing System
            </span>
          </h1>
          
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-yellow-300/90">
           Ticket management solution with role-based access control 
          </p>

          <div className="flex justify-center space-x-6 mb-16">
            <Link href="/login" className="primary-button">
              Get Started
            </Link>
            <Link href="/signup" className="primary-button">
              Create Account
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 mx-auto max-w-6xl bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow-xl animate-fade-in">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gray-100">
                <EyeIcon className="h-5 w-5" />
                User Dashboard Preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-yellow-300">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: TicketIcon, 
                title: 'Create Ticket', 
                desc: 'Submit your support request through our simple form or email integration'
              },
              { 
                icon: ArrowPathIcon, 
                title: 'Track Progress', 
                desc: 'Monitor real-time updates and team interactions'
              },
              { 
                icon: LifebuoyIcon, 
                title: 'Resolve Issues', 
                desc: 'Get Modern Ticketing solutions and expert support'
              }
            ].map((step, index) => (
              <div key={index} className="card hover-scale p-6">
                <step.icon className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2 dark:text-yellow-300">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ClockIcon, value: '24/7', label: 'Support Availability' },
              { icon: UserGroupIcon, value: '10k+', label: 'Active Teams' },
              { icon: ShieldCheckIcon, value: '99.9%', label: 'Uptime Guarantee' },
            ].map((stat, index) => (
              <div key={index} className="card hover-scale p-6">
                <stat.icon className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4 mx-auto" />
                <h3 className="text-3xl font-bold mb-2 dark:text-yellow-300">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-yellow-300">
            Powerful Features for Modern Teams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Smart Automation', icon: TicketIcon, desc: 'Modern Ticket routing and prioritization' },
              { title: 'Real-time Analytics', icon: ChartBarIcon, desc: 'Live dashboard with actionable insights' },
              { title: 'Team Collaboration', icon: UserGroupIcon, desc: 'Built-in chat and comment system' },
              { title: 'Custom Workflows', icon: ShieldCheckIcon, desc: 'Tailor processes to your needs' },
              { title: 'Multi-channel Support', icon: ChatBubbleLeftRightIcon, desc: 'Email, chat, and social integration' },
              { title: 'Instant Notifications', icon: QuestionMarkCircleIcon, desc: 'Real-time updates and alerts' },
            ].map((feature, index) => (
              <div key={index} className="card hover-scale p-5">
                <feature.icon className="h-10 w-10 text-orange-500 dark:text-orange-400 mb-3 mx-auto" />
                <h3 className="text-xl font-bold mb-2 dark:text-yellow-300">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-yellow-300">
            Trusted by User
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
  {
    name: 'Mulugeta Tesfaye',
    role: 'CTO, TechCorp',
    text: 'Cut our resolution time by 40% while boosting customer satisfaction.',
    avatar: '👩💼',
  },
  {
    name: 'Tadesse Bekele',
    role: 'Support Lead',
    text: 'The user-friendly interface made it easy for our team to adopt the system in just 2 days.',
    avatar: '👨💻',
  },
  {
    name: 'Selamawit Negussie',
    role: 'Product Manager',
    text: 'Custom workflows revolutionized our approach to handling complex support cases.',
    avatar: '👩💻',
  },
  {
    name: 'Abebe Teshome',
    role: 'Startup Founder',
    text: 'Perfect solution for our expanding team - scales effortlessly as we grow.',
    avatar: '👨💼',
  }
].map((testimonial, index) => (
              <div key={index} className="card hover-scale p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-lg font-bold dark:text-yellow-300">{testimonial.name}</h4>
                    <p className="text-orange-500 dark:text-orange-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const features = [
    {
      title: 'AI Based Course Selector',
      icon: '/images/ai-course-selector.svg',
      description: 'Find the perfect course tailored to your goals',
    },
    {
      title: 'AI Based Scenarios',
      icon: '/images/ai-scenarios.svg',
      description: 'Practice with real-world scenarios',
    },
    {
      title: 'AI Based Quiz/Tests',
      icon: '/images/ai-quiz.svg',
      description: 'Test your knowledge with AI-powered assessments',
    },
    {
      title: 'AI Based Gamification',
      icon: '/images/ai-gamification.svg',
      description: 'Learn through interactive games',
    },
  ];

  const courses = [
    { id: 'angular', title: 'Angular JS', image: '/images/angular-hero.png', description: 'A JavaScript-based open-source front-end web framework' },
    { id: 'aws', title: 'AWS', image: '/images/aws.svg', description: 'AWS Cloud training and certification courses' },
    { id: 'vuejs', title: 'Vue JS', image: '/images/vuejs.svg', description: 'An open-source model-view-viewmodel JavaScript framework' },
    { id: 'powerbi', title: 'Power BI', image: '/images/powerbi.svg', description: 'An interactive data visualization software' },
    { id: 'python', title: 'Python', image: '/images/python.png', description: 'Python is an interpreted high-level general purpose programming language' },
    { id: 'reactjs', title: 'React JS', image: '/images/reactjs.png', description: 'React is a free and open-source front-end JavaScript library' },
    { id: 'testing', title: 'Software Testing', image: '/images/testing.png', description: 'The process of evaluating and verifying software' },
    { id: 'coreui', title: 'Core UI', image: '/images/coreui.png', description: 'Learn the fastest way to build a modern dashboard' },
  ];

  const howItWorks = [
    { step: '01', title: 'College Courses', description: 'Access college-level courses' },
    { step: '02', title: 'Practice Papers', description: 'Practice with real exam papers' },
    { step: '03', title: 'Trainers', description: 'Learn from expert trainers' },
    { step: '04', title: 'Corporates', description: 'Corporate training programs' },
  ];

  const mentors = [
    { name: 'Sandeep', role: 'Senior Developer', rating: 4.8, image: '/images/user-avatar.svg' },
    { name: 'Sudhansu', role: 'AWS Expert', rating: 4.9, image: '/images/user-avatar.svg' },
    { name: 'Ruchika Tuteja', role: 'Data Analyst', rating: 4.7, image: '/images/user-avatar.svg' },
  ];

  const certifications = [
    { name: 'ISO 27001', image: '/images/cert-iso27001.svg' },
    { name: 'ISO 9001', image: '/images/cert-iso9001.svg' },
    { name: 'ISO 20000', image: '/images/cert-iso20000.svg' },
    { name: 'ISO 22003', image: '/images/cert-iso22003.svg' },
  ];

  const collaborations = [
    { name: 'NASSCOM', image: '/images/collab-1.svg' },
    { name: 'Startup India', image: '/images/collab-2.svg' },
    { name: 'T-Hub', image: '/images/collab-3.svg' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Header variant="light" />

      {/* Hero Section */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[200px] pb-10 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-[82px] bg-[#fdfdfd]">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-poppins font-bold text-[32px] md:text-[44px] lg:text-[60px] leading-[1.1] text-[#003f7d] mb-4 md:mb-6">
                Skill Your Way<br />
                Up To Success<br />
                <span className="text-[#f98149]">With Us</span>
              </h1>
              <p className="text-[#5f6265] font-poppins text-base md:text-lg lg:text-[20px] mb-6 md:mb-8 max-w-[500px] mx-auto lg:mx-0">
                Let us help you stay ahead of the curve with our world-class corporate trainings.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#003f7d] text-white font-poppins text-base md:text-[18px] font-semibold rounded-lg hover:bg-[#002f5d] transition-colors text-center"
                >
                  View Courses
                </Link>
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-[#f98149] text-[#f98149] font-poppins text-base md:text-[18px] font-semibold rounded-lg hover:bg-[#f98149] hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <img
                src="/images/hero-image.png"
                alt="Learning illustration"
                className="max-w-[300px] md:max-w-[450px] lg:max-w-[600px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-10 md:py-12 lg:py-16 px-4 md:px-8 lg:px-[82px] bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-poppins font-bold text-[24px] md:text-[32px] lg:text-[40px] text-[#003f7d] mb-2 md:mb-4">
              World's First <span className="text-[#f98149]">AI Based</span>
            </h2>
            <p className="font-poppins font-bold text-[24px] md:text-[32px] lg:text-[40px] text-[#f98149]">
              Online Learning Platform
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] p-6 md:p-8 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center h-full min-h-[220px]"
              >
                <div className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] mb-4 md:mb-6 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <img src={feature.icon} alt={feature.title} className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] object-contain" />
                </div>
                <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-[#003f7d] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#5f6265] font-poppins text-[12px] md:text-[14px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Development Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#fdfdfd]">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-3 md:mb-4">
            <span className="text-[#f98149] font-poppins text-[12px] md:text-[16px] tracking-wider">
              WHO CAN JOIN
            </span>
          </div>
          <h2 className="text-center font-poppins font-bold text-[28px] md:text-[36px] lg:text-[44px] text-[#003f7d] mb-8 md:mb-12">
            Skill Development<br />
            <span className="text-[#f98149]">Schemes For All</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-[60px] md:w-[80px] lg:w-[100px] h-[60px] md:h-[80px] lg:h-[100px] mx-auto mb-3 md:mb-4 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <span className="font-poppins font-bold text-[20px] md:text-[26px] lg:text-[32px] text-[#f98149]">{item.step}</span>
                </div>
                <h3 className="font-poppins font-semibold text-[14px] md:text-[18px] lg:text-[20px] text-[#003f7d] mb-1 md:mb-2">{item.title}</h3>
                <p className="text-[#5f6265] font-poppins text-[11px] md:text-[13px] lg:text-[14px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#003f7d]">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block px-4 md:px-6 py-2 bg-[#f98149] text-white font-poppins text-[14px] md:text-[16px] font-semibold rounded-full mb-4">
              How It Works
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="bg-white/10 rounded-[20px] p-4 md:p-6 text-center">
                <div className="w-[40px] md:w-[50px] lg:w-[60px] h-[40px] md:h-[50px] lg:h-[60px] mx-auto mb-3 md:mb-4 bg-[#f98149] rounded-full flex items-center justify-center">
                  <span className="font-poppins font-bold text-[18px] md:text-[20px] lg:text-[24px] text-white">{step}</span>
                </div>
                <p className="text-white font-poppins text-[13px] md:text-[14px] lg:text-[16px]">
                  Step {step} description
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#003f7d]">
        <div className="max-w-[1920px] mx-auto">
          <h2 className="text-center font-poppins font-bold text-[28px] md:text-[36px] lg:text-[44px] mb-8 md:mb-12">
            <span className="text-white">Popular</span>{' '}
            <span className="text-[#f98149]">Courses</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {courses.slice(0, 8).map((course, index) => (
              <Link
                key={index}
                to={`/course/${course.id}`}
                className="bg-white rounded-[20px] overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="h-[100px] md:h-[120px] lg:h-[140px] bg-gradient-to-br from-[#003f7d] to-[#0056a8] flex items-center justify-center p-4">
                  <img src={course.image} alt={course.title} className="max-h-[70px] md:max-h-[85px] lg:max-h-[100px] object-contain" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-poppins font-semibold text-[14px] md:text-[16px] lg:text-[18px] text-[#003f7d] mb-1 md:mb-2">{course.title}</h3>
                  <p className="text-[#5f6265] text-[11px] md:text-[12px] mb-2 md:mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#f98149] text-[11px] md:text-[12px] font-semibold">Download Curriculum</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#fff5ef]">
        <div className="max-w-[1920px] mx-auto">
          <h2 className="text-center font-poppins font-bold text-[28px] md:text-[36px] lg:text-[44px] mb-8 md:mb-12">
            <span className="text-[#003f7d]">Our</span>{' '}
            <span className="text-[#f98149]">Achievements</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <img src="/images/certificate.svg" alt="Achievements" className="max-w-[300px] md:max-w-[400px] lg:max-w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 order-1 lg:order-2">
              <div className="bg-white rounded-[20px] p-4 md:p-6 lg:p-8 text-center shadow-md">
                <span className="font-poppins font-bold text-[36px] md:text-[48px] lg:text-[60px] text-[#f98149]">100</span>
                <p className="text-[#5f6265] font-poppins text-[12px] md:text-[14px] lg:text-[18px]">IT Students Impacted</p>
              </div>
              <div className="bg-white rounded-[20px] p-4 md:p-6 lg:p-8 text-center shadow-md">
                <span className="font-poppins font-bold text-[36px] md:text-[48px] lg:text-[60px] text-[#f98149]">50</span>
                <p className="text-[#5f6265] font-poppins text-[12px] md:text-[14px] lg:text-[18px]">Hiring Companies</p>
              </div>
              <div className="col-span-2 bg-white rounded-[20px] p-4 md:p-6 lg:p-8 text-center shadow-md">
                <span className="font-poppins font-bold text-[36px] md:text-[48px] lg:text-[60px] text-[#f98149]">70%</span>
                <p className="text-[#5f6265] font-poppins text-[12px] md:text-[14px] lg:text-[18px]">Students placed in Fortune 500 companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#fdfdfd]">
        <div className="max-w-[1920px] mx-auto">
          <h2 className="text-center font-poppins font-bold text-[24px] md:text-[32px] lg:text-[44px] mb-2 md:mb-4">
            <span className="text-[#003f7d]">Meet Our Professional</span>
          </h2>
          <p className="text-center font-poppins font-bold text-[24px] md:text-[32px] lg:text-[44px] text-[#f98149] mb-8 md:mb-12">
            Mentors & Trainers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-white rounded-[30px] shadow-md p-6 md:p-8 text-center">
                <div className="w-[100px] md:w-[120px] lg:w-[150px] h-[100px] md:h-[120px] lg:h-[150px] mx-auto mb-4 md:mb-6 rounded-full overflow-hidden bg-gray-200">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[24px] text-[#003f7d] mb-1 md:mb-2">{mentor.name}</h3>
                <p className="text-[#5f6265] font-poppins text-[14px] md:text-[15px] lg:text-[16px] mb-3 md:mb-4">{mentor.role}</p>
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#ffc107]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-[#5f6265] text-[12px] md:text-[14px] ml-2">{mentor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-white">
        <div className="max-w-[1920px] mx-auto">
          <h2 className="text-center font-poppins font-bold text-[28px] md:text-[36px] lg:text-[44px] mb-8 md:mb-12">
            <span className="text-[#003f7d]">Our</span>{' '}
            <span className="text-[#f98149]">Certifications</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {certifications.map((cert, index) => (
              <div key={index} className="w-[80px] md:w-[120px] lg:w-[150px] h-[80px] md:h-[120px] lg:h-[150px] flex items-center justify-center">
                <img src={cert.image} alt={cert.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px] bg-[#fdfdfd]">
        <div className="max-w-[1920px] mx-auto">
          <h2 className="text-center font-poppins font-bold text-[28px] md:text-[36px] lg:text-[44px] mb-8 md:mb-12">
            <span className="text-[#003f7d]">Our</span>{' '}
            <span className="text-[#f98149]">Collaborations</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {collaborations.map((collab, index) => (
              <div key={index} className="h-[40px] md:h-[50px] lg:h-[60px] flex items-center justify-center">
                <img src={collab.image} alt={collab.name} className="max-h-full object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

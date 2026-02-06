import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/about' },
    { label: 'Best Courses', path: '/courses' },
    { label: "Your FAQ's", path: '/faq' },
    { label: 'Cancellation & Refunds', path: '/refunds' },
    { label: 'Contact US', path: '/contact' },
  ];

  return (
    <footer className="bg-[#003f7d] w-full">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[156px] py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1 lg:col-span-4">
            <Link to="/">
              <img
                src="/images/logo-white.svg"
                alt="EZY Skills"
                className="h-[80px] md:h-[90px] lg:h-[107px] w-auto object-contain mb-6 md:mb-8"
              />
            </Link>
            <p className="text-white text-base md:text-lg lg:text-[22px] font-poppins leading-normal tracking-[-0.3px] mb-8 md:mb-12">
              Let Us build your career together Be the first person to transform yourself with our unique & world class corporate level trainings.
            </p>
            
            <h3 className="text-[#f8eee7] text-xl md:text-2xl lg:text-[30px] font-poppins font-semibold mb-4 md:mb-6">
              Subscribe Our Newsletter
            </h3>
            
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Your Email address"
                className="w-full bg-transparent border-b border-white/10 pb-4 text-white/50 text-base md:text-lg lg:text-[20px] font-poppins placeholder:text-white/50 focus:outline-none pr-20"
              />
              <button className="footer-newsletter-button absolute right-0 top-0 w-[60px] md:w-[80px] h-[45px] md:h-[50px] bg-[#f98149] rounded-t-lg flex items-center justify-center hover:bg-[#e6733d] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-3 lg:col-start-6">
            <h3 className="text-2xl md:text-3xl lg:text-[38px] font-poppins font-semibold mb-6 md:mb-8">
              <span className="text-white">Quick</span>{' '}
              <span className="text-[#ff8b36]">Links</span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white text-base md:text-lg lg:text-[22px] font-poppins hover:text-[#ff8b36] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="text-2xl md:text-3xl lg:text-[38px] font-poppins font-semibold mb-6 md:mb-8">
              <span className="text-white">Contact</span>{' '}
              <span className="text-[#ff8b36]">Us</span>
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3 md:gap-4">
                <img src="/images/location-icon.svg" alt="Location" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1" />
                <p className="text-white text-base md:text-lg lg:text-[22px] font-poppins leading-[1.474]">
                  Navakethan Complex,<br />
                  6th Floor, 605, 606 A&P opp,<br />
                  CLock Tower, SD Road,<br />
                  Secunderabad, Telangana<br />
                  500003
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 md:gap-4">
                <img src="/images/mail-icon.svg" alt="Email" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <a href="mailto:info@ezyskills.in" className="text-white text-base md:text-lg lg:text-[22px] font-poppins hover:text-[#ff8b36] transition-colors">
                  info@ezyskills.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 md:gap-4">
                <img src="/images/phone-icon.svg" alt="Phone" className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1" />
                <div className="text-white text-base md:text-lg lg:text-[22px] font-poppins leading-[1.474]">
                  <p>+91 8428448903</p>
                  <p>+91 9475484959</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6 md:mt-8">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/facebook-icon.svg" alt="Facebook" className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/twitter-icon.svg" alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/instagram-icon.svg" alt="Instagram" className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/images/youtube-icon.svg" alt="YouTube" className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/terms" className="text-white text-sm md:text-base lg:text-[18px] font-poppins tracking-[-0.2px] hover:text-[#ff8b36] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-white text-sm md:text-base lg:text-[18px] font-poppins tracking-[-0.2px] hover:text-[#ff8b36] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

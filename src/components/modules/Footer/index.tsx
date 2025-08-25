import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer: FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert("Thanks for subscribing!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full p-5">
      <div className="w-full bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Newsletter */}
          <div>
            <h3 className="uppercase tracking-wide text-gray-900 text-sm sm:text-base font-semibold mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 text-sm leading-6 mb-4">
              And be the first to know about the latest releases, offers and news from Bagstore.com
            </p>
            <form className="flex items-stretch gap-2" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                required 
                placeholder="Enter your email here" 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
              />
              <button 
                type="submit" 
                className="px-4 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <label className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span>I have read and agree to the bagstore privacy policy</span>
            </label>
            <div className="mt-6 flex items-center gap-6 text-3xl text-gray-700">
              <span>💳</span>
              <span>💰</span>
              <span>💵</span>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/products" className="hover:text-gray-900">Men</Link></li>
              <li><Link to="/products" className="hover:text-gray-900">Women</Link></li>
              <li><Link to="/products" className="hover:text-gray-900">Children</Link></li>
              <li><Link to="/products" className="hover:text-gray-900">Brand</Link></li>
              <li><Link to="/products" className="hover:text-gray-900">New</Link></li>
              <li><Link to="/products" className="hover:text-gray-900">Popular</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/shipping" className="hover:text-gray-900">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Help & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-gray-500">
            <Link to="#" aria-label="Instagram" className="hover:text-gray-900">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link to="#" aria-label="Facebook" className="hover:text-gray-900">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-gray-900">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
          <button 
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
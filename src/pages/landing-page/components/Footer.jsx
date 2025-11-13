import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Updates', href: '#updates' }
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Mental Health Resources', href: '#resources' },
      { label: 'Community', href: '#community' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'HIPAA Compliance', href: '#hipaa' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'Facebook', icon: 'Facebook', href: '#facebook' },
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' }
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="font-heading font-semibold text-xl text-primary">MindTracker</span>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                A comprehensive mental health tracking platform designed to help you monitor your emotional well-being, reflect through journaling, and gain insights into your mental health patterns.
              </p>
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                {footerLinks?.product?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Support</h3>
              <ul className="space-y-3">
                {footerLinks?.support?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                {footerLinks?.legal?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} MindTracker. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Lock" size={14} className="text-success" />
                  <span>SSL Secured</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/user-registration">
                <span className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium">
                  Get Started
                </span>
              </Link>
              <Link to="/user-login">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mental Health Disclaimer */}
        <div className="py-4 border-t border-border/50 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Important:</strong> MindTracker is designed for self-monitoring and wellness tracking. It is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please contact your healthcare provider or emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
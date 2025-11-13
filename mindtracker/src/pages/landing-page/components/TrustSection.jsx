import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustSignals = [
    {
      id: 1,
      icon: "Shield",
      title: "HIPAA Compliant",
      description: "Your health data is protected with industry-standard security measures and encryption protocols.",
      badge: "Certified"
    },
    {
      id: 2,
      icon: "Lock",
      title: "End-to-End Encryption",
      description: "All your personal data and journal entries are encrypted both in transit and at rest.",
      badge: "256-bit SSL"
    },
    {
      id: 3,
      icon: "Eye",
      title: "Privacy First Design",
      description: "We never share your personal data. Your mental health journey remains completely private.",
      badge: "Zero Tracking"
    },
    {
      id: 4,
      icon: "Award",
      title: "Mental Health Certified",
      description: "Developed in consultation with licensed mental health professionals and therapists.",
      badge: "Professional"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50,000+", icon: "Users" },
    { label: "Journal Entries", value: "2M+", icon: "BookOpen" },
    { label: "Mood Entries", value: "10M+", icon: "Heart" },
    { label: "Privacy Rating", value: "5/5", icon: "Star" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="ShieldCheck" size={16} />
            <span>Trusted & Secure Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Your Privacy & Security
            <span className="block text-primary">Are Our Priority</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We understand the sensitive nature of mental health data. That's why we've built MindTracker with the highest security standards and privacy protections.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustSignals?.map((signal) => (
            <div
              key={signal?.id}
              className="bg-card rounded-xl p-6 shadow-medium border border-border/50 hover:shadow-pronounced transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors duration-300">
                    <Icon name={signal?.icon} size={20} className="text-success" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{signal?.title}</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {signal?.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {signal?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-medium border border-border/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SOC 2 Type II</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Lock" size={16} className="text-success" />
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Award" size={16} className="text-success" />
            <span>Mental Health Alliance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
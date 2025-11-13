import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Smile",
      title: "Daily Mood Tracking",
      description: "Monitor your emotional well-being with our intuitive 5-level emoji system. Track patterns and identify triggers with ease.",
      gradient: "from-primary to-primary/70"
    },
    {
      id: 2,
      icon: "BookOpen",
      title: "Reflective Journaling",
      description: "Express your thoughts and feelings through private journaling. Create meaningful entries to process your daily experiences.",
      gradient: "from-secondary to-secondary/70"
    },
    {
      id: 3,
      icon: "BarChart3",
      title: "Insightful Analytics",
      description: "Visualize your mental health journey with comprehensive charts, streak tracking, and personalized wellness insights.",
      gradient: "from-accent to-accent/70"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need for
            <span className="block text-primary">Mental Wellness</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides the tools and insights you need to understand and improve your mental health journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group relative bg-card rounded-2xl p-8 shadow-medium hover:shadow-pronounced transition-all duration-300 gentle-transition border border-border/50 hover:border-primary/20"
            >
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature?.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={feature?.icon} 
                  size={28} 
                  color="white" 
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <Icon name="Users" size={16} className="text-primary" />
            <span>Join thousands of users improving their mental wellness</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
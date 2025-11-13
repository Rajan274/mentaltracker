import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeHero = () => {
  const benefits = [
  {
    icon: 'Heart',
    text: 'Track daily moods with ease'
  },
  {
    icon: 'BookOpen',
    text: 'Reflect through journaling'
  },
  {
    icon: 'TrendingUp',
    text: 'Analyze your mental health patterns'
  },
  {
    icon: 'Calendar',
    text: 'Build consistent wellness habits'
  }];


  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Brain" size={24} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-semibold text-2xl text-primary">MindTracker</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Your Mental Wellness
              <span className="block text-primary">Journey Starts Here</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands who trust MindTracker to monitor their mental health, 
              track daily moods, and build lasting wellness habits with complete privacy and security.
            </p>
          </div>

          <div className="space-y-3">
            {benefits?.map((benefit, index) =>
            <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={benefit?.icon} size={14} className="text-success" strokeWidth={2.5} />
                </div>
                <span className="text-foreground font-medium">{benefit?.text}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png"
                  alt="Smiling woman with curly brown hair in professional headshot"
                  className="w-8 h-8 rounded-full border-2 border-background" />

                <Image
                  src="https://images.unsplash.com/photo-1633367583895-08545d733dfe"
                  alt="Professional man with beard in navy blue shirt smiling"
                  className="w-8 h-8 rounded-full border-2 border-background" />

                <Image
                  src="https://images.unsplash.com/photo-1717454396563-a8e605c98a86"
                  alt="Young woman with blonde hair in casual white top"
                  className="w-8 h-8 rounded-full border-2 border-background" />

              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">10,000+</span> users
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative z-10">
            <Image
              src="https://images.unsplash.com/photo-1596737118984-750b79a762f7"
              alt="Peaceful woman meditating in lotus position outdoors with soft natural lighting"
              className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-pronounced" />

          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-success rounded-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Stats Card */}
          <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-medium border border-border">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" strokeWidth={2} />
              <div>
                <p className="text-xs font-medium text-foreground">Daily Tracking</p>
                <p className="text-xs text-muted-foreground">95% consistency rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default WelcomeHero;
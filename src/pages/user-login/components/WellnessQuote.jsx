import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WellnessQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const wellnessQuotes = [
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Mental Health Awareness"
    },
    {
      text: "Progress, not perfection. Every small step counts in your wellness journey.",
      author: "Wellness Wisdom"
    },
    {
      text: "Taking care of your mental health is not selfish. It\'s essential.",
      author: "Self-Care Advocate"
    },
    {
      text: "You are stronger than you think and more resilient than you know.",
      author: "Mindful Living"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % wellnessQuotes?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [wellnessQuotes?.length]);

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12">
      <div className="max-w-md space-y-8 text-center">
        {/* Decorative Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
          <Icon name="Heart" size={40} color="white" strokeWidth={2} />
        </div>

        {/* Quote */}
        <div className="space-y-4 animate-gentle-fade-in">
          <blockquote className="text-lg font-medium text-foreground leading-relaxed">
            "{wellnessQuotes?.[currentQuote]?.text}"
          </blockquote>
          <cite className="text-sm text-muted-foreground font-normal">
            — {wellnessQuotes?.[currentQuote]?.author}
          </cite>
        </div>

        {/* Quote Indicators */}
        <div className="flex justify-center space-x-2">
          {wellnessQuotes?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full gentle-transition ${
                index === currentQuote 
                  ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Quote ${index + 1}`}
            />
          ))}
        </div>

        {/* Wellness Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-secondary">95%</div>
            <div className="text-xs text-muted-foreground">Feel Better</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-accent">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessQuote;
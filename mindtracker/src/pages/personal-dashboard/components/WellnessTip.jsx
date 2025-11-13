import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WellnessTip = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const wellnessTips = [
  {
    id: 1,
    title: "Practice Deep Breathing",
    content: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 4, exhale for 6. This simple technique can help reduce stress and anxiety.",
    icon: "Wind",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1728537218582-a7e754839591",
    imageAlt: "Peaceful woman with closed eyes practicing deep breathing meditation in natural sunlight"
  },
  {
    id: 2,
    title: "Stay Hydrated",
    content: "Drinking enough water throughout the day can improve your mood and energy levels. Aim for 8 glasses of water daily.",
    icon: "Droplets",
    category: "Physical Health",
    image: "https://images.unsplash.com/photo-1639111913680-320acc446288",
    imageAlt: "Clear glass of fresh water with ice cubes and mint leaves on wooden table"
  },
  {
    id: 3,
    title: "Connect with Nature",
    content: "Spend at least 10 minutes outdoors today. Fresh air and natural light can boost your mood and reduce stress hormones.",
    icon: "Trees",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1578405576045-dd6f5bd03a36",
    imageAlt: "Sunlit forest path with tall green trees and dappled sunlight filtering through leaves"
  },
  {
    id: 4,
    title: "Practice Gratitude",
    content: "Write down three things you're grateful for today. Gratitude practice has been shown to improve overall well-being and life satisfaction.",
    icon: "Heart",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1644412448740-40e5b6ded2dc",
    imageAlt: "Person writing in gratitude journal with warm coffee cup and flowers on wooden desk"
  },
  {
    id: 5,
    title: "Move Your Body",
    content: "Even 10 minutes of gentle movement can release endorphins and improve your mood. Try stretching, walking, or dancing to your favorite song.",
    icon: "Activity",
    category: "Physical Health",
    image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40",
    imageAlt: "Group of people doing yoga stretches on mats in bright studio with natural lighting"
  },
  {
    id: 6,
    title: "Digital Detox",
    content: "Take a 30-minute break from screens and social media. Use this time to read, meditate, or have a meaningful conversation with someone you care about.",
    icon: "Smartphone",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1450565580351-5d2088f2deb1",
    imageAlt: "Smartphone placed face down on wooden table next to open book and cup of tea"
  }];


  const currentTip = wellnessTips?.[currentTipIndex];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % wellnessTips?.length);
  };

  const previousTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + wellnessTips?.length) % wellnessTips?.length);
  };

  // Auto-rotate tips every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTip();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Mindfulness': 'bg-purple-100 text-purple-700',
      'Physical Health': 'bg-green-100 text-green-700',
      'Environment': 'bg-blue-100 text-blue-700',
      'Mental Health': 'bg-teal-100 text-teal-700'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="morphic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Daily Wellness Tip</h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={previousTip}
            className="p-1">

            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="text-xs text-muted-foreground px-2">
            {currentTipIndex + 1} of {wellnessTips?.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTip}
            className="p-1">

            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Tip Image */}
        <div className="relative h-32 rounded-lg overflow-hidden">
          <Image
            src={currentTip?.image}
            alt={currentTip?.imageAlt}
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Tip Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={currentTip?.icon} size={16} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground">{currentTip?.title}</h4>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentTip?.category)}`}>
              {currentTip?.category}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentTip?.content}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-1 pt-2">
          {wellnessTips?.map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentTipIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            index === currentTipIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`
            } />

          )}
        </div>
      </div>
    </div>);

};

export default WellnessTip;
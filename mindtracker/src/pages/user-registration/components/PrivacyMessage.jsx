import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyMessage = () => {
  const privacyFeatures = [
    {
      icon: 'Shield',
      title: 'End-to-End Encryption',
      description: 'Your personal data is encrypted and secure'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your mental health data'
    },
    {
      icon: 'Eye',
      title: 'You Control Your Data',
      description: 'Export or delete your data anytime'
    },
    {
      icon: 'UserCheck',
      title: 'Anonymous Analytics',
      description: 'Insights without compromising identity'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="morphic-card p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Your Privacy Matters</h2>
          <p className="text-muted-foreground text-sm">
            MindTracker is built with privacy-first principles to keep your mental health data secure and confidential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {privacyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-primary" strokeWidth={2} />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm text-foreground">{feature?.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" strokeWidth={2} />
            <span className="font-medium text-sm text-primary">HIPAA-Compliant Security</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our platform follows healthcare-grade security standards to protect your sensitive mental health information. 
            All data is encrypted in transit and at rest, with regular security audits and compliance monitoring.
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By creating an account, you acknowledge our commitment to protecting your privacy and mental health data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyMessage;
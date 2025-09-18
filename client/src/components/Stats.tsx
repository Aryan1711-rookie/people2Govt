import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
}

const AnimatedNumber = ({ value, duration = 2000 }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let start = 0;
    let end = parseFloat(value.replace(/[^\d.]/g, "")); // remove non-numeric characters

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const currentValue = start + (end - start) * progress;
      setDisplayValue(currentValue);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {Number.isInteger(displayValue)
        ? Math.floor(displayValue)
        : displayValue.toFixed(1)}
      {value.replace(/[\d.]/g, "")}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      number: '5000+', // use raw number for animation
      label: 'Active Citizens',
      description: 'Engaged community members'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      number: '250+',
      label: 'Issues Resolved',
      description: 'Problems fixed successfully'
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      number: '2.5', // no suffix, we can add "hrs" separately
      label: 'Average Response',
      description: 'Lightning-fast processing',
      suffix: ' hrs'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      number: '90%',
      label: 'Satisfaction Rate',
      description: 'Happy citizens'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Making a Real Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our platform is transforming communities and connecting citizens with their local government.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {isVisible ? (
                  <>
                    <AnimatedNumber value={stat.number} />
                    {stat.suffix || ''}
                  </>
                ) : (
                  stat.number // fallback static number before animation triggers
                )}
              </div>
              <div className="text-lg font-semibold text-gray-200 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

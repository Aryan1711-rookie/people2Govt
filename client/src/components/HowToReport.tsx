import { Smartphone, Bot, Users, CheckCircle, ArrowDown } from 'lucide-react';
import img1 from "../assets/1.gif";
import img2 from "../assets/2.gif";
import img3 from "../assets/3.gif";
import img4 from "../assets/4.gif";

const steps = [
  {
    icon: <Smartphone className="h-12 w-12 text-green-600" />,
    title: "Report the Issue",
    description: "Use our mobile-first platform to submit a real-time report with photos, location, and a detailed description.",
    image: img1,
    side: "left",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: <Bot className="h-12 w-12 text-blue-600" />,
    title: "Automated Processing",
    description: "AI-powered routing directs the report to the right municipal department and prioritizes it based on urgency.",
    image: img2,
    side: "right",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: <Users className="h-12 w-12 text-purple-600" />,
    title: "Assigned & Acknowledged",
    description: "Municipal staff acknowledge and assign the issue to field teams, and you receive instant notifications.",
    image: img3,
    side: "left",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-orange-600" />,
    title: "Resolved & Tracked",
    description: "The issue is fixed, status is updated with before/after photos, and you can track the entire process from start to finish.",
    image: img4,
    side: "right",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  }
];

const HowToReport = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gray-50 overflow-hidden relative">
      <div className="relative text-center max-w-4xl mx-auto mb-20">
        <div className="inline-block mb-6">
          <span className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            How It Works
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Your Report's Journey:
          <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            From Click to Resolution
          </span>
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          See how our intelligent system transforms your report into a resolved civic issue with a seamless, 
          transparent process that keeps you informed every step of the way.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400  via-purple-400 to-orange-400 hidden lg:block"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative mb-20 last:mb-0">
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 hidden lg:block">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className={`flex flex-col lg:flex-row items-center ${step.side === 'left' ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-16`}>
                
                {/* Content Card */}
                <div className={`lg:w-1/2 ${step.side === 'left' ? 'lg:pl-16' : 'lg:pr-16'}`}>
                  <div className={`group p-8 ${step.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${step.borderColor}`}>
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                      <div className="p-4 bg-white rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Image Card */}
                <div className={`lg:w-1/2 flex justify-center ${step.side === 'left' ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="relative w-66 h-120 rounded-3xl shadow-2xl overflow-hidden flex-shrink-0">
                        <img 
                            src={step.image}
                            alt={step.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-20 group-hover:opacity-0 transition-opacity"></div>
                    </div>
                </div>
              </div>

              {/* Arrow Connector (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-12 mb-8 lg:hidden">
                  <ArrowDown className="h-8 w-8 text-gray-400 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div id='report' className="relative text-center mt-20">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of citizens who are already improving their communities.
          </p>
          <a href="/dashboard_user" className="group inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>Start Your First Report</span>
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToReport;
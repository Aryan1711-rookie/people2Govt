import { Layers, MapPin, Target, Bot, BarChart2, Share2 } from 'lucide-react';

const About = () => {
  return (
    <div id="about" className="min-h-screen flex flex-col items-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Solving Civic Issues, Together
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          We bridge the gap between citizens and local government with a
          streamlined, mobile-first solution for real-time civic issue reporting
          and resolution.       
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature Card 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <Layers className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">User-Friendly Interface</h3>
          <p className="text-gray-600">
            Easily submit real-time reports with photos, automatic location tags, and short text or voice explanations.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <MapPin className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Centralized Dashboard</h3>
          <p className="text-gray-600">
            Municipal staff can view, filter, and categorize incoming reports on a live, interactive map of the city.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <Target className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Automated Routing</h3>
          <p className="text-gray-600">
            AI-powered routing directs each report to the relevant department based on the issue type and location.
          </p>
        </div>

        {/* Feature Card 4 (AI Features) */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <Bot className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Intelligent Automation</h3>
          <p className="text-gray-600">
            Leverage AI for tasks like image classification, voice-to-text, and urgency prediction to streamline the resolution process.
          </p>
        </div>

        {/* Feature Card 5 (Analytics) */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <BarChart2 className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Data-Driven Insights</h3>
          <p className="text-gray-600">
            Deliver analytics and reporting features that offer insights into reporting trends and departmental response times.
          </p>
        </div>

        {/* New Feature Card 6 (Addon Features) */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <Share2 className="text-green-600 h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Social & Public Accountability</h3>
          <p className="text-gray-600">
            Users can upvote/downvote and comment on issues, with unresolved issues being shared on social media to ensure accountability.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
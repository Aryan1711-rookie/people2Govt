import { useState } from 'react';
import { FileText, PlusCircle } from 'lucide-react';
import Report from './Report';
import TrackIssue from './Track_Issue';
import Navbar1 from '../components/Navbar1';

const Dashboard = ({ defaultTab }: { defaultTab?: 'report' | 'issues' }) => {
  const [activeTab, setActiveTab] = useState<'report' | 'issues'>(
    defaultTab || 'report'
  );

  return (
    <>
    <Navbar1 />
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
              activeTab === 'report' ? 'text-green-600 border-b-4 border-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <PlusCircle className="inline-block w-5 h-5 mr-2 -mt-1" />
            Report an Issue
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
              activeTab === 'issues' ? 'text-green-600 border-b-4 border-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <FileText className="inline-block w-5 h-5 mr-2 -mt-1" />
            My Issues
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10">
          {activeTab === 'report' ? <Report /> : <TrackIssue />}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;

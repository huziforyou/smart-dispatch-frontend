import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Download, 
  Filter, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Calendar,
  Printer,
  FileDown,
  TrendingUp,
  Truck,
  Building2,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReportCard = ({ title, description, icon: Icon, color }) => (
  <div className="glass-card p-8 border border-gray-100 dark:border-gray-800 hover:border-accent/20 transition-all group cursor-pointer">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 text-${color}-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest mb-2">{title}</h3>
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-8 leading-relaxed">{description}</p>
    <div className="flex gap-2">
      <button className="flex-1 py-3 bg-gray-50 dark:bg-gray-800 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-all flex items-center justify-center gap-2 rounded-xl">
        <Printer size={14} /> Print
      </button>
      <button className="flex-1 py-3 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 rounded-xl">
        <FileDown size={14} /> PDF
      </button>
    </div>
  </div>
);

const Reports = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">Intelligence & Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Generate enterprise-level logistics and performance analytics.</p>
        </div>
        <button className="btn-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-2">
          <Calendar size={18} /> Last 30 Days
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ReportCard 
          title="Vendor Performance" 
          description="Detailed analysis of delivery accuracy and timeline by vendor." 
          icon={Building2} 
          color="blue" 
        />
        <ReportCard 
          title="Driver Trip Reports" 
          description="Comprehensive log of all driver assignments and completion rates." 
          icon={Truck} 
          color="purple" 
        />
        <ReportCard 
          title="Dispatch Volume" 
          description="Monthly and weekly trends of material quantities and delivery notes." 
          icon={BarChart3} 
          color="accent" 
        />
        <ReportCard 
          title="Delay Analytics" 
          description="Identification of bottlenecks and delayed delivery patterns." 
          icon={TrendingUp} 
          color="amber" 
        />
      </div>

      <div className="glass-card p-10 border border-gray-100 dark:border-gray-800 bg-primary/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
              <PieChartIcon size={40} />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">Custom Report Builder</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Select dimensions and metrics for personalized exports.</p>
            </div>
          </div>
          <button className="px-10 py-5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20">
            Configure Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;

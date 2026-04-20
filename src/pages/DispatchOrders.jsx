// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   ClipboardList,
//   Clock,
//   Loader2,
//   ExternalLink,
//   Edit3,
//   MapPin,
//   Truck,
//   Printer,
//   FileDown,
//   Plus,
//   ArrowRight
// } from 'lucide-react';
// import api from '../services/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const DispatchOrders = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => 
//     order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       case 'high': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500';
//       case 'In Transit': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'Picked Up': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500';
//       case 'Pending': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'Cancelled': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="space-y-8 pb-20">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">
//             {i18n.language === 'ar' ? 'أوامر الإرسال' : 'Dispatch Orders'}
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 font-medium">
//             {i18n.language === 'ar' ? 'إدارة وتتبع جميع عمليات التسليم والخدمات اللوجستية.' : 'Manage and track all logistics deliveries and dispatches.'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
//             <Download size={18} />
//             {i18n.language === 'ar' ? 'تصدير' : 'Export'}
//           </button>
//           <button 
//             onClick={() => navigate('/dispatch/create')}
//             className="btn-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
//           >
//             <Plus size={20} />
//             {i18n.language === 'ar' ? 'إنشاء إرسالية' : 'Create Dispatch'}
//           </button>
//         </div>
//       </div>

//       {/* Filters & Search */}
//       <div className="glass-card p-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100 dark:border-gray-800">
//         <div className="relative flex-1 w-full">
//           <Search className={`absolute ${i18n.language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
//           <input 
//             type="text" 
//             placeholder={i18n.language === 'ar' ? 'البحث عن رقم DN أو المورد أو السائق...' : 'Search by DN number, vendor or driver...'} 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`input-field ${i18n.language === 'ar' ? 'pr-12' : 'pl-12'} py-4 rounded-2xl`}
//           />
//         </div>
//         <div className="flex gap-3 w-full md:w-auto">
//           <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-all">
//             <Filter size={18} />
//             {i18n.language === 'ar' ? 'تصفية' : 'Filters'}
//           </button>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className={`text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                 <th className="p-8">DN Details</th>
//                 <th className="p-8">Route Info</th>
//                 <th className="p-8">Logistics</th>
//                 <th className="p-8">Priority</th>
//                 <th className="p-8">Status</th>
//                 <th className={`p-8 ${i18n.language === 'ar' ? 'text-left' : 'text-right'}`}>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="p-24 text-center">
//                     <div className="flex flex-col items-center gap-6">
//                       <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
//                         <Loader2 className="animate-spin text-accent" size={32} />
//                       </div>
//                       <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Dispatches...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="p-24 text-center text-gray-500">
//                     <div className="flex flex-col items-center gap-6">
//                       <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
//                         <ClipboardList size={32} className="text-gray-300" />
//                       </div>
//                       <p className="font-bold uppercase tracking-widest text-xs">No dispatch orders found</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredOrders.map((order) => (
//                   <tr key={order._id} className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all duration-300">
//                     <td className="p-8">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
//                           <ClipboardList size={20} />
//                         </div>
//                         <div>
//                           <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{order.deliveryNoteNumber}</p>
//                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{order.materialQuantity}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <div className="space-y-1.5">
//                         <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
//                           <MapPin size={14} className="text-accent" />
//                           <span>{order.loadingFrom}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
//                           <ArrowRight size={14} className="mx-0.5" />
//                           <span>{order.offloadingTo}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <div>
//                         <p className="text-sm font-black text-gray-900 dark:text-white mb-1">{order.assignedVendor?.name}</p>
//                         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
//                           <Truck size={12} />
//                           <span>{order.assignedDriver?.name}</span>
//                           <span className="mx-1">•</span>
//                           <span>{order.vehiclePlateNumber}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getPriorityColor(order.priority)}`}>
//                         {order.priority}
//                       </span>
//                     </td>
//                     <td className="p-8">
//                       <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className={`p-8 ${i18n.language === 'ar' ? 'text-left' : 'text-right'}`}>
//                       <div className="flex items-center justify-end gap-2">
//                         <button 
//                           className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
//                           title="Print Slip"
//                         >
//                           <Printer size={18} />
//                         </button>
//                         <button 
//                           className="p-3 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
//                           title="Export PDF"
//                         >
//                           <FileDown size={18} />
//                         </button>
//                         <button className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
//                           <MoreVertical size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             {i18n.language === 'ar' ? `عرض ${filteredOrders.length} من أصل ${orders.length} طلبات` : `Showing ${filteredOrders.length} of ${orders.length} orders`}
//           </p>
//           <div className="flex gap-2">
//             <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50">
//               <ChevronLeft size={18} />
//             </button>
//             <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50">
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DispatchOrders;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   ClipboardList,
//   Clock,
//   Loader2,
//   ExternalLink,
//   Edit3,
//   MapPin,
//   Truck,
//   Printer,
//   FileDown,
//   Plus,
//   ArrowRight
// } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext'; 
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const DispatchOrders = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Admin Override Helper
//   const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => 
//     order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       case 'high': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500';
//       case 'In Transit': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'Picked Up': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500';
//       case 'Pending': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'Cancelled': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="space-y-8 pb-20">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">
//             {i18n.language === 'ar' ? 'أوامر الإرسال' : 'Dispatch Orders'}
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 font-medium">
//             {i18n.language === 'ar' ? 'إدارة وتتبع جميع عمليات التسليم والخدمات اللوجستية.' : 'Manage and track all logistics deliveries and dispatches.'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {/* Export Button: Admin ya jiske paas report permission ho */}
//           {(isAdmin || currentUser?.permissions?.viewReports) && (
//             <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
//               <Download size={18} />
//               {i18n.language === 'ar' ? 'تصدير' : 'Export'}
//             </button>
//           )}
          
//           {/* Create Button: Admin ya jiske paas createDispatch permission ho */}
//           {(isAdmin || currentUser?.permissions?.createDispatch) && (
//             <button 
//               onClick={() => navigate('/dispatch/create')}
//               className="btn-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
//             >
//               <Plus size={20} />
//               {i18n.language === 'ar' ? 'إنشاء إرسالية' : 'Create Dispatch'}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Filters & Search */}
//       <div className="glass-card p-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100 dark:border-gray-800">
//         <div className="relative flex-1 w-full">
//           <Search className={`absolute ${i18n.language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
//           <input 
//             type="text" 
//             placeholder={i18n.language === 'ar' ? 'البحث عن رقم DN أو المورد أو السائق...' : 'Search by DN number, vendor or driver...'} 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`input-field ${i18n.language === 'ar' ? 'pr-12' : 'pl-12'} py-4 rounded-2xl w-full bg-transparent border-none focus:ring-0 text-sm font-bold`}
//           />
//         </div>
//         <div className="flex gap-3 w-full md:w-auto">
//           <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-all">
//             <Filter size={18} />
//             {i18n.language === 'ar' ? 'تصفية' : 'Filters'}
//           </button>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className={`text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                 <th className="p-8">DN Details</th>
//                 <th className="p-8">Route Info</th>
//                 <th className="p-8">Logistics</th>
//                 <th className="p-8">Priority</th>
//                 <th className="p-8">Status</th>
//                 <th className={`p-8 ${i18n.language === 'ar' ? 'text-left' : 'text-right'}`}>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="p-24 text-center">
//                     <div className="flex flex-col items-center gap-6">
//                       <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
//                         <Loader2 className="animate-spin text-accent" size={32} />
//                       </div>
//                       <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Dispatches...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="p-24 text-center text-gray-500">
//                     <div className="flex flex-col items-center gap-6">
//                       <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
//                         <ClipboardList size={32} className="text-gray-300" />
//                       </div>
//                       <p className="font-bold uppercase tracking-widest text-xs">No dispatch orders found</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredOrders.map((order) => (
//                   <tr key={order._id} className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all duration-300">
//                     <td className="p-8">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
//                           <ClipboardList size={20} />
//                         </div>
//                         <div>
//                           <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{order.deliveryNoteNumber}</p>
//                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{order.materialQuantity}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <div className="space-y-1.5">
//                         <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
//                           <MapPin size={14} className="text-accent" />
//                           <span>{order.loadingFrom}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
//                           <ArrowRight size={14} className="mx-0.5" />
//                           <span>{order.offloadingTo}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <div>
//                         <p className="text-sm font-black text-gray-900 dark:text-white mb-1">{order.assignedVendor?.name}</p>
//                         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
//                           <Truck size={12} />
//                           <span>{order.assignedDriver?.name}</span>
//                           <span className="mx-1">•</span>
//                           <span>{order.vehiclePlateNumber}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-8">
//                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getPriorityColor(order.priority)}`}>
//                         {order.priority}
//                       </span>
//                     </td>
//                     <td className="p-8">
//                       <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className={`p-8 ${i18n.language === 'ar' ? 'text-left' : 'text-right'}`}>
//                       <div className="flex items-center justify-end gap-2">
//                         <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" title="Print Slip">
//                           <Printer size={18} />
//                         </button>
                        
//                         {/* PDF Export: Admin ya View Reports Permission */}
//                         {(isAdmin || currentUser?.permissions?.viewReports) && (
//                           <button className="p-3 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-all" title="Export PDF">
//                             <FileDown size={18} />
//                           </button>
//                         )}

//                         {/* More Options: Admin ya Edit Permission */}
//                         {(isAdmin || currentUser?.permissions?.editDispatch) && (
//                           <button className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
//                             <MoreVertical size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Pagination placeholder */}
//         <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//             {i18n.language === 'ar' ? `عرض ${filteredOrders.length} من أصل ${orders.length} طلبات` : `Showing ${filteredOrders.length} of ${orders.length} orders`}
//           </p>
//           <div className="flex gap-2">
//             <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50">
//               <ChevronLeft size={18} />
//             </button>
//             <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50">
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DispatchOrders;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, Filter, Download, Eye, MoreVertical, ChevronLeft, ChevronRight,
//   ClipboardList, Clock, Loader2, ExternalLink, Edit3, MapPin, Truck,
//   Printer, FileDown, Plus, ArrowRight
// } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext'; 
// import { useNavigate } from 'react-router-dom';
// // PDF Libraries
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const DispatchOrders = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- CSV Download Logic ---
//   const downloadCSV = () => {
//     const headers = ["DN Number,Material,Loading From,Offloading To,Vendor,Driver,Vehicle,Priority,Status\n"];
//     const rows = filteredOrders.map(o => 
//       `${o.deliveryNoteNumber},${o.materialQuantity},${o.loadingFrom},${o.offloadingTo},${o.assignedVendor?.name},${o.assignedDriver?.name},${o.vehiclePlateNumber},${o.priority},${o.status}`
//     ).join("\n");

//     const blob = new Blob([headers + rows], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.setAttribute('hidden', '');
//     a.setAttribute('href', url);
//     a.setAttribute('download', 'dispatch_orders.csv');
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   // --- PDF Download Logic ---
//   const generatePDF = (order = null) => {
//     const doc = new jsPDF();
//     doc.text("Dispatch Orders Report", 14, 15);
    
//     // Agar single order hai toh uska data, warna saari filtered list
//     const dataToPrint = order ? [order] : filteredOrders;
    
//     const tableRows = dataToPrint.map(o => [
//       o.deliveryNoteNumber,
//       o.loadingFrom,
//       o.offloadingTo,
//       o.assignedVendor?.name,
//       o.status
//     ]);

//     doc.autoTable({
//       head: [['DN Number', 'From', 'To', 'Vendor', 'Status']],
//       body: tableRows,
//       startY: 20,
//     });

//     doc.save(order ? `Order_${order.deliveryNoteNumber}.pdf` : 'all_dispatches.pdf');
//   };

//   const filteredOrders = orders.filter(order => 
//     order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       case 'high': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'low': return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500';
//       case 'In Transit': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
//       case 'Picked Up': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500';
//       case 'Pending': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500';
//       case 'Cancelled': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="space-y-8 pb-20">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">
//             {i18n.language === 'ar' ? 'أوامر الإرسال' : 'Dispatch Orders'}
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 font-medium">
//             {i18n.language === 'ar' ? 'إدارة وتتبع جميع عمليات التسليم والخدمات اللوجستية.' : 'Manage and track all logistics deliveries and dispatches.'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {/* Export Button: Ab yeh CSV download karega */}
//           {(isAdmin || currentUser?.permissions?.viewReports) && (
//             <button 
//               onClick={downloadCSV}
//               className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
//             >
//               <Download size={18} />
//               {i18n.language === 'ar' ? 'تصدير CSV' : 'Export CSV'}
//             </button>
//           )}
          
//           {(isAdmin || currentUser?.permissions?.createDispatch) && (
//             <button 
//               onClick={() => navigate('/dispatch/create')}
//               className="btn-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
//             >
//               <Plus size={20} />
//               {i18n.language === 'ar' ? 'إنشاء إرسالية' : 'Create Dispatch'}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Filters & Search */}
//       <div className="glass-card p-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100 dark:border-gray-800">
//         <div className="relative flex-1 w-full">
//           <Search className={`absolute ${i18n.language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
//           <input 
//             type="text" 
//             placeholder={i18n.language === 'ar' ? 'البحث...' : 'Search by DN, vendor or driver...'} 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`input-field ${i18n.language === 'ar' ? 'pr-12' : 'pl-12'} py-4 rounded-2xl w-full bg-transparent border border-gray-200 dark:border-gray-700 text-sm font-bold`}
//           />
//         </div>
//       </div>

//       <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className={`text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
//                 <th className="p-8">DN Details</th>
//                 <th className="p-8">Route Info</th>
//                 <th className="p-8">Logistics</th>
//                 <th className="p-8">Priority</th>
//                 <th className="p-8">Status</th>
//                 <th className={`p-8 ${i18n.language === 'ar' ? 'text-left' : 'text-right'}`}>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//               {loading ? (
//                 <tr><td colSpan="6" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-accent" size={32} /></td></tr>
//               ) : filteredOrders.map((order) => (
//                 <tr key={order._id} className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all duration-300">
//                   <td className="p-8 font-bold">{order.deliveryNoteNumber}</td>
//                   <td className="p-8">
//                     <div className="text-xs">{order.loadingFrom} <ArrowRight size={12} className="inline mx-1"/> {order.offloadingTo}</div>
//                   </td>
//                   <td className="p-8">
//                     <div className="text-sm font-black">{order.assignedVendor?.name}</div>
//                     <div className="text-[10px] text-gray-500">{order.assignedDriver?.name}</div>
//                   </td>
//                   <td className="p-8">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getPriorityColor(order.priority)}`}>
//                       {order.priority}
//                     </span>
//                   </td>
//                   <td className="p-8">
//                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="p-8 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       {/* Print button ab PDF generate karega */}
//                       <button 
//                         onClick={() => window.print()} 
//                         className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
//                       >
//                         <Printer size={18} />
//                       </button>
                      
//                       {(isAdmin || currentUser?.permissions?.viewReports) && (
//                         <button 
//                           onClick={() => generatePDF(order)}
//                           className="p-3 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
//                         >
//                           <FileDown size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DispatchOrders;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, Filter, Download, Eye, MoreVertical, ChevronLeft, ChevronRight,
//   ClipboardList, Clock, Loader2, ExternalLink, Edit3, MapPin, Truck,
//   Printer, FileDown, Plus, ArrowRight, X, User, Building2, Calendar
// } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext'; 
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const DispatchOrders = () => {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Modal State
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

//   useEffect(() => { fetchOrders(); }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   // --- Logic for PDF/CSV remains same ---
//   const downloadCSV = () => { /* ... existing logic ... */ };
//   const generatePDF = (order = null) => { /* ... existing logic ... */ };

//   const filteredOrders = orders.filter(order => 
//     order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-100 text-green-600';
//       case 'In Transit': return 'bg-blue-100 text-blue-600';
//       default: return 'bg-amber-100 text-amber-600';
//     }
//   };

//   return (
//     <div className="space-y-8 pb-20 relative">
//       {/* Header & Search (Same as before) */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-black uppercase tracking-tight">Dispatch Orders</h1>
//         <div className="flex gap-2">
//             <button onClick={downloadCSV} className="btn-secondary flex items-center gap-2 px-4 py-2 border rounded-xl"><Download size={18}/> Export CSV</button>
//             {(isAdmin || currentUser?.permissions?.createDispatch) && (
//                 <button onClick={() => navigate('/dispatch/create')} className="btn-primary flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl"><Plus size={18}/> Create</button>
//             )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="glass-card overflow-hidden border rounded-2xl">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 dark:bg-gray-800 uppercase text-[10px] font-bold text-gray-500">
//             <tr>
//               <th className="p-6">DN Details</th>
//               <th className="p-6">Logistics (Vendor/Driver)</th>
//               <th className="p-6">Status</th>
//               <th className="p-6 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {filteredOrders.map((order) => (
//               <tr key={order._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="p-6">
//                   <div className="font-black text-sm">{order.deliveryNoteNumber}</div>
//                   <div className="text-[10px] text-gray-400">{order.loadingFrom} → {order.offloadingTo}</div>
//                 </td>
//                 <td className="p-6">
//                   <div className="text-sm font-bold">{order.assignedVendor?.name}</div>
//                   <div className="text-xs text-gray-500 flex items-center gap-1"><Truck size={12}/> {order.assignedDriver?.name} ({order.vehiclePlateNumber})</div>
//                 </td>
//                 <td className="p-6">
//                   <span className={`px-3 py-1 rounded-full text-[10px] font-black ${getStatusColor(order.status)}`}>{order.status}</span>
//                 </td>
//                 <td className="p-6 text-right flex justify-end gap-2">
//                   {/* VIEW DETAILS BUTTON */}
//                   <button onClick={() => openDetails(order)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg" title="View Details">
//                     <Eye size={18} />
//                   </button>
//                   <button onClick={() => generatePDF(order)} className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg"><FileDown size={18} /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- FULL DETAILS MODAL --- */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
//             {/* Modal Header */}
//             <div className="p-6 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
//               <div>
//                 <h2 className="text-xl font-black uppercase">Dispatch Full Details</h2>
//                 <p className="text-xs text-gray-500 font-bold">DN: {selectedOrder.deliveryNoteNumber}</p>
//               </div>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors">
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Route & Material */}
//               <div className="space-y-4">
//                 <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b pb-2">Order Info</h3>
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-accent mt-1" size={18}/>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Route</p>
//                     <p className="text-sm font-bold">{selectedOrder.loadingFrom} <ArrowRight size={12} className="inline"/> {selectedOrder.offloadingTo}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <ClipboardList className="text-accent mt-1" size={18}/>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Material Quantity</p>
//                     <p className="text-sm font-bold">{selectedOrder.materialQuantity || 'Not Specified'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Logistics & Driver */}
//               <div className="space-y-4">
//                 <h3 className="text-xs font-black text-primary uppercase tracking-widest border-b pb-2">Logistics Details</h3>
//                 <div className="flex items-start gap-3">
//                   <Building2 className="text-blue-500 mt-1" size={18}/>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Vendor / Supplier</p>
//                     <p className="text-sm font-bold">{selectedOrder.assignedVendor?.name || 'N/A'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <User className="text-green-500 mt-1" size={18}/>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Driver Name</p>
//                     <p className="text-sm font-bold">{selectedOrder.assignedDriver?.name || 'N/A'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Truck className="text-orange-500 mt-1" size={18}/>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Vehicle Plate</p>
//                     <p className="text-sm font-bold">{selectedOrder.vehiclePlateNumber || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t flex justify-end gap-3">
//               <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-bold uppercase text-gray-500">Close</button>
//               <button onClick={() => generatePDF(selectedOrder)} className="px-6 py-2 bg-accent text-white rounded-xl text-xs font-black uppercase flex items-center gap-2">
//                 <Printer size={16}/> Print Detail
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DispatchOrders;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, Filter, Download, Eye, MoreVertical, ChevronLeft, ChevronRight,
//   ClipboardList, Clock, Loader2, MapPin, Truck, Printer, FileDown, Plus, 
//   ArrowRight, X, User, Building2 
// } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext'; 
// import { useNavigate } from 'react-router-dom';

// // PDF Libraries - Corrected Imports
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const DispatchOrders = () => {
//   const { i18n } = useTranslation();
//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Modal State
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- PDF & Print Logic (Fixed) ---
//   const generatePDF = (order = null) => {
//     try {
//       const doc = new jsPDF();
      
//       doc.setFontSize(18);
//       doc.setTextColor(44, 62, 80);
//       doc.text(order ? "Dispatch Order Detail" : "Dispatch Orders Report", 14, 20);
      
//       const dataToPrint = order ? [order] : filteredOrders;
      
//       const tableRows = dataToPrint.map(o => [
//         o.deliveryNoteNumber || 'N/A',
//         `${o.loadingFrom || ''} to ${o.offloadingTo || ''}`,
//         o.assignedVendor?.name || 'N/A',
//         o.assignedDriver?.name || 'N/A',
//         o.vehiclePlateNumber || 'N/A',
//         o.status || 'N/A'
//       ]);

//       // Calling autoTable as a function instead of doc.autoTable
//       autoTable(doc, {
//         head: [['DN#', 'Route', 'Vendor', 'Driver', 'Plate#', 'Status']],
//         body: tableRows,
//         startY: 30,
//         theme: 'grid',
//         headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' },
//         styles: { fontSize: 9 }
//       });

//       if (order) {
//         // Open PDF in new tab and trigger print
//         const blobUrl = doc.output('bloburl');
//         window.open(blobUrl, '_blank');
//       } else {
//         doc.save(`Dispatch_List_${new Date().getTime()}.pdf`);
//       }
//     } catch (err) {
//       console.error("PDF Generation Error:", err);
//       alert("Could not generate PDF. Please check console.");
//     }
//   };

//   // --- CSV Export ---
//   const downloadCSV = () => {
//     const headers = ["DN Number,Material,Loading From,Offloading To,Vendor,Driver,Vehicle,Status\n"];
//     const rows = filteredOrders.map(o => 
//       `${o.deliveryNoteNumber},${o.materialQuantity},${o.loadingFrom},${o.offloadingTo},${o.assignedVendor?.name || 'N/A'},${o.assignedDriver?.name || 'N/A'},${o.vehiclePlateNumber || 'N/A'},${o.status}`
//     ).join("\n");

//     const blob = new Blob([headers + rows], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `Dispatch_Data.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const openDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const filteredOrders = orders.filter(order => 
//     order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-100 text-green-600 dark:bg-green-900/30';
//       case 'In Transit': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
//       default: return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30';
//     }
//   };

//   return (
//     <div className="space-y-8 pb-20">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-black text-primary dark:text-white uppercase tracking-tight">
//             Dispatch Orders
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 font-medium">Manage Logistics & Deliveries</p>
//         </div>
//         <div className="flex gap-3">
//           {(isAdmin || currentUser?.permissions?.viewReports) && (
//             <button onClick={downloadCSV} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border rounded-2xl text-xs font-black uppercase hover:bg-gray-50 shadow-sm">
//               <Download size={18} /> Export CSV
//             </button>
//           )}
//           {(isAdmin || currentUser?.permissions?.createDispatch) && (
//             <button onClick={() => navigate('/dispatch/create')} className="px-8 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase shadow-lg flex items-center gap-2 transition-all">
//               <Plus size={20} /> Create
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Search Input */}
//       <div className="glass-card p-4 flex items-center border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
//         <div className="relative flex-1">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input 
//             type="text" 
//             placeholder="Search by DN, Vendor, or Driver..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 font-bold"
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 shadow-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-800/50">
//               <tr className="text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
//                 <th className="p-6">Details</th>
//                 <th className="p-6">Logistics</th>
//                 <th className="p-6">Status</th>
//                 <th className="p-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {loading ? (
//                 <tr><td colSpan="4" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></td></tr>
//               ) : filteredOrders.map((order) => (
//                 <tr key={order._id} className="group hover:bg-gray-50 transition-all">
//                   <td className="p-6">
//                     <div className="font-black text-sm">{order.deliveryNoteNumber}</div>
//                     <div className="text-[10px] text-gray-400 font-bold">{order.loadingFrom} → {order.offloadingTo}</div>
//                   </td>
//                   <td className="p-6">
//                     <div className="text-sm font-bold">{order.assignedVendor?.name}</div>
//                     <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold mt-1">
//                       <User size={12}/> {order.assignedDriver?.name} | <Truck size={12}/> {order.vehiclePlateNumber}
//                     </div>
//                   </td>
//                   <td className="p-6">
//                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="p-6 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <button onClick={() => openDetails(order)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
//                         <Eye size={18} />
//                       </button>
//                       <button onClick={() => generatePDF(order)} className="p-2 text-accent hover:bg-accent/5 rounded-lg">
//                         <FileDown size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- DETAILS MODAL --- */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
//             <div className="p-8 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
//               <div>
//                 <h2 className="text-2xl font-black uppercase text-primary">Order Full Details</h2>
//                 <p className="text-xs font-bold text-gray-400">DN: {selectedOrder.deliveryNoteNumber}</p>
//               </div>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="space-y-6">
//                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Route Information</h3>
//                 <div className="flex gap-3">
//                   <MapPin className="text-accent" size={20}/>
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Path</p>
//                     <p className="font-bold">{selectedOrder.loadingFrom} to {selectedOrder.offloadingTo}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <ClipboardList className="text-accent" size={20}/>
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Quantity</p>
//                     <p className="font-bold">{selectedOrder.materialQuantity || 'Standard'}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Logistics Information</h3>
//                 <div className="flex gap-3">
//                   <Building2 className="text-blue-500" size={20}/>
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Vendor</p>
//                     <p className="font-bold">{selectedOrder.assignedVendor?.name || 'N/A'}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <User className="text-green-500" size={20}/>
//                   <div>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Driver & Vehicle</p>
//                     <p className="font-bold">{selectedOrder.assignedDriver?.name} ({selectedOrder.vehiclePlateNumber})</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8 bg-gray-50 dark:bg-gray-800 border-t flex justify-end gap-4">
//               <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 font-bold text-gray-500">Close</button>
//               <button 
//                 onClick={() => generatePDF(selectedOrder)} 
//                 className="px-8 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase shadow-xl flex items-center gap-2 hover:bg-primary/90 transition-all"
//               >
//                 <Printer size={18}/> Print Details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DispatchOrders;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Search, Download, Eye, Loader2, MapPin, Truck, FileDown, Plus, 
//   X, User, Building2, ClipboardList, Printer, CheckCircle2, Clock,
//   ArrowRight 
// } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext'; 
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const DispatchOrders = () => {
//   const navigate = useNavigate();
//   const { user: currentUser } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const [activeTab, setActiveTab] = useState('Pending'); 
  
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get('/dispatch');
//       setOrders(res.data.data);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     setIsUpdating(true);
//     try {
//       await api.put(`/dispatch/${orderId}`, { status: newStatus });
//       setOrders(prev => prev.map(order => 
//         order._id === orderId ? { ...order, status: newStatus } : order
//       ));
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update status");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesTab = order.status === activeTab;
//     const matchesSearch = 
//       order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesTab && matchesSearch;
//   });

//   const generatePDF = (order = null) => {
//     try {
//       const doc = new jsPDF();
//       doc.setFontSize(18);
//       doc.text(order ? "Dispatch Detail" : "Dispatch Report", 14, 20);
//       const dataToPrint = order ? [order] : filteredOrders;
//       const tableRows = dataToPrint.map(o => [o.deliveryNoteNumber, o.loadingFrom, o.assignedVendor?.name, o.status]);
//       autoTable(doc, {
//         head: [['DN#', 'Route', 'Vendor', 'Status']],
//         body: tableRows,
//         startY: 30,
//       });
//       const blobUrl = doc.output('bloburl');
//       window.open(blobUrl, '_blank');
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="space-y-8 pb-20">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-black text-primary dark:text-white uppercase tracking-tight">
//             Logistics Control
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">Track dispatches and update delivery status</p>
//         </div>
//         <button onClick={() => navigate('/dispatch/create')} className="px-8 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all">
//           <Plus size={20} /> New Dispatch
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit border border-gray-200 dark:border-gray-700">
//         <button 
//           onClick={() => setActiveTab('Pending')}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'Pending' ? 'bg-white dark:bg-gray-900 text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//         >
//           <Clock size={16} /> Pending ({orders.filter(o => o.status === 'Pending').length})
//         </button>
//         <button 
//           onClick={() => setActiveTab('Delivered')}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'Delivered' ? 'bg-white dark:bg-gray-900 text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//         >
//           <CheckCircle2 size={16} /> Delivered ({orders.filter(o => o.status === 'Delivered').length})
//         </button>
//       </div>

//       {/* Search */}
//       <div className="glass-card p-4 flex items-center border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
//         <Search className="ml-4 text-gray-400" size={20} />
//         <input 
//           type="text" 
//           placeholder={`Search ${activeTab} items...`} 
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 bg-transparent border-none focus:ring-0 font-bold dark:text-white"
//         />
//       </div>

//       {/* Table - Fixed Hover Issues */}
//       <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900 shadow-xl">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50/80 dark:bg-gray-800/80">
//               <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
//                 <th className="p-6">Delivery Note</th>
//                 <th className="p-6">Partner Details</th>
//                 <th className="p-6">Live Status</th>
//                 <th className="p-6 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
//               {loading ? (
//                 <tr><td colSpan="4" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></td></tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr><td colSpan="4" className="p-20 text-center text-gray-400 font-bold uppercase text-xs">No records in {activeTab}</td></tr>
//               ) : filteredOrders.map((order) => (
//                 <tr key={order._id} className="transition-all hover:bg-primary/[0.03] dark:hover:bg-primary/[0.05]">
//                   <td className="p-6">
//                     <div className="font-black text-sm text-gray-800 dark:text-white">{order.deliveryNoteNumber}</div>
//                     <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{order.loadingFrom} → {order.offloadingTo}</div>
//                   </td>
//                   <td className="p-6">
//                     <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{order.assignedVendor?.name}</div>
//                     <div className="text-[10px] text-gray-500 font-bold mt-1 uppercase flex items-center gap-1">
//                       <Truck size={12}/> {order.vehiclePlateNumber}
//                     </div>
//                   </td>
//                   <td className="p-6">
//                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase inline-block ${activeTab === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="p-6 text-right">
//                     <button 
//                       onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }} 
//                       className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white rounded-xl transition-all"
//                     >
//                       <Eye size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
//             <div className="p-8 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
//               <h2 className="text-2xl font-black uppercase text-primary">Dispatch Details</h2>
//               <button onClick={() => setIsModalOpen(false)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Route Details</p>
//                 <div className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
//                    {selectedOrder.loadingFrom} <ArrowRight size={16} className="text-primary"/> {selectedOrder.offloadingTo}
//                 </div>
//                 <div className="text-xs text-gray-400 font-bold uppercase">DN: {selectedOrder.deliveryNoteNumber}</div>
//               </div>
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Execution Partner</p>
//                 <div className="font-bold text-gray-900 dark:text-white">{selectedOrder.assignedDriver?.name}</div>
//                 <div className="text-xs text-gray-400 font-bold uppercase">Plate: {selectedOrder.vehiclePlateNumber}</div>
//               </div>
//             </div>

//             <div className="p-8 bg-gray-50 dark:bg-gray-800 border-t flex justify-between items-center">
//               <button onClick={() => generatePDF(selectedOrder)} className="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary transition-all shadow-sm">
//                 <Printer size={20} />
//               </button>
              
//               <div className="flex gap-4">
//                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-400 uppercase text-xs">Cancel</button>
//                 {selectedOrder.status === 'Pending' && (
//                   <button 
//                     disabled={isUpdating}
//                     onClick={() => handleUpdateStatus(selectedOrder._id, 'Delivered')}
//                     className="px-8 py-3 bg-green-600 text-white rounded-2xl text-xs font-black uppercase shadow-lg shadow-green-200 flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50"
//                   >
//                     {isUpdating ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle2 size={18}/>}
//                     Mark as Delivered
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DispatchOrders;


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Download, Eye, Loader2, MapPin, Truck, FileDown, Plus, 
  X, User, Building2, ClipboardList, Printer, CheckCircle2, Clock,
  ArrowRight 
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DispatchOrders = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeTab, setActiveTab] = useState('Pending'); 
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dispatch');
      setOrders(res.data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setIsUpdating(true);
    try {
      await api.put(`/dispatch/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = order.status === activeTab;
    const matchesSearch = 
      order.deliveryNoteNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.assignedVendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.assignedDriver?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const generatePDF = (order = null) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(order ? "Dispatch Detail" : "Dispatch Report", 14, 20);
      const dataToPrint = order ? [order] : filteredOrders;
      const tableRows = dataToPrint.map(o => [o.deliveryNoteNumber, o.loadingFrom, o.assignedVendor?.name, o.status]);
      autoTable(doc, {
        head: [['DN#', 'Route', 'Vendor', 'Status']],
        body: tableRows,
        startY: 30,
      });
      const blobUrl = doc.output('bloburl');
      window.open(blobUrl, '_blank');
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary dark:text-white uppercase tracking-tight">
            Logistics Control
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">Track and manage your dispatches</p>
        </div>
        <button onClick={() => navigate('/dispatch/create')} className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
          <Plus size={18} /> New Dispatch
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl w-fit border border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('Pending')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'Pending' ? 'bg-white dark:bg-gray-900 text-primary shadow-md' : 'text-gray-500'}`}
        >
          <Clock size={14} /> Pending ({orders.filter(o => o.status === 'Pending').length})
        </button>
        <button 
          onClick={() => setActiveTab('Delivered')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'Delivered' ? 'bg-white dark:bg-gray-900 text-primary shadow-md' : 'text-gray-500'}`}
        >
          <CheckCircle2 size={14} /> Delivered ({orders.filter(o => o.status === 'Delivered').length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 flex items-center border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
        <Search className="ml-4 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder={`Search ${activeTab} orders...`} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border-none focus:ring-0 font-bold text-gray-700 dark:text-white"
        />
      </div>

      {/* Table Section */}
      <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800 rounded-[2rem] bg-white dark:bg-gray-900 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800">
                <th className="p-6">DN Information</th>
                <th className="p-6">Logistics Partner</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="4" className="p-20 text-center text-gray-400 font-bold uppercase text-[10px]">No Dispatches Found</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order._id} className="transition-all hover:bg-primary/[0.02] dark:hover:bg-primary/[0.04]">
                  <td className="p-6">
                    <div className="font-black text-sm text-gray-900 dark:text-white">{order.deliveryNoteNumber}</div>
                    <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{order.loadingFrom} → {order.offloadingTo}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{order.assignedVendor?.name}</div>
                    <div className="text-[10px] text-gray-500 font-bold mt-1 uppercase flex items-center gap-1">
                      <Truck size={12}/> {order.vehiclePlateNumber}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${activeTab === 'Delivered' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }} 
                      className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white rounded-xl transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <h2 className="text-xl font-black uppercase text-primary tracking-tight">Order Management</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Route Details</p>
                <div className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                   {selectedOrder.loadingFrom} <ArrowRight size={16} className="text-primary"/> {selectedOrder.offloadingTo}
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase bg-gray-100 dark:bg-gray-800 w-fit px-3 py-1 rounded-md">DN: {selectedOrder.deliveryNoteNumber}</div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Driver & Vehicle</p>
                <div className="font-bold text-gray-900 dark:text-white">{selectedOrder.assignedDriver?.name}</div>
                <div className="text-xs text-gray-500 font-bold tracking-tight uppercase">Plate: {selectedOrder.vehiclePlateNumber}</div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 dark:bg-gray-800/50 border-t flex justify-between items-center">
              <button onClick={() => generatePDF(selectedOrder)} className="p-3.5 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary transition-all shadow-sm">
                <Printer size={20} />
              </button>
              
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600 uppercase text-[10px]">Cancel</button>
                {selectedOrder.status === 'Pending' && (
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedOrder._id, 'Delivered')}
                    className="px-8 py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-primary/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={16}/> : <CheckCircle2 size={16}/>}
                    Confirm Delivery
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchOrders;
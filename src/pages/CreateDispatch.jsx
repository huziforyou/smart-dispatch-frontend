import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Loader2, 
  Clock,
  Layout,
  Plus,
  Save,
  Truck,
  MapPin,
  User,
  AlertCircle,
  Tag,
  ClipboardList
} from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const CreateDispatch = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      loadingDateTime: new Date().toISOString().slice(0, 16),
      loadingFrom: '',
      offloadingTo: '',
      materialDescription: '',
      deliveryNoteNumber: '',
      customerName: '',
      customerVAT: '',
      materialQuantity: '',
      assignedVendor: '',
      assignedDriver: '',
      vehiclePlateNumber: '',
      priority: 'medium',
      notes: ''
    }
  });

  const selectedVendor = watch('assignedVendor');
  const selectedDriver = watch('assignedDriver');

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      fetchDrivers(selectedVendor);
      fetchVehicles(selectedVendor);
    } else {
      setDrivers([]);
      setVehicles([]);
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (selectedDriver) {
      const driver = drivers.find(d => d._id === selectedDriver);
      if (driver && driver.vehiclePlateNumber) {
        setValue('vehiclePlateNumber', driver.vehiclePlateNumber);
      }
    }
  }, [selectedDriver, drivers, setValue]);

  const fetchVendors = async () => {
    try {
      const res = await api.get('/vendors');
      setVendors(res.data.data);
    } catch (err) {
      console.error('Failed to fetch vendors');
    }
  };

  const fetchDrivers = async (vendorId) => {
    try {
      const res = await api.get('/drivers');
      const filtered = res.data.data.filter(d => d.vendor?._id === vendorId);
      setDrivers(filtered);
    } catch (err) {
      console.error('Failed to fetch drivers');
    }
  };

  const fetchVehicles = async (vendorId) => {
    try {
      const res = await api.get('/vehicles');
      const filtered = res.data.data.filter(v => v.vendor?._id === vendorId);
      setVehicles(filtered);
    } catch (err) {
      console.error('Failed to fetch vehicles');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/dispatch', data);
      alert(i18n.language === 'ar' ? 'تم إنشاء أمر الإرسال بنجاح!' : 'Dispatch order created successfully!');
      navigate('/dispatch');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create dispatch order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">
            {i18n.language === 'ar' ? 'إنشاء أمر إرسال جديد' : 'Create Dispatch Order'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {i18n.language === 'ar' ? 'أدخل تفاصيل الشحنة يدويًا لتعيين مهمة جديدة.' : 'Enter dispatch details manually to assign a new delivery task.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Logistics Partners */}
        <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Truck size={18} className="text-accent" />
              Logistics Partners
            </h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Assigned Vendor</label>
              <select 
                {...register('assignedVendor', { required: true })} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select Vendor</option>
                {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Assigned Driver</label>
              <select 
                {...register('assignedDriver', { required: true })} 
                disabled={!selectedVendor}
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              >
                <option value="">{selectedVendor ? 'Select Driver' : 'Select Vendor First'}</option>
                {drivers.map(d => <option key={d._id} value={d._id}>{d.name} ({d.iqamaNumber})</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Vehicle Plate Number</label>
              <input 
                type="text" 
                {...register('vehiclePlateNumber', { required: true })} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                placeholder="ABC-1234"
              />
            </div>
          </div>
        </div>

        {/* Route & Timeline */}
        <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              Route & Timeline
            </h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Loading Date & Time</label>
              <input 
                type="datetime-local" 
                {...register('loadingDateTime', { required: true })} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Priority Level</label>
              <select 
                {...register('priority')} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Loading From (Pickup)</label>
              <input 
                type="text" 
                {...register('loadingFrom', { required: true })} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g. Riyadh Warehouse A"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Offloading To (Delivery)</label>
              <input 
                type="text" 
                {...register('offloadingTo', { required: true })} 
                className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g. Jeddah Distribution Center"
              />
            </div>
          </div>
        </div>

        {/* Material & Customer Details */}
        <div className="glass-card overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
              <ClipboardList size={18} className="text-accent" />
              Material & Customer Info
            </h3>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Delivery Note #</label>
                <input 
                  type="text" 
                  {...register('deliveryNoteNumber', { required: true })} 
                  className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                  placeholder="DN-123456"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Material Quantity</label>
                <input 
                  type="text" 
                  {...register('materialQuantity', { required: true })} 
                  className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                  placeholder="e.g. 20 Pallets / 500 KG"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Customer Name</label>
                <input 
                  type="text" 
                  {...register('customerName')} 
                  className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Company or Person Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Material Description</label>
                <textarea 
                  {...register('materialDescription')} 
                  rows="3"
                  className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="List items, handling instructions, etc."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Additional Notes</label>
                <textarea 
                  {...register('notes')} 
                  rows="3"
                  className="w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Internal notes for admin or driver"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-12 py-4 btn-primary rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Create Dispatch
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDispatch;

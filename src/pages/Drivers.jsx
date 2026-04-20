import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Truck, 
  Plus, 
  Search, 
  Phone, 
  User, 
  ShieldCheck,
  Loader2,
  X,
  Building2,
  Save,
  Trash2,
  Edit2,
  CreditCard,
  History,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const DriverModal = ({ isOpen, onClose, driver, onSave, vendors, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    iqamaNumber: '',
    phone: '',
    vendor: '',
    vehiclePlateNumber: '',
    status: 'active',
    licenseExpiry: ''
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || '',
        iqamaNumber: driver.iqamaNumber || '',
        phone: driver.phone || '',
        vendor: driver.vendor?._id || driver.vendor || '',
        vehiclePlateNumber: driver.vehiclePlateNumber || '',
        status: driver.status || 'active',
        licenseExpiry: driver.licenseExpiry ? new Date(driver.licenseExpiry).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        name: '',
        iqamaNumber: '',
        phone: '',
        vendor: vendors[0]?._id || '',
        vehiclePlateNumber: '',
        status: 'active',
        licenseExpiry: ''
      });
    }
  }, [driver, vendors]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">
              {driver ? 'Edit Driver' : 'Add New Driver'}
            </h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Manage driver credentials and status</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Iqama Number</label>
            <input type="text" required value={formData.iqamaNumber} onChange={(e) => setFormData({...formData, iqamaNumber: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="10-digit ID" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
            <input type="text" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="+966..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Assign Vendor</label>
            <select required value={formData.vendor} onChange={(e) => setFormData({...formData, vendor: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all appearance-none">
              <option value="">Select Vendor</option>
              {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Vehicle Plate #</label>
            <input type="text" value={formData.vehiclePlateNumber} onChange={(e) => setFormData({...formData, vehiclePlateNumber: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="ABC-1234" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">License Expiry</label>
            <input type="date" value={formData.licenseExpiry} onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all appearance-none">
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="submit" disabled={loading} className="w-full btn-primary py-5 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {driver ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const DriverPassModal = ({ isOpen, onClose, driverId }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && driverId) fetchDriverDetails();
  }, [isOpen, driverId]);

  const fetchDriverDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/drivers/${driverId}`);
      setDriver(res.data.data);
    } catch (error) {
      console.error('Failed to fetch driver details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-accent/5">
          <div>
            <h3 className="text-2xl font-black text-primary dark:text-white uppercase tracking-tight flex items-center gap-3">
              <User className="text-accent" />
              {driver?.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Enterprise Driver ID & Task History</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-accent" size={40} />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Generating ID Pass...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    <User size={80} className="text-gray-300" />
                  </div>
                </div>
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Iqama ID</p>
                      <p className="text-lg font-black text-primary dark:text-white">{driver?.iqamaNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                      <p className="text-lg font-black text-primary dark:text-white">{driver?.phone}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Logistics Vendor</p>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400">{driver?.vendor?.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">License Valid Thru</p>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400">{driver?.licenseExpiry ? new Date(driver.licenseExpiry).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="pt-10 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Truck size={20} className="text-accent" />
                  Assigned Deliveries
                </h4>
                <div className="space-y-4">
                  {!driver?.tasks?.length ? (
                    <div className="py-16 text-center bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                      <AlertCircle className="mx-auto text-gray-300 mb-4" size={40} />
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No active tasks assigned</p>
                    </div>
                  ) : (
                    driver.tasks.map((task) => (
                      <div key={task._id} className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-accent/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><Truck size={24} /></div>
                            <div>
                              <h5 className="text-sm font-black text-primary dark:text-white uppercase tracking-tight">{task.deliveryNoteNumber}</h5>
                              <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                <Clock size={12} /> {new Date(task.createdAt).toLocaleDateString()}
                                <span className="mx-1">•</span>
                                <span className="text-accent">From: {task.loadingFrom}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${task.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{task.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Drivers = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchDrivers(); fetchVendors(); }, []);

  const fetchDrivers = async () => {
    try {
      const res = await api.get('/drivers');
      setDrivers(res.data.data);
    } catch (error) {
      console.error('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await api.get('/vendors');
      setVendors(res.data.data);
    } catch (error) {
      console.error('Failed to fetch vendors');
    }
  };

  const handleSave = async (formData) => {
    setActionLoading(true);
    try {
      if (editingDriver) await api.put(`/drivers/${editingDriver._id}`, formData);
      else await api.post('/drivers', formData);
      fetchDrivers();
      setModalOpen(false);
      setEditingDriver(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this driver?')) return;
    try {
      await api.delete(`/drivers/${id}`);
      fetchDrivers();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const filteredDrivers = drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.iqamaNumber.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight uppercase">Fleet Drivers</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Manage logistics personnel and assignment status.</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'super-admin') && (
          <button onClick={() => { setEditingDriver(null); setModalOpen(true); }} className="btn-primary px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-all">
            <Plus size={20} /> Add New Driver
          </button>
        )}
      </div>

      <div className="glass-card p-6 flex items-center border border-gray-100 dark:border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search drivers by name or Iqama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrivers.map((driver) => (
            <div key={driver._id} onClick={() => { setSelectedDriverId(driver._id); setPassModalOpen(true); }} className="glass-card p-8 border border-gray-100 dark:border-gray-800 hover:border-accent/20 transition-all group relative cursor-pointer flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-accent/5 text-accent rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <User size={28} />
                </div>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setEditingDriver(driver); setModalOpen(true); }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Edit2 size={18} /></button>
                  {user?.role === 'super-admin' && <button onClick={() => handleDelete(driver._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>}
                </div>
              </div>
              <h3 className="text-xl font-black text-primary dark:text-white mb-1 tracking-tight uppercase">{driver.name}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-8">Iqama: {driver.iqamaNumber}</p>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Jobs</p>
                  <p className="text-sm font-black text-primary dark:text-white">{driver.taskCount || 0}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Logistics</p>
                  <p className="text-sm font-black text-accent truncate">{driver.vendor?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && <DriverModal isOpen={modalOpen} onClose={() => setModalOpen(false)} driver={editingDriver} onSave={handleSave} vendors={vendors} loading={actionLoading} />}
        {passModalOpen && <DriverPassModal isOpen={passModalOpen} onClose={() => setPassModalOpen(false)} driverId={selectedDriverId} />}
      </AnimatePresence>
    </div>
  );
};

export default Drivers;

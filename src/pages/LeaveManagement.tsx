import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  FileText,
  Award,
  BookOpen,
  User,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface LeaveRequest {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
  created_at: string;
}

const LeaveManagement = () => {
  const navigate = useNavigate();
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalance, setLeaveBalance] = useState(20);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    leaveType: 'casual',
    reason: ''
  });

  const menuItems = [
    { icon: <CalendarIcon />, label: 'Leave Management', path: '/employee/leaves', active: true },
    { icon: <Clock />, label: 'Attendance', path: '/employee/dashboard' },
    { icon: <FileText />, label: 'Documents', path: '/employee/documents' },
    { icon: <Award />, label: 'Certificates', path: '/employee/certificates' },
    { icon: <BookOpen />, label: 'Learning', path: '/employee/learning' },
  ];

  useEffect(() => {
    fetchLeaveRequests();
    fetchLeaveBalance();
  }, []);

  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leave requests:', error);
    } else {
      setLeaveRequests(data || []);
    }
  };

  const fetchLeaveBalance = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('leave_balance')
      .single();

    if (error) {
      console.error('Error fetching leave balance:', error);
    } else if (data) {
      setLeaveBalance(data.leave_balance);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const daysRequested = differenceInDays(selectedEndDate, selectedStartDate) + 1;
    
    if (daysRequested > leaveBalance) {
      alert('Insufficient leave balance');
      return;
    }

    const { error } = await supabase
      .from('leave_requests')
      .insert({
        leave_type: formData.leaveType,
        start_date: format(selectedStartDate, 'yyyy-MM-dd'),
        end_date: format(selectedEndDate, 'yyyy-MM-dd'),
        reason: formData.reason,
        status: 'pending'
      });

    if (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
    } else {
      setShowNewRequestForm(false);
      fetchLeaveRequests();
      setFormData({ leaveType: 'casual', reason: '' });
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-brand-purple text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <User className="w-8 h-8" />
            <div>
              <h2 className="font-semibold">John Doe</h2>
              <p className="text-sm text-white/70">UI/UX Designer</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-4">
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
              <p className="text-gray-600">Manage your leave requests and balance</p>
            </div>
            <button
              onClick={() => setShowNewRequestForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-magenta transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>

          {/* Leave Balance Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Leave Balance</h2>
                <p className="text-gray-600">Available leaves for the year</p>
              </div>
              <div className="text-3xl font-bold text-brand-purple">
                {leaveBalance} days
              </div>
            </div>
          </div>

          {/* New Leave Request Form */}
          {showNewRequestForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">New Leave Request</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Leave Type
                      </label>
                      <select
                        value={formData.leaveType}
                        onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                      >
                        <option value="casual">Casual Leave</option>
                        <option value="sick">Sick Leave</option>
                        <option value="annual">Annual Leave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <button
                            type="button"
                            onClick={() => setShowCalendar('start')}
                            className="w-full px-3 py-2 border rounded-lg text-left flex items-center justify-between"
                          >
                            <span>{format(selectedStartDate, 'MMM dd, yyyy')}</span>
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                          </button>
                          {showCalendar === 'start' && (
                            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
                              <div className="flex items-center justify-between mb-4">
                                <button
                                  type="button"
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="font-medium">
                                  {format(currentMonth, 'MMMM yyyy')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                  <div key={day} className="text-center text-sm font-medium text-gray-500">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-1 mt-2">
                                {getDaysInMonth(currentMonth).map((date, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                      if (date) {
                                        setSelectedStartDate(date);
                                        setShowCalendar(null);
                                      }
                                    }}
                                    disabled={!date || date < new Date()}
                                    className={`
                                      p-2 text-center rounded-full
                                      ${!date ? 'invisible' : ''}
                                      ${date && date < new Date() ? 'text-gray-300 cursor-not-allowed' : ''}
                                      ${
                                        date &&
                                        format(date, 'yyyy-MM-dd') === format(selectedStartDate, 'yyyy-MM-dd')
                                          ? 'bg-brand-purple text-white'
                                          : 'hover:bg-gray-100'
                                      }
                                    `}
                                  >
                                    {date ? format(date, 'd') : ''}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500">to</span>
                        <div className="relative flex-1">
                          <button
                            type="button"
                            onClick={() => setShowCalendar('end')}
                            className="w-full px-3 py-2 border rounded-lg text-left flex items-center justify-between"
                          >
                            <span>{format(selectedEndDate, 'MMM dd, yyyy')}</span>
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                          </button>
                          {showCalendar === 'end' && (
                            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
                              <div className="flex items-center justify-between mb-4">
                                <button
                                  type="button"
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="font-medium">
                                  {format(currentMonth, 'MMMM yyyy')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                  <div key={day} className="text-center text-sm font-medium text-gray-500">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-1 mt-2">
                                {getDaysInMonth(currentMonth).map((date, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                      if (date) {
                                        setSelectedEndDate(date);
                                        setShowCalendar(null);
                                      }
                                    }}
                                    disabled={!date || date < selectedStartDate}
                                    className={`
                                      p-2 text-center rounded-full
                                      ${!date ? 'invisible' : ''}
                                      ${date && date < selectedStartDate ? 'text-gray-300 cursor-not-allowed' : ''}
                                      ${
                                        date &&
                                        format(date, 'yyyy-MM-dd') === format(selectedEndDate, 'yyyy-MM-dd')
                                          ? 'bg-brand-purple text-white'
                                          : 'hover:bg-gray-100'
                                      }
                                    `}
                                  >
                                    {date ? format(date, 'd') : ''}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason
                      </label>
                      <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewRequestForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-magenta transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Leave Requests List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Leave Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Date Range</th>
                      <th className="text-left py-3 px-4">Days</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 px-4 capitalize">{request.leave_type}</td>
                        <td className="py-3 px-4">
                          {format(new Date(request.start_date), 'MMM dd, yyyy')} -{' '}
                          {format(new Date(request.end_date), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4">
                          {differenceInDays(new Date(request.end_date), new Date(request.start_date)) + 1} days
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm capitalize ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{request.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
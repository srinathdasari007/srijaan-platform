import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon,
  Clock, 
  FileText, 
  Award, 
  BookOpen,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Coffee
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AttendanceLog {
  id: string;
  check_in: string;
  check_out: string | null;
  date: string;
  breaks: {
    id: string;
    start_time: string;
    end_time: string | null;
  }[];
}

const AttendancePage = () => {
  const navigate = useNavigate();
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const menuItems = [
    { icon: <CalendarIcon />, label: 'Leave Management', path: '/employee/leaves' },
    { icon: <Clock />, label: 'Attendance', path: '/employee/attendance', active: true },
    { icon: <FileText />, label: 'Documents', path: '/employee/documents' },
    { icon: <Award />, label: 'Certificates', path: '/employee/certificates' },
    { icon: <BookOpen />, label: 'Learning', path: '/employee/learning' },
  ];

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        checkCurrentStatus(session.user.id);
      } else {
        navigate('/');
      }
    };

    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchAttendanceLogs();
    }
  }, [selectedDate, userId]);

  const checkCurrentStatus = async (uid: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if already checked in
    const { data: currentLog } = await supabase
      .from('attendance_logs')
      .select('*')
      .eq('employee_id', uid)
      .eq('date', today)
      .is('check_out', null)
      .single();

    setIsCheckedIn(!!currentLog);

    if (currentLog) {
      // Check if on break
      const { data: currentBreak } = await supabase
        .from('break_logs')
        .select('*')
        .eq('employee_id', uid)
        .eq('attendance_log_id', currentLog.id)
        .is('end_time', null)
        .single();

      setIsOnBreak(!!currentBreak);
    }
  };

  const fetchAttendanceLogs = async () => {
    try {
      setIsLoading(true);
      const { data: logs, error: logsError } = await supabase
        .from('attendance_logs')
        .select('*')
        .eq('employee_id', userId)
        .eq('date', format(selectedDate, 'yyyy-MM-dd'))
        .order('check_in', { ascending: false });

      if (logsError) throw logsError;

      const logsWithBreaks = await Promise.all(
        (logs || []).map(async (log) => {
          const { data: breaks, error: breaksError } = await supabase
            .from('break_logs')
            .select('*')
            .eq('attendance_log_id', log.id)
            .order('start_time', { ascending: true });

          if (breaksError) throw breaksError;

          return {
            ...log,
            breaks: breaks || []
          };
        })
      );

      setAttendanceLogs(logsWithBreaks);
    } catch (error) {
      console.error('Error fetching attendance logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckInOut = async () => {
    if (!userId) return;

    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');

    if (!isCheckedIn) {
      // Check in
      const { error } = await supabase
        .from('attendance_logs')
        .insert({
          employee_id: userId,
          check_in: now.toISOString(),
          date: today
        });

      if (!error) {
        setIsCheckedIn(true);
        fetchAttendanceLogs();
      }
    } else {
      // Check out
      const { error } = await supabase
        .from('attendance_logs')
        .update({ check_out: now.toISOString() })
        .eq('employee_id', userId)
        .eq('date', today)
        .is('check_out', null);

      if (!error) {
        setIsCheckedIn(false);
        setIsOnBreak(false);
        fetchAttendanceLogs();
      }
    }
  };

  const handleBreak = async () => {
    if (!userId || !isCheckedIn) return;

    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');

    if (!isOnBreak) {
      // Start break
      const { data: currentLog } = await supabase
        .from('attendance_logs')
        .select('id')
        .eq('employee_id', userId)
        .eq('date', today)
        .is('check_out', null)
        .single();

      if (currentLog) {
        const { error } = await supabase
          .from('break_logs')
          .insert({
            employee_id: userId,
            attendance_log_id: currentLog.id,
            start_time: now.toISOString()
          });

        if (!error) {
          setIsOnBreak(true);
          fetchAttendanceLogs();
        }
      }
    } else {
      // End break
      const { error } = await supabase
        .from('break_logs')
        .update({ end_time: now.toISOString() })
        .eq('employee_id', userId)
        .is('end_time', null);

      if (!error) {
        setIsOnBreak(false);
        fetchAttendanceLogs();
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

  const formatDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return 'In Progress';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
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
              <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
              <p className="text-gray-600">Track your daily attendance and breaks</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCheckInOut}
                disabled={!userId}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isCheckedIn
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCheckedIn ? 'Check Out' : 'Check In'}
              </button>

              <button
                onClick={handleBreak}
                disabled={!isCheckedIn || !userId}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isOnBreak
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-brand-purple text-white hover:bg-brand-magenta'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Coffee className="w-4 h-4" />
                <span>{isOnBreak ? 'End Break' : 'Take Break'}</span>
              </button>
            </div>
          </div>

          {/* Date Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="relative">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                </button>

                {showCalendar && (
                  <div className="absolute mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="font-medium">
                        {format(currentMonth, 'MMMM yyyy')}
                      </span>
                      <button
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
                          onClick={() => {
                            if (date) {
                              setSelectedDate(date);
                              setShowCalendar(false);
                            }
                          }}
                          disabled={!date || date > new Date()}
                          className={`
                            p-2 text-center rounded-full
                            ${!date ? 'invisible' : ''}
                            ${date && date > new Date() ? 'text-gray-300 cursor-not-allowed' : ''}
                            ${
                              date &&
                              format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
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

          {/* Attendance Records */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-purple mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading attendance records...</p>
              </div>
            ) : attendanceLogs.length > 0 ? (
              <div className="p-6">
                {attendanceLogs.map((log) => (
                  <div key={log.id} className="border-b last:border-0 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {format(new Date(log.check_in), 'EEEE, MMMM d')}
                        </h3>
                        <p className="text-gray-600">
                          Check-in: {format(new Date(log.check_in), 'h:mm a')}
                          {log.check_out && ` • Check-out: ${format(new Date(log.check_out), 'h:mm a')}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-brand-purple">
                          {formatDuration(log.check_in, log.check_out)}
                        </p>
                        <p className="text-sm text-gray-600">Total Duration</p>
                      </div>
                    </div>

                    {log.breaks && log.breaks.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Breaks</h4>
                        <div className="space-y-2">
                          {log.breaks.map((break_) => (
                            <div key={break_.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm">
                                <p className="text-gray-600">
                                  {format(new Date(break_.start_time), 'h:mm a')} -{' '}
                                  {break_.end_time ? format(new Date(break_.end_time), 'h:mm a') : 'In Progress'}
                                </p>
                              </div>
                              <div className="text-sm font-medium text-brand-purple">
                                {formatDuration(break_.start_time, break_.end_time)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600">No attendance records found for this date.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
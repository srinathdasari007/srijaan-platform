import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, differenceInSeconds } from 'date-fns';
import { 
  Clock, 
  Coffee, 
  LogOut, 
  Calendar as CalendarIcon, 
  FileText, 
  Award, 
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workTimer, setWorkTimer] = useState(0);
  const [breakTimer, setBreakTimer] = useState(0);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<Date | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Get the current user's ID when component mounts
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        // If no session, redirect to login
        navigate('/');
      }
    };

    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update work timer
      if (isCheckedIn && !isOnBreak && checkInTime) {
        setWorkTimer(prev => prev + 1);
      }

      // Update break timer
      if (isOnBreak && breakStartTime) {
        setBreakTimer(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCheckedIn, isOnBreak, checkInTime, breakStartTime]);

  const handleCheckInOut = async () => {
    if (!userId) return; // Don't proceed if we don't have a user ID

    if (!isCheckedIn) {
      // Check in
      const checkInTimeNow = new Date();
      setCheckInTime(checkInTimeNow);
      setWorkTimer(0);
      setIsCheckedIn(true);
      setCheckOutTime(null);

      // Create attendance log
      await supabase.from('attendance_logs').insert({
        employee_id: userId,
        check_in: checkInTimeNow.toISOString(),
        date: format(selectedDate, 'yyyy-MM-dd')
      });
    } else {
      // Check out
      const checkOutTimeNow = new Date();
      setCheckOutTime(checkOutTimeNow);
      setCheckInTime(null);
      setIsCheckedIn(false);
      setIsOnBreak(false);
      setBreakTimer(0);

      // Update attendance log
      await supabase
        .from('attendance_logs')
        .update({ check_out: checkOutTimeNow.toISOString() })
        .eq('employee_id', userId)
        .eq('date', format(selectedDate, 'yyyy-MM-dd'))
        .is('check_out', null);
    }
  };

  const handleBreak = async () => {
    if (!userId) return; // Don't proceed if we don't have a user ID

    if (!isOnBreak) {
      // Start break
      const breakStartTimeNow = new Date();
      setBreakStartTime(breakStartTimeNow);
      setIsOnBreak(true);
      setBreakEndTime(null);

      // Get the current attendance log ID
      const { data: attendanceLog } = await supabase
        .from('attendance_logs')
        .select('id')
        .eq('employee_id', userId)
        .eq('date', format(selectedDate, 'yyyy-MM-dd'))
        .is('check_out', null)
        .single();

      if (attendanceLog) {
        // Create break log
        await supabase.from('break_logs').insert({
          employee_id: userId,
          start_time: breakStartTimeNow.toISOString(),
          attendance_log_id: attendanceLog.id
        });
      }
    } else {
      // End break
      const breakEndTimeNow = new Date();
      setBreakEndTime(breakEndTimeNow);
      setBreakStartTime(null);
      setIsOnBreak(false);

      // Update break log
      await supabase
        .from('break_logs')
        .update({ end_time: breakEndTimeNow.toISOString() })
        .eq('employee_id', userId)
        .is('end_time', null);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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

  const menuItems = [
    { icon: <CalendarIcon />, label: 'Leave Management', path: '/employee/leaves' },
    { icon: <Clock />, label: 'Attendance', path: '/employee/attendance' },
    { icon: <FileText />, label: 'Documents', path: '/employee/documents' },
    { icon: <Award />, label: 'Certificates', path: '/employee/certificates' },
    { icon: <BookOpen />, label: 'Learning', path: '/employee/learning' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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
                className="flex items-center space-x-3 w-full px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
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
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Time Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Time Tracking</h2>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="text-gray-600 hover:text-brand-purple flex items-center space-x-2"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </button>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 z-50">
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

                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className="text-center text-sm font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
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
                <p className="text-2xl font-bold text-brand-purple mt-2">
                  {format(currentTime, 'hh:mm:ss a')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Work Time</p>
                  <p className="text-xl font-bold text-brand-purple">{formatTime(workTimer)}</p>
                  {checkInTime && (
                    <p className="text-sm text-gray-500">
                      Check-in: {format(checkInTime, 'hh:mm:ss a')}
                    </p>
                  )}
                  {checkOutTime && (
                    <p className="text-sm text-gray-500">
                      Check-out: {format(checkOutTime, 'hh:mm:ss a')}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Break Time</p>
                  <p className="text-xl font-bold text-brand-purple">{formatTime(breakTimer)}</p>
                  {breakStartTime && (
                    <p className="text-sm text-gray-500">
                      Break start: {format(breakStartTime, 'hh:mm:ss a')}
                    </p>
                  )}
                  {breakEndTime && (
                    <p className="text-sm text-gray-500">
                      Break end: {format(breakEndTime, 'hh:mm:ss a')}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckInOut}
                  disabled={!userId}
                  className={`w-full px-6 py-2 rounded-lg font-medium transition-colors ${
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
                  className={`w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                    isOnBreak
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-brand-purple text-white hover:bg-brand-magenta'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Coffee className="w-4 h-4" />
                    <span>{isOnBreak ? 'End Break' : 'Take Break'}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Leave Balance</h3>
              <p className="text-3xl font-bold text-brand-purple">15 days</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
              <p className="text-3xl font-bold text-brand-purple">98%</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
              <p className="text-3xl font-bold text-brand-purple">75%</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { date: '2024-03-20', activity: 'Completed Python Basics Course' },
                { date: '2024-03-19', activity: 'Applied for Casual Leave' },
                { date: '2024-03-18', activity: 'Updated Profile Information' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <div>
                    <p className="text-gray-600 text-sm">{item.date}</p>
                    <p className="font-medium">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
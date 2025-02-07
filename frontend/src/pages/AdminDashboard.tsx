import React, { useState } from 'react';
import { 
  Users, 
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  BarChart3,
  TrendingUp,
  Database,
  Shield,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const stats = {
    totalUsers: 15234,
    activeUsers: 12453,
    revenue: '$534,233',
    growth: '+23%',
    serverStatus: 'Healthy',
    uptime: '99.9%',
    pendingIssues: 13,
    resolvedIssues: 145
  };

  const recentActivities = [
    { type: 'User Registration', user: 'Sarah Connor', status: 'success', time: '2 min ago', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { type: 'Security Alert', user: 'System', status: 'warning', time: '15 min ago', icon: <AlertTriangle className="w-5 h-5 text-yellow-500" /> },
    { type: 'Payment Failed', user: 'John Smith', status: 'error', time: '1 hour ago', icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { type: 'Database Backup', user: 'System', status: 'success', time: '2 hours ago', icon: <CheckCircle className="w-5 h-5 text-green-500" /> }
  ];

  const activeUsers = [
    { name: 'Emma Watson', role: 'Content Editor', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'James Bond', role: 'Administrator', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { name: 'Lisa Monroe', role: 'Moderator', status: 'away', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { name: 'Tom Hardy', role: 'Support', status: 'offline', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
  ];

  const MenuButton = ({ icon, label, active }) => (
    <button
      onClick={() => setSelectedMenu(label.toLowerCase())}
      className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300
        ${active ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') 
        : (darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100')}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[url("/Chats.png")] bg-center bg-cover text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Floating Navigation */}
      <div className="max-w- mx-auto pt-40">
        <div className={`${darkMode ? 'bg-gray-950/80' : 'bg-white'} backdrop-blur-lg shadow-lg rounded-3xl transition-all duration-300 hover:shadow-xl`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                <LayoutDashboard className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold">AdminHub</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className={`hidden md:flex items-center space-x-2 p-2 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                <Search className="w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className={`bg-transparent border-none focus:outline-none w-64 ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`}
                />
              </div>
              
              <button className="relative">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'} 
                  transition-all duration-300`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
                    alt="Admin" 
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium">Admin User</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} rounded-3xl p-4 shadow-lg backdrop-blur-sm`}>
                <div className="space-y-2">
                  <MenuButton 
                    icon={<LayoutDashboard className="w-5 h-5" />} 
                    label="Dashboard" 
                    active={selectedMenu === 'dashboard'}
                  />
                  <MenuButton 
                    icon={<Users className="w-5 h-5" />} 
                    label="Users" 
                    active={selectedMenu === 'users'}
                  />
                  <MenuButton 
                    icon={<BarChart3 className="w-5 h-5" />} 
                    label="Analytics" 
                    active={selectedMenu === 'analytics'}
                  />
                  <MenuButton 
                    icon={<Database className="w-5 h-5" />} 
                    label="Database" 
                    active={selectedMenu === 'database'}
                  />
                  <MenuButton 
                    icon={<Shield className="w-5 h-5" />} 
                    label="Security" 
                    active={selectedMenu === 'security'}
                  />
                  <MenuButton 
                    icon={<Settings className="w-5 h-5" />} 
                    label="Settings" 
                    active={selectedMenu === 'settings'}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Users className="w-6 h-6 text-blue-500" />, label: "Total Users", value: stats.totalUsers, subtext: `${stats.activeUsers} active` },
                  { icon: <TrendingUp className="w-6 h-6 text-green-500" />, label: "Revenue", value: stats.revenue, subtext: stats.growth },
                  { icon: <Database className="w-6 h-6 text-purple-500" />, label: "Server Status", value: stats.serverStatus, subtext: stats.uptime },
                  { icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />, label: "Issues", value: stats.pendingIssues, subtext: `${stats.resolvedIssues} resolved` }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} rounded-3xl p-6 
                      shadow-lg backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-[1.02]`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{stat.subtext}</p>
                      </div>
                      <div className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} rounded-3xl shadow-lg backdrop-blur-sm`}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Recent Activities</h3>
                      <div className="flex space-x-2">
                        <button className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <Filter className="w-5 h-5" />
                        </button>
                        <button className={`p-2 rounded-xl ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div 
                          key={index}
                          className={`p-4 flex items-center justify-between rounded-2xl
                            ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} 
                            transition-all duration-300 hover:transform hover:scale-[1.01]`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                              {activity.icon}
                            </div>
                            <div>
                              <p className="font-medium">{activity.type}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.user}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
                            <button>
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Users */}
                <div className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} rounded-3xl shadow-lg backdrop-blur-sm`}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Active Users</h3>
                      <button className={`flex items-center space-x-2 p-2 rounded-xl 
                        ${darkMode ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <span>All Users</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {activeUsers.map((user, index) => (
                        <div 
                          key={index}
                          className={`p-4 flex items-center justify-between rounded-2xl
                            ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} 
                            transition-all duration-300 hover:transform hover:scale-[1.01]`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 
                                ${darkMode ? 'border-gray-900' : 'border-white'}
                                ${user.status === 'online' ? 'bg-green-500' : 
                                  user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'}`} 
                              />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.role}</p>
                            </div>
                          </div>
                          <button>
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
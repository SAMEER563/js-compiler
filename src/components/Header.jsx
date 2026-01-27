import { FaPlay, FaTrash, FaCode, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ onRun, onClear, isRunning, theme, onToggleTheme }) => {
  const isDark = theme === 'dark';
  
  return (
    <header className={`shadow-2xl relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500'
    }`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-white/5 to-transparent"></div>
      
      <div className="relative flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-5 ">
          <div className={`p-4 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden group ${
            isDark 
              ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' 
              : 'bg-gradient-to-br from-white/40 to-white/20'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
           
          </div>
          <div>
            <h1 className={`text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
              isDark 
                ? 'from-purple-400 via-pink-300 to-purple-400' 
                : 'from-white via-blue-100 to-white'
            } drop-shadow-lg`}>
              JS Compiler
            </h1>
       
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          {isRunning && (
            <div className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl backdrop-blur-xl shadow-2xl border ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30' 
                : 'bg-gradient-to-r from-white/30 to-white/20 border-white/40'
            }`}>
              <div className={`animate-spin rounded-full h-5 w-5 border-2 ${
                isDark 
                  ? 'border-purple-400 border-t-transparent' 
                  : 'border-white border-t-transparent'
              } shadow-lg`}></div>
              <span className={`text-base font-bold ${
                isDark ? 'text-purple-300' : 'text-white'
              }`}>Executing...</span>
            </div>
          )}
          
          <button
            onClick={onRun}
            disabled={isRunning}
            className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transform overflow-hidden min-w-[140px]"
            title="Run Code (Ctrl/Cmd + Enter)"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <FaPlay className="text-sm relative z-10 drop-shadow-lg" />
            <span className="relative z-10 text-base drop-shadow-lg">Run Code</span>
          </button>
          
          <button
            onClick={onClear}
            className={`group relative flex items-center justify-center gap-3 font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-2xl hover:scale-105 transform overflow-hidden min-w-[120px] ${
              isDark 
                ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 text-purple-300 hover:shadow-purple-500/50' 
                : 'bg-gradient-to-r from-white/30 via-white/40 to-white/30 hover:from-white/40 hover:via-white/50 hover:to-white/40 text-white hover:shadow-white/50'
            } backdrop-blur-xl border ${
              isDark ? 'border-slate-500/50' : 'border-white/40'
            }`}
            title="Clear Output (Ctrl/Cmd + L)"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <FaTrash className="text-sm relative z-10 drop-shadow-lg" />
            <span className="relative z-10 text-base drop-shadow-lg">Clear</span>
          </button>
          
          <button
            onClick={onToggleTheme}
            className={`group relative flex items-center justify-center w-[40px] h-[40px] rounded-xl transition-all duration-300 shadow-2xl hover:scale-105 transform overflow-hidden ml-1 ${
              isDark 
                ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-400 text-slate-900 hover:shadow-yellow-500/70' 
                : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 text-white hover:shadow-indigo-500/70'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {isDark ? (
              <FaSun className="text-xl relative z-10 drop-shadow-lg animate-pulse" />
            ) : (
              <FaMoon className="text-xl relative z-10 drop-shadow-lg" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

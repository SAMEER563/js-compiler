import { FaPlay, FaTrash, FaCode, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ 
  onRun, 
  onClear, 
  isRunning, 
  theme, 
  onToggleTheme, 
  executionTime
}) => {
  const isDark = theme === 'dark';
  

  return (
    <header
  className={` border-b transition-colors duration-300 ${
    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
  }`}
>
  <div className="flex items-center justify-between   px-8 py-6">
    {/* LEFT SIDE */}
    <div className="flex items-center gap-5">
      <div
        className= "p-4   "
      >
        <FaCode
          className= "text-2xl text-blue-600"
            
        />
      </div>

      <div className="flex flex-col">
        <h1
          className={`text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-orange-400'
          }`}
        >
          JS Compiler
        </h1>
        <p
          className={`text-sm mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Run JavaScript Instantly
        </p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4">
      {executionTime && (
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
            isDark
              ? 'bg-green-900/30 text-green-400 border border-green-700'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          <span className="font-bold">⚡ {executionTime}ms</span>
        </div>
      )}

      {isRunning && (
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
            isDark
              ? 'bg-slate-800 text-gray-300'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
          Executing...
        </div>
      )}

     <button
  onClick={onRun}
  disabled={isRunning}
  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition 
    ${isDark 
      ? 'bg-black text-white hover:opacity-90' 
      : 'bg-white text-black  '
    } 
    disabled:opacity-50`}
  title="Run Code (Ctrl+Enter)"
>
  <FaPlay className= "text-sm text-green-500 " />
  Run
</button>

<button
  onClick={onClear}
  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition
    ${isDark 
      ? 'bg-black text-white hover:opacity-90' 
      : 'bg-white text-black'
    }`}
  title="Clear Output (Ctrl+L)"
>
  <FaTrash className= "text-sm text-red-500" />
  Clear
</button>


      <button
        onClick={onToggleTheme}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${
          isDark
            ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
            : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'
        }`}
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  </div>
</header>

  );
};

export default Header;

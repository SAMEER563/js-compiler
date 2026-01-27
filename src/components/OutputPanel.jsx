import { useEffect, useRef } from 'react';
import { FaTerminal } from 'react-icons/fa';

const OutputPanel = ({ output, theme }) => {
  const outputEndRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Auto-scroll to bottom when new output arrives
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const getTextColor = (type) => {
    if (isDark) {
      switch (type) {
        case 'error':
          return 'text-red-400';
        case 'warn':
          return 'text-amber-400';
        case 'info':
          return 'text-cyan-400';
        default:
          return 'text-emerald-400';
      }
    } else {
      switch (type) {
        case 'error':
          return 'text-red-600';
        case 'warn':
          return 'text-amber-600';
        case 'info':
          return 'text-cyan-600';
        default:
          return 'text-emerald-600';
      }
    }
  };

  const formatMessage = (message) => {
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message, null, 2);
      } catch (e) {
        return String(message);
      }
    }
    return String(message);
  };

  return (
    <div className={`h-full w-full flex flex-col shadow-inner transition-colors duration-300 ${
      isDark ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      <div className={`px-5 py-3 border-b flex items-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700' 
          : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300'
      }`}>
        <div className="flex items-center gap-3">
          <h2 className={`font-semibold text-sm ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>Console Output</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {output.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <FaTerminal className="text-6xl mb-4 opacity-20" />
            <p className="text-lg font-medium">Ready to execute</p>
            <p className="text-sm mt-2">Press Run or Ctrl+Enter to see output</p>
          </div>
        ) : (
          <div className="space-y-2">
            {output.map((item, index) => (
              <div key={index} className="font-mono text-sm">
                <span className={`${getTextColor(item.type)} break-all whitespace-pre-wrap leading-relaxed`}>
                  {item.type === 'error' && '❌ '}
                  {item.type === 'warn' && '⚠️ '}
                  {item.type === 'info' && 'ℹ️ '}
                  {item.type === 'log' && '▶️ '}
                  {formatMessage(item.message)}
                  {item.lineNumber && (
                    <span className={`ml-2 text-xs font-bold ${
                      isDark ? 'text-red-300' : 'text-red-700'
                    }`}>
                      (Line {item.lineNumber})
                    </span>
                  )}
                </span>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;

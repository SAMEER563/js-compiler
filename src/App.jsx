import { useState, useEffect } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';

const defaultCode = `// Welcome to JS Compiler!
console.log('Hello, World!');

// Try some code
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Math operations
console.log('Sum:', numbers.reduce((a, b) => a + b, 0));`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [executionTime, setExecutionTime] = useState(null);
  const [errorLine, setErrorLine] = useState(null);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const executeCode = () => {
    setIsRunning(true);
    setErrorLine(null);
    const startTime = performance.now();
    const outputArray = [];

    // Backup original console methods
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    // Override console methods
    console.log = (...args) => {
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      
      outputArray.push({
        type: 'log',
        message: message,
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.error = (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      outputArray.push({
        type: 'error',
        message: message,
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.warn = (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      outputArray.push({
        type: 'warn',
        message: message,
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.info = (...args) => {
      const message = args.map(arg => String(arg)).join(' ');
      outputArray.push({
        type: 'info',
        message: message,
        timestamp: new Date().toLocaleTimeString()
      });
    };

    try {
      // Execute the code
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (error) {
      // Extract line number from error stack if available
      let lineNumber = null;
      if (error.stack) {
        const stackMatch = error.stack.match(/<anonymous>:(\d+):(\d+)/);
        if (stackMatch) {
          lineNumber = parseInt(stackMatch[1]);
        }
      }
      
      outputArray.push({
        type: 'error',
        message: `Error: ${error.message}`,
        lineNumber: lineNumber,
        timestamp: new Date().toLocaleTimeString()
      });
      
      if (lineNumber) {
        setErrorLine(lineNumber);
      }
    } finally {
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
      
      const endTime = performance.now();
      const execTime = (endTime - startTime).toFixed(2);
      setExecutionTime(execTime);
      setIsRunning(false);
    }

    setOutput(outputArray);
  };

  const clearOutput = () => {
    setOutput([]);
    setExecutionTime(null);
    setErrorLine(null);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy code:', err);
      // Fallback method
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Code copied to clipboard!');
      } catch (e) {
        alert('Failed to copy code. Please try again.');
      }
      document.body.removeChild(textarea);
    });
  };

  const shareCode = () => {
    const encoded = btoa(encodeURIComponent(code));
    const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Share link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy share link:', err);
      // Fallback method
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Share link copied to clipboard!');
      } catch (e) {
        alert('Failed to copy share link. Please try again.');
      }
      document.body.removeChild(textarea);
    });
  };

  // Load shared code from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedCode = params.get('code');
    if (sharedCode) {
      try {
        const decoded = decodeURIComponent(atob(sharedCode));
        setCode(decoded);
      } catch (e) {
        console.error('Failed to load shared code');
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        executeCode();
      }
      // Ctrl/Cmd + L to clear
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearOutput();
      }
      // Ctrl/Cmd + S to share
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        shareCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`h-screen w-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'}`}>
      <Header
        onRun={executeCode}
        onClear={clearOutput}
        isRunning={isRunning}
        theme={theme}
        onToggleTheme={toggleTheme}
        executionTime={executionTime}
      />
      
      <div className="flex-1 overflow-hidden p-2">
        <Group direction="horizontal" className="h-full rounded-xl overflow-hidden shadow-2xl">
          <Panel defaultSize={50} minSize={30}>
            <CodeEditor 
              value={code} 
              onChange={handleCodeChange} 
              theme={theme} 
              errorLine={errorLine}
              onCopyCode={copyCodeToClipboard}
              onShareCode={shareCode}
            />
          </Panel>
          
          {/* <Separator className="w-0.5 bg-gray-400 hover:w-2 transition-all cursor-col-resize shadow-lg" /> */}
          
          <Panel defaultSize={50} minSize={30}>
            <OutputPanel output={output} theme={theme} />
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default App;



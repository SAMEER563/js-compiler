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

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const executeCode = () => {
    setIsRunning(true);
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
    } finally {
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
      
      setIsRunning(false);
    }

    setOutput(outputArray);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

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
      />
      
      <div className="flex-1 overflow-hidden p-2">
        <Group direction="horizontal" className="h-full rounded-xl overflow-hidden shadow-2xl">
          <Panel defaultSize={50} minSize={30}>
            <CodeEditor value={code} onChange={handleCodeChange} theme={theme} />
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

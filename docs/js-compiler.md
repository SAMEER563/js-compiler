# JavaScript Compiler - Project Specification

## Project Overview
Build a JavaScript compiler/runner application using React, Vite, and Tailwind CSS. The application should have a split-panel interface where users can write JavaScript code on the left and see the execution output on the right.

## Tech Stack
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript/JSX
- **Additional Libraries**: 
  - `react-split` or `react-resizable-panels` for split panel functionality
  - `@monaco-editor/react` for code editor (Monaco Editor - the VSCode editor)
  - `react-icons` for UI icons

## Project Setup Commands
```bash
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @monaco-editor/react react-icons react-resizable-panels
```

## Tailwind Configuration
Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Application Structure

### File Structure
```
src/
├── components/
│   ├── CodeEditor.jsx
│   ├── OutputPanel.jsx
│   ├── Header.jsx
│   └── ControlButtons.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Component Specifications

### 1. App.jsx (Main Component)
**Responsibilities:**
- Manage the overall layout with resizable panels
- Store code state and output state
- Handle code execution logic
- Coordinate between CodeEditor and OutputPanel components

**State Variables:**
- `code`: string - stores the user's JavaScript code (default: a simple example like `console.log('Hello World!')`)
- `output`: array - stores all console outputs (logs, errors, warnings)
- `isRunning`: boolean - indicates if code is currently executing

**Key Functions:**
- `executeCode()`: Executes the JavaScript code safely and captures console output
- `clearOutput()`: Clears the output panel
- `handleCodeChange()`: Updates code state when user types

**Layout:**
- Use `react-resizable-panels` with PanelGroup, Panel, and PanelResizeHandle
- Left panel: CodeEditor (min 30%, default 50%)
- Right panel: OutputPanel (min 30%, default 50%)
- Header component at the top with title and run button

### 2. Header.jsx
**Responsibilities:**
- Display application title/logo
- Show Run button and Clear button
- Display status indicator (running/idle)

**Props:**
- `onRun`: function - callback to execute code
- `onClear`: function - callback to clear output
- `isRunning`: boolean - show loading state

**Design:**
- Dark background with gradient (bg-gradient-to-r from-blue-600 to-purple-600)
- Title: "JS Compiler" with code icon
- Run button: Green with play icon (from react-icons)
- Clear button: Gray with trash icon
- Responsive design

### 3. CodeEditor.jsx
**Responsibilities:**
- Provide a Monaco code editor for JavaScript
- Syntax highlighting and auto-completion
- Line numbers and code folding

**Props:**
- `value`: string - current code
- `onChange`: function - callback when code changes

**Monaco Editor Configuration:**
- Theme: "vs-dark" (dark theme)
- Language: "javascript"
- Options:
  - minimap: { enabled: true }
  - fontSize: 14
  - lineNumbers: "on"
  - roundedSelection: false
  - scrollBeyondLastLine: false
  - automaticLayout: true
  - tabSize: 2

### 4. OutputPanel.jsx
**Responsibilities:**
- Display console outputs (logs, errors, warnings, info)
- Auto-scroll to latest output
- Format different output types with colors

**Props:**
- `output`: array of objects - each object has `type` ('log', 'error', 'warn', 'info') and `message`

**Design:**
- Dark background (bg-gray-900)
- Different colors for different log types:
  - log: text-gray-300
  - error: text-red-400
  - warn: text-yellow-400
  - info: text-blue-400
- Monospace font (font-mono)
- Each output line should show timestamp
- Auto-scroll to bottom when new output arrives

### 5. ControlButtons.jsx (Optional)
**Responsibilities:**
- Provide additional controls like:
  - Font size adjustment
  - Theme toggle
  - Download code
  - Copy code

## Code Execution Logic

### Safe Execution Strategy
Use a combination of:
1. **Console capturing**: Override console methods temporarily
2. **Error handling**: Wrap code in try-catch
3. **Timeout protection**: Set execution timeout (optional)

### Implementation Pattern
```javascript
const executeCode = () => {
  const outputArray = [];
  
  // Backup original console methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  
  // Override console methods
  console.log = (...args) => {
    outputArray.push({ type: 'log', message: args.join(' '), timestamp: new Date().toLocaleTimeString() });
  };
  
  console.error = (...args) => {
    outputArray.push({ type: 'error', message: args.join(' '), timestamp: new Date().toLocaleTimeString() });
  };
  
  console.warn = (...args) => {
    outputArray.push({ type: 'warn', message: args.join(' '), timestamp: new Date().toLocaleTimeString() });
  };
  
  try {
    // Execute the code
    eval(code);
  } catch (error) {
    outputArray.push({ 
      type: 'error', 
      message: `Error: ${error.message}`, 
      timestamp: new Date().toLocaleTimeString() 
    });
  } finally {
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
  
  setOutput(outputArray);
};
```

## UI/UX Requirements

### Color Scheme
- **Primary**: Blue-600 to Purple-600 gradient
- **Background**: Gray-900 (main), Gray-800 (panels)
- **Text**: Gray-100 (primary), Gray-400 (secondary)
- **Accent**: Green-500 (success/run), Red-500 (error), Yellow-500 (warning)

### Responsive Design
- Mobile: Stack panels vertically
- Tablet/Desktop: Side-by-side panels with resize handle

### Features to Include
1. **Keyboard Shortcuts**:
   - Ctrl/Cmd + Enter: Run code
   - Ctrl/Cmd + L: Clear output

2. **Default Example Code**:
```javascript
// Welcome to JS Compiler!
console.log('Hello, World!');

// Try some code
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Math operations
console.log('Sum:', numbers.reduce((a, b) => a + b, 0));
```

3. **Error Handling**:
   - Syntax errors should be caught and displayed
   - Runtime errors should be caught and displayed
   - Clear error messages with line numbers if possible

4. **Output Formatting**:
   - Objects and arrays should be formatted nicely (JSON.stringify with indentation)
   - Timestamps for each log entry
   - Clear visual distinction between log types

## Additional Enhancements (Optional)

### Advanced Features
1. **Code Templates**: Provide common code snippets
2. **Export/Import**: Save and load code files
3. **Share Feature**: Generate shareable links
4. **Multiple Files**: Tabbed interface for multiple JS files
5. **NPM Package Support**: Allow importing certain libraries
6. **Performance Metrics**: Show execution time
7. **Browser API Support**: Allow DOM manipulation examples

## Development Guidelines

### Code Quality
- Use functional components with hooks
- Implement proper prop-types or TypeScript
- Add meaningful comments
- Follow React best practices
- Use semantic HTML

### Performance
- Debounce code execution if auto-run is enabled
- Optimize re-renders with React.memo where needed
- Lazy load Monaco Editor

### Accessibility
- Keyboard navigation support
- ARIA labels for buttons
- High contrast mode support
- Focus indicators

## Testing Checklist
- [ ] Code editor loads correctly
- [ ] Console.log outputs appear in output panel
- [ ] Errors are caught and displayed
- [ ] Run button executes code
- [ ] Clear button clears output
- [ ] Panel resize works smoothly
- [ ] Keyboard shortcuts work
- [ ] Code persists during session
- [ ] Responsive on mobile devices
- [ ] Dark theme renders correctly

## Final Notes
- Use meaningful variable and function names
- Keep components focused and single-responsibility
- Make the UI intuitive and clean
- Add loading states for better UX
- Include helpful tooltips for buttons
- Consider adding a welcome message or tutorial

## Example Usage Flow
1. User opens the application
2. Sees default example code in left panel
3. Clicks "Run" button or presses Ctrl+Enter
4. Output appears in right panel with timestamps
5. User can modify code and re-run
6. User can clear output and start fresh
7. User can resize panels as needed

---

**Start building from App.jsx and work your way through the components. Good luck!**

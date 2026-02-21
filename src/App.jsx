import React from 'react';
import { PostProvider } from './context/PostContext';
import Sidebar from './components/Editor/Sidebar';
import Preview from './components/Preview/Preview';
import Toolbar from './components/Toolbar/Toolbar';
import './App.css';

function AppContent() {
  return (
    <div className="app-container">
      <header className="app-header">
        {/* Logo moved to Sidebar for better layout */}
        <div style={{ width: '40px' }}></div> {/* Spacer to balance layout if needed, or just empty */}
        <Toolbar />
        <div className="actions">
          {/* Download button will go here */}
        </div>
      </header>
      <main className="main-content">
        <Sidebar />
        <div className="preview-area">
          <Preview />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <PostProvider>
      <AppContent />
    </PostProvider>
  );
}

export default App;

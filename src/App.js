import React, { useState } from 'react';
import TemplateEditor from './components/TemplateEditor';
import TemplateList from './components/TemplateList';
import './App.css';

function App() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      content: 'Hello {{name}},\n\nWelcome to **{{company}}**!\n\nBest regards,\n{{sender}}',
      parameters: ['name', 'company', 'sender']
    }
  ]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: 'New Template',
      content: '',
      parameters: []
    };
    setTemplates([...templates, newTemplate]);
    setCurrentTemplate(newTemplate);
    setEditMode(true);
  };

  const handleSelectTemplate = (template) => {
    setCurrentTemplate(template);
    setEditMode(true);
  };

  const handleSaveTemplate = (updatedTemplate) => {
    const updatedTemplates = templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    );
    setTemplates(updatedTemplates);
    setCurrentTemplate(updatedTemplate);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (currentTemplate?.id === id) {
      setCurrentTemplate(null);
      setEditMode(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Prompt Hub - Template Editor</h1>
        <p>Create and manage parameterized Markdown templates</p>
      </header>
      
      <div className="App-content">
        <div className="sidebar">
          <button className="create-btn" onClick={handleCreateTemplate}>
            + Create New Template
          </button>
          <TemplateList 
            templates={templates}
            onSelect={handleSelectTemplate}
            onDelete={handleDeleteTemplate}
            currentTemplateId={currentTemplate?.id}
          />
        </div>
        
        <div className="main-content">
          {editMode && currentTemplate ? (
            <TemplateEditor
              template={currentTemplate}
              onSave={handleSaveTemplate}
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <div className="welcome-message">
              <h2>Welcome to Prompt Hub Editor</h2>
              <p>Select a template from the list or create a new one to get started.</p>
              <p>Features:</p>
              <ul>
                <li>📝 Markdown editor with live preview</li>
                <li>🔧 Parameterization with {'{{'} {'}}'}  syntax</li>
                <li>💾 Save and manage multiple templates</li>
                <li>🎨 Apply templates with custom values</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './TemplateEditor.css';

function TemplateEditor({ template, onSave, onCancel }) {
  const [name, setName] = useState(template.name);
  const [content, setContent] = useState(template.content);
  const [parameters, setParameters] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [appliedContent, setAppliedContent] = useState('');

  useEffect(() => {
    // Extract parameters from content
    const paramRegex = /\{\{(\w+)\}\}/g;
    const matches = [...content.matchAll(paramRegex)];
    const uniqueParams = [...new Set(matches.map(m => m[1]))];
    
    // Initialize parameters state
    const newParams = {};
    uniqueParams.forEach(param => {
      newParams[param] = parameters[param] || '';
    });
    setParameters(newParams);
  }, [content]);

  const handleApplyParameters = () => {
    let result = content;
    Object.keys(parameters).forEach(param => {
      const regex = new RegExp(`\\{\\{${param}\\}\\}`, 'g');
      result = result.replace(regex, parameters[param] || `{{${param}}}`);
    });
    setAppliedContent(result);
  };

  const handleSave = () => {
    const paramRegex = /\{\{(\w+)\}\}/g;
    const matches = [...content.matchAll(paramRegex)];
    const uniqueParams = [...new Set(matches.map(m => m[1]))];
    
    onSave({
      ...template,
      name,
      content,
      parameters: uniqueParams
    });
  };

  return (
    <div className="template-editor">
      <div className="editor-header">
        <input
          type="text"
          className="template-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template Name"
        />
        <div className="editor-actions">
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save Template</button>
        </div>
      </div>

      <div className="editor-content">
        <div className="markdown-editor">
          <h3>Markdown Content</h3>
          <textarea
            className="markdown-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your template content with {{parameter}} syntax..."
          />
        </div>

        <div className="preview-section">
          <h3>Live Preview</h3>
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="toggle-preview-btn"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          {showPreview && (
            <div className="markdown-preview">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {Object.keys(parameters).length > 0 && (
        <div className="parameters-section">
          <h3>Parameters</h3>
          <p className="param-hint">Fill in values to apply to template:</p>
          <div className="parameters-grid">
            {Object.keys(parameters).map(param => (
              <div key={param} className="parameter-input-group">
                <label>{param}</label>
                <input
                  type="text"
                  value={parameters[param]}
                  onChange={(e) => setParameters({
                    ...parameters,
                    [param]: e.target.value
                  })}
                  placeholder={`Enter ${param}`}
                />
              </div>
            ))}
          </div>
          <button onClick={handleApplyParameters} className="apply-btn">
            Apply Parameters
          </button>
        </div>
      )}

      {appliedContent && (
        <div className="applied-content">
          <h3>Applied Template</h3>
          <div className="applied-preview">
            <ReactMarkdown>{appliedContent}</ReactMarkdown>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(appliedContent)}
            className="copy-btn"
          >
            📋 Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default TemplateEditor;

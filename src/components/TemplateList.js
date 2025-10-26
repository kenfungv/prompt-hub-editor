import React from 'react';
import './TemplateList.css';

function TemplateList({ templates, onSelect, onDelete, currentTemplateId }) {
  return (
    <div className="template-list">
      <h3>Templates</h3>
      {templates.length === 0 ? (
        <p className="no-templates">No templates yet. Create one to get started!</p>
      ) : (
        <ul>
          {templates.map(template => (
            <li 
              key={template.id}
              className={template.id === currentTemplateId ? 'active' : ''}
            >
              <div 
                className="template-item"
                onClick={() => onSelect(template)}
              >
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <p className="param-count">
                    {template.parameters.length} parameter{template.parameters.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button 
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete template "${template.name}"?`)) {
                      onDelete(template.id);
                    }
                  }}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TemplateList;

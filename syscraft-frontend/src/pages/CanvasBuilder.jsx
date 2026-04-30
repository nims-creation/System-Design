import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 400, y: 50 }, data: { label: '⚖️ API Gateway (Nginx)' }, style: { background: '#1e3a8a', color: '#fff', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px' } },
  { id: '2', position: { x: 250, y: 150 }, data: { label: '🖥️ Web Server 1' }, style: { background: '#4c1d95', color: '#fff', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px' } },
  { id: '3', position: { x: 550, y: 150 }, data: { label: '🖥️ Web Server 2' }, style: { background: '#4c1d95', color: '#fff', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px' } },
  { id: '4', position: { x: 400, y: 250 }, data: { label: '💾 Primary Database' }, style: { background: '#064e3b', color: '#fff', border: '2px solid #10b981', borderRadius: '8px', padding: '10px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#8b5cf6' } },
];

const nodeConfig = {
  database: { label: '💾 Database', border: '#10b981', bg: '#064e3b' },
  server: { label: '🖥️ Web Server', border: '#8b5cf6', bg: '#4c1d95' },
  loadbalancer: { label: '⚖️ Load Balancer', border: '#3b82f6', bg: '#1e3a8a' },
  cache: { label: '⚡ Redis Cache', border: '#f59e0b', bg: '#78350f' },
  queue: { label: '📨 Message Queue', border: '#ef4444', bg: '#7f1d1d' },
  client: { label: '👤 Client App', border: '#ec4899', bg: '#831843' }
};

const CanvasBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    [setEdges],
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const config = nodeConfig[type] || { label: 'New Node', border: '#fff', bg: '#333' };

      const newNode = {
        id: `node-${Date.now()}`,
        position,
        data: { label: config.label },
        style: {
          background: config.bg,
          color: '#fff',
          border: `2px solid ${config.border}`,
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div className="auth-page container" style={{ flexDirection: 'column', padding: '2rem 1.5rem', minHeight: 'calc(100vh - 100px)' }}>
      <div className="auth-header animate-fade-in" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Architecture Canvas</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Drag components from the sidebar onto the canvas. <strong style={{ color: 'var(--primary)' }}>Double-click any node</strong> to rename it.
        </p>
      </div>

      <div className="animate-fade-in" style={{ display: 'flex', gap: '1.5rem', width: '100%', height: '650px', marginTop: '1rem' }}>
        
        {/* Sidebar Panel */}
        <div className="glass" style={{ width: '250px', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Components
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Drag items below to the canvas:</p>
          
          {Object.entries(nodeConfig).map(([key, config]) => (
            <div
              key={key}
              onDragStart={(e) => onDragStart(e, key)}
              draggable
              style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
                padding: '0.75rem',
                borderRadius: '8px',
                cursor: 'grab',
                fontWeight: '500',
                fontSize: '0.9rem',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
              onDragEnd={(e) => { e.target.style.cursor = 'grab'; }}
            >
              {config.label}
            </div>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="glass" ref={reactFlowWrapper} style={{ position: 'relative', flex: 1, borderRadius: '16px', padding: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Floating Edit Panel */}
          {selectedNode && (
            <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--primary)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Edit Component Name</h4>
              <input 
                type="text" 
                value={selectedNode.data.label}
                onChange={(e) => {
                  const newLabel = e.target.value;
                  setSelectedNode(prev => ({ ...prev, data: { ...prev.data, label: newLabel } }));
                  setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: newLabel } } : n));
                }}
                className="form-input"
                style={{ width: '200px', padding: '0.5rem', borderRadius: '6px' }}
                autoFocus
              />
            </div>
          )}

          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={(event, node) => setSelectedNode(node)}
              onPaneClick={() => setSelectedNode(null)}
              fitView
              colorMode="dark"
              style={{ background: 'transparent', borderRadius: '12px' }}
            >
              <Controls />
              <MiniMap maskColor="rgba(0,0,0,0.7)" nodeColor="#6366f1" style={{ background: '#0a0a0f' }} />
              <Background variant="dots" gap={20} size={1} color="#4b5563" />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

      </div>
    </div>
  );
};

export default CanvasBuilder;

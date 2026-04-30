import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'API Gateway (Nginx)' }, style: { background: '#252a36', color: '#fff', border: '1px solid #ec4899', borderRadius: '8px', padding: '10px' } },
  { id: '2', position: { x: 100, y: 150 }, data: { label: 'Web Server 1' }, style: { background: '#252a36', color: '#fff', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '10px' } },
  { id: '3', position: { x: 400, y: 150 }, data: { label: 'Web Server 2' }, style: { background: '#252a36', color: '#fff', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '10px' } },
  { id: '4', position: { x: 250, y: 250 }, data: { label: 'Primary Database (PostgreSQL)' }, style: { background: '#252a36', color: '#fff', border: '1px solid #10b981', borderRadius: '8px', padding: '10px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ec4899' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#8b5cf6' } },
];

const CanvasBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    [setEdges],
  );

  return (
    <div className="auth-page container" style={{ flexDirection: 'column', padding: '2rem 1.5rem', minHeight: 'calc(100vh - 100px)' }}>
      <div className="auth-header animate-fade-in" style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Architecture Canvas</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Drag, drop, and connect components to visually build and simulate your system architectures.
        </p>
      </div>

      <div className="glass animate-fade-in" style={{ height: '600px', width: '100%', borderRadius: '16px', padding: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
          style={{ background: 'transparent', borderRadius: '12px' }}
        >
          <Controls />
          <MiniMap maskColor="rgba(0,0,0,0.7)" nodeColor="#6366f1" style={{ background: '#0a0a0f' }} />
          <Background variant="dots" gap={20} size={1} color="#4b5563" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default CanvasBuilder;

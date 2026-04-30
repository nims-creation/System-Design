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
    <div className="pt-24 min-h-screen px-4 container relative flex flex-col">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Architecture Canvas</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Drag, drop, and connect components to visually build and simulate your system architectures.
        </p>
      </div>

      <div className="glass-panel p-2 mb-8 animate-fade-in-up" style={{ height: '600px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-surface-dark/50 rounded-xl"
        >
          <Controls className="bg-surface-light border-none fill-white" />
          <MiniMap className="bg-surface-dark border border-surface-light" maskColor="rgba(0,0,0,0.5)" />
          <Background variant="dots" gap={20} size={1} color="#4b5563" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default CanvasBuilder;

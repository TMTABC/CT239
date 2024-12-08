import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import { findMinCost } from '../Components/BranchAndBound.jsx';
import dagre from "dagre"; // Đường dẫn đến hàm findMinCost

const getLayoutedElements = (nodes, edges) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankdir: 'TB',
        nodesep: 250, // Tăng khoảng cách ngang
        ranksep: 200, // Tăng khoảng cách dọc
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 200, height: 50 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 200 / 2,
                y: nodeWithPosition.y - 50 / 2,
            },
            style: {
                border: '2px solid #4CAF50',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                color: '#333',
            },
        };
    });

    const styledEdges = edges.map((edge) => ({
        ...edge,
        type: 'step', // Đường cong tránh dính nhau
        label: edge.label || '',
        labelStyle: { fontSize: 12, fill: '#444', fontWeight: 'bold' },
        labelBgStyle: { fill: '#fff', fillOpacity: 0.9, rx: 4, ry: 4 },
        labelBgPadding: [6, 4],
        style: { stroke: '#4CAF50', strokeWidth: 2 },
    }));

    return { nodes: layoutedNodes, edges: styledEdges };
};


const FlowTree = ({ costMatrix, N }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const result = findMinCost(costMatrix, N);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(result.nodes, result.edges);
        setNodes(layoutedNodes);
        setEdges(
            layoutedEdges.map((edge) => ({
                ...edge,
                type: 'bezier',
                labelStyle: { fontSize: 12, fill: '#333' },
                style: { stroke: '#888', strokeWidth: 2 },
            }))
        );
    }, [costMatrix, N]);

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background color="#f0f4f7" gap={16} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default FlowTree;

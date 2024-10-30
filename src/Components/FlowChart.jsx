import React, { useState, useEffect, useContext } from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import dagre from 'dagre';
import { findMinCost } from './BranchAndBound.jsx';
import { MatrixContext } from "../Context/MatrixContext.jsx";

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 50, ranksep: 100 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
        return node;
    });

    return { nodes: layoutedNodes, edges };
};

const FlowTree = () => {
    const { matrix, N } = useContext(MatrixContext);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const { nodes, edges } = findMinCost(matrix, N);
        const layoutedElements = getLayoutedElements(nodes, edges);
        setNodes(layoutedElements.nodes);
        setEdges(layoutedElements.edges);
    }, [matrix, N]);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default FlowTree;

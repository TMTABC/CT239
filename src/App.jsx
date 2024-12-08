import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GreedyPage from './Pages/GreedyPage.jsx';
import BranchAndBoundPage from './Pages/BranchAndBoundPage';
import Main from "./Pages/Main.jsx";
import {MatrixProvider} from "./Context/MatrixContext.jsx";

function App() {
    return (
        <MatrixProvider>
            <Router>
                <div>
                    <Main/>
                    {/* Routes */}
                    <Routes>
                        <Route path="/" element={ <h1>Wecome</h1>} />
                        <Route path="/greedy" element={<GreedyPage />} />
                        <Route path="/branch-and-bound" element={<BranchAndBoundPage />} />
                    </Routes>

                </div>
            </Router>
        </MatrixProvider>
    );
}

export default App;

// Styles for navbar
const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: '10px',
    listStyleType: 'none'
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
};


import React from 'react';
import {Link} from "react-router-dom";
import "./CSS/NavBar.css"

function NavBar() {

    return (
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/">Matrix Input</Link>
                </li>
                <li>
                    <Link to="/greedy" >Greedy Algorithm</Link>
                </li>
                <li>
                    <Link to="/branch-and-bound" >Branch and Bound Algorithm</Link>
                </li>
            </ul>

        </nav>
    );
}

export default NavBar;

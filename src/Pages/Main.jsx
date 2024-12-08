import React from 'react';
import MatrixInput from "./MatrixInput.jsx";
import NavBar from "../Components/NavBar.jsx";
import {MatrixProvider} from "../Context/MatrixContext.jsx";

function Main() {
    return (
        <MatrixProvider>
            <NavBar></NavBar>
            <MatrixInput/>
    </MatrixProvider>

    );
}

export default Main;

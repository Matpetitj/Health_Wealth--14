import "./header.scss"

import Logo from "../../assets/logo.png"

function Header (){
    // let nameArea = location.nameArea;

    return (
        <header id="header">
            <img id="logo"
            alt="Logo Wealth Health"
            onClick={() => (location.href = "/")}/>

            {/* <a id="employee_nav" href={nameArea === "/" ? "/employees" : "/"}>
                {nameArea === "/" ? "View Current Employees" : "Home"}
            </a> */}
        </header>
    )
}

export default Header;
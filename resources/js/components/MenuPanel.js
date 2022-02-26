import React from "react";
import ReactDOM from "react-dom"

import Usuario from './section/Usuario'
import Company from './section/Company'
import Plans from './section/Plans'
import SalePlan from "./section/SalePlan";

class MenuPanel extends React.Component{
    constructor(props){
        super(props)
    }
    viewUsuario(){       
        if(document.getElementById('content')){
            ReactDOM.render(<Usuario />, document.getElementById('content'))
        }
    }
    viewCompany(){
        if(document.getElementById('content')){
            ReactDOM.render(<Company />, document.getElementById('content'))
        }
    }
    viewPlans(){
        if(document.getElementById('content')){
            ReactDOM.render(<Plans />, document.getElementById('content'))
        }
    }
    viewSalePlan(){
        if(document.getElementById('content')){
            ReactDOM.render(<SalePlan />, document.getElementById('content'))
        }
    }
    render(){
        return(
            <nav className="pt-3">
                <div className="text-center mb-3 element-menu">
                    <a className="bd-toc-link text-white font-weight-bold" href="/panel">
                        <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="text-center mb-3 element-menu">
                    <a className="item-menu" onClick={this.viewUsuario}>
                        <i className="fa fa-user" aria-hidden="true"></i> Usuario
                    </a>
                </div>
                <div className="text-center mb-3 element-menu">
                    <a className="item-menu" onClick={this.viewCompany}>
                        <i className="fa fa-building" aria-hidden="true"></i> Empresa
                    </a>
                </div>
                <div className="text-center mb-3 element-menu">
                    <a className="item-menu" onClick={this.viewPlans}>
                        <i className="fa fa-toggle-on" aria-hidden="true"></i> Planes y paquetes
                    </a>
                </div>
                <div className="text-center mb-33 element-menu">
                    <a className="item-menu" onClick={this.viewSalePlan}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Venta de planes
                    </a>
                </div>
            </nav>
        )
    }
}

export default MenuPanel

if(document.getElementById('menuPanel')){
    ReactDOM.render(<MenuPanel />,  document.getElementById('menuPanel'))
}


import React from 'react'
import ReactDOM from 'react-dom'

class MenuPrincipal extends React.Component{
    constructor(props){
        super(props)
        this.state = {nameUser:''}
    }
    
    componentDidMount(){
        fetch('/funct/nameUser')
        .then(res => res.json())
        .then((result) => {
            this.setState({nameUser: result})
        })
    }

    logout(e){
        e.preventDefault()
        fetch('/logout')
        .then(res => res.json())
        .then(
            (result) => {
                location.reload()
            }
        )
    }
    
    render(){
        return (
            <div>
                <ul className="navbar navbar-dark bg-dark nav justify-content-end">
                    <li className="nav-item text-white">
                        {this.state.nameUser}
                    </li>
                    <li className="nav-item">
                        <div className="btn-group dropleft">
                            <a type="button" className="btn text-white nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Configuración</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={this.logout}>Cerrar sesión</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}


export default MenuPrincipal;

if(document.getElementById('menuPrincipal')){
    ReactDOM.render(<MenuPrincipal />, document.getElementById('menuPrincipal'));
}
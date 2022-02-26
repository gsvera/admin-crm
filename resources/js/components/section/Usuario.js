import React from 'react'

class Usuario extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            usuarios:[], 
            listUsuarios:[],
            id_user:0,
            first_name:"", 
            last_name:"",
            email:"",
            password:"",
            confirmPassword:"",
            active:true,
            user_panel:false,
            enviroment:"A",
            errorEmail:"",
            errorPassword:"",
            titleModal:"Nuevo Usuario",
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar"
        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleActive = this.handleActive.bind(this)
        this.handleUserPanel = this.handleUserPanel.bind(this)
        this.handleEnviroment = this.handleEnviroment.bind(this)
        this.sendNewUser = this.sendNewUser.bind(this)
        this.getTableUser = this.getTableUser.bind(this)
        this.cleanForm = this.cleanForm.bind(this)
        this.search = this.search.bind(this)
    }
    
    handleFirstName(e){
        this.setState({first_name:e.target.value})
    }
    handleLastName(e){
        this.setState({last_name:e.target.value})
    }
    handleEmail(e){
        if(!regexEmail.test(e.target.value)){
            this.setState({errorEmail:"El email ingresado es invalido"})
        }else{
            this.setState({errorEmail:""})
        }
        this.setState({email:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    handleConfirmPassword(e){
        if(this.state.password !== e.target.value){
            this.setState({errorPassword:"Las contraseñas no son iguales"})
        }else{
            this.setState({errorPassword:""})
        }
        this.setState({confirmPassword:e.target.value})
    }
    handleActive(e){
        this.setState(({active}) => ({active: !active}))
    }
    handleUserPanel(e){
        this.setState(({user_panel}) => ({user_panel: !user_panel}))
    }
    handleEnviroment(e){
        this.setState({enviroment:e.target.value})
    }
    componentDidMount(){        
        this.getTableUser()
    }
    getTableUser(option){
        if(option != 'no-alert'){
            activeLoader('Cargando..','Obteniendo datos')
        }
        fetch('/funct/getUser')
        .then(res => res.json())
        .then((result) => {
            this.setState({usuarios: result.data, listUsuarios:result.data})
            if(option != 'no-alert'){
                closeAlert()
            }
        })
    }
    sendNewUser(e){
        e.preventDefault();
        
        activeLoader("Enviando...", "Guardando datos")
        let data = {
            id_user: this.state.id_user,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password=="ignore"?"":this.state.password,
            active:this.state.active,
            user_panel:this.state.user_panel,
            enviroment:this.state.enviroment
        }
        if(this.state.errorEmail != "" || this.state.errorPassword != "" || this.state.first_name == "" || this.state.last_name == "" || this.state.email == ""){
            closeAlert()
            setTimeout(function(){
                warningAlert("Error","Llene los campos correctamente")
            },300)
            return false
        }

        let url = '/funct/newUser'
        if(this.state.id_user > 0){
            url = '/funct/updateUser'
        } 
        fetch(url,{
            method: 'post',
            body: JSON.stringify(data),
            headers: headConexion
        })
        .then(res => res.json())
        .then((result) => {
                closeAlert()
                this.getTableUser("no-alert")
                this.cleanForm()
                setTimeout(function(){
                    if(result.error == true){
                        warningAlert("Error", result.message)
                    }else{
                        successAlert("Hecho", "Se guardo correctamente el usuario")
                        $("#newUser").modal('hide');
                    }
                },100)
            }
        
        )
    }
    cleanForm(){
        this.setState({
            id_user:0,
            first_name:"",
            last_name:"",
            password:"",
            confirmPassword:"",
            email:"",
            active:true,
            user_panel:false,
            enviroment:"A",
            titleModal:"Nuevo usuario",
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar"
        })
    }
    setUserForm(e, idUser){
        e.preventDefault()

        const userFilte = this.state.listUsuarios.filter(user => user.id == idUser)
        
        this.setState({
            id_user: userFilte[0].id,
            first_name:userFilte[0].first_name, 
            last_name:userFilte[0].last_name,
            email:userFilte[0].email,
            active:userFilte[0].active==1?true:false,
            user_panel:userFilte[0].user_panel==1?true:false,
            enviroment:userFilte[0].enviroment,
            password:"ignore",
            confirmPassword:"ignore",
            titleModal:"Editar usuario",
            buttonClassSave:"btn btn-primary",
            buttonTextSave:"Actualiza"
        })
        $("#newUser").modal('show');
        
    }
    deleteUser(e, id){
        e.preventDefault()
        
        let idUser = {id_user:id}
        Swal.fire({
            title: 'Estas seguro?',
            text: "No se podra revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                activeLoader("Eliminando...", "Procesando la solicitud")
                fetch('/funct/deleteUser',{
                    method: 'post',
                    body: JSON.stringify(idUser),
                    headers: headConexion
                }).then(res => res.json())
                .then((resp) => {
                        closeAlert()
                        this.getTableUser("no-alert")
                        if(resp.error == false){
                            Swal.fire(
                              'Borrado!',
                              'El usuario ha sido borrado.',
                              'success'
                            )
                        }else{
                            errorAlert('Error', 'No se pudo eliminar el registro')
                        }
                    }
                )
            }
        })
    }
    search(e){
        e.preventDefault()
        const listFiler = this.state.listUsuarios.filter(
            item => item.name.toUpperCase().match(e.target.value.toUpperCase()) || 
            item.email.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({usuarios: listFiler})
    }
    render(){
        return(
            <div>
                <h1>Usuarios</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1" onKeyUp={this.search}/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newUser" onClick={this.cleanForm}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo Usuario
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newUser" tabIndex="-1" role="dialog" aria-labelledby="userModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form className="modal-content" onSubmit={this.sendNewUser}>
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLongTitle">{this.state.titleModal}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Nombre(s) <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese nombre" onChange={this.handleFirstName} value={this.state.first_name} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Apellido(s) <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese apellido" onChange={this.handleLastName} value={this.state.last_name} required/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Email <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese correo electrónico" onChange={this.handleEmail} value={this.state.email} required/>
                                        <span className="text-danger">{this.state.errorEmail}</span>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Contraseña <span className="text-danger">*</span></label>
                                        <input className="form-control" type="password" onChange={this.handlePassword} value={this.state.password} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Repetir contraseña <span className="text-danger">*</span></label>
                                        <input className="form-control" type="password" onChange={this.handleConfirmPassword} value={this.state.confirmPassword} required/>
                                        <span className="text-danger">{this.state.errorPassword}</span>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Activo</label>
                                        <input className="form-control" type="checkbox" onChange={this.handleActive} checked={this.state.active}/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Usuario panel</label>
                                        <input className="form-control" type="checkbox" onChange={this.handleUserPanel} checked={this.state.user_panel}/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Ambiente</label>
                                        <select className="form-control" placeholder="Selecciona una opción" onChange={this.handleEnviroment} value={this.state.enviroment}>
                                            <option value="A">Ambos</option>
                                            <option value="P">Productivo</option>
                                            <option value="T">Test</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>                                
                                <button type="submit" className={this.state.buttonClassSave}>{this.state.buttonTextSave}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <table className="table bg-white">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Estatus</th>
                        <th scope="col" className="text-center">Usuario Panel</th>
                        <th scope="col" className="text-center">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios.map((item) => 
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.active==true?'Activo':'Inactivo'}</td>
                                <td className="text-center">{item.user_panel==true?'Si':'No'}</td>
                                <td className="text-center">
                                    <button onClick={(event) => this.setUserForm(event, item.id)} className="btn btn-outline-info font-weight-bold mx-1">Editar</button>
                                    <button onClick={(event) => this.deleteUser(event, item.id)} className="btn btn-outline-danger font-weight-bold mx-1">Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }    
}

export default Usuario


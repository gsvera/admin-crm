import React from 'react'

function TableUsario(props){
    fetch('/funct/getUser')
    .then(res => res.json())
    .then((result) => {

    })
}

class Company extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listUser:[],
            usuarios:[],
            listCompanys:[],
            companys:[],
            id_company:0,
            name_company:"",
            rfc:"",
            number_users:1,
            active:true,
            id_user_admin:0,
            inputShow:"d-none",
            inputSearchUser:"",
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar"
        }
        this.handleNameCompany = this.handleNameCompany.bind(this)
        this.handleNumberUser = this.handleNumberUser.bind(this)
        this.handleActive = this.handleActive.bind(this)
        this.cleanForm = this.cleanForm.bind(this)
        this.searchUser = this.searchUser.bind(this)
        this.handleInputSearchUser = this.handleInputSearchUser.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.saveCompany = this.saveCompany.bind(this)
        this.handleRfc = this.handleRfc.bind(this)
        this.searchCompany = this.searchCompany.bind(this)
    }
    handleNameCompany(e){
        this.setState({name_company:e.target.value})
    }
    handleNumberUser(e){
        this.setState({number_users:e.target.value})
    }
    handleRfc(e){
        this.setState({rfc:e.target.value.toUpperCase()})
    }
    handleActive(e){
        this.setState(({active}) => ({active: !active}))
    }
    handleInputSearchUser(e){
        this.setState({inputSearchUser:e.target.value})
    }
    componentDidMount(){
        fetch('/funct/getUser')
        .then(res => res.json())
        .then(result => {
            let getUsers = result.data.filter(item => item.user_panel != true)
            this.setState({listUser:getUsers, usuarios:getUsers})
        })
        this.getCompanys()
    }
    getCompanys(option){
        if(option != 'no-alert'){
            activeLoader('Cargando..','Obteniendo datos')
        }
        fetch('/funct/getCompanys')
        .then(res => res.json())
        .then(result => {
            this.setState({listCompanys:result.data, companys:result.data})
            if(option != 'no-alert'){
                closeAlert()
            }
        })
    }
    cleanForm(){
        this.setState({
            id_company:0,
            name_company:"",
            numer_users:1,
            rfc:"",
            active:true,
            inputSearchUser:"",
            id_user_admin:0,
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar"
        })
    }
    searchUser(e){
        e.preventDefault()
        const listFiler = this.state.listUser.filter(
            item => item.name.toUpperCase().match(e.target.value.toUpperCase()) || 
            item.email.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({usuarios: listFiler})
        if(e.target.value != ''){
            this.setState({inputShow:"box-search"})
        }else{
            this.setState({inputShow:"d-none"})
        }
    }
    selectUser(e, idUser){
        e.preventDefault()
        this.setState({inputSearchUser:e.target.textContent, id_user_admin:idUser, inputShow:"d-none"})
    }
    saveCompany(e){
        e.preventDefault()
        activeLoader("Enviando...", "Guardando datos")
        let url = '/funct/newCompany' 
        
        if(this.state.rfc.length < 13 || this.state.rfc.length > 13){
            closeAlert()
            setTimeout(function(){
                warningAlert('Formato invalido', 'El formato del RFC es invalido')
            },300)
            return false
        }

        if(this.state.id_company > 0){
            url = '/funct/updateCompany'
        }
        let data = {
            name_company:this.state.name_company,
            rfc:this.state.rfc,
            number_users:this.state.number_users,
            id_user_admin:this.state.id_user_admin,
            active:this.state.active,
            id_company:this.state.id_company
        }

        fetch(url,{
            method: 'post',
            body: JSON.stringify(data),
            headers: headConexion
        })
        .then(res => res.json())
        .then((result) => {
            closeAlert()
            console.log(result)
            if(result.error == false){
                this.getCompanys('no-alert')
                this.cleanForm()
                setTimeout(function(){
                    $('#newCompany').modal('hide')
                    successAlert('Hecho', 'Se guardo correctamente la empresa')
                },500)
            }else{
                setTimeout(function(){
                    errorAlert('Upss', result.message)
                })
            }
        })
    }
    deleteCompany(e, idCompany){
        e.preventDefault()
        let companyDelete = {id_company:idCompany}
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
                fetch('/funct/deleteCompany',{
                    method: 'post',
                    body: JSON.stringify(companyDelete),
                    headers: headConexion
                }).then(res => res.json())
                .then((resp) => {
                        closeAlert()
                        this.getCompanys("no-alert")
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
    searchCompany(e){
        e.preventDefault()
        const listFilter = this.state.listCompanys.filter(
            item => item.name_company.toUpperCase().match(e.target.value.toUpperCase()) ||
            item.rfc.toUpperCase().match(e.target.value.toUpperCase())
        )
        this.setState({companys: listFilter})
    }
    setCompanyForm(e, idCompany){
        e.preventDefault()
        const companySelect = this.state.companys.filter(item => item.id_company == idCompany)
        this.setState({
            id_company:companySelect[0].id_company,
            name_company:companySelect[0].name_company,
            number_users:companySelect[0].number_user,
            rfc:companySelect[0].rfc,
            active:companySelect[0].active,
            inputSearchUser:companySelect[0].name_user_admin + " | " + companySelect[0].email,
            id_user_admin:companySelect[0].id_user_admin,
            buttonClassSave:"btn btn-primary",
            buttonTextSave:"Actualizar"
        })
        $("#newCompany").modal("show")
    }
    render(){
        return(
            <div>
                <h1>Empresa</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1" onKeyUp={this.searchCompany}/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newCompany" onClick={this.cleanForm}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Nueva Empresa
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newCompany" tabIndex="-1" role="dialog" aria-labelledby="userModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form className="modal-content" onSubmit={this.saveCompany}>
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLongTitle">Nueva empresa</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Nombre de empresa <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese nombre de la empresa" onChange={this.handleNameCompany} value={this.state.name_company} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Usuario admin <span className="text-danger">*</span></label>
                                        <div>
                                            <input className="form-control" type="text" onKeyUp={this.searchUser} onChange={this.handleInputSearchUser} value={this.state.inputSearchUser} placeholder="Buscar usuario"/>
                                            <div className={this.state.inputShow}>
                                                <ul className="list-item">
                                                {this.state.usuarios.map((item) =>
                                                    <li className="selectInput" onClick={(event) => this.selectUser(event, item.id)} key={item.id}>{item.name} | {item.email}</li>
                                                )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">RFC <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" maxLength="13" placeholder="Ingrese correo electrónico" onChange={this.handleRfc} value={this.state.rfc} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold"># usuarios</label>
                                        <input className="form-control" type="number" min="1" placeholder="Ingrese correo electrónico" onChange={this.handleNumberUser} value={this.state.number_users} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Activo</label>
                                        <input className="form-control" type="checkbox" onChange={this.handleActive} checked={this.state.active}/>
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
                        <th scope="col">Empresa</th>
                        <th scope="col" className="text-center">RFC</th>
                        <th scope="col" className="text-center"># Usuarios</th>
                        <th scope="col" className="text-center">Estatus</th>
                        <th scope="col" className="text-center">Usuario admin.</th>
                        <th scope="col" className="text-center">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companys.map((item) => 
                            <tr key={item.id_company}>
                                <th scope="row">{item.id_company}</th>
                                <td>{item.name_company}</td>
                                <td className="text-center">{item.rfc}</td>
                                <td className="text-center">{item.number_user}</td>
                                <td className="text-center">
                                    <div className={item.active==true?"badge badge-success":"badge badge-danger"}>
                                    {item.active==true?'Activo':'Inactivo'}
                                    </div>
                                </td>
                                <td className="text-center">{item.name_user_admin}</td>
                                <td className="text-center">
                                    <button onClick={(event) => this.setCompanyForm(event, item.id_company)} className="btn btn-outline-info font-weight-bold mx-1">Editar</button>
                                    <button onClick={(event) => this.deleteCompany(event, item.id_company)} className="btn btn-outline-danger font-weight-bold mx-1">Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Company
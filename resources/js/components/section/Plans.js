import React from 'react'

function CardPlan(props){
    return (
        <div className="card wrem-18 m-3" >
            <div className="card-header bg-dark text-white pt-3 pb-0">
                <h5 className="card-title">{props.card.name_plan}</h5>
            </div>
            <div className="card-body">
                <p className="card-text"><b>Duración: </b>{props.card.months} <span>meses</span></p>
                <p className="card-text"><b>Precio por mes: </b>{convertCurrency(props.card.price_month)}</p>
                <p className="card-text"><b>Precio por año: </b>{convertCurrency(props.card.price_year)}</p>
                <p className="card-text"><b># Usuarios: </b>{props.card.number_user}</p>
            </div>
            <div className="d-flex justify-content-end m-2">
                <button onClick={(event) => props.accion(event, props.card.id_plan)} className="btn btn-outline-warning text-dark mx-2" role="button"><i className="fa fa-pencil" aria-hidden="true"></i> Editar</button>
                <button className="btn btn-outline-primary mx-2" type="button" data-toggle="collapse" data-target={"#card"+props.card.id_plan} aria-expanded="false" aria-controls={"card"+props.card.id_plan}><i className="fa fa-info" aria-hidden="true"></i> Detalle</button>
            </div>
            <div className="collapse" id={"card"+props.card.id_plan}>
                <ul className="list-group list-group-flush">
                    {props.card.detail.map((item) => 
                        <li key={item.id_detail_plan} className="list-group-item">{item.description_plan}</li>
                    )}
                </ul>
            </div>       
        </div>
    )
}

class Plans extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            titleModal:"Nuevo Plan", 
            id_plan:0,
            name_plan:"",
            months:1,
            numberUser:1,
            price_months:0,
            price_year:0,
            visible:true,
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar",
            descriptPlan:"",
            detailPlan: [],
            positionDetail:0,
            postionEditeDetail:"",
            hideCancelButton:"d-none",
            detailEditeButton:"d-none",
            detailAddButton:"btn btn-success text-white",
            plans:[],
            listPlans:[]
        }
        this.sendNewPlan = this.sendNewPlan.bind(this)
        this.handleNamePlan = this.handleNamePlan.bind(this)
        this.handleMonths = this.handleMonths.bind(this)
        this.handlePriceMonths = this.handlePriceMonths.bind(this)
        this.handlePriceYear = this.handlePriceYear.bind(this)
        this.handleVisibility = this.handleVisibility.bind(this)
        this.handleTextDetail = this.handleTextDetail.bind(this)
        this.handleNumberUser = this.handleNumberUser.bind(this)
        this.addDetail = this.addDetail.bind(this)
        this.cancelUpdateDetail = this.cancelUpdateDetail.bind(this)
        this.updateDetail = this.updateDetail.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.getPlans = this.getPlans.bind(this)
        this.selectPlan = this.selectPlan.bind(this)
        this.searchPlan = this.searchPlan.bind(this)
    }
    handleNamePlan(e){
        this.setState({name_plan:e.target.value})
    }
    handleMonths(e){
        this.setState({months:e.target.value})
    }
    handlePriceMonths(e){
        this.setState({price_months:e.target.value})
    }
    handlePriceYear(e){
        this.setState({price_year:e.target.value})
    }
    handleVisibility(e){
        this.setState(({visible}) => ({visible: !visible}))
    }
    handleTextDetail(e){
        this.setState({descriptPlan:e.target.value})
    }
    handleNumberUser(e){
        this.setState({numberUser:e.target.value})
    }
    componentDidMount(){
        this.getPlans()
    }
    getPlans(option){
        if(option != 'no-alert'){
            activeLoader('Cargando...', 'Obteniendo datos.')
        }
        fetch('/funct/getPlans')
        .then(res => res.json())
        .then(result => {
            this.setState({plans:result.data, listPlans:result.data})
            if(option != 'no-alert'){
                closeAlert()
            }
        })
    }
    addDetail(e){
        let arrDetail = this.state.detailPlan,
        count = parseInt(this.state.positionDetail) + 1

        arrDetail.push({"position":count,"descript_detail":this.state.descriptPlan})
        
        this.setState({positionDetail:count + 1, descriptPlan:"", detailPlan:arrDetail})
        
    }
    selectDetail(e, idPosition){
        e.preventDefault()
        let editArr = this.state.detailPlan.filter(item => item.position == idPosition)

        this.setState({
            descriptPlan:editArr[0].descript_detail, 
            detailEditeButton:"btn btn-info text-white col", 
            hideCancelButton:"btn btn-secondary text-white col", 
            detailAddButton:"d-none",
            postionEditeDetail:idPosition
        })
    }
    updateDetail(e){
        e.preventDefault()
        let editArr = this.state.detailPlan.filter(item => item.position != this.state.postionEditeDetail)
        editArr.push({"position":this.state.postionEditeDetail,"descript_detail": this.state.descriptPlan})
        this.setState({detailPlan:editArr})
        this.cancelUpdateDetail(e)
    }
    cancelUpdateDetail(e){
        e.preventDefault()
        this.setState({descriptPlan:"", detailEditeButton:"d-none", hideCancelButton:"d-none", detailAddButton:"btn btn-success text-white col"})
    }
    deleteDetail(e, idPosition){
        e.preventDefault()
        let editArr = this.state.detailPlan.filter(item => item.position != idPosition)
        
        this.setState({detailPlan: editArr})
    }
    sendNewPlan(e){
        e.preventDefault()

        if(this.state.name_plan == "")
        {
            warningAlert("Campo invalido", "El nombre del plan es obligatorio")
            return false
        }
        if(this.state.price_months < 1 || this.state.price_year < 1){
            warningAlert("Los campos de precio son obligatorios")
            return false
        }
        activeLoader("Guardando...", "Enviando datos")
        let url = '/funct/newPlan'

        if(this.state.id_plan > 0){
            url = '/funct/updatePlan'
        }

        let dataPlan = {
            id_plan:this.state.id_plan,
            name_plan:this.state.name_plan,
            months:this.state.months,
            price_months:this.state.price_months,
            price_year:this.state.price_year,
            visible:this.state.visible,
            detailPlan:this.state.detailPlan,
            number_user:this.state.numberUser
        }
        fetch(url,{
            method:'post',
            body: JSON.stringify(dataPlan),
            headers: headConexion
        })
        .then(res => res.json())
        .then(result => {
            closeAlert()
            this.getPlans()
            if(result.error == false){
                $("#newPlan").modal('hide')
                this.clearForm()
                setTimeout(function(){
                    successAlert("Hecho", "Se guaro el registro correctamente")
                },300)
            }else{
                setTimeout(function(){
                    errorAlert("Upss", "Algo ocurrio, no se guardo el registro")
                },300)
            }
        })
    }
    clearForm(){
        this.setState({
            id_plan:0,
            name_plan:"",
            months:1,
            numberUser:1,
            price_months:0,
            price_year:0,
            visible:true,
            buttonClassSave:"btn btn-success",
            buttonTextSave:"Guardar",
            descriptPlan:"",
            detailPlan: [],
            positionDetail:0,
            postionEditeDetail:"",
        })
        
    }
    selectPlan(e, idPlan){
        e.preventDefault()
        let planSelect = this.state.plans.filter(item => item.id_plan == idPlan)

        this.setState({
            titleModal:"Editar Plan", 
            name_plan:planSelect[0].name_plan,
            months:planSelect[0].months,
            numberUser:planSelect[0].number_user,
            price_months:planSelect[0].price_month,
            price_year:planSelect[0].price_year,
            visible:planSelect[0].visible,
            buttonClassSave:"btn btn-primary",
            buttonTextSave:"Actualizar",
            id_plan:idPlan
        })
        
        let arrDetail = this.state.detailPlan,
        count = 0
        
        for(let i = 0; i < planSelect[0].detail.length; i++){
            arrDetail.push({"position":i,"descript_detail":planSelect[0].detail[i].description_plan})
            count = i
        }

        this.setState({positionDetail:count, detailPlan:arrDetail})

        $('#newPlan').modal('show')
    }
    searchPlan(e){
        e.preventDefault()
        const list = this.state.listPlans.filter(
            item => item.name_plan.toUpperCase().match(e.target.value.toUpperCase())
        )
        this.setState({plans: list})
    }
    render(){
        return(
            <>
                <h1>Planes y paquetes</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1" onKeyUp={this.searchPlan}/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newPlan" onClick={this.clearForm}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo Plan
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newPlan" tabIndex="-1" role="dialog" aria-labelledby="userModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form className="modal-content" onSubmit={this.sendNewPlan}>
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLongTitle">{this.state.titleModal}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Nombre del plan<span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese nombre del plan" onChange={this.handleNamePlan} value={this.state.name_plan} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Meses de duración <span className="text-danger">*</span></label>
                                        <input className="form-control" type="number" min="0" onChange={this.handleMonths} value={this.state.months} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Visible</label>
                                        <input className="form-control" type="checkbox" onChange={this.handleVisibility} checked={this.state.visible}/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Precio por mes <span className="text-danger">*</span></label>
                                        <input className="form-control" type="number" min="0" onChange={this.handlePriceMonths} value={this.state.price_months} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Precio por año<span className="text-danger">*</span></label>
                                        <input className="form-control" type="number" onChange={this.handlePriceYear} value={this.state.price_year} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold"># Usuarios</label>
                                        <input className="form-control" min="1" type="number" onChange={this.handleNumberUser} value={this.state.numberUser}/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-10">
                                        <label className="text-secondary font-weight-bold">Nuevo detalle</label>
                                        <textarea className="form-control" placeholder="Describa un detalle del plan" onChange={this.handleTextDetail} value={this.state.descriptPlan}/>
                                    </div>           
                                    <div className="col-2 row align-items-center">
                                        <button className={this.state.detailAddButton} type="button" onClick={this.addDetail}><i className="fa fa-plus" aria-hidden="true"></i> Agregar</button>
                                        <button className={this.state.detailEditeButton} type="button" onClick={this.updateDetail}><i className="fa fa-pencil" aria-hidden="true"></i> Actualizar</button>
                                        <button className={this.state.hideCancelButton} type="button" onClick={this.cancelUpdateDetail}><i className="fa fa-ban" aria-hidden="true"></i> Cancelar</button>
                                    </div>                         
                                </div>
                                <div>
                                    <table className="table table-sm col-11 mx-auto">
                                        <thead>
                                            <tr>
                                            <th scope="col" className="col-10">Detalle</th>
                                            <th scope="col" className="col-2 text-center">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.detailPlan.map((item) => 
                                                <tr key={item.position}>
                                                <td scope="row">{item.descript_detail}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning ml-auto mr-2" onClick={(event) => this.selectDetail(event, item.position)}>Editar</button>
                                                    <button type="button" className="btn btn-danger ml-2 mr-auto" onClick={(event) => this.deleteDetail(event, item.position)}>Eliminar</button>
                                                </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearForm}>Cerrar</button>                                
                                <button type="submit" className={this.state.buttonClassSave}>{this.state.buttonTextSave}</button>
                            </div>
                        </form>                        
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.plans.map((item) => 
                            <CardPlan key={item.id_plan} card={item} accion={this.selectPlan}/>
                        )
                    }
                </div>
            </>
        )
    }
}

export default Plans;
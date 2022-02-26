import { result } from 'lodash'
import moment from 'moment'
import React from 'react'

class SalePlan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listCompanys:[],
            companys:[],
            listPlans:[],
            plans:[],
            eraserSale:[],
            stlyeCompany:"d-none",
            stylePlan:"d-none",
            inputCompany:"",
            idCompany:0,
            inputPlan:"",
            idPlan:0,
            datenow:"",
            timeMonth:"",
            dateStar:"",
            dateEnd:"",
            optionPayPlan:"",
            amounPay:0,
            amountPayTex:"",
            numberUser: 1,
            amountExtra:0,
            amountExtraTex:"",
            minUser:1,
            total:0,
            buttonClassSave:"btn btn-primary",
            buttonTextSave:"Guarda compra",
            buttonClassSale:"btn btn-success",
            buttonTextSale:"Realizar compra"
        }
        this.getCompanysPlans = this.getCompanysPlans.bind(this)
        this.searchCompany = this.searchCompany.bind(this)
        this.searchPlan = this.searchPlan.bind(this)
        this.handleCompany = this.handleCompany.bind(this)
        this.selectCompany = this.selectCompany.bind(this)
        this.selectPlan = this.selectPlan.bind(this)
        this.handlePlan = this.handlePlan.bind(this)
        this.handleDateStar = this.handleDateStar.bind(this)
        this.optionPay = this.optionPay.bind(this)
        this.handleNumberUser = this.handleNumberUser.bind(this)
        this.saveSale = this.saveSale.bind(this)
    }
    componentDidMount(){
        this.getCompanysPlans()
        let limintDate = new Date
        this.setState({datenow:limintDate.getFullYear() + '-' + ("0" + (limintDate.getMonth() + 1)).slice(-2) + '-' + ("0" + limintDate.getDate()).slice(-2)})
        this.getEraserSale()
    }
    handleCompany(e){
        this.setState({inputCompany:e.target.value})
    }
    handlePlan(e){
        this.setState({inputPlan:e.target.value})
    }
    handleNumberUser(e){
        this.setState({numberUser:e.target.value})
        if(this.state.idPlan != 0){
            const listFiler = this.state.listPlans.filter(
                item => item.id_plan == this.state.idPlan
            )
            let priceExt = 100,
            countUser = 0,
            extra = 0

            if(listFiler[0].number_user < e.target.value){
                countUser = e.target.value - listFiler[0].number_user
                extra = priceExt * countUser
            }
            let totalPay = extra + this.state.amounPay
            this.setState({amountExtra:extra,amountExtraTex:convertCurrency(extra), total:convertCurrency(totalPay)})
        }
    }
    getCompanysPlans(){
        fetch('/funct/getCompanys')
        .then(res => res.json())
        .then(result => {
            this.setState({listCompanys:result.data, companys:result.data})
        })
        fetch('/funct/getPlans')
        .then(res => res.json())
        .then(result => {
            this.setState({plans:result.data, listPlans:result.data})
        })
    }
    searchCompany(e){
        e.preventDefault()
        const listFiler = this.state.listCompanys.filter(
            item => item.name_company.toUpperCase().match(e.target.value.toUpperCase()) || 
            item.rfc.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({companys: listFiler})
        if(e.target.value != ''){
            this.setState({stlyeCompany:"box-search"})
        }else{
            this.setState({stlyeCompany:"d-none"})
        }
    }    
    searchPlan(e){
        e.preventDefault()
        const listFiler = this.state.listPlans.filter(
            item => item.name_plan.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({plans: listFiler})
        if(e.target.value != ''){
            this.setState({stylePlan:"box-search"})
        }else{
            this.setState({stylePlan:"d-none"})
        }
    }
    getEraserSale(option){
        if(option != 'no-alert'){
            activeLoader('Cargando...', 'Obteniendo datos.')
        }
        fetch('/funct/getEraserPlans')
        .then(res => res.json())
        .then((result) => {
            if(option != 'no-alert'){
                closeAlert()
            }
            console.log(result.data)
            this.setState({eraserSale:result.data})
        })
    }
    selectPlan(e, id){
        const listFiler = this.state.listPlans.filter(
            item => item.id_plan == id
            )
        this.setState({
            inputPlan:listFiler[0].name_plan,
            stylePlan:"d-none",
            numberUser:listFiler[0].number_user,
            idPlan:listFiler[0].id_plan,
            timeMonth:listFiler[0].months + " meses",
            minUser:listFiler[0].number_user
        })
        if(this.state.dateStar == ''){
            return false
        }
        let endPlan = moment(this.state.dateStar).add(listFiler[0].months,'months')

        this.setState({dateEnd:endPlan.format("yyyy-MM-DD")})

        if(this.state.optionPayPlan != ''){
            if(this.state.optionPayPlan == 'month'){
                this.setState({amountPayTex:convertCurrency(listFiler[0].price_month),amounPay:listFiler[0].price_month})
            }else{
                this.setState({amountPayTex:convertCurrency(listFiler[0].price_year),amounPay:listFiler[0].price_year})
            }
        }

    }
    selectCompany(e, id){
        const listFiler = this.state.listCompanys.filter(
            item => item.id_company == id
            )
        this.setState({
            inputCompany:listFiler[0].name_company + ' | ' + listFiler[0].rfc,
            stlyeCompany:"d-none",
            idCompany:listFiler[0].id_company
        })
    }
    handleDateStar(e){
        this.setState({dateStar:e.target.value})
        if(this.state.idPlan == 0){
            return false
        }
        let listFiler = this.state.listPlans.filter(
            item => item.id_plan == this.state.idPlan
        )
        let endPlan = moment(e.target.value).add(listFiler[0].months,'months')

        this.setState({dateEnd:endPlan.format("yyyy-MM-DD")})
    }
    optionPay(e){
        this.setState({optionPayPlan:e.target.value})
        if(this.state.idPlan == ''){
            return false
        }
        let listFiler = this.state.listPlans.filter(
            item => item.id_plan == this.state.idPlan
        )
        let price = 0,
        totalPrice = 0
        if(e.target.value == 'month'){
            price = listFiler[0].price_month
            totalPrice = listFiler[0].price_month + this.state.amountExtra
        }else{
            price = listFiler[0].price_year
            totalPrice = listFiler[0].price_year + this.state.amountExtra
        }
        this.setState({amountPayTex:convertCurrency(price),amounPay:price, total:convertCurrency(totalPrice)})
    }
    saveSale(e){
        e.preventDefault()
        const sendData = {
            idCompany:this.state.idCompany,
            inputPlan:this.state.inputPlan,
            idPlan:this.state.idPlan,
            inputCompany:this.state.inputCompany,
            datenow:this.state.datenow,
            timeMonth:this.state.timeMonth,
            dateStar:this.state.dateStar,
            dateEnd:this.state.dateEnd,
            optionPayPlan:this.state.optionPayPlan,
            amounPay:this.state.amounPay,
            numberUser: this.state.numberUser,
            amountExtra:this.state.amountExtra,
            total:this.state.total
        }
        let url = '/funct/saveSalePlan'

        activeLoader("Guardando...", "Guardando registro")
        fetch(url, {
            method: 'post',
            body: JSON.stringify(sendData),
            headers: headConexion
        })
        .then(res => res.json())
        .then((result) => {
            closeAlert()
            if(result.error == false){
                setTimeout(function(){
                    successAlert("Hecho", "Se guardo el registro")
                },300)
            }else{
                setTimeout(function(){
                    warningAlert("Error", result.message)
                },300)
            }
        })
    }
    deleteSale(e, id){
        e.preventDefault()
        
        let dataRegister = {
            id_sale: id
        } 

        Swal.fire({
            title: 'Estas seguro?',
            text: "No se podra revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
          }).then((response) => {
              if(response.isConfirmed){
                  activeLoader("Eliminando", "Borrando borrador de venta")
                  fetch('/funct/deleteEraserSale',{
                      method: 'post',
                      body:JSON.stringify(dataRegister),
                      headers: headConexion
                  })
                  .then(res => res.json())
                  .then((result) => {
                      closeAlert()
                      this.getEraserSale('no-alert')
                      if(result.error == false){
                          setTimeout(function(){
                              successAlert("Hecho", "Se elimino el registro correctamente")
                          },300)
                      }else{
                          setTimeout(function(){
                              warningAlert("Error", "No se pudo borrar el registro")
                          },300)
                      }
                  })
              }
          })
    }
    render(){
        return(
            <>
                <h1>Venta de planes</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newSale">
                            <i className="fa fa-plus" aria-hidden="true"></i> Vender plan
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newSale" tabIndex="-1" role="dialog" aria-labelledby="userModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLongTitle">Venta de plan</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Empresa <span className="text-danger">*</span></label>
                                        <input className="form-control" onKeyUp={this.searchCompany} onChange={this.handleCompany} value={this.state.inputCompany}/>
                                        <div className={this.state.stlyeCompany}>
                                            <ul className="list-item">
                                                {this.state.companys.map((item) => 
                                                    <li className="selectInput" key={item.id_company} onClick={(event) => this.selectCompany(event, item.id_company)}>{item.name_company} | {item.rfc}</li>
                                                )}
                                            </ul>
                                        </div>
                                        
                                    </div>
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Plan <span className="text-danger">*</span></label>
                                        <input className="form-control" onKeyUp={this.searchPlan} onChange={this.handlePlan} value={this.state.inputPlan}/>
                                        <div className={this.state.stylePlan}>
                                            <ul className="list-item">
                                                {this.state.plans.map((item) => 
                                                    <li className="selectInput" key={item.id_plan} onClick={(event) => this.selectPlan(event, item.id_plan)}>{item.name_plan}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Fecha de inicio <span className="text-danger">*</span></label>
                                        <input className="form-control" min={this.state.datenow} type="date" required onChange={this.handleDateStar} value={this.state.dateStar}/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Fecha de fin</label>
                                        <input className="form-control" type="date" disabled value={this.state.dateEnd}/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Duración</label>
                                        <input className="form-control" type="text" value={this.state.timeMonth} disabled/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-3 col-xl-3">
                                        <label className="text-secondary font-weight-bold">Opción de pago <span className="text-danger">*</span></label>
                                        <div className="d-flex justify-content-center p-2">
                                            <label>Mensual</label>
                                            <input type="radio" name="optionPago" id="optionPay1" onChange={this.optionPay} value="month"/><label htmlFor="optionPay1"></label>
                                            <label>Anual</label>
                                            <input type="radio" name="optionPago" id="optionPay2" onChange={this.optionPay} value="year"/><label htmlFor="optionPay2"></label>
                                        </div>
                                    </div>
                                    <div className="form-group col-12 col-lg-3 col-xl-3">
                                        <label className="text-secondary font-weight-bold">Monto</label>
                                        <input className="form-control" type="text" value={this.state.amountPayTex} disabled/>
                                    </div>
                                    <div className="form-group col-12 col-lg-3 col-xl-3">
                                        <label className="text-secondary font-weight-bold"># Usuarios</label>
                                        <input className="form-control" type="number" min={this.state.minUser} onChange={this.handleNumberUser} value={this.state.numberUser}/>
                                    </div>
                                    <div className="form-group col-12 col-lg-3 col-xl-3">
                                        <label className="text-secondary font-weight-bold">Costo extra</label>
                                        <input className="form-control" type="text" value={this.state.amountExtraTex} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-end">
                                <div className="form-group">
                                    <label className="text-secondary font-weight-bold">TOTAL:</label>
                                    <input className="form-control" type="text" value={this.state.total} disabled/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" onClick={this.saveSale} className={this.state.buttonClassSave}>{this.state.buttonTextSave}</button>
                                <button type="submit" className={this.state.buttonClassSale}>{this.state.buttonTextSale}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <table className="table bg-white">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Empresa</th>
                        <th scope="col" className="text-center">Total</th>
                        <th scope="col" className="text-center">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.eraserSale.map((item) => 
                            <tr key={item.id_sale_plan}>
                                <th scope="row">{item.id_sale_plan}</th>
                                <td>{item.name_company}</td>
                                <td className="text-center">{item.total}</td>
                                <td className="text-center">
                                    <button onClick={(event) => this.setCompanyForm(event, item.id_company)} className="btn btn-outline-info font-weight-bold mx-1">Editar</button>
                                    <button onClick={(event) => this.deleteSale(event, item.id_sale_plan)} className="btn btn-outline-danger font-weight-bold mx-1">Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}

export default SalePlan
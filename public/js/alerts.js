function closeAlert(){
    Swal.close()
  }
  
function activeLoader(title,html){
    Swal.fire({
        title: title,
        html: html,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        })
}

function errorAlert(title, html){
    Swal.fire({
        icon: 'error',
        title: title,
        text: html
    })
}

function warningAlert(title, html){
    Swal.fire({
        icon: 'warning',
        title: title,
        text: html
    })
}
  
function successAlert(title, html){
    Swal.fire({
        icon: 'success',
        title: title,
        text: html
    })
}

function modalConfirmDelete(){
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
          Swal.fire(
            'Borrado!',
            'El usuario ha sido borrado.',
            'Hecho'
          )
        }
      })
}
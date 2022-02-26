<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <title>CRM</title>
</head>
<body style="background-color: #393B3C;">
    <section id="" class="col-11 mx-auto mt-5" style="background-color: #393B3C;">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block login-img">
                <!-- <img src="/img/estrategia-digital-crm.jpg" alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;"> -->
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form action="{{ route('login') }}" method="POST">
                    @csrf
                    <div class="d-flex justify-content-center mb-3 pb-1">
                      <span class="h1 fw-bold mb-0">PANEL ADMIN CRM TEST</span>
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example17" style="margin-left: 0px;">Email address</label>
                        <input type="email" name="email" class="form-control form-control-lg" value="{{ old('email') }}">
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 88.8px;"></div><div class="form-notch-trailing"></div></div></div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example27" style="margin-left: 0px;">Password</label>
                        <input type="password" name="password" class="form-control form-control-lg">
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 64.8px;"></div><div class="form-notch-trailing"></div></div></div>

                    <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                    </div>
                    
                    <a class="small text-muted" href="#!">Forgot password?</a>
                    @if(session('message'))
                      <div class="alert alert-danger">{{session('message')}}</div>
                    @endif
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- <script src="{{ asset('../../js/app.js') }}"></script> -->
    <script src="{{ asset('js/app.js') }}"></script>
    
</body>
</html>
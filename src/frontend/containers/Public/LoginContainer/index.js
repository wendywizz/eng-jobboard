import React from "react"
import Template from "Frontend/components/Template"

function LoginContainer() {
  return (
    <Template>
      <div class="login-form">
        <div class="cotainer">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">Register</div>
                <div class="card-body">
                  <form action="" method="">
                    <div class="form-group row">
                      <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                      <div class="col-md-6">
                        <input type="text" id="email_address" class="form-control" name="email-address" required autofocus />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                      <div class="col-md-6">
                        <input type="password" id="password" class="form-control" name="password" required />
                      </div>
                    </div>


                    <div class="col-md-6 offset-md-4">
                      <button type="submit" class="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Template>
  )
}
export default LoginContainer
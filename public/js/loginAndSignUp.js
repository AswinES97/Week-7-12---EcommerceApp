
function login() {
    let modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `<form class="p-5" action="#" method="post">
    <h1 id="model-heading">Log In</h1><br><br>
    <label class="textin">Enter Mobile:</label><br>
    <input class="input" type="tel" maxlength="10" name="phn_no" id="input-phone" placeholder="9XXXXXXXXX" required><br>

    <div id="otp"></div>
    <button id="submitButton" class="submitButton mt-4 mx-auto" onclick="sentOtp(event,'login')" type="submit">Sent
      Otp</button>
    <span style="color: red;" id="error"></span>
    <div class='pt-3 text-secondary'>
      <span>Don't have an account?</span><span style="cursor: pointer;" class="text-primary"><a onclick=signUp()>
          Sign Up!</a><span>
    </div>
    <div class='pt-3 text-secondary'>
      <span>Login with email?</span><span style="cursor: pointer;" class="text-primary"><a onclick=loginWithEmail()>
          Click Here!</a><span>
    </div>
  </form>`
}

function loginWithEmail() {
    let modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `<form class="p-5" action="#" method="post">
    <h1 id="model-heading">Log In</h1><br><br>
    <label class="textin">Enter Email:</label><br>
    <input class="input" type="email" name="email" id="input-email" placeholder="123@gmail.com" required><br>
    <label class="textin">Enter Password:</label><br>
    <input class="input" type="password" name="password" id="input-password" placeholder="********" required><br>

    
    <button id="submitButton" class="submitButton mt-4 mx-auto" onclick="loginMail(event)" type="submit">Login!</button>
    <br><span style="color: red;" id="error" hidden>Wrong Credentials!</span>
    <div class='pt-3 text-secondary'>
      <span>Don't have an account?</span><span style="cursor: pointer;" class="text-primary"><a onclick=signUp()>
          Sign Up!</a><span>
    </div>
    <div class='pt-3 text-secondary'>
      <span>Login with Mobile?</span><span style="cursor: pointer;" class="text-primary"><a onclick=login()>
          Click Here!</a><span>
    </div>
  </form>`
}

function loginMail(event) {
    event.preventDefault()
    const error = document.getElementById('error')
    const email = document.getElementById('input-email').value
    const pass = document.getElementById('input-password').value
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (email && emailRegex.test(email) && passRegex.test(pass)) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/v1/users/login-email',
            data: {
                email,
                pass
            },
            error: (xhr) => {

                let text = JSON.parse(JSON.stringify(xhr.responseJSON))
                error.innerHTML = `<p style='color:red'>${text.err_email || text.err_blocked}<p>`
                error.removeAttribute('hidden')
            },
            success: (status) => {
                window.location.assign('http://localhost:3000/v1/users')
            }
        })
    } else {
        document.getElementById('error').removeAttribute('hidden')
    }
}

function signUp() {
    let modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `<form class="p-5" action="" method="post">
    <h1 id="model-heading">Sign Up</h1><br><br>
    <label class="textin p-2">Enter Name:</label><br>
    <input type="name" maxlength="30" id="name" name="fname" class="input" placeholder="first name"><br>
    <label class="textin p-2">Enter Email:</label><br>
    <input type="mail" name="email" id="email" class="input" placeholder="sample@gmail.com"><br>

    <label class="textin p-2">Enter Password:</label><br>
    <input type="password" name="password" id="signupPass" class="input" onkeyup="pass()" placeholder="**********"><br>
    <span style="color: red;font-size:14px;" id="pass-error" hidden >Minimum eight characters, at least one letter, one number and one special character!</span><br>
    <label class="textin p-2">Confirm Password:</label><br>
    <input type="password" id="confirm-pass" onkeyup="confirmPass()" class="input"  placeholder="**********"><br>
    <span style="color: red;font-size:14px;" id="confirm-error" hidden >Password don't match!</span><br>

    <label class="textin p-2">Enter Mobile:</label><br>
    <input type="tel" maxlength="10" name="phn_no" class="input" id="input-phone" placeholder="9XXXXXXXXX"><br>
    <div id="otp"></div>
    <button id="submitButton" class="submitButton mt-4" onclick="sentOtp(event,'signup')" type="submit">Sign
      Up</button><br>
    <span style="color: red;" id="error"></span>
    <div class='p-2 text-secondary'>
      <span>already has account?</span><span style="cursor: pointer;" class="text-primary"><a onclick=login()> Log
          In</a><span>
    </div>
  </form>`

}

function sentOtp($event, state) {

    $event.preventDefault()

    const error = document.getElementById('error')
    const phn_no = document.getElementById('input-phone').value
    const phn_no_field = document.getElementById('input-phone')
    const submit_button = document.getElementById('submitButton')
    const otp_field = document.getElementById('otp')
    const phn_regExp = /^[6-9]\d{9}$/gi
    const phn_no1 = Number(phn_no)

    error.innerHTML = ''
    if (state === 'login') {
        if (phn_no.length == 10) {
            if (phn_no1) {
                if (phn_regExp.test(phn_no)) {

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:3000/v1/users/login',
                        data: { phn_no: phn_no1 },
                        error: (xhr) => {
                            let text = JSON.parse(JSON.stringify(xhr.responseJSON))
                            error.innerHTML = `<p style='color:red'>${text.err_user || text.err_blocked || err_otpNotSent || otp_sent}<p>`
                        },
                        complete: (data, status, err) => {
                            if (status == 'success') {
                                submit_button.innerHTML = 'Login'
                                submit_button.setAttribute('onClick', 'verifyOtp(event,"login")')
                                phn_no_field.setAttribute("disabled", "")
                                otp_field.innerHTML = `<label class="textin">Enter Otp:</label><br>
                            <input type="text" class="input" maxlength="6" name="otpCode" id="input-otp"><br>`
                            } else {

                            }
                        }
                    })
                } else {
                    error.innerHTML = "<p style='color:red'>Enter correct phone Number<p>"
                }
            }
            else {
                error.innerHTML = "<p style='color:red'>Enter correct phone Number<p>"
            }
        } else {
            error.innerHTML = "<p style='color:red'>Enter correct phone Number<p>"
        }
    } else if (state == 'signup') {

        const name_value = document.getElementById('name').value
        const name = document.getElementById('name')
        const name_regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        const email = document.getElementById('email')
        const email_value = document.getElementById('email').value
        const email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        let test1, test2, test3;

        if (name_value.length <= 20 && name_regex.test(name_value.trim())) {
            test1 = true;
        }

        if (email_value.length > 0 && email_regex.test(email_value)) {
            test2 = true
        }

        if (phn_no.length == 10 && phn_regExp.test(phn_no1)) {
            test3 = true
        }

        if (test1 && test2 && test3 && pass() && confirmPass()) {
            submit_button.setAttribute('disabled', '')
            phn_no_field.setAttribute('disabled', '')
            email.setAttribute('disabled', '')
            name.setAttribute('disabled', '')
            $.ajax({
                url: 'http://localhost:3000/v1/users/add-user',
                type: 'POST',
                data: {
                    email: email_value,
                    phn_no: phn_no1,
                },
                complete: (xhr, status, err) => {

                    if (status == 'success') {
                        submit_button.setAttribute('onclick', 'verifyOtp(event,"signup")')
                        otp_field.innerHTML = `<label class="textin">Enter Otp:</label><br>
                        <input type="text" class="input" maxlength="6" name="otpCode" id="input-otp"><br>`
                        submit_button.removeAttribute('disabled')
                    } else {
                        error.innerHTML = "<p>Otp not sent!<p>"
                    }
                }

            })
        } else {
            error.innerHTML = "<p>Incorrect Details<p>"
        }
    }
}

function verifyOtp($event, state) {
    $event.preventDefault()
    let error = document.getElementById('error')
    let phn_no = document.getElementById('input-phone').value
    let otpCode = document.getElementById('input-otp').value

    if (otpCode.length == 6) {
        if (state == 'login') {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/v1/users/login-otp',
                data: {
                    phn_no: phn_no,
                    otpCode: otpCode,
                },

                complete: (data, status, err) => {
                    if (status == 'error') {
                        error.innerHTML = "<p>Invalid Otp!<p>"
                    } else {
                        window.location.assign('http://localhost:3000/v1/users')
                    }
                }
            })
        } else if (state == 'signup') {
            let name_value = document.getElementById('name').value
            let email_value = document.getElementById('email').value
            const password = document.getElementById('signupPass').value

            $.ajax({
                url: 'http://localhost:3000/v1/users/add-user-otp',
                type: 'POST',
                data: {
                    phn_no: phn_no,
                    otpCode: otpCode,
                    name: name_value,
                    email: email_value,
                    password,

                },
                success: (xhr, status, err) => {
                    window.location.assign('http://localhost:3000/v1/users')
                }
            })
        }


    } else {
        error.innerHTML = `<p>Invalid Otp<p>`
    }



}

function pass() {
    const pass = document.getElementById('signupPass').value
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (passRegex.test(pass)) {
        document.getElementById('pass-error').setAttribute('hidden', 'true')
        return true
    } else {
        document.getElementById('pass-error').removeAttribute('hidden')
        return false
    }
}

function confirmPass() {
    const confirmPassword = document.getElementById('confirm-pass').value
    const pass = document.getElementById('signupPass').value

    if (confirmPassword === pass) {
        document.getElementById('confirm-error').setAttribute('hidden', 'true')
        return true
    } else {
        document.getElementById('confirm-error').removeAttribute('hidden')
        return false
    }

}
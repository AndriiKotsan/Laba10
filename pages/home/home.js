let data = JSON.parse(localStorage.getItem('userData'));
console.log(data);

window.onload = () => {
    let login = document.querySelector('#login');
    login.innerHTML = data.login;
    let email = document.querySelector('#email');
    email.innerHTML = data.email;

    let exit = document.querySelector('#exit');
    exit.onclick = () => {
        location = '../../index.html';
    }
}


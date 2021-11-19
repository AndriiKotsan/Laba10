var serializeArray = function (form) {
	var arr = [];
	Array.prototype.slice.call(form.elements).forEach(function (field) {
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
		if (field.type === 'select-multiple') {
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				arr.push({
					name: field.name,
					value: option.value
				});
			});
			return;
		}
		if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) return;
		arr.push({
			name: field.name,
			value: field.value
		});
	});
	return arr;
};

function parseData(form_array){
    let obj = {};
    for (let i = 0; i < form_array.length; i++){
        obj[form_array[i]['name']] = form_array[i]['value'];
    }
    return obj;
}


function validationForm(inputs){
    let email; let password; let confirmPass;

    let counter = 0;
    document.addEventListener('invalid', (function () {
        return function (e) {
        e.preventDefault();
        counter === 0 && e.target.focus();
        counter++;
        e.target.parentElement.classList.add('error');
        
        setTimeout(() => {
            counter = 0;
        }, 1000);

        };
    })(), true);

    for (const element of inputs) {
        element.addEventListener('input', e => {
            if (e.target.id == 'email') email = e.target.value;
            if (e.target.id == 'pass') password = e.target.value;
            if (e.target.id == 'conf_pass') confirmPass = e.target.value;
            if (e.target.checkValidity()) {
                e.target.parentElement.classList.remove('error');
            } else {
                e.target.parentElement.classList.add('error');
            }
            if (e.target.id == 'conf_pass') {
                comparePass (password,confirmPass) ? e.target.parentElement.classList.remove('error'): e.target.parentElement.classList.add('error');
            }
        })
    }
}

function comparePass(pass, confPass){
    return pass == confPass ? true : false;
}

function getData(event){
    event.preventDefault();
    
    let form = document.querySelector('#reg_form')
    
    let data = serializeArray(form)
    data = parseData(data);

    if (!localStorage.getItem('userData')){
        localStorage.setItem('userData', JSON.stringify(data));
        location = './pages/home/home.html'
    } else{
        if(checkUser(data)){
            location = './pages/home/home.html'
        } else {
            alert('Incorrect data');
        }
    }
    
    return false;
};

function checkUser(data){
    let storage_data = localStorage.getItem('userData');
    data = JSON.stringify(data);
    return data === storage_data;
}



window.onload = () => {
    let arrInput = document.querySelectorAll('.field > input');
    validationForm(arrInput);

    let del = document.getElementById('login');
    del.onclick = (e) => {
        
        deleteCookie('userData');
    }
}  



  

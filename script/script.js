if(document.getElementById("btn")){
    document.getElementById("btn").addEventListener('click', function(){
        validaciones();
    });
}

if(document.getElementById("male")){
    document.getElementById("male").addEventListener('click', function(){
        male.style.color = "gold";
        female.style.color = "gray";
    })
}

if(document.getElementById("female")){
    document.getElementById("female").addEventListener('click', function(){
        female.style.color = "gold";
        male.style.color = "gray";
    })
}

function validaciones(){
    let edad = document.getElementById("inputEdad").value;
    let peso = document.getElementById("inputPeso").value;
    let altura = document.getElementById("inputAltura").value;
    let alerta = document.getElementById("alerta");

    if(male.style.color != 'gold' & female.style.color != 'gold'){
        alert("Seleccione por favor su sexo")
    } else if(edad === "" || isNaN(edad)) {
        alert("Escriba por favor su edad")
    } else if(peso === "" || isNaN(peso)){
        alert("Escriba por favor su peso")
    } else if(altura === "" || isNaN(altura)){
        alert("Escriba por favor su estatura")
    } else if(altura > 3){
        alert("Verifique por favor las unidades")
    }else if(edad < 16){
        alert("Debe ser mayor de 16 años")
    }else {
        capturarDatos();
    }
}

function obtenerLocalStorage(){
    let datos = JSON.parse(localStorage.getItem('Datos'));
    let imc = datos.peso / (datos.altura**2);
    let pesoIdealMin = (18.5 * (datos.altura**2)).toFixed(2);
    let pesoIdealMax = (24.9 * (datos.altura**2)).toFixed(2);
    let fragment = document.createDocumentFragment();
    let rangoPeso = document.getElementById("rangoPeso");

    document.getElementById("inputResultado").value = imc.toFixed(2);

    let div = document.createElement("div");
    div.innerHTML = `<p id="rangoPesoIdeal">Peso ideal: ${pesoIdealMin} - ${pesoIdealMax} (Kg)</p>`
    fragment.appendChild(div);
    rangoPeso.appendChild(fragment);

    let flechaRango = document.getElementById("flechaRango");

    if(imc<=50){
        let pixelesLeft = (imc*8).toFixed(2);
        flechaRango.style.left = `${pixelesLeft}px`;
    } else {
        flechaRango.style.left = '400px';
    }
}

obtenerLocalStorage();

function capturarDatos(){
    let edadV = document.getElementById("inputEdad").value;
    let pesoV = document.getElementById("inputPeso").value;
    let alturaV = document.getElementById("inputAltura").value;

    let objetoDatos = {
        edad: edadV,
        peso: pesoV,
        altura: alturaV,
    }

    localStorage.setItem('Datos', JSON.stringify(objetoDatos));

    document.getElementById("enlace").setAttribute('href', '../pages/resultado.html')
}
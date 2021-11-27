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
    let sexo = "";
    if(document.getElementById("male").style.color == 'gold'){
        sexo = "Hombre"
    } else if(document.getElementById("female").style.color == 'gold'){
        sexo = "Mujer"
    }
    let edad = document.getElementById("inputEdad").value;
    let peso = document.getElementById("inputPeso").value;
    let altura = document.getElementById("inputAltura").value;

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
        capturarDatos(sexo, edad, peso, altura);
    }
}

let data = [];

function capturarDatos(psexo, pedad, ppeso, paltura){

    let objetoDatos = {
        sexo: psexo,
        edad: pedad,
        peso: ppeso,
        altura: paltura
    }
    
    let data = getListaDatos();
    data.push(objetoDatos);
    localStorage.setItem('Datos', JSON.stringify(data));
    
    document.getElementById("enlace").setAttribute('href', '../pages/resultado.html')
}

function getListaDatos(){
    let listaDatosLocal = JSON.parse(localStorage.getItem('Datos'));
    if(listaDatosLocal == null){
        listaDatosLocal = data;
    }
    
    return listaDatosLocal;
}

document.addEventListener('DOMContentLoaded', function(){
    obtenerIMC();
})

function obtenerIMC(){

    let datosTotales = JSON.parse(localStorage.getItem('Datos'));
    let datoFinal = datosTotales[datosTotales.length - 1]
    let imc = datoFinal.peso / (datoFinal.altura**2);
    let pesoIdealMin = (18.5 * (datoFinal.altura**2)).toFixed(2);
    let pesoIdealMax = (24.9 * (datoFinal.altura**2)).toFixed(2);
    let fragment = document.createDocumentFragment();
    let rangoPeso = document.getElementById("rangoPeso");
    
    if(document.getElementById("inputResultado")){
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
}

if(document.getElementById("btnEstad")){
    document.getElementById("btnEstad").addEventListener('click', function(){
        document.getElementById("btnEstad").style.display = 'none';
        let datosTotales = JSON.parse(localStorage.getItem('Datos')).reverse();
        let fragment = document.createDocumentFragment();
        let tablaIMC = document.getElementById("tablaIMC");
    
        let thead = document.createElement("thead");
        thead.innerHTML = `<thead>
                                <tr><td>No.</td>
                                <td>Sexo</td>
                                <td>Edad</td>
                                <td>Peso</td>
                                <td>Altura</td>
                                <td>IMC</td></tr>
                                </thead>`
        fragment.appendChild(thead);
        tablaIMC.appendChild(fragment);
    
        for(let i=1; i<16; i++){
            let tbody = document.createElement("tbody");
            
            tbody.innerHTML = `<tbody id="cuerpoTabla">
                                <tr><td class="posicion">${i}</td>
                                <td class="sexoT">${datosTotales[i].sexo}</td>
                                <td class="edadT">${datosTotales[i].edad}</td>
                                <td class="pesoT">${datosTotales[i].peso}</td>
                                <td class="alturaT">${datosTotales[i].altura}</td>
                                <td class="imcT" id="${datosTotales[i].sexo}">${(datosTotales[i].peso/datosTotales[i].altura**2).toFixed(2)}</td></tr>
                                </tbody>`;
            fragment.appendChild(tbody);
            tablaIMC.appendChild(fragment);
        }
    
        let totalImcHombres = 0;
        let totalImcMujeres = 0;
        let imcTabla = document.getElementsByClassName("imcT");
    
        for(let x=0; x<imcTabla.length ; x++){
            if(imcTabla[x].id == 'Mujer'){
                totalImcMujeres += parseFloat(imcTabla[x].textContent);
            } else {
                totalImcHombres += parseFloat(imcTabla[x].textContent);
            }
        }
    
        let mediaImcHombres = totalImcHombres/imcTabla.length;
        let mediaImcMujeres = totalImcMujeres/imcTabla.length;
    
        let grafica = document.getElementById("grafica").getContext('2d');
        var chart = new Chart(grafica,{
            type: 'bar',
            data:{
                labels:['Mujeres' , 'Hombres'],
                datasets:[
                    {
                        label: 'Gráfica media imc por sexo',
                        backgroundColor: ['hsl(127deg 43% 55%)', 'hsl(215deg 66% 55%)'],
                        data:[mediaImcMujeres, mediaImcHombres]
                    }
                ]
            }
        })
    })
}
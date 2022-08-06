export function validar(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeError(tipoDeInput,input);
    }
}

const tipoErrores=[
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError"
]

const mensajesError ={
    nombre: {
        valueMissing:"El Campo Nombre No puede estar Vacio"
    },
    email:{
        valueMissing:"El Campo Correo No puede estar Vacio",
        typeMismatch:"El Correo No es Valido"
    },
    password:{
        valueMissing:"El Campo Password No puede estar Vacio",
        patterMismatch:"Al Menos 6 Caracteres, Máx 12, debe tener una minuscula, una mayuscula y un #. No puede contener caracteres especiales"
    },
    nacimiento:{
        valueMissing:"La Fecha De Nacimiento NO puede estar Vacio",
        customError: "Debes Tener al Menos 18 años de edad"
    },
    numero:{
        valueMissing:"El Telefono No puede estar Vacio",
        patterMismatch: "El Formato Requerido es XXX XXXXXXX"
    },
    direccion:{
        valueMissing:"El Campo No puede estar Vacio",
        patterMismatch: "La Dirección debe Contener entre 10 a 40 Caracteres"
    },
    ciudad:{
        valueMissing:"El Campo No puede estar Vacio",
        patterMismatch: "La Ciudad debe Contener entre 10 a 40 Caracteres"
    },
    estado:{
        valueMissing:"El Campo No puede estar Vacio",
        patterMismatch: "El Estado debe Contener entre 10 a 40 Caracteres"
    }
}

const validadores  = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput,input){
    let mensaje= "";
    tipoErrores.forEach( error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje= mensajesError[tipoDeInput][error];
        }
    })

    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje="";
    if(!mayorEdad(fechaCliente)){
        mensaje="debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date (fecha.getUTCFullYear()+18,fecha.getUTCMonth(),fecha.getUTCDate())
    return (fechaActual>=diferenciaFechas);
}


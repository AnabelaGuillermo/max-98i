import { obtenerUsuarioDeLs } from "../utils.js";
import { Usuario } from "./Usuario.js";

export const agregarUsuario = (nombre, apellido, email, contraseña) => {
    // Crear instancia de usuario
    const usuario = new Usuario(nombre, apellido, email, contraseña);

    // Obtener lista de usuarios del almacenamiento local
    const usuarios = obtenerUsuarioDeLs() || []; 

    // Agregar nuevo usuario a la lista
    usuarios.push(usuario);

    // Actualizar la lista de usuarios en el almacenamiento local
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    //Mostrar en consola para depuración
    console.log("Usuario agregado:", usuario);
    console.log("Lista de usuarios actualizada:", usuarios);
};



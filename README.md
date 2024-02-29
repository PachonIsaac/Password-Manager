# PASSWORD MANAGER

Password Manager es una aplicación web diseñada para ayudarte a gestionar tus contraseñas de forma segura y conveniente. Con esta aplicación, puedes almacenar, editar y eliminar contraseñas de manera sencilla, todo desde una interfaz intuitiva y fácil de usar.

PASSWORD MANAGER maneja una API sencilla creada con fastAPI en Python para manejar claves seguras para un usuario. La API se conecta a una base de datos hecha con SQLite que tiene dos tablas, user y password, así se almacenan los datos del usuario y las contraseñas de los mismos.

Además, el front-end está hecho con React, y se conecta a la API para realizar las operaciones de CRUD. La aplicación web es responsiva y se adapta a cualquier dispositivo.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)

- [Documentación de la API](#documentación-de-la-api)

## Tecnologías utilizadas
Frontend: React, HTML, CSS, JavaScript
Backend: Python, FastAPI, SQLite


# Instalacion y ejecución
Para ejecutar este proyecto, necesitarás tener instalado lo siguiente:

## Python
Asegúrate de tener Python instalado en tu sistema. Puedes descargar la última versión desde https://www.python.org/
Además de un IDE de su preferencia, en este caso se utilizó Visual Studio Code.

## Entorno virtual (Opcional pero recomendado)
Se recomienda el uso de un entorno virtual para aislar las dependencias del proyecto. Puedes crear y activar un entorno virtual de la siguiente manera:



```bash
# Instalar virtualenv
pip install virtualenv

# Crear un entorno virtual
python -m venv venv

```

## Node.js
Asegúrate de tener Node.js instalado en tu sistema. Puedes descargar la última versión desde https://nodejs.org/

## Dependencias del proyecto
Una vez que tengas tu entorno virtual activado, instala las dependecias del proyecto utilizando "requirements.txt"
```bash
pip install -r requirements.txt
```

# Instalación
## Activar el entorno virtual
En Windows
```bash
.\venv\Scripts\activate
```
En Linux/Mac
```bash
source venv/bin/activate
```

## Iniciar el servidor del Backend
Al activar el entorno virtual y tener todas las dependencias instaladas, puedes iniciar el servidor de desarrollo con el siguiente comando:
```bash
uvicorn main:app --reload
```
## Iniciar el servidor del Frontend
Para iniciar el servidor del frontend, debes navegar a la carpeta "frontend" y ejecutar el siguiente comando:
```bash
npm start
```

Nota: El codigo por defecto corre el backend en el puerto 8000 y el frontend en el puerto 3000, si deseas cambiar estos puertos, puedes hacerlo en el archivo "main.py" en el backend y en el archivo "package.json" en el frontend.


# Ejecución
Puedes ejecutar la aplicacion con el siguiente comando:
```bash
uvicorn main:app --reload
```
Este comando asume que el punto de entrada de tu aplicación es main y la instancia de la aplicación es app. Ajusta según sea necesario.

Además la terminal te proporcionará la dirección de la API, para visualizar la documentación de la API debes ingresar a la dirección que te proporciona la terminal, y agregando "/docs" al final de la dirección.

# Desarrollo del frontend
Todo el desarrollo del frontend se realizó en React, utilizando componentes funcionales y hooks. Además, se utilizó Axios para realizar las peticiones a la API.


# Documentación de la API

## Descripción
Esta API proporciona servicios relacionados con la gestion de usuarios autirozados. La autenticación se realiza mediante un token JWT que se obtiene al hacer login. Los servicios que se ofrecen son los siguientes:


## Autenticación
Para poder acceder a los servicios de la API es necesario autenticarse, teniendo en cuenta que ya se creo el usuario. Para ello se debe hacer una petición POST a la ruta /login con el siguiente cuerpo:
```bash
{
    "username": "admin",
    "password": "1234"
}
```
Si el usuario y la contraseña son correctos, se obtendrá un token JWT que se debe utilizar para acceder a los servicios de la API. Además todo el proceso de seguridad se implementó gracias a el OAuth2PasswordBearer de fastAPI. Para mayor información sobre el proceso de autenticación se puede consultar la documentación de fastAPI. https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/

## Servicios de contraseña
Para acceder a cualquiera de los servicios de contraseña, el usuario debe haber hecho previamente un login, de lo contrario no podrá acceder a ellos. Además gracias a el Depends de fastAPI, se verifica que el token JWT sea valido y se captura la información del usuario que realiza la solicitud.

- Consultar las contraseñan
    Para consultar las contraseñas se debe hacer una petición GET a la ruta /passwords, conociendo el usuario que lo solicita mediante get_current_user se busca todas las contraseñas que tenga el usuario en la base de datos.

- Crear una contraseña
    Para crear una contraseña se realiza una peticion POST y se le pedí al usuario por medio de las "Query Parameters" la información de la contraseña, la cual se almacena en la base de datos. Dicha informacion consta de:

    length (int): Longitud de la contraseña
    capital_letters (int): Cantidad de mayusculas de la contraseña
    numbers (int): Cantidad de numeros de la contraseña
    special_characters (int): Cantidad de caracteres especiales de la contraseña

    Con esta información se genera una contraseña aleatoria que cumpla con los requisitos del usuario.

-Actualizar una contraseña
    Para actualizar una contraseña se realiza una peticion PUT y se le pedí al usuario por medio de las "Query Parameters" la información de la contraseña, la cual se actualiza en la base de datos. Dicha informacion consta de:

    password_id (int):  Id de la contraseña a actualizar
    length (int): Longitud de la nueva contraseña
    capital_letters (int): Cantidad de mayusculas de la nueva contraseña
    numbers (int): Cantidad de numeros de la nueva contraseña
    special_characters (int): Cantidad de caracteres especiales de la nueva contraseña

    Con esta información se genera una contraseña aleatoria que cumpla con los requisitos del usuario.

- Eliminar una contraseña
    Para eliminar una contraseña se realiza una peticion DELETE y se le pedí al usuario por medio de las "Query Parameters" la información de la contraseña, la cual se elimina de la base de datos. Dicha informacion consta de:

    password_id (int): Id de la contraseña a eliminar


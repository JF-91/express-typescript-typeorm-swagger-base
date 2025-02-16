# README.md

# Proyecto Express con TypeScript

Este proyecto es una aplicación web construida con Express y TypeScript. Proporciona una estructura básica para desarrollar aplicaciones web escalables y mantenibles.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **app.ts**: Punto de entrada de la aplicación.
  - **config/**: Configuraciones necesarias para la aplicación.
  - **modules/**: Contiene los módulos de la aplicación.
    - **user/**: Módulo de usuarios.
      - **controllers/**: Controladores del módulo de usuarios.
      - **dtos/**: Data Transfer Objects del módulo de usuarios.
      - **interfaces/**: Interfaces del módulo de usuarios.
      - **services/**: Servicios del módulo de usuarios.
    - **profile/**: Módulo de perfiles.
      - **controllers/**: Controladores del módulo de perfiles.
      - **dtos/**: Data Transfer Objects del módulo de perfiles.
      - **interfaces/**: Interfaces del módulo de perfiles.
      - **services/**: Servicios del módulo de perfiles.
    - **page/**: Módulo de páginas.
      - **controllers/**: Controladores del módulo de páginas.
      - **dtos/**: Data Transfer Objects del módulo de páginas.
      - **interfaces/**: Interfaces del módulo de páginas.
      - **services/**: Servicios del módulo de páginas.
    - **role/**: Módulo de roles.
      - **controllers/**: Controladores del módulo de roles.
      - **dtos/**: Data Transfer Objects del módulo de roles.
      - **interfaces/**: Interfaces del módulo de roles.
      - **services/**: Servicios del módulo de roles.
    - **permission/**: Módulo de permisos.
      - **controllers/**: Controladores del módulo de permisos.
      - **dtos/**: Data Transfer Objects del módulo de permisos.
      - **interfaces/**: Interfaces del módulo de permisos.
      - **services/**: Servicios del módulo de permisos.
    - **post/**: Módulo de publicaciones.
      - **controllers/**: Controladores del módulo de publicaciones.
      - **dtos/**: Data Transfer Objects del módulo de publicaciones.
      - **interfaces/**: Interfaces del módulo de publicaciones.
      - **services/**: Servicios del módulo de publicaciones.
    - **shared/**: Contiene módulos compartidos.
      - **middlewares/**: Middlewares compartidos.
      - **interceptors/**: Interceptores compartidos.
  - **routes/**: Configuración de rutas de la aplicación.
  - **services/**: Lógica de negocio y servicios.
  - **types/**: Interfaces y tipos personalizados.
  - **utils/**: Funciones utilitarias.

- **tests/**: Contiene pruebas unitarias para la aplicación.

- **.env**: Variables de entorno para la aplicación.

- **.gitignore**: Archivos y directorios que deben ser ignorados por Git.

- **package.json**: Configuración de npm y dependencias del proyecto.

- **tsconfig.json**: Configuración de TypeScript.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd express-typescript-app
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para ejecutar la aplicación, utiliza el siguiente comando:
```
npm start
```

## Ejecución con Docker

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

2. Construye y levanta los contenedores:
   ```
   docker-compose up --build
   ```

3. La aplicación estará disponible en `http://localhost:3000` y phpMyAdmin en `http://localhost:8080`.

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:
```
npm test
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
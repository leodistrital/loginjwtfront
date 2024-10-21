# Sistema de Gestión de Usuarios y Autenticación

Este proyecto es un sistema básico de gestión de usuarios con funcionalidad de inicio de sesión, construido con **Angular** en el frontend y **JWT** (JSON Web Token) para la autenticación.

## Funcionalidades
- Registro e inicio de sesión de usuarios
- Autenticación basada en JWT
- Almacenamiento de tokens en localStorage
- Rutas protegidas (solo accesibles para usuarios autenticados)
- Operaciones básicas de usuario (Crear, Leer, Actualizar, Eliminar - CRUD)

## Tecnologías Utilizadas
- **Angular** - Framework de frontend
- **JWT** - Autenticación
- **Bootstrap** - Para los estilos

## Instalación

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/leodistrital/loginjwtfront
    cd tu-repo
    ```

2. **Instalar dependencias:**
    ```bash
    npm install
    ```

3. **Ejecutar la aplicación Angular:**
    ```bash
    ng serve
    ```

4. Abre tu navegador y ve a `http://localhost:4200/`.

## Configuración del Backend
Este proyecto asume que tienes una API en el backend que emite tokens JWT y los valida. Puedes usar un backend con Node.js o cualquier otra tecnología. Asegúrate de que el backend implemente los siguientes endpoints:
- `POST /login` - Para iniciar sesión y obtener un token JWT.
- `POST /register` - Para registrar un nuevo usuario.
- `GET /users` - Ruta protegida para obtener la lista de usuarios (requiere un token JWT válido).

## Uso

1. Registra un nuevo usuario completando el formulario de registro.
2. Inicia sesión con las credenciales registradas.
3. Después de iniciar sesión, el token se almacena en `localStorage`, y puedes acceder a las rutas protegidas.

## Configuración de Entorno

Para configurar las URLs de la API, puedes usar variables de entorno. Modifica el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://tu-url-backend-api'
};

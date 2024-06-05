# Proyecto Final - Bakery Quilla

Este proyecto es una aplicación web para la administración de una panadería llamada "Bakery Quilla". Incluye un backend desarrollado con Django y un frontend utilizando Node.js en react.

## Pasos Preliminares

### Crear la Base de Datos

1. Abre HeidiSQL.
2. Crea una base de datos llamada `bakery_quilla`.

### Instalación de Dependencias

1. Abre una consola y navega hasta el directorio raíz del proyecto.
2. Instala las dependencias de Python ejecutando:

    ```bash
    pip install -r requirements.txt
    ```

## Configuración del Backend

1. Realiza las migraciones necesarias para la aplicación `ventas`:

    ```bash
    py manage.py makemigrations ventas
    py manage.py migrate
    ```

2. Inicia el servidor de desarrollo de Django:

    ```bash
    py manage.py runserver
    ```

## Configuración del Frontend

1. Navega al directorio del cliente:

    ```bash
    cd client
    ```

2. Inicia el servidor de desarrollo de Node.js:

    ```bash
    npm run dev
    ```

## Requerimientos Adicionales

- [Node.js](https://nodejs.org/)
- [MariaDB](https://mariadb.org/)
- [HeidiSQL](https://www.heidisql.com/)
- [Python](https://www.python.org/)



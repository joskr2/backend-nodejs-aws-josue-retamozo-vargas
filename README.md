# Backend Node.js AWS - Proyecto Serverless

Este proyecto implementa una API RESTful desplegada en **AWS Lambda** utilizando **Serverless Framework** y **TypeScript**. Combina datos de dos APIs externas, almacena resultados en DynamoDB y provee caché para optimizar respuestas.

---

## 🚀 Características

- **GET /fusionados**: Combina y devuelve datos de dos APIs externas.
- **POST /almacenar**: Almacena datos personalizados en la base de datos.
- **GET /historial**: Retorna el historial de datos almacenados con paginación.
- **Caché**: Respuestas almacenadas durante 30 minutos.
- **Despliegue en AWS**: Utiliza AWS Lambda y DynamoDB con Serverless Framework.

---

## 📂 Estructura del Proyecto

```plaintext
backend-nodejs-aws/
├── src/
│   ├── handlers/           # Controladores de endpoints
│   ├── services/           # Servicios para integración con APIs y base de datos
│   ├── utils/              # Respuestas HTTP y utilidades
│
├── tests/                  # Pruebas unitarias
├── serverless.ts           # Configuración de Serverless Framework
├── tsconfig.json           # Configuración TypeScript
├── package.json            # Configuración de dependencias y scripts
└── README.md               # Documentación del proyecto
```

---

## 📦 Instalación

1. Clona el repositorio:
  ```bash
  git clone https://github.com/tu-usuario/backend-nodejs-aws.git
  cd backend-nodejs-aws
  ```

---

## ⚙️ Endpoints

| Método | Ruta                                                                 | Descripción                              |
|--------|----------------------------------------------------------------------|------------------------------------------|
| GET    | [https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/fusionados](https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/fusionados) | Retorna datos combinados de dos APIs.    |
| POST   | [https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/almacenar](https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/almacenar)   | Almacena datos personalizados.           |
| GET    | [https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/historial](https://wyizfkwej4.execute-api.sa-east-1.amazonaws.com/dev/historial)   | Retorna el historial almacenado.         |
---

## 🧪 Pruebas

El proyecto utiliza Jest para pruebas unitarias. Las pruebas se encuentran en la carpeta `tests/`.

---

## 📝 Autor

Josue Retamozo Vargas  
Backend Developer

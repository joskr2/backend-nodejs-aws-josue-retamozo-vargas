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
│   └── index.ts            # Punto de entrada principal
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

2. Instala las dependencias:
  ```bash
  npm install
  ```

3. Ejecuta localmente:
  ```bash
  npm run start
  ```

4. Pruebas:
  ```bash
  npm run test
  ```

5. Despliegue en AWS:
  ```bash
  npm run deploy
  ```

---

## ⚙️ Endpoints

| Método | Ruta        | Descripción                              |
|--------|-------------|------------------------------------------|
| GET    | /fusionados | Retorna datos combinados de dos APIs.    |
| POST   | /almacenar  | Almacena datos personalizados.           |
| GET    | /historial  | Retorna el historial almacenado.         |

---

## 🧪 Pruebas

El proyecto utiliza Jest para pruebas unitarias. Las pruebas se encuentran en la carpeta `tests/`.

---

## 📝 Autor

Josue Retamozo Vargas  
Backend Developer

---

## 📋 Pasos Finales

1. **Ubicación**:
  - Guarda el `index.ts` en la carpeta **`src/`**.
  - Guarda el `README.md` en la raíz del proyecto.

2. **Prueba el Proyecto**:
  ```bash
  npm run start
  ```

3. **Verifica Localmente**:
  Abre [http://localhost:3000/](http://localhost:3000/) o utiliza herramientas como Postman.

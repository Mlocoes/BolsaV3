# 📈 BolsaV3

Sistema moderno de gestión de carteras de inversión construido con FastAPI, React y TypeScript.

## 🚀 Características

- **Gestión de Carteras**: Crea y administra múltiples carteras de inversión
- **Seguimiento de Transacciones**: Registra compras, ventas y dividendos
- **Análisis en Tiempo Real**: Visualiza el rendimiento de tus inversiones con gráficos interactivos
- **Actualización Automática de Precios**: Sistema de tareas en segundo plano para mantener los precios actualizados
- **Interfaz Moderna**: Diseño premium con modo oscuro/claro
- **Autenticación Segura**: Sistema de autenticación JWT con tokens de acceso

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** - Framework web de alto rendimiento
- **PostgreSQL** - Base de datos relacional
- **SQLAlchemy** - ORM para Python
- **Alembic** - Migraciones de base de datos
- **Redis** - Caché y gestión de sesiones
- **Celery** - Tareas asíncronas en segundo plano
- **JWT** - Autenticación segura

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Zustand** - Gestión de estado
- **Recharts** - Gráficos interactivos
- **Handsontable** - Tablas de datos avanzadas
- **Axios** - Cliente HTTP

### Infraestructura
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de servicios
- **Nginx** - Reverse proxy

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- Node.js 18+ (para desarrollo local sin Docker)
- Python 3.11+ (para desarrollo local sin Docker)

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd BolsaV3
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura:
- `SECRET_KEY`: Clave secreta para JWT (genera una segura)
- `ALPHA_VANTAGE_API_KEY`: Tu API key de Alpha Vantage (opcional, para precios en tiempo real)

### 3. Iniciar con Docker Compose

```bash
docker-compose up -d
```

Esto iniciará todos los servicios:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Nginx**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### 4. Crear Usuario Inicial

Accede a http://localhost:3000/register para crear tu primera cuenta.

## 📁 Estructura del Proyecto

```
BolsaV3/
├── backend/                # API FastAPI
│   ├── alembic/           # Migraciones de base de datos
│   ├── app/
│   │   ├── api/           # Endpoints de la API
│   │   ├── core/          # Configuración y seguridad
│   │   ├── db/            # Configuración de base de datos
│   │   ├── models/        # Modelos SQLAlchemy
│   │   ├── schemas/       # Esquemas Pydantic
│   │   ├── services/      # Lógica de negocio
│   │   └── tasks/         # Tareas Celery
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── services/      # Servicios API
│   │   ├── store/         # Estado global (Zustand)
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
├── nginx/                 # Configuración Nginx
├── docker-compose.yml
└── README.md
```

## 🔧 Desarrollo Local

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
alembic upgrade head

# Iniciar servidor de desarrollo
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📚 API Documentation

Una vez que el backend esté ejecutándose, accede a la documentación interactiva:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🗄️ Migraciones de Base de Datos

### Crear una nueva migración

```bash
cd backend
alembic revision --autogenerate -m "Descripción del cambio"
```

### Aplicar migraciones

```bash
alembic upgrade head
```

### Revertir migración

```bash
alembic downgrade -1
```

## 🔐 Seguridad

- Autenticación JWT con tokens de acceso
- Passwords hasheados con bcrypt
- Rate limiting en endpoints críticos
- Headers de seguridad configurados
- Validación de datos con Pydantic
- CORS configurado adecuadamente

## 📊 Características Principales

### Gestión de Carteras
- Crear múltiples carteras por usuario
- Visualizar resumen de valor total y rendimiento
- Eliminar carteras

### Transacciones
- Registrar compras, ventas y dividendos
- Edición en línea con Handsontable
- Cálculo automático de posiciones

### Análisis
- Gráficos de rendimiento histórico
- Snapshots diarios del valor de la cartera
- Cálculo de ganancias/pérdidas

### Precios de Activos
- Actualización automática mediante Celery
- Integración con Alpha Vantage API
- Histórico de precios

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

Desarrollado con ❤️ para gestionar inversiones de manera eficiente.

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes una sugerencia, por favor abre un issue en el repositorio.

## 📞 Soporte

Para preguntas y soporte, por favor abre un issue en GitHub.

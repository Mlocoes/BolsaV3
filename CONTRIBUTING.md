# Guía de Contribución

¡Gracias por tu interés en contribuir a BolsaV3! Este documento proporciona pautas para contribuir al proyecto.

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/BolsaV3.git
cd BolsaV3
```

### 2. Configurar el Entorno de Desarrollo

Sigue las instrucciones en el README.md para configurar tu entorno de desarrollo local.

### 3. Crear una Rama

```bash
git checkout -b feature/nombre-de-tu-feature
```

Usa prefijos descriptivos:
- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Añadir o modificar tests

### 4. Realizar Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de estilo del proyecto
- Añade tests para nuevas funcionalidades
- Actualiza la documentación si es necesario

### 5. Commit

Usa mensajes de commit descriptivos:

```bash
git commit -m "feat: añadir funcionalidad de exportación de transacciones"
git commit -m "fix: corregir cálculo de ganancias en cartera"
git commit -m "docs: actualizar guía de instalación"
```

Formato de mensajes de commit:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan el código)
- `refactor:` - Refactorización de código
- `test:` - Añadir o modificar tests
- `chore:` - Tareas de mantenimiento

### 6. Push y Pull Request

```bash
git push origin feature/nombre-de-tu-feature
```

Luego abre un Pull Request en GitHub con:
- Título descriptivo
- Descripción detallada de los cambios
- Referencias a issues relacionados (si aplica)

## 📝 Estándares de Código

### Python (Backend)

- Sigue PEP 8
- Usa type hints
- Documenta funciones con docstrings
- Máximo 88 caracteres por línea (Black formatter)
- Todos los comentarios deben estar en español

Ejemplo:
```python
def calcular_rendimiento(cartera_id: int, db: Session) -> float:
    """
    Calcula el rendimiento total de una cartera.
    
    Args:
        cartera_id: ID de la cartera
        db: Sesión de base de datos
        
    Returns:
        Rendimiento como porcentaje
    """
    # Implementación
    pass
```

### TypeScript/React (Frontend)

- Usa TypeScript estricto
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres de componentes en PascalCase
- Nombres de funciones en camelCase

Ejemplo:
```typescript
interface TransactionProps {
    portfolioId: string;
    onUpdate?: () => void;
}

const TransactionTable: React.FC<TransactionProps> = ({ portfolioId, onUpdate }) => {
    // Implementación
    return <div>...</div>;
};
```

### CSS/Tailwind

- Usa clases de Tailwind cuando sea posible
- Mantén consistencia con el sistema de diseño
- Usa variables CSS para colores del tema

## 🧪 Tests

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

Asegúrate de que todos los tests pasen antes de hacer un PR.

## 📚 Documentación

- Actualiza el README.md si añades nuevas funcionalidades
- Documenta nuevos endpoints en los docstrings
- Añade comentarios explicativos en código complejo
- Todos los comentarios deben estar en español

## 🐛 Reportar Bugs

Al reportar un bug, incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir** el bug
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Capturas de pantalla** (si aplica)
5. **Entorno**: SO, versión de navegador, etc.

## 💡 Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. Verifica que no exista ya un issue similar
2. Describe claramente la funcionalidad propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos de uso si es posible

## 🔍 Proceso de Revisión

1. Un mantenedor revisará tu PR
2. Puede solicitar cambios o mejoras
3. Una vez aprobado, se fusionará con la rama principal
4. Tu contribución será reconocida en el proyecto

## ⚡ Consejos

- Mantén los PRs pequeños y enfocados
- Un PR = Una funcionalidad/fix
- Actualiza tu rama con los últimos cambios de main antes de hacer PR
- Responde a los comentarios de revisión de manera constructiva

## 📞 Preguntas

Si tienes preguntas sobre cómo contribuir, abre un issue con la etiqueta `question`.

## 🙏 Reconocimientos

¡Gracias a todos los contribuidores que ayudan a mejorar BolsaV3!

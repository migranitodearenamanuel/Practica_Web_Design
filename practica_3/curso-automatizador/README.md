# Agente ThePowerMBA Automatizador

Este agente es una herramienta especializada para crear una réplica local completa de tus cursos de ThePowerMBA.

## Características Exclusivas

- **Específico para ThePowerMBA**: Selectores y lógica de navegación adaptada.
- **Modo Réplica Visual**: Captura cada slide como se ve en pantalla.
- **Sistema de Video de 3 Niveles**: Descarga directa -> Grabación Automática -> Manual.
- **Modo Visible**: Verás al navegador trabajar en tiempo real.

## Requisitos

- Google Chrome instalado.
- Monitor activo (si se activa la grabación de pantalla del agente).
- Credenciales configuradas en `.env`.

## Instalación

1. Instala las dependencias:

    ```bash
    pip install -r curso-automatizador/requirements.txt
    ```

2. Verifica tu archivo `.env` en la raíz (ya debería estar creado):

    ```env
    COURSE_EMAIL=tu_email
    COURSE_PASSWORD=tu_password
    COURSE_LOGIN_URL=https://app.thepowermba.com/
    ```

## Uso

### 1. Prueba de Login (Recomendado Primero)

Verifica que las credenciales y selectores funcionen:

```bash
python curso-automatizador/main.py --test-login
```

### 2. Ejecución Completa

Inicia la descarga de todo el curso:

```bash
python curso-automatizador/main.py --modo-completo
```

## Estructura de Salida

Todo se guardará en la carpeta `ThePowerMBA_Completo` en el nivel superior.

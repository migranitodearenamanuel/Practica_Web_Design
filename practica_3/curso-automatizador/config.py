import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv(
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
)


class Config:
    # =========================================================================
    # CREDENCIALES
    # =========================================================================

    LOGIN_URL = os.getenv("COURSE_LOGIN_URL", "https://hack.io/login")
    EMAIL = os.getenv("COURSE_EMAIL")
    PASSWORD = os.getenv("COURSE_PASSWORD")

    DASHBOARD_URL = "https://app.thepowermba.com/dashboard"

    # =========================================================================
    # RUTAS
    # =========================================================================

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    OUTPUT_DIR = os.path.join(os.path.dirname(BASE_DIR), "hackio_completo")
    TEMP_DIR = os.path.join(BASE_DIR, "output", "temp")
    LOG_DIR = os.path.join(BASE_DIR, "logs")

    # =========================================================================
    # CONFIGURACIÓN TÉCNICA
    # =========================================================================

    HEADLESS_MODE = False

    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

    IMPLICIT_WAIT = 15
    PAGE_LOAD_TIMEOUT = 60

    # Delays "Humanos"
    MIN_DELAY = 1.5
    MAX_DELAY = 3.5

    # =========================================================================
    # SELECTORES
    # =========================================================================

    SELECTORS = {
        "login": {
            "email": ['input[name="email"]', 'input[type="email"]'],
            "password": ['input[name="password"]', 'input[type="password"]'],
            "submit": ['button[type="submit"]', '//button[contains(text(), "Entrar")]'],
        },
        "modulos": {
            "contenedores": [
                # Estrategia: Buscar elementos que parezcan cards DE CONTENIDO.
                # Evitar contenedores padres genéricos.
                # Opcion 1: Buscar por títulos de módulo (h3/h4) y coger su padre card
                "//h3[contains(@class, 'title')]/ancestor::div[contains(@class, 'card') or contains(@class, 'item')]",
                # Opcion 2: Cards que contengan "Lecciones completadas" o barras de progreso
                "//div[contains(text(), 'completadas')]/ancestor::div[contains(@class, 'card')]",
                "//div[contains(@class, 'progress')]/ancestor::div[contains(@class, 'card')]",
                # Opcion 3: Elementos en lista grid, pero ignorando headers
                "//div[contains(@class, 'grid')]//div[contains(@class, 'card')]",
                # Opcion 4 (Especifica PowerMBA/Hackio antigua):
                ".modules-list .module-item",
            ],
            "titulo": ".module-title, h3, h4, .title",
            "enlace": "a",
        },
        "lecciones": {
            "contenedores": [
                # Estrategia: Hack.io usa acordeones (div role=button)
                "//div[@data-testid='lesson-toggle']",
                "//div[contains(@class, 'lesson-card_container')]",
                # Fallbacks antiguos
                "//li[contains(@class, 'lesson')]",
                "//a[contains(@href, '/lesson/')]/ancestor::div[contains(@class, 'item')]",
            ],
            "titulo": "h3, .lesson-title, h4, span.text",
            "enlace": "a",  # Posiblemente dentro del acordeón
            "es_acordeon": True,  # Flag para indicar que requiere click para expandir
            "items_microlearning": "//div[@data-testid='microlearning-card']//button[descendant::h2]",
        },
        "contenido": {
            "nav_siguiente": [
                "//button[contains(@class, 'control-arrow')][contains(@aria-label, 'next')]",
                "//button[contains(@class, 'control-arrow')][contains(@aria-label, 'siguiente')]",
                "//div[contains(@class, 'slider-control-centerright')]//button",
                "//button[descendant::*[contains(@d, 'M8.59 16.59L13.17 12 8.59 7.41')]]",  # Flecha derecha material
                "//div[contains(@class, 'PdfViewer_controls')]//button[2]",  # Posible botón next
                "//button[@data-testid='arrow-next']",
                "//button[contains(@class, 'chakra-button')][descendant::svg]",  # Generico chakra
                # Basado en imagen usuario: Flecha abajo/derecha en una barra flotante
                "//button[descendant::svg[contains(@data-testid, 'KeyboardArrowDownIcon')]]",
                "//button[descendant::svg[contains(@data-testid, 'KeyboardArrowRightIcon')]]",
            ],
            "nav_anterior": [
                "//button[descendant::svg[contains(@data-testid, 'KeyboardArrowUpIcon')]]",
                "//button[descendant::svg[contains(@data-testid, 'KeyboardArrowLeftIcon')]]",
                "//div[contains(@class, 'PdfViewer_controls')]//button[1]",
            ],
            "contador_slides": [
                "//p[contains(text(), '/')]",
                "//span[contains(text(), '/')]",
                "//div[contains(@class, 'PdfViewer_pageIndicator')]",
            ],
            "iframe_video": [
                "iframe[src*='vimeo']",
                "iframe[src*='youtube']",
                "div.video-react-video",
                "video",
                ".video-player",
            ],
        },
    }

    CAPTURE_SETTINGS = {
        "image_quality": 90,
        "wait_between_slides": 2.5,
    }


for directory in [Config.LOG_DIR, Config.TEMP_DIR, Config.OUTPUT_DIR]:
    os.makedirs(directory, exist_ok=True)

import os
import time
import json
import logging
import random
import re
import shutil
import argparse
import sys
import traceback
import tempfile
import uuid
import urllib.request
from datetime import datetime

# Selenium & ActionChains
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import selenium_stealth

# Media
import yt_dlp
import img2pdf

from config import Config

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(
            os.path.join(Config.LOG_DIR, "execution_debug_v2.log"), encoding="utf-8"
        ),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("HackIO_Debug")


class HackIOAutomator:
    def __init__(self, args=None):
        self.driver = None
        self.args = args
        self.processed_urls_file = os.path.join(Config.TEMP_DIR, "processed_urls.json")
        self.processed_urls = self.load_processed_urls()

    # =========================================================================
    # UTILS
    # =========================================================================
    def load_processed_urls(self):
        if os.path.exists(self.processed_urls_file):
            try:
                with open(self.processed_urls_file, "r") as f:
                    return set(json.load(f))
            except:
                return set()
        return set()

    def mark_url_processed(self, url):
        self.processed_urls.add(url)
        with open(self.processed_urls_file, "w") as f:
            json.dump(list(self.processed_urls), f)

    def clean_filename(self, text):
        if not text:
            return "untitled"
        clean = re.sub(r'[\\/*?:"<>|]', "", text)
        clean = clean.replace("\n", " ").replace("\r", "")
        return clean.strip().replace(" ", "_").replace(".", "")

    def random_delay(self, min_s=None, max_s=None):
        if min_s is None:
            min_s = Config.MIN_DELAY
        if max_s is None:
            max_s = Config.MAX_DELAY
        time.sleep(random.uniform(min_s, max_s))

    def dump_page_source(self, name):
        try:
            timestamp = datetime.now().strftime("%H%M%S")
            path = os.path.join(Config.LOG_DIR, f"{name}_{timestamp}_source.html")
            with open(path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)
        except:
            pass

    # =========================================================================
    # INTERACCIONES
    # =========================================================================
    def mover_y_clic(self, elemento):
        try:
            self.driver.execute_script(
                "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
                elemento,
            )
            time.sleep(random.uniform(0.5, 0.8))

            actions = ActionChains(self.driver)
            actions.move_to_element(elemento)
            actions.pause(random.uniform(0.2, 0.5))
            actions.click()
            actions.perform()
            return True
        except:
            try:
                self.driver.execute_script("arguments[0].click();", elemento)
                return True
            except:
                return False

    def wait_for_dashboard(self):
        # Force reload if stuck
        if Config.DASHBOARD_URL not in self.driver.current_url:
            self.driver.get(Config.DASHBOARD_URL)
        else:
            self.driver.refresh()

        try:
            WebDriverWait(self.driver, 20).until(
                lambda d: "dashboard" in d.current_url
                and len(d.find_elements(By.TAG_NAME, "a")) > 5
            )
            time.sleep(3)
        except:
            logger.warning("⚠️ Timeout Dashboard (trying to continue)")

    # =========================================================================
    # SETUP & LOGIN
    # =========================================================================
    def setup_driver(self):
        logger.info("⚡ Iniciando Browser...")
        opts = Options()
        if Config.HEADLESS_MODE:
            opts.add_argument("--headless=new")
        opts.add_argument("--start-maximized")
        opts.add_argument("--disable-blink-features=AutomationControlled")
        opts.add_experimental_option("excludeSwitches", ["enable-automation"])
        opts.set_capability("goog:loggingPrefs", {"performance": "ALL"})

        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=opts)

        selenium_stealth.stealth(
            self.driver,
            languages=["es-ES", "es"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True,
        )
        self.driver.maximize_window()

    def login(self):
        if self.driver.current_url and "dashboard" in self.driver.current_url:
            return
        logger.info(f"🔐 Login en {Config.LOGIN_URL}")
        self.driver.get(Config.LOGIN_URL)
        self.random_delay()

        try:
            if "dashboard" in self.driver.current_url:
                return

            for field, selectors in Config.SELECTORS["login"].items():
                if field == "submit":
                    continue
                for sel in selectors:
                    try:
                        el = self.driver.find_element(By.CSS_SELECTOR, sel)
                        el.clear()
                        val = Config.EMAIL if field == "email" else Config.PASSWORD
                        el.send_keys(val)
                        break
                    except:
                        continue

            for sel in Config.SELECTORS["login"]["submit"]:
                try:
                    if "//" in sel:
                        btn = self.driver.find_element(By.XPATH, sel)
                    else:
                        btn = self.driver.find_element(By.CSS_SELECTOR, sel)
                    self.mover_y_clic(btn)
                    break
                except:
                    continue

            WebDriverWait(self.driver, 30).until(lambda d: "login" not in d.current_url)
            logger.info("✅ Login OK")
            self.random_delay(3, 5)
        except Exception as e:
            logger.critical(f"❌ Fallo Login: {e}")
            raise

    # =========================================================================
    # NAV & EXTRACT
    # =========================================================================
    def buscar_y_entrar_prog(self, nombre):
        logger.info(f"🔎 Buscando link/botón para: {nombre}")
        self.wait_for_dashboard()
        time.sleep(3)  # Wait extra for React hydration

        # Debug: List all potential links
        logger.info(f"   ℹ️ Current URL: {self.driver.current_url}")

        # Estrategia muy genérica: Buscar cualquier cosa con el texto del programa
        # Normalizamos texto para búsqueda insensible a mayúsculas
        try:
            xpath = f"//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{nombre.lower()}')]"
            candidates = self.driver.find_elements(By.XPATH, xpath)
            logger.info(
                f"   ℹ️ Encontrados {len(candidates)} elementos con texto '{nombre}'"
            )

            target = None
            for el in candidates:
                if not el.is_displayed():
                    continue

                # --- FIX: Evitar falsos positivos (ej. "IA Developer" vs "IA Developer Prework") ---
                txt = el.text.strip().lower()
                if "ia developer" in nombre.lower() and "prework" not in nombre.lower():
                    if "prework" in txt:
                        logger.info(
                            "      ⚠️ Ignorando candidato 'Prework' para búsqueda exacta."
                        )
                        continue
                # -----------------------------------------------------------------------------------

                # Priorizar si es clickable
                tag = el.tag_name
                parent = el.find_element(By.XPATH, "..")

                # Check 1: Es un enlace o botón directo?
                if tag in ["a", "button"]:
                    target = el
                    logger.info(f"   🎯 Encontrado target directo tag={tag}")
                    break

                # Check 2: El padre es enlace?
                if parent.tag_name == "a":
                    target = parent
                    logger.info(f"   🎯 Encontrado padre enlace")
                    break

                # Check 3: Hay un botón 'Ver todo' o 'Acceder' cerca?
                try:
                    btn = el.find_element(By.XPATH, "./following::button[1]")
                    if btn.is_displayed():
                        target = btn
                        logger.info(f"   🎯 Encontrado botón siguiente")
                        break
                except:
                    pass

            if target:
                self.mover_y_clic(target)
                time.sleep(5)
                return True

        except Exception as e:
            logger.error(f"   ❌ Error buscando programa: {e}")

        logger.error(f"❌ No se pudo entrar en {nombre}")
        return False

    def detectar_tipo_contenido(self):
        # 1. Video
        for sel in Config.SELECTORS["contenido"]["iframe_video"]:
            if self.driver.find_elements(By.CSS_SELECTOR, sel):
                logger.info(f"         🎥 Detectado VIDEO por selector: {sel}")
                return "VIDEO"

        # 2. Video Genérico (Fallback) - SUBIDO DE PRIORIDAD
        # Si hay video/iframe, asumimos Video antes de comprobar contadores de slides
        try:
            # Buscar video tags
            if self.driver.find_elements(By.TAG_NAME, "video"):
                logger.info("         🎥 Detectado VIDEO por tag <video> genérico")
                return "VIDEO"

            # Buscar iframes (Youtube/Vimeo/Genérico)
            iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
            for ifr in iframes:
                src = ifr.get_dom_attribute("src") or ""
                # Si tiene SRC y no es obviamente publicidad/tracker, es contenido
                if len(src) > 5 and not any(
                    x in src for x in ["googletag", "facebook", "pixel", "chat"]
                ):
                    logger.info(
                        f"         🎥 Detectado VIDEO por iframe genérico: {src[:30]}..."
                    )
                    return "VIDEO"
        except:
            pass

        # 3. Slides (Por contador "1/X")
        for sel in Config.SELECTORS["contenido"].get("contador_slides", []):
            try:
                els = self.driver.find_elements(By.XPATH, sel)
                for el in els:
                    txt = el.text.strip()
                    if el.is_displayed() and "/" in txt:
                        # Regex estricto: "1/20", "1 / 20", "5 of 10", "Page 1/5"
                        # Ignorar si tiene mucho texto extra (ej: "1/1 unidades didácticas")
                        if (
                            re.search(r"^\d+\s*/\s*\d+$", txt)
                            or re.search(r"^\d+\s*of\s*\d+$", txt)
                            or re.search(r"^Page\s+\d+\s*/\s*\d+$", txt)
                            or re.search(
                                r"^\d+\s*/\s*\d+\s+unidades.*$", txt, re.IGNORECASE
                            )
                        ):
                            # EXTRA CHECK: Si el contador es muy bajo (1/1, 1/2) y NO hemos visto video...
                            # podría ser slide, pero verifiquemos que NO sea video otra vez?
                            # Ya lo hicimos arriba. Asumimos slide.
                            logger.info(
                                f"         📄 Detectado SLIDES por contador: {txt}"
                            )
                            return "SLIDES"
                        else:
                            # Log para depurar falsos positivos
                            logger.info(
                                f"         ⚠️ Ignorando posible falso positivo slide counter: '{txt}'"
                            )
            except:
                pass

        # 3. Slides (Por botones de navegación)
        for sel in Config.SELECTORS["contenido"]["nav_siguiente"]:
            try:
                els = self.driver.find_elements(
                    By.XPATH if "//" in sel else By.CSS_SELECTOR, sel
                )
                if any(e.is_displayed() for e in els):
                    logger.info(f"         📄 Detectado SLIDES por botón nav: {sel}")
                    return "SLIDES"
            except:
                pass

        # 4. Espera Inteligente (Lazy Load Videos)
        # Si hasta aqui no hemos visto video/slides, esperar un poco por si el iframe tarda en cargar
        # Especialmente util si hay placeholder de carga
        logger.info("         ⏳ Esperando posible carga de video lazy-loaded...")
        time.sleep(2)
        try:
            iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
            for ifr in iframes:
                src = ifr.get_dom_attribute("src") or ""
                if len(src) > 5 and not any(
                    x in src for x in ["googletag", "facebook"]
                ):
                    logger.info(
                        f"         🎥 Detectado VIDEO (Late Load): {src[:30]}..."
                    )
                    return "VIDEO"
        except:
            pass

        # Default
        logger.info("         📝 No se detectó Video ni Slides. Asumiendo TEXTO.")
        return "TEXTO"

    def procesar_leccion_inteligente(self, leccion, ruta_salida, error_dir):
        title = self.clean_filename(leccion["nombre"])
        final_path = os.path.join(ruta_salida, title)

        if leccion["enlace"] and leccion["enlace"] in self.processed_urls:
            return

        logger.info(f"      📥 Lección: {leccion['nombre']}")
        os.makedirs(final_path, exist_ok=True)

        try:
            if leccion["enlace"]:
                self.driver.get(leccion["enlace"])
            else:
                self.mover_y_clic(leccion["elemento"])

            # OPTIMIZACIÓN VELOCIDAD: Reducir espera fija
            # time.sleep(4) -> 1.5s + Wait
            time.sleep(1.5)
            try:
                WebDriverWait(self.driver, 10).until(
                    lambda d: d.execute_script("return document.readyState")
                    == "complete"
                )
            except:
                pass
        except:
            logger.error(f"      ❌ Fail Entrada: {title}")
            return

        tipo = self.detectar_tipo_contenido()
        logger.info(f"         Tipo: {tipo}")

        try:
            if tipo == "VIDEO":
                self.descargar_video(final_path, title)
            else:
                logger.info(
                    f"         ⏭️ SALTO: Modo 'Solo Vídeo' activado. Omitiendo {tipo}."
                )
                # elif tipo == "SLIDES":
                #     self.capturar_slides_nav(final_path, f"{title}.pdf")
                # else:
                #     self.capturar_pagina_entera(final_path, f"{title}.pdf")

            self.mark_url_processed(self.driver.current_url)
        except Exception as e:
            logger.error(f"         ❌ Error Procesando: {e}")

    # --- Captura ---
    # --- Captura ---
    def capturar_slides_nav(self, output_dir, pdf_name):
        temp_dir = os.path.join(output_dir, "temp_img")
        os.makedirs(temp_dir, exist_ok=True)

        # 1. REBOBINAR AL INICIO
        logger.info("         ⏪ Rebobinando slides al inicio...")
        for _ in range(50):  # Limite de seguridad
            rewound = False
            # Intentar detectar contador "1/"
            try:
                for sel in Config.SELECTORS["contenido"].get("contador_slides", []):
                    els = self.driver.find_elements(By.XPATH, sel)
                    for el in els:
                        if el.is_displayed() and "1/" in el.text:
                            logger.info("         ✅ Inicio detectado (1/X)")
                            rewound = True
                            break
                    if rewound:
                        break
            except:
                pass

            if rewound:
                break

            # Click anterior
            clicked_prev = False
            for sel in Config.SELECTORS["contenido"].get("nav_anterior", []):
                try:
                    els = self.driver.find_elements(By.XPATH, sel)
                    for el in els:
                        if el.is_displayed() and el.is_enabled():
                            self.mover_y_clic(el)
                            time.sleep(0.5)
                            clicked_prev = True
                            break
                    if clicked_prev:
                        break
                except:
                    continue

            if not clicked_prev:
                logger.info(
                    "         ⚠️ No se pudo retroceder más (o ya estamos al inicio)."
                )
                break

        time.sleep(2)  # Estabilizar tras rebobinar

        # 2. CAPTURA Y AVANCE
        count = 0
        while True:
            count += 1
            self.driver.save_screenshot(os.path.join(temp_dir, f"s_{count:03d}.png"))
            clicked = False
            for sel in Config.SELECTORS["contenido"]["nav_siguiente"]:
                try:
                    els = self.driver.find_elements(
                        By.XPATH if "//" in sel else By.CSS_SELECTOR, sel
                    )
                    for el in els:
                        if (
                            el.is_displayed()
                            and el.is_enabled()
                            and "disabled" not in el.get_attribute("class")
                        ):
                            self.mover_y_clic(el)
                            time.sleep(Config.CAPTURE_SETTINGS["wait_between_slides"])
                            clicked = True
                            break
                    if clicked:
                        break
                except:
                    continue
            if not clicked or count > 150:
                break
        imgs = [
            os.path.join(temp_dir, f)
            for f in os.listdir(temp_dir)
            if f.endswith(".png")
        ]
        imgs.sort()
        if imgs:
            with open(os.path.join(output_dir, pdf_name), "wb") as f:
                f.write(img2pdf.convert(imgs))
        shutil.rmtree(temp_dir, ignore_errors=True)

    def _get_cookies_txt(self):
        """Exporta las cookies de Selenium a formato Netscape para yt-dlp"""
        try:
            cookies = self.driver.get_cookies()
            cookie_path = os.path.join(
                tempfile.gettempdir(), f"cookies_{uuid.uuid4()}.txt"
            )
            with open(cookie_path, "w") as f:
                f.write("# Netscape HTTP Cookie File\n")
                for cookie in cookies:
                    domain = cookie.get("domain", "")
                    include_subdomains = "TRUE" if domain.startswith(".") else "FALSE"
                    path = cookie.get("path", "/")
                    secure = "TRUE" if cookie.get("secure") else "FALSE"
                    expiry = str(int(cookie.get("expiry", time.time() + 3600)))
                    name = cookie.get("name", "")
                    value = cookie.get("value", "")
                    f.write(
                        f"{domain}\t{include_subdomains}\t{path}\t{secure}\t{expiry}\t{name}\t{value}\n"
                    )
            return cookie_path
        except Exception as e:
            logger.warning(f"      ⚠️ No se pudieron exportar cookies: {e}")
            return None

    def _sniff_video_urls(self):
        """Analiza logs de red para encontrar m3u8 o mp4"""
        candidates = set()
        try:
            logs = self.driver.get_log("performance")
            for entry in logs:
                message = json.loads(entry["message"])["message"]
                if message["method"] == "Network.requestWillBeSent":
                    url = message["params"]["request"]["url"]
                    if (
                        ".m3u8" in url
                        or ".mp4" in url
                        or ("/config" in url and "player.vimeo.com" in url)
                    ):
                        # Filtrar segmentos pequeños o irrelevantes si es necesario
                        if (
                            "master.m3u8" in url
                            or "playlist.m3u8" in url
                            or ".mp4" in url
                            or "/config" in url
                        ):
                            candidates.add(url)
        except Exception as e:
            logger.warning(f"      ⚠️ Error sniffing network: {e}")
        return list(candidates)

    def _extract_vimeo_config(self, config_url):
        """Descarga el JSON de config de Vimeo y extrae el mp4 de mejor calidad"""
        try:
            logger.info(f"      🕵️ Procesando Config Vimeo: {config_url}...")

            # Preparar request con cookies
            req = urllib.request.Request(config_url)

            # Copiar cookies de selenium
            cookies = self.driver.get_cookies()
            cookie_str = "; ".join([f"{c['name']}={c['value']}" for c in cookies])
            req.add_header("Cookie", cookie_str)
            req.add_header(
                "User-Agent", self.driver.execute_script("return navigator.userAgent;")
            )

            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())

                # Buscar progressive files (mp4 directos)
                files = data.get("request", {}).get("files", {}).get("progressive", [])

                # Ordenar por calidad (width o height) desc
                files.sort(key=lambda x: x.get("width", 0), reverse=True)

                if files:
                    best_mp4 = files[0].get("url")
                    logger.info(
                        f"      🎯 MP4 Directo encontrado: {files[0].get('quality')} - {best_mp4[:30]}..."
                    )
                    return best_mp4

        except Exception as e:
            logger.warning(f"      ⚠️ Falló extracción de config MP4: {e}")
        return None

    def descargar_video(self, output_dir, name):
        v_url = None
        for sel in Config.SELECTORS["contenido"]["iframe_video"]:
            try:
                els = self.driver.find_elements(
                    By.CSS_SELECTOR if "//" not in sel else By.XPATH, sel
                )
                for el in els:
                    src = el.get_attribute("src")
                    if src:
                        v_url = src
                        break
                if v_url:
                    break
            except:
                continue

        # Fallback: Sniffing de red si no se encuentra iframe directo
        if not v_url:
            logger.info("      🕵️ Iframe no detectado. Intentando sniffing de red...")
            # Forzamos un pequeño play/pause si es necesario para generar tráfico
            time.sleep(2)
            sniffed = self._sniff_video_urls()
            if sniffed:
                # Priorizar master playlists
                v_url = next((u for u in sniffed if "master.m3u8" in u), sniffed[0])
                logger.info(f"      🕵️ URL capturada por sniffing: {v_url[:40]}...")

        if v_url:
            # 1. Exportar cookies
            cookie_file = self._get_cookies_txt()

            # Obtener User-Agent real del navegador
            user_agent = self.driver.execute_script("return navigator.userAgent;")

            ydl_opts = {
                # Intentar mejor mp4 directo -> mejor cualquier cosa -> fusionar si hay ffmpeg
                "format": "best[ext=mp4]/best",
                "outtmpl": os.path.join(output_dir, f"{name}.%(ext)s"),
                "quiet": True,
                "no_warnings": True,
                "ignore_errors": True,
                "cookiefile": cookie_file,  # Pasamos cookies reales
                "http_headers": {
                    "Referer": self.driver.current_url,
                    "User-Agent": user_agent,
                },
            }
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([v_url])

                # Verificar si se descargó algo
                found_files = [
                    f
                    for f in os.listdir(output_dir)
                    if f.startswith(name) and f != f"{name}.pdf"
                ]
                if found_files:
                    logger.info(
                        f"      ✅ Video descargado: {name} (ext: auto, con cookies)"
                    )
                else:
                    raise Exception("yt-dlp terminó pero no generó archivo.")

            except Exception as e:
                logger.error(
                    f"      ❌ Error descargando video (incluso con cookies): {e}"
                )
                logger.warning(
                    "      ⚠️ Fallback de grabación DESACTIVADO por petición del usuario."
                )
                # logger.warning("      ⚠️ Intentando FALLBACK: Grabación de Pantalla...")
                # self.record_screen_fallback(output_dir, name)

            finally:
                if cookie_file and os.path.exists(cookie_file):
                    try:
                        os.remove(cookie_file)
                    except:
                        pass

    def record_screen_fallback(self, output_dir, name):
        """Graba la pantalla mientras se reproduce el video (fallback final)"""
        try:
            import cv2
            import numpy as np
            import pyautogui

            logger.info("      🎥 Iniciando grabación de pantalla (Fallback)...")

            # 1. Intentar poner play al video
            try:
                # Buscar iframe
                iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
                for iframe in iframes:
                    try:
                        self.driver.switch_to.frame(iframe)
                        # Buscar boton play genérico
                        play_btns = self.driver.find_elements(
                            By.XPATH,
                            "//button[@aria-label='Play' or contains(@class, 'play') or contains(@title, 'Play')]",
                        )
                        for btn in play_btns:
                            if btn.is_displayed():
                                btn.click()
                                time.sleep(1)
                                break
                        self.driver.switch_to.default_content()
                    except:
                        self.driver.switch_to.default_content()
                        continue
            except:
                self.driver.switch_to.default_content()
                pass  # Puede que ya esté en autoplay o no se pueda clicar

            # 2. Configurar grabación
            screen_size = pyautogui.size()
            fourcc = cv2.VideoWriter_fourcc(*"mp4v")
            out_path = os.path.join(output_dir, f"{name}_rec.mp4")
            out = cv2.VideoWriter(out_path, fourcc, 20.0, screen_size)

            # 3. Grabar durante X segundos o hasta que termine
            # Intentamos 3 minutos por defecto para asegurar
            duration = 180

            start_time = time.time()
            logger.info(f"      🔴 Grabando durante {duration}s...")

            while int(time.time() - start_time) < duration:
                img = pyautogui.screenshot()
                frame = np.array(img)
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                out.write(frame)

                # Check escape (opcional, no bloqueante)
                # if cv2.waitKey(1) == ord('q'): break

            out.release()
            cv2.destroyAllWindows()
            logger.info(f"      ✅ Grabación finalizada: {name}_rec.mp4")

        except Exception as e:
            logger.error(f"      ❌ Error en grabación de pantalla: {e}")

    def capturar_pagina_entera(self, output_dir, pdf_name):
        try:
            # Scroll al final para asegurar carga
            self.driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);"
            )
            time.sleep(2)

            w = self.driver.execute_script(
                "return document.body.parentNode.scrollWidth"
            )
            h = self.driver.execute_script(
                "return document.body.parentNode.scrollHeight"
            )
            self.driver.set_window_size(w, h + 150)
            time.sleep(1)

            self.driver.save_screenshot(os.path.join(output_dir, f"{pdf_name}.png"))

            # Convertir a PDF
            try:
                img_path = os.path.join(output_dir, f"{pdf_name}.png")
                with open(os.path.join(output_dir, pdf_name), "wb") as f:
                    f.write(img2pdf.convert(img_path))
                os.remove(img_path)
                logger.info(f"      ✅ Captura guardada: {pdf_name}")
            except:
                logger.info(f"      ✅ Captura (PNG) guardada: {pdf_name}.png")

        except Exception as e:
            logger.error(f"      ❌ Error captura pagina: {e}")

    # =========================================================================
    # EJECUCIÓN MAESTRA
    # =========================================================================
    def ejecutar_todo(self):
        self.setup_driver()
        self.login()
        time.sleep(3)

        ORDEN = ["IA Developer"]
        # ORDEN = ["IA Developer", "IA Developer Prework", "Especialización · Web Design"]

        for prog in ORDEN:
            logger.info(f"🚀 === PROCESANDO: {prog} ===")
            if not self.buscar_y_entrar_prog(prog):
                continue

            path_prog = os.path.join(Config.OUTPUT_DIR, self.clean_filename(prog))
            error_dir = os.path.join(path_prog, "_errores")
            os.makedirs(error_dir, exist_ok=True)

            # Esperar carga real
            time.sleep(5)
            url_prog = self.driver.current_url
            logger.info(f"   ℹ️ URL Programa: {url_prog}")

            # --- DETECCIÓN NUCLEAR ---
            modulos_data = []
            logger.info("   🔍 Escaneando módulos (Modo Nuclear)...")

            # Buscar CUALQUIER elemento que parezca un módulo
            # Estrategia: Buscar todos los H3, H4, SPAN que contengan texto y filtrarlos

            all_elements = self.driver.find_elements(
                By.XPATH, "//body//*[string-length(text()) > 3]"
            )

            potential_modules = []
            for el in all_elements:
                try:
                    if not el.is_displayed():
                        continue
                    txt = el.text.strip()
                    tag = el.tag_name

                    # Filtros de Texto
                    if len(txt) > 100:
                        continue  # Demasiado largo
                    if txt.upper() in [
                        "MÓDULOS",
                        "UNIDADES",
                        "VER TODO",
                        "CONTINUAR",
                        "LOG OUT",
                    ]:
                        continue

                    # Pattern Match
                    is_numbered = re.match(r"^\d+\.", txt)
                    has_module_keyword = "Bienvenida" in txt or "Welcome" in txt

                    if is_numbered or has_module_keyword:
                        # Es un buen candidato. Buscar padre clickeable
                        parent = el.find_element(By.XPATH, "./..")
                        grandparent = el.find_element(By.XPATH, "./../..")

                        link = None
                        clickable_el = el

                        # Check links
                        try:
                            link = el.get_attribute("href")
                        except:
                            pass
                        if not link:
                            try:
                                link = parent.get_attribute("href")
                            except:
                                pass
                        if not link:
                            try:
                                link = grandparent.get_attribute("href")
                            except:
                                pass

                        potential_modules.append(
                            {"nombre": txt, "link": link, "el": clickable_el}
                        )
                except:
                    pass

            # Dedup
            seen_names = set()
            for m in potential_modules:
                if m["nombre"] not in seen_names:
                    modulos_data.append(m)
                    seen_names.add(m["nombre"])

            logger.info(f"   ℹ️ Detectados {len(modulos_data)} candidatos.")

            if not modulos_data:
                logger.warning(f"   ⚠️ Fallo total detección. Dump HTML.")
                self.dump_page_source(f"FAIL_{self.clean_filename(prog)}")
                # Intento desesperado: Buscar enlaces que contengan '/module' o '/unit'
                try:
                    links = self.driver.find_elements(
                        By.CSS_SELECTOR, "a[href*='/module'], a[href*='/unit']"
                    )
                    for l in links:
                        modulos_data.append(
                            {
                                "nombre": l.text or "Modulo Sin Nombre",
                                "link": l.get_attribute("href"),
                                "el": l,
                            }
                        )
                except:
                    pass

            # --- ITERAR MÓDULOS ---
            # PROTECCIÓN CONTRA CAÍDAS DE SESIÓN
            try:
                self._procesar_modulos_safely(
                    modulos_data, url_prog, path_prog, error_dir
                )
            except Exception as e:
                logger.error(f"🚨 Error Crítico procesando módulos: {e}")
                self.save_error_screenshot("CRASH_MODULOS")

    def _procesar_modulos_safely(self, modulos_data, url_prog, path_prog, error_dir):
        for i, mod in enumerate(modulos_data):
            # --- PROCESAR MÓDULO ---
            # Si tiene enlace y es diferente al actual, ir
            must_navigate = False
            target_url = mod["link"]

            if target_url and target_url != url_prog:
                # Navegación directa por URL
                must_navigate = True
                self.driver.get(target_url)
            elif mod["el"]:
                # Navegación por Click
                # Verificar si estamos en la URL del programa (dashboard)
                current_url_before = self.driver.current_url
                self.mover_y_clic(mod["el"])
                # Esperar cambio de URL (si aplica)
                # En algunos casos, el click solo expande, en otros navega.
                # Asumimos que si hay una lista de modulos, deberia navegar.
                try:
                    WebDriverWait(self.driver, 5).until(
                        lambda d: d.current_url != current_url_before
                    )
                    target_url = self.driver.current_url
                except:
                    # Si no cambia URL, quizas es expansion in-place
                    pass

            # Esperar carga
            time.sleep(3)
            url_mod = self.driver.current_url

            # Log
            logger.info(f"    📂 Módulo {i + 1}: {mod['nombre']}")
            logger.info(f"       🔍 Buscando lecciones en: {url_mod}")

            # Si NO cambió de URL y estamos en la principal, cuidado
            # Hack.io suele tener URLs separadas por módulo.
            # Si estamos en la misma URL que el programa, puede ser un fallo de click.
            if url_mod == url_prog:
                logger.warning(
                    "       ⚠️ La URL del módulo es igual al programa. Intentando re-click si es posible..."
                )
                try:
                    # Intentar buscar elemento nuevamente por texto y clickar
                    re_el = self.driver.find_element(
                        By.XPATH, f"//*[contains(text(), '{mod['nombre']}')]"
                    )
                    self.mover_y_clic(re_el)
                    time.sleep(3)
                    url_mod = self.driver.current_url
                except:
                    pass

            path_mod = os.path.join(path_prog, self.clean_filename(mod["nombre"]))
            os.makedirs(path_mod, exist_ok=True)

            # --- DETECCIÓN LECCIONES (Estrategia Doble Verificación) ---
            lecciones_data = []

            def _scan_microlearnings():
                """Helper interno para escanear botones/links de lecciones"""
                found = []
                # 1. Microlearnings (Botones)
                try:
                    msel = Config.SELECTORS["lecciones"].get(
                        "items_microlearning",
                        "//div[@data-testid='microlearning-card']//button[descendant::h2]",
                    )
                    micros = self.driver.find_elements(By.XPATH, msel)
                    if not micros:
                        micros = self.driver.find_elements(
                            By.XPATH, "//button[descendant::h2]"
                        )

                    for btn in micros:
                        if not btn.is_displayed():
                            continue
                        try:
                            title = btn.find_element(By.TAG_NAME, "h2").text.strip()
                        except:
                            title = btn.text.split("\n")[0].strip()
                        if len(title) > 3:
                            found.append(
                                {"nombre": title, "enlace": None, "elemento": btn}
                            )
                except:
                    pass

                # 2. Nuclear (Links) si no hay botones
                if not found:
                    try:
                        links = self.driver.find_elements(By.TAG_NAME, "a")
                        for a in links:
                            if not a.is_displayed():
                                continue
                            href = a.get_attribute("href")
                            txt = a.text.strip()
                            if not href or len(txt) < 3:
                                continue
                            is_lesson = any(
                                x in href
                                for x in [
                                    "/lesson/",
                                    "/unit/",
                                    "/content/",
                                    "/video/",
                                ]
                            ) or re.match(r"^\d+\.", txt)
                            is_bad = any(
                                x in href for x in ["dashboard", "logout", "programs"]
                            )
                            if is_lesson and not is_bad:
                                found.append(
                                    {"nombre": txt, "enlace": href, "elemento": a}
                                )
                    except:
                        pass

                # 3. Desperate Mode (Durations)
                if not found:
                    try:
                        durs = self.driver.find_elements(
                            By.XPATH,
                            "//*[contains(text(), ' min') or contains(text(), 'h ')]",
                        )
                        for dur in durs:
                            if not dur.is_displayed():
                                continue
                            try:
                                parent = dur.find_element(
                                    By.XPATH, "./.."
                                ).find_element(By.XPATH, "./..")
                                name = parent.text.split("\n")[0].strip()
                                if len(name) > 3:
                                    found.append(
                                        {
                                            "nombre": name,
                                            "enlace": parent.get_attribute("href"),
                                            "elemento": parent,
                                        }
                                    )
                            except:
                                pass
                    except:
                        pass

                return found

            # PASO 1: Pre-Escaneo (Por si ya están abiertos)
            logger.info("       🔍 Pre-escaneando lecciones (sin tocar acordeones)...")
            lecciones_data = _scan_microlearnings()

            # PASO 2: Si no hay lecciones, intentar abrir acordeones
            if not lecciones_data:
                logger.info(
                    "       ⚠️ No se detectaron lecciones visibles. Intentando abrir acordeones..."
                )
                try:
                    acc_selectors = Config.SELECTORS["lecciones"]["contenedores"]
                    accordions = []
                    for sel in acc_selectors:
                        accordions = self.driver.find_elements(By.XPATH, sel)
                        if accordions:
                            break

                    if accordions:
                        logger.info(
                            f"       ℹ️ Encontrados {len(accordions)} acordeones. Interactuando..."
                        )
                        for acc in accordions:
                            try:
                                if acc.is_displayed():
                                    # INTELIGENCIA: Verificar si ya está abierto (aria-expanded, o clase open)
                                    # Hack.io a veces usa aria-expanded="true"
                                    is_expanded = (
                                        acc.get_attribute("aria-expanded") == "true"
                                    )
                                    if not is_expanded:
                                        self.mover_y_clic(acc)
                                        time.sleep(0.2)  # Rápido
                                    else:
                                        logger.info(
                                            "         ℹ️ Acordeón ya abierto, saltando click."
                                        )
                            except:
                                pass
                        time.sleep(1.5)  # Espera breve tras interacción

                        # PASO 3: Re-Escaneo tras abrir
                        lecciones_data = _scan_microlearnings()
                except Exception as e:
                    logger.warning(f"       ⚠️ Error gestión acordeones: {e}")

            # 3. Fallback: Escaneo de Links (Nuclear) si no hay botones
            if not lecciones_data:
                logger.info(
                    "      ⚠️ No se hallaron botones. Probando escaneo nuclear de enlaces..."
                )
                all_links = self.driver.find_elements(By.TAG_NAME, "a")
                for a in all_links:
                    try:
                        if not a.is_displayed():
                            continue
                        href = a.get_attribute("href")
                        txt = a.text.strip()

                        if not href:
                            continue

                        # Filtros positivos
                        is_lesson_url = any(
                            x in href
                            for x in [
                                "/lesson/",
                                "/unit/",
                                "/content/",
                                "/video/",
                            ]
                        )
                        # "1.1 Introduccion"
                        is_lesson_text = re.match(r"^\d+\.", txt)

                        # Filtros negativos
                        if any(
                            x in href
                            for x in [
                                "dashboard",
                                "logout",
                                "login",
                                "programs",
                                "instagram",
                                "facebook",
                            ]
                        ):
                            continue

                        if is_lesson_url or (is_lesson_text and len(txt) > 3):
                            lecciones_data.append(
                                {
                                    "nombre": txt or "Leccion Sin Nombre",
                                    "enlace": href,
                                    "elemento": a,
                                }
                            )
                    except:
                        pass

            # 4. Fallback Desesperado (Si Nuclear falla)
            if not lecciones_data:
                logger.info(
                    "      ⚠️ Nuclear falló. Probando escaneo por texto de duración (e.g. '10 min')..."
                )
                try:
                    # Buscar elementos que contengan " min" o ":" (duración) y subir al padre clickeable
                    durations = self.driver.find_elements(
                        By.XPATH,
                        "//*[contains(text(), ' min') or contains(text(), 'h ')]",
                    )
                    for dur in durations:
                        try:
                            if not dur.is_displayed():
                                continue
                            # Subir 1-2 niveles para hallar el container clickeable
                            parent = dur.find_element(By.XPATH, "./..")
                            grand = parent.find_element(By.XPATH, "./..")

                            # Extraer texto del abuelo como nombre
                            name = grand.text.split("\n")[0].strip()
                            if len(name) > 3 and name not in [
                                l["nombre"] for l in lecciones_data
                            ]:
                                # Preferir elemento con href si existe
                                link = None
                                try:
                                    link = grand.get_attribute("href")
                                except:
                                    pass

                                lecciones_data.append(
                                    {
                                        "nombre": name,
                                        "enlace": link,
                                        "elemento": grand,  # Elemento clickeable
                                    }
                                )
                        except:
                            pass
                except Exception as e:
                    logger.warning(f"      ⚠️ Fallback Desesperado falló: {e}")

            # Dedup
            seen = set()
            unique_leccs = []
            for l in lecciones_data:
                key = l["enlace"] if l["enlace"] else l["nombre"]
                if key not in seen:
                    unique_leccs.append(l)
                    seen.add(key)
            lecciones_data = unique_leccs

            logger.info(f"      ℹ️ Detectadas {len(lecciones_data)} lecciones.")

            if not lecciones_data:
                logger.warning(f"      ⚠️ No se detectaron lecciones. Guardando HTML...")
                self.dump_page_source(
                    f"FAIL_LESSONS_{self.clean_filename(mod['nombre'])}"
                )

            # --- ITERAR LECCIONES ---
            for j, lec in enumerate(lecciones_data):
                try:
                    self.procesar_leccion_inteligente(lec, path_mod, error_dir)
                    if self.driver.current_url != url_mod:
                        self.driver.get(url_mod)
                        time.sleep(2)
                except:
                    pass

            if self.driver.current_url != url_prog:
                self.driver.get(url_prog)
                time.sleep(3)

        self.wait_for_dashboard()

        logger.info("🏁 FIN")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--descargar-todo-real", action="store_true")
    parser.add_argument(
        "--solo-video",
        action="store_true",
        help="Solo descarga videos, ignora texto y slides",
    )
    args = parser.parse_args()
    bot = HackIOAutomator(args)
    if args.descargar_todo_real:
        bot.ejecutar_todo()

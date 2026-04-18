"""
Scraper del Boletín Oficial de Argentina.
Extrae las normas relevantes para PLB (aerocomercial, tributario, aduanero, laboral, societario)
y genera radar.json y radar-contable.json.
"""

import json
import re
import urllib.request
from datetime import datetime, timedelta
from html.parser import HTMLParser

BORA_BASE = "https://www.boletinoficial.gob.ar"

# Palabras clave para filtrar por área
KEYWORDS = {
    "aerocomercial": [
        "ANAC", "aeronáutica", "aeronautica", "aeronave", "aerocomercial",
        "aviación", "aviacion", "piloto", "aeropuerto", "aerolínea", "aerolinea"
    ],
    "tributario": [
        "AFIP", "ARCA", "impuesto", "tributari", "ganancias", "IVA",
        "monotributo", "fiscal", "DGI"
    ],
    "aduanero": [
        "aduana", "aduanero", "DGA", "importación", "importacion",
        "exportación", "exportacion", "comercio exterior"
    ],
    "laboral": [
        "trabajo", "laboral", "convenio colectivo", "sindicato",
        "ART", "riesgo de trabajo"
    ],
    "societario": [
        "sociedad", "societari", "IGJ", "mercantil"
    ],
    "penal_economico": [
        "penal tributario", "penal económico", "penal economico",
        "lavado de activos", "evasión", "evasion"
    ]
}

# Categorías por página
DERECHO_CATS = ["aerocomercial", "laboral", "societario", "penal_economico"]
CONTABLE_CATS = ["tributario", "aduanero"]


class BORAParser(HTMLParser):
    """Parser simple para extraer títulos y resúmenes del HTML del BORA."""
    def __init__(self):
        super().__init__()
        self.items = []
        self.current = {}
        self.capture_title = False
        self.capture_summary = False
        self.in_article = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        cls = attrs_dict.get("class", "")
        if "lista-resultado" in cls or "item-resultado" in cls:
            self.in_article = True
            self.current = {}
        if self.in_article and tag == "a" and "href" in attrs_dict:
            if not self.current.get("url"):
                href = attrs_dict["href"]
                if not href.startswith("http"):
                    href = BORA_BASE + href
                self.current["url"] = href
        if "titulo" in cls or tag == "h3":
            self.capture_title = True
        if "resumen" in cls or "texto" in cls:
            self.capture_summary = True

    def handle_endtag(self, tag):
        if tag in ("h3", "h2"):
            self.capture_title = False
        if tag == "p":
            self.capture_summary = False
        if tag == "article" or tag == "li":
            if self.current.get("title"):
                self.items.append(self.current)
            self.in_article = False
            self.current = {}

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
        if self.capture_title and self.in_article:
            self.current["title"] = self.current.get("title", "") + " " + text
        if self.capture_summary and self.in_article:
            self.current["summary"] = self.current.get("summary", "") + " " + text


def categorize(text):
    """Devuelve categorías que matchean con el texto."""
    text_lower = text.lower()
    matched = []
    for cat, keywords in KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in text_lower:
                matched.append(cat)
                break
    return matched


def fetch_bora():
    """
    Intenta scrapear el BORA. Si no funciona (CORS, cambio de estructura),
    devuelve una lista vacía y logueamos el error.
    """
    url = f"{BORA_BASE}/busquedaAvanzada"
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 PLB-Bot (legal research)"}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode("utf-8", errors="ignore")
        return html
    except Exception as e:
        print(f"Error fetching BORA: {e}")
        return ""


def format_relative_date(date_str):
    """Formatea fecha como 'Hoy', 'Ayer', 'Hace 3 días'."""
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d").date()
    except Exception:
        return date_str
    today = datetime.now().date()
    diff = (today - d).days
    if diff == 0:
        return "Hoy"
    if diff == 1:
        return "Ayer"
    if diff < 7:
        return f"Hace {diff} días"
    if diff < 30:
        return f"Hace {diff // 7} semanas"
    return d.strftime("%d %b %Y")


def build_radar(cats):
    """Construye la lista de items del radar filtrando por categorías."""
    html = fetch_bora()
    items = []

    if html:
        parser = BORAParser()
        try:
            parser.feed(html)
        except Exception as e:
            print(f"Parser error: {e}")
        items = parser.items

    # Filtrar por relevancia
    relevant = []
    for item in items:
        title = (item.get("title") or "").strip()
        summary = (item.get("summary") or "").strip()
        if not title:
            continue
        full_text = title + " " + summary
        item_cats = categorize(full_text)
        if any(c in cats for c in item_cats):
            relevant.append({
                "date": format_relative_date(datetime.now().strftime("%Y-%m-%d")),
                "title": title[:140],
                "desc": summary[:240] if summary else "Nueva normativa publicada en el Boletín Oficial.",
                "source": "Boletín Oficial",
                "url": item.get("url", "https://www.boletinoficial.gob.ar"),
                "categories": item_cats
            })

    # Si el scrapeo no devuelve nada, usar fallback con contenido genérico
    if not relevant:
        relevant = get_fallback(cats)

    return relevant[:6]  # máximo 6 items


def get_fallback(cats):
    """Contenido de respaldo si el scrapeo falla."""
    fallbacks = {
        "aerocomercial": {
            "date": "Reciente",
            "title": "Actualizaciones regulatorias ANAC",
            "desc": "Seguimiento de resoluciones y disposiciones en materia aerocomercial.",
            "source": "ANAC · Boletín Oficial",
            "url": "https://www.argentina.gob.ar/anac",
            "categories": ["aerocomercial"]
        },
        "tributario": {
            "date": "Reciente",
            "title": "Novedades impositivas ARCA/AFIP",
            "desc": "Resoluciones generales y modificaciones al régimen tributario.",
            "source": "ARCA · Boletín Oficial",
            "url": "https://www.afip.gob.ar",
            "categories": ["tributario"]
        },
        "aduanero": {
            "date": "Reciente",
            "title": "Regulaciones aduaneras",
            "desc": "Actualizaciones en materia de comercio exterior e importación.",
            "source": "ARCA · Dirección General de Aduanas",
            "url": "https://www.afip.gob.ar",
            "categories": ["aduanero"]
        },
        "laboral": {
            "date": "Reciente",
            "title": "Modificaciones al régimen laboral",
            "desc": "Últimas novedades en legislación del trabajo y convenios colectivos.",
            "source": "Ministerio de Trabajo",
            "url": "https://www.argentina.gob.ar/trabajo",
            "categories": ["laboral"]
        },
        "societario": {
            "date": "Reciente",
            "title": "Novedades societarias IGJ",
            "desc": "Resoluciones y disposiciones de la Inspección General de Justicia.",
            "source": "IGJ · Boletín Oficial",
            "url": "https://www.argentina.gob.ar/justicia/igj",
            "categories": ["societario"]
        },
        "penal_economico": {
            "date": "Reciente",
            "title": "Régimen penal económico",
            "desc": "Actualizaciones en materia penal tributaria y económica.",
            "source": "Boletín Oficial",
            "url": "https://www.boletinoficial.gob.ar",
            "categories": ["penal_economico"]
        }
    }
    return [fallbacks[c] for c in cats if c in fallbacks]


def main():
    # Construir los dos radares
    derecho = build_radar(DERECHO_CATS)
    contable = build_radar(CONTABLE_CATS)

    # Guardar
    with open("radar.json", "w", encoding="utf-8") as f:
        json.dump({
            "updated": datetime.now().isoformat(),
            "items": derecho
        }, f, ensure_ascii=False, indent=2)

    with open("radar-contable.json", "w", encoding="utf-8") as f:
        json.dump({
            "updated": datetime.now().isoformat(),
            "items": contable
        }, f, ensure_ascii=False, indent=2)

    print(f"radar.json: {len(derecho)} items")
    print(f"radar-contable.json: {len(contable)} items")


if __name__ == "__main__":
    main()

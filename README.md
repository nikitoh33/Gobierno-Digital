# MendoRecupera
### Ventanilla Digital de Asistencia y Recuperación ante Emergencias Climáticas
**Ciudad de Mendoza y Gran Mendoza**

> Sistema Oficial del **Gobierno de la Provincia de Mendoza** y la **Municipalidad de la Ciudad de Mendoza**.

---

## 🏛️ Contexto y Objetivo Institucional
Ventanilla digital única para comerciantes y titulares de locales comerciales afectados por eventos climáticos severos (Viento Zonda, tormentas aluvionales, granizo) que solicitan asistencia y recuperación productiva del Estado provincial y municipal.

### ⚖️ Reglas de Negocio Clave
1. **El sistema NO gestiona dinero ni pagos directos:** Orquesta la interoperabilidad entre organismos (ARCA, ATM Mendoza, Padrón Comercial Municipal), valida la situación del contribuyente y deriva el expediente a los entes competentes.
2. **Evaluación técnica exclusiva:** El nivel oficial de afectación y la aprobación del beneficio son determinados exclusivamente por peritaje ocular de **Defensa Civil** y la **Municipalidad de la Ciudad de Mendoza**.
3. **Condición de elegibilidad:** Los comercios con deuda tributaria exigible (ATM / Tasas Municipales) quedan inhabilitados para iniciar el trámite hasta regularizar su situación.

---

## 🎨 Identidad Visual (Estilo Argentina.gob.ar)
- **Header Oficial:** Con Escudo Nacional Argentino, isotipo de *Argentina.gob.ar*, enlace al inicio, cápsula de usuario con acceso a vista de perfil en pantalla completa y alerta meteorológica en tiempo real (Nivel Naranja por Viento Zonda).
- **Colores Institucionales:**
  - Azul Institucional: `#0B2341`
  - Azul de Acción: `#0072BB`
  - Fondo de página: `#F8F9FA`
  - Verde éxito: `#2E7D32`
  - Rojo deuda/bloqueo: `#C62828`
  - Ámbar alerta: `#EF6C00`
- **Recuadros de Alta Definición:** Bordes reforzados y sombras estructuradas para visualización óptima en cualquier monitor y navegador.
- **Tipografía:** Encode Sans y Roboto oficiales.

---

## 📂 Arquitectura del Proyecto

```
├── public/
│   └── escudo.svg                 # Vector oficial del Escudo Nacional Argentino
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Header oficial, botón al inicio, alerta Zonda y acceso al perfil
│   │   ├── BusinessList.jsx       # Tarjetas de comercios con recuadros marcados y regularización en ATM
│   │   ├── AssociateBusinessModal.jsx # Simulación secuencial de consulta a ARCA, ATM y Municipio
│   │   ├── ClaimWizard.jsx        # Asistente de 3 pasos (Contingencia, Evidencias GPS, Declaración Jurada)
│   │   ├── ClaimSuccess.jsx       # Comprobante oficial, código único de expediente y trazabilidad
│   │   ├── UserProfileView.jsx    # Perfil del ciudadano en pantalla completa con datos tributarios y personales
│   │   └── Footer.jsx             # Footer institucional con leyes (25.326, 27.275) y teléfonos (911, 103)
│   ├── data/
│   │   └── mockData.js            # Comercios iniciales (habilitado vs con deuda) y datos de usuario
│   ├── App.jsx                    # Orquestador del estado y navegación con persistencia en localStorage
│   ├── index.css                  # Directivas Tailwind CSS
│   └── main.jsx                   # Punto de entrada Vite React
├── tailwind.config.js             # Configuración con paleta oficial Argentina.gob.ar
├── vercel.json                    # Configuración lista para despliegue en Vercel
└── package.json
```

---

## 🚀 Ejecución en Desarrollo

1. Iniciar el servidor local:
```bash
npm run dev
```

Abrir la URL que devuelve la terminal (habitualmente `http://localhost:5173`).

---

## 🚢 Despliegue en Vercel

El proyecto incluye el archivo `vercel.json` preconfigurado. Para desplegar:

### Opción A: Desde la CLI de Vercel
```bash
npx vercel
```

### Opción B: Desde GitHub
1. Subir este repositorio a GitHub.
2. Importar el repositorio en [vercel.com](https://vercel.com).
3. Vercel detectará automáticamente el framework Vite y ejecutará `npm run build`.

---

## 🧪 Casos de Uso del Sistema
- **Comercio Habilitado ("Librería y Papelería San Martín S.R.L."):**
  Permite ingresar directamente al Wizard de 3 pasos, cargar evidencia con detección de metadatos GPS dentro del polígono municipal, firmar la declaración jurada y obtener el Código de Expediente `REC-MZA-2026-XXXX`.
- **Comercio Bloqueado por Deuda ("Gastronomía Peatonal S.A."):**
  Muestra el banner de inconsistencia en ATM y Municipalidad e impide tramitar. Permite hacer clic en *"Regularizar en ATM / Rentas"* para cancelar el VEP y observar cómo el sistema pasa a estado **HABILITADO** en tiempo real.
- **Asociar Nuevo Comercio por CUIT:**
  Permite presionar *"+ Asociar Nuevo Comercio"* e ingresar los CUITs de prueba para ver la secuencia animada de interoperabilidad con ARCA, ATM y el Padrón Municipal.
- **Perfil del Ciudadano en Pantalla Completa:**
  Al hacer clic en el usuario o en *"Ver Mi Perfil Completo"*, se abre la pantalla completa con la identidad digital, datos personales de RENAPER, situación fiscal en ARCA/ATM y comercios vinculados.

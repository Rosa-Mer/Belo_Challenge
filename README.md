# Mobile Automation Challenge - Sauce Labs My Demo App

El siguiente proyecto contiene la automatización del flujo principal de compra (End-to-End) de la aplicación **My Demo App** en su versión para Android. El objetivo fue construir un framework escalable y capaz de manejar las particularidades de una aplicación mobile.

---

## Stack Tecnológico

* **Framework:** [WebdriverIO](https://webdriver.io/) (v8+)
* **Lenguaje:** TypeScript
* **Herramienta de Control:** Appium (v2.x)
* **Driver:** UIAutomator2
* **Patrón de Diseño:** Page Object Model (POM)

---

## Cómo ejecutar este proyecto

### Requisitos previos
* Node.js instalado.
* Emulador Android con la App instalada.
* Appium Server corriendo (`appium`).

### Instalación y Ejecución
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Rosa-Mer/Belo_Challenge.git](https://github.com/Rosa-Mer/Belo_Challenge.git)
   cd Belo_Challenge
Instalar dependencias:
Bash
npm install

Ejecutar el Test:
Bash
npx wdio run wdio.conf.ts

✅ Cobertura del Escenario E2E
El script automatiza los siguientes pasos de forma exitosa:
Autenticación: Login con usuario bob@example.com.
Selección: Navegación al producto "Sauce Labs Backpack".
Manipulación de Estado: Ajuste dinámico de cantidad a 3 unidades.
Checkout: Completado de datos de envío y pago.
Finalización: Verificación de la pantalla de orden exitosa.
Logout: Manejo de flujo de confirmación doble y retorno a la pantalla inicial.

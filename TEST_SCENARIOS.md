# Inventario de Escenarios de Prueba - Sauce Labs My Demo App

 
## Feature Autenticación (Auth)
Prioridad: Alta
Descripción: Validar el comportamiento del módulo de gestión de identidad y acceso para los usuarios. 
Screen / Feature: Login Screen

Scenario: Login exitoso con credenciales válidas.
Type: Functional/ Security
Priority: High

    Given un usuario que se encuentra en la pantalla de Login
    When ingresa el nombre de usuario "standard_user"
    And ingresa la contraseña válida "secret_sauce"
    Then la aplicación debe redirigirlo a la pantalla principal del Catálogo.

Scenario: Credenciales inválidas y campos vacíos (Validar mensajes de error)
Type: Functional/ Negative /Security
Priority: High

    Given un usuario en la pantalla de Login
    When intenta iniciar sesión dejando los campos vacíos o con datos erróneos
    Then la App muestra un mensaje de error específico (ej: "Username is required" o "Username and password do not match")

Scenario: Intento de login con usuario bloqueado
Type: Functional/ Security
Priority: High 

    Given un usuario con cuenta inhabilitada
    When ingresa las credenciales del usuario "locked_out_user"
    And presiona el boton Login
    Then la aplicación debe denegar el acceso
    And mostrar un mensaje de error indicando que el usuario se encuentra bloqueado. 

Scenario: Robustez del campo de contraseña (Stress Testing).
Type: Performance / Edge Case
Priority: High  

    Given un usuario que se encuentra en la pantalla de Login
    When ingresa una cadena masiva de caracteres (50, 100, 500, 1000) en el campo  Password
    And intenta ejecutar la acción de Login
    Then la aplicación debe manejar el input sin cerrarse inesperadamente (crash)
    And la interfaz debe mantener su estructura sin romperse visualmente.

Scenario: Logout y validación de limpieza de caché/carrito
Type: Functional/ Security (porque la app permite seguir con el flujo de compra anterior y no esta buena la UI)
Priority: Medium

    Given un usuario que ha iniciado sesión y tiene productos en el carrito
    When selecciona la opción "Logout" del menú lateral
    Then la aplicación debe redirigirlo a la pantalla de Login
    And al intentar ir atrás, la app no debe permitir el reingreso a la sesión cerrada
    And el carrito debería resetearse para la próxima sesión 

## 2. Feature: Catálogo y Navegación
Descripción: Validar la integridad del feed de productos y la fluidez del customer journey, asegurando que la visualización de datos sea consistente y que la navegación entre componentes ante interrupciones o cambios de estado 

Scenario: Carga e integridad visual de la grilla de productos
Type: UI / UX
Priority: High

    Given un usuario que ha iniciado sesión correctamente
    When accede a la pantalla de shopping
    Then cada ítem debe mostrar de forma íntegra: nombre, descripción, precio e imagen
    And el botón "Add to Cart" debe estar visible y habilitado para cada producto.

Scenario: Transición exitosa al detalle del producto y retorno al catálogo.
Type: UI / UX
Priority: High

    Given que el usuario se encuentra en la seccion que lista los productos
    When selecciona un producto específico (ej: "Sauce Labs Backpack")
    Then la app debe navegar a la pantalla de detalle con la información expandida
    And al presionar el botón "Back to products", debe regresar exactamente a la misma posición del catálogo.

Scenario: Persistencia y precisión del ordenamiento por precio.
Type: Functional
Priority: Medium

    Given que la lista de productos se muestra en su orden por defecto (A-Z)
    When el usuario aplica el filtro "Price (low to high)"
    Then la lista debe reordenarse inmediatamente mostrando el producto de menor valor al inicio
    And el icono de filtro debe reflejar el estado actual de la selección.

Scenario : Navegación transversal mediante el menú lateral 
Type: Functional
Priority: Medium

    Given un usuario que hace tap y despliega el menú lateral desde cualquier sección
    When selecciona una opción de navegación (ej: "Webview")
    Then la aplicación debe cargar la sección correspondiente sin errores 
    And el menú debe cerrarse automáticamente para dejar la pantalla libre

Scenario: Validar la selección de variante de producto (Color y Talla)
Type: Functional / UI
Priority: Medium

    Given que el usuario se encuentra en el detalle de un producto que posee variantes (ej: colores)
    When selecciona un color o variante diferente a la predeterminada
    Then el estado visual del selector debe cambiar para reflejar la selección (highlight)
    And la imagen del producto o el SKU interno debe actualizarse para coincidir con la variante elegida.

Scenario : Validar la persistencia del estado de filtros tras cierre del modal
Type: UI / UX
Priority: Medium

    Given un usuario que abre el menú de filtros 
    When selecciona una opción específica y cierra el menú y aplica el cambio
    Then la lista de productos debe actualizarse según el criterio


## 3. Feature: Gestión de Carrito.
Prioridad: Medium
Description: Validar la integridad transaccional y de la UI, asegurando que los cálculos de cantidades y totales sean exactos y que el estado global del carrito persista durante el ciclo de vida de la sesión.


Scenario : Sincronización del badge de productos en tiempo real.
Type: Functional / UI
Priority: High

    Given un usuario que se encuentra en el catálogo de producto
    And selecciona un producto en particular
    When presiona el botón "Add to Cart" 
    Then el icono del carrito debe mostrar un número que incremente en 1 por cada unidad agregada
    And si un producto es removido, el número debe decrementar inmediatamente.


Scenario: Actualización de cantidades mediante controles "+" y "-"
Type: Functional/UX
Priority: High

    Given un usuario que tiene al menos un producto en el carrito de compras
    When utiliza el control "+" para incrementar la cantidad
    Then el número de unidades del producto aumenta de a 1 unidad
    And el subtotal de ese producto y el total general de la orden deben recalcularse automáticamente
    And si se utiliza el control "-" el numero mostrado decrece de a 1 

Scenario: Persistencia de productos en el carrito tras navegación.
Type: Functional / UX
Priority: Medium

    Given un usuario que tiene agregado productos al carrito
    When navega hacia otras secciones (ej. Drawing o Geo Location) y luego regresa al carrito
    Then todos los productos seleccionados previamente deben permanecer en la lista mostrada por la App


Scenario: Visualización de carrito vacío y bloqueo de flujo de pago.
Type: Negative / UI
Priority: Medium

    Given que el carrito de compras no contiene artículos
    When el usuario accede a la pantalla del carrito
    Then debe visualizarse un mensaje o ilustración de "Carrito vacío"
    And el botón de "Checkout" debe estar oculto o deshabilitado

## 4. Feature: Geo Location (Menu Lateral)
Prioridad: Media
Descripción: Validar la capacidad de la App en obtener y actualizar coordenadas real time y su respuesta ante la negacion de permisos.

Scenario: Flujo exitoso con permisos otorgados por el usuario final.
Type: Functional
Priority: High

    Given un usuario que seleccion la opcion de ubicación "Mientras la app está en uso"
    When el usuario presiona el botón "Start Observing"
    Then las etiquetas de "Latitude" y "Longitude" deben dejar de estar en "0" y mostrar valores numéricos
    And los valores deben actualizarse periódicamente si el dispositivo detectara movimiento

Scenario: Denegación de permisos
Type: Negative/UX
Priority: High

    Given que el sistema solicita permisos de GPS.
    When el usuario selecciona "Denegar".
    Then la App no permite la ejecución de "Start Observing".


Scenario: Interrupción por desactivación de GPS en el OS mobile.
Type: Edge Case
Priority: Media

    Given que la App está activamente "observando" la ubicación
    When el usuario desliza la barra de notificaciones de Android y apaga el sensor de "Ubicación" del teléfono
    Then la App debe detectar la pérdida de señal y notificar al usuario
    And debe detener el proceso de observación de forma segura


Scenario: Persistencia y recursos 
Type: Perfomance/UX
Priority: Medium

    Given que la observación de ubicación está activa.
    When el usuario navega a otra sección de la App (ej. Catalog) o minimiza la App.
    Then la App debe detener el servicio de GPS para ahorrar batería 


## Feature Autenticación Biométrica. Finger Print (Menu Lateral)
Prioridad: Alta
Descripción: Verificar la integración de la App con el sensor biométrico del dispositivo para la autenticación de identidad del user final. Esto marca un hito en la seguridad de la app. 

Scenario: Habilitación biometrica tras login exitoso
Type: Functional / UX
Priority: High

    Given un usuario que ha iniciado sesión del tipo "standard_user"
    And se encuentra en la sección "Finger Print" del menú lateral
    When activa el interruptor de "Biometric Authentication"
    Then el sistema debe solicitar una huella válida para confirmar la acción
    And la sesión quedaa vinculada al identificador biométrico registrado.
 
Scenario: Autenticación exitosa mediante huella digital registrada.
Type: Functional / UX
Priority: High

    Given un usuario habilitado seleecion la opción "Fingerprint" en los ajustes de la App
    And el dispositivo tiene al menos una huella válida registrada en el sistema
    When la App solicita la validación biométrica
    And el usuario coloca su huella en el sensor
    Then la App valida la identidad correctamente
    And permite el acceso a la misma

Scenario: Intento de autenticación con huella no reconocida
Type: Negative/Security
Priority: Medium

    Given un usuario intenta autenticarse mediante huella digital
    When coloca una huella distinta a la registrada en el sistema
    Then la App muestra un mensaje de "Fingerprint not recognized" o similar
    And la App debe permanecer bloqueada, permitiendo un nuevo intento o el uso de contraseña/PIN 

Scenario: Bloqueo de seguridad por múltiples intentos biométricos fallidos
Type: Edge Case/Security
Priority: Medium

    Given un usuario que tiene activa la autenticación biometrica por FingerPrint
    When el usuario realiza 5 (o los determinados en la app) intentos fallidos de huella digital
    Then la app muestra un mensaje de error que indica que el sensor ha sido inhabilitado temporalmente
    And la App debe solicitar obligatoriamente el ingreso mediante contraseña manual

## Feature Drawing
Verificar que se pueda dibujar 
Verificar la persistencia del dibujo tras la rotacion de pantalla
Verificar la persistencia del dibujo una vez cerrada la opcion 
## Resert App State
Verificar que la accion funcione correctamente y limpie el storage loca, el carrito y la sesion activa
## QR Scanner
Validar que la app solicita permisos de cámara correctamente.

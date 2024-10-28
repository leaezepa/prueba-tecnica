# Aplicación de Pokemones

Esta aplicación fue desarrollada con **Vue.js 3** y está diseñada para buscar y visualizar listados de pokemones, utilizando diversos recursos para optimizar la experiencia de usuario.

## Tecnologías Utilizadas

- **Vue Router 4**: Para el enrutado de las páginas `/` y `/list`.
- **Pinia**: Gestión del estado de la aplicación, incluyendo los listados de pokemones y los pokemones favoritos.
- **Iconify para Vue**: Biblioteca de iconos utilizada para implementar los elementos visuales detallados en el diseño de Figma.
- **Tailwind CSS**: Estilos y maquetación de la aplicación.
- **PokeAPI v2**: API utilizada para obtener la información de los pokemones.

## Características

- **Búsqueda optimizada**: La PokeAPI no cuenta con un parámetro específico para buscar pokemones, por lo que se implementó un algoritmo que permite realizar búsquedas en grandes volúmenes de datos de manera eficiente, minimizando el uso de recursos del navegador.
- **Componentes reutilizables**: La aplicación está estructurada en componentes reutilizables para facilitar la escalabilidad y la claridad del código.
- **Carga asíncrona de componentes**: Se utilizó `defineAsyncComponent` para mejorar el rendimiento, cargando únicamente los componentes necesarios en cada vista.

## Instrucciones de instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/leaezepa/prueba-tecnica.git
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el entorno de desarrollo:
   ```bash
   npm run dev
   ```


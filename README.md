# vue-weather-testing
Aplicación para consultar el tiempo usando Vue.js y OpenWeatherMap API y mostrar distintos mecanismos de la testeo para Vue.js y OpenWeatherMap API y mostrar distintos mecanismos de la testeo bajo TDD usando Jest y Cypress dentro de Vue Test Utils. 

[![Vue Ready](https://img.shields.io/badge/Vue.js-%20Ready-%2342b983)](https://es.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)](https://www.typescriptlang.org/)
[![JS Style](https://img.shields.io/badge/JS%20Style-AirBnB-ff69b4)](https://airbnb.io/javascript)
[![Licence](https://img.shields.io/github/license/joseluisgs/photo-gallery-ionic)](./LICENSE)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-weather-testing)

![Portada](https://dev-to-uploads.s3.amazonaws.com/i/3p0iqqls0b80s8mrg3cr.png)
- [vue-weather-testing](#vue-weather-testing)
  - [Sobre el proyecto](#sobre-el-proyecto)
  - [Testeando con Vue Test Utils](#testeando-con-vue-test-utils)
    - [ShallowMount vs Mount](#shallowmount-vs-mount)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Run your unit tests](#run-your-unit-tests)
    - [Run your end-to-end tests](#run-your-end-to-end-tests)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
  - [Autor](#autor)
    - [Contacto](#contacto)
  - [Licencia](#licencia)

## Sobre el proyecto
El objetivo de este proyecto es partir de una simple aplicación realizada en Vue.js que consulta el tiempo de una ciudad (buscador) usando OpenWeatherMap API y en base a ella, mostrar distintos formas de realizar los test usando Jest y Cypress dentro de Vue Test Utils.

Este proyecto puede verse como una continuación del contenido mostrado en:
- [Testing JS con JEST](https://github.com/joseluisgs/testing-js-jest)
- [Testing JS con Cypress](https://github.com/joseluisgs/testing-js-cypress)

## Testeando con Vue Test Utils

### ShallowMount vs Mount
- shallowMount: Nos permite cargar un componente de manera individual para testearlo, creando un wrapper pero sin componentes hijos.
- mount: Carga el componente y sus componentes hijos.

shallowMount() es mejor para probar un componente individual de forma aislada, ya que los componentes secundarios (hijos) se eliminan. Es ideal para las pruebas unitarias. Además, el uso de shallowMount() para probar un componente con muchos componentes secundarios (hijos) puede mejorar el tiempo de ejecución de la prueba unitaria, ya que no hay ningún costo (en términos de tiempo) para renderizar o usar los componentes secundarios (hijos).

mount() es útil cuando desea incluir la prueba del comportamiento de los componentes secundarios (hijos) en el test.

El objeto wrapper nos permite probar todos los aspectos del HTML generado por el componente Vue y todas las propiedades (como los datos o métodos) del componente Vue.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Autor

Codificado con :sparkling_heart: por [José Luis González Sánchez](https://twitter.com/joseluisgonsan)

[![Twitter](https://img.shields.io/twitter/follow/joseluisgonsan?style=social)](https://twitter.com/joseluisgonsan)
[![GitHub](https://img.shields.io/github/followers/joseluisgs?style=social)](https://github.com/joseluisgs)

### Contacto
<p>
  Cualquier cosa que necesites házmelo saber por si puedo ayudarte 💬.
</p>
<p>
    <a href="https://twitter.com/joseluisgonsan" target="_blank">
        <img src="https://pitlochryfestivaltheatre.com/wp-content/uploads/2020/04/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://github.com/joseluisgs" target="_blank">
        <img src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/joseluisgonsan" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://joseluisgs.github.io/" target="_blank">
        <img src="https://www.lazaroamor.es/img/develop.png" 
    height="30">
    </a>
</p>

## Licencia

Este proyecto esta licenciado bajo licencia **MIT**, si desea saber más, visite el fichero
[LICENSE](./LICENSE) para su uso docente y educativo.
# vue-weather-testing
Aplicación para consultar el tiempo usando Vue.js y OpenWeatherMap API y mostrar distintos mecanismos de la testeo para Vue.js y OpenWeatherMap API y mostrar distintos mecanismos de la testeo bajo TDD usando Jest y Cypress dentro de Vue Test Utils. 

[![Vue Ready](https://img.shields.io/badge/Vue.js-%20Ready-%2342b983)](https://es.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)](https://www.typescriptlang.org/)
[![JS Style](https://img.shields.io/badge/JS%20Style-AirBnB-ff69b4)](https://airbnb.io/javascript)
[![Licence](https://img.shields.io/github/license/joseluisgs/photo-gallery-ionic)](./LICENSE)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-weather-testing)

![Portada](https://i.imgur.com/gV4LZJZ.jpg)
- [vue-weather-testing](#vue-weather-testing)
  - [Sobre el proyecto](#sobre-el-proyecto)
  - [Testeando con Vue Test Utils](#testeando-con-vue-test-utils)
    - [Jest](#jest)
      - [ShallowMount vs Mount](#shallowmount-vs-mount)
      - [Assercciones y Matchers](#assercciones-y-matchers)
        - [Igualdad](#igualdad)
        - [Numéricos](#numéricos)
        - [Boolean, Nulos y Undefined](#boolean-nulos-y-undefined)
        - [Arrays y contenido](#arrays-y-contenido)
        - [Strings](#strings)
      - [Uso de Mocks](#uso-de-mocks)
      - [Estructura de un Test](#estructura-de-un-test)
      - [Code Coverage](#code-coverage)
    - [Cypress](#cypress)
      - [Asercciones](#asercciones)
      - [Algunos metodos útiles de Cypress](#algunos-metodos-útiles-de-cypress)
      - [Buenas pŕacticas](#buenas-pŕacticas)
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
### Jest
[Jest](https://jestjs.io/docs/es-ES/getting-started) es una de posibilidades que tenemos para testear nuestro código o proyecto en Vue.js. Se define como la suite de "test con 0 configuración", es decir, mientras otras suite de test necesitan de de un motor (test runner) para pasar los test y de la propia suit de test como de una librería de asercciones o matchers, Jest intenta que todo esto esté ya agrupado para agilizar el procesos de test desde el principio. Esto no quiere decir que no se pueda ampliar o profundizar y personalizar con otras librerías o no tenga la potencia de otros y está pensada para test unitarios y de integración.

![jest](https://miro.medium.com/max/1058/1*xHwuLD0XRtfxhjV-qQjWrQ.png)

#### ShallowMount vs Mount
- shallowMount: Nos permite cargar un componente de manera individual para testearlo, creando un wrapper pero sin componentes hijos.
- mount: Carga el componente y sus componentes hijos.

shallowMount() es mejor para probar un componente individual de forma aislada, ya que los componentes secundarios (hijos) se eliminan. Es ideal para las pruebas unitarias. Además, el uso de shallowMount() para probar un componente con muchos componentes secundarios (hijos) puede mejorar el tiempo de ejecución de la prueba unitaria, ya que no hay ningún costo (en términos de tiempo) para renderizar o usar los componentes secundarios (hijos).

mount() es útil cuando desea incluir la prueba del comportamiento de los componentes secundarios (hijos) en el test.

El objeto wrapper nos permite probar todos los aspectos del HTML generado por el componente Vue y todas las propiedades (como los datos o métodos) del componente Vue.

#### Assercciones y Matchers
 Los [Matchers](https://jestjs.io/docs/es-ES/using-matchers) nos permiten comparar de diferente manera valores esperados con los obtenidos. Podemos hacerlo de la siguiente manera, aunque hay [más](https://jestjs.io/docs/es-ES/expect):

##### Igualdad
  - .toBe: Usado para comparar valores primitivos
  - .toEqual: Usado para comparar recursívamente todas las propiedades de un objetos, también conocido como igualdad profunda.

##### Numéricos
  - .toBeLessThan: El valor es menor que.
  - .toBeLessThanOrEqual: El valor es menor o igual que.
  - .toBeGreaterThanOrEqual: El valor es mayor o igual que.
  - .toBeGreaterThan: El valor es mayor que.

##### Boolean, Nulos y Undefined
  - .toBeTruthy: El valor es verdadero.
  - .toBeFalsy: El valor es falso.
  - .toBeUndefined: El valor es ‘undefined’
  - .toBeNull: El valor es ‘null’

##### Arrays y contenido
  - .toContain: Contiene el elemento dentro del array
  - .toHaveLength: El array tiene la longitud

##### Strings
  - .toMatch: Comprueba que un texto coincide con una expresión regular
  - .toHaveLength: Comprueba la longitud.
  - Podemos usar otros anteriores

#### Uso de Mocks
Simulamos las llamadas a la API REST sin salir al exterior. De esta manera: 
- Simulamos peticiones a la API REST satisfactorias
- Simulamos llamadas a la API REST que fallán
Usando los mocks, podemos ver cómo reaccionan nuestros componentes sin necesidad de "gastar" tiempo en llamar constantemente al servicio externo.

#### Estructura de un Test
```js
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'  // Imposra el componente a testear
import axios from 'axios'    // Imposta la librerías a mockear

// Mockeamos las librerías que vamos a usar
jest.mock('axios')

// Describimos la suit de test
describe('Tests para el ... Componente', () => {
  let wrapper = null

  // Antes de cada test
  beforeEach(() => {
    // Creamos los mocks 

    // renderizamos el componente
    wrapper = shallowMount(App)
  })

  // Despues de cada test
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()  // Si estas mockeando una librería
  })

  test('Caso de Test X', () => {
    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('...')

  })

  test('Caso de Test Y', () => {
    ...
  })

  ...
})
```
#### Code Coverage
Si quieres tener un informe de la covertura de tu código (%) añade estas líneas a tu fichero jest.config.js
```js
collectCoverage: true,
collectCoverageFrom: [
  "src/**/*.{js,vue}",
  "!**/node_modules/**"
],
coverageReporters: [
  "html",
  "text-summary"
]
```

### Cypress
[Cypress](https://www.cypress.io/) es una de las muchas posibilidades que tenemos para testear nuestro código o proyecto en Vue.js para realizar pruebas E2E de manera automatizada con mucha potencia y nos permite muchas posibilidades para analizar que nuestro que interaccionamos con nuestro código resolviendo las historias de usuario a realizar.

![Cypress](https://miro.medium.com/max/400/1*AtCVsPmCft1K516gsb9n4Q.png)

#### Asercciones
Puedes consultarlas [aquí](https://docs.cypress.io/guides/references/assertions.html). Pero se basan principalmente en [Chai](https://docs.cypress.io/guides/references/assertions.html#Chai) y [Sinon](https://docs.cypress.io/guides/references/assertions.html#Sinon-Chai).

#### Algunos metodos útiles de Cypress
- visit: redirige a Chrome a la url que se le pasa por parámetro.
- get: obtiene un elemento por el identificador que le pasemos, para realizar acciones sobre él. Como hemos explicado en el apartado anterior, todos los identificadores que pasemos será obtenidos del CSS.
- children: nos permite obtener un elemento que pasamos por parámetro, que desciende del elemento que hemos obtenido con la función get.
- click: realiza un click sobre el elemento que hayamos obtenido con la función get.
- type: escribe sobre el elemento obtenido un texto que pasamos por parámetro. Por ejemplo, usamos esta función para elementos input donde queremos introducir un texto.
submit: permite enviar el contenido del formulario.
- contains: para indicar el contenido del elemento.
- have.attr: para indicar que el elemento tiene un atributo en concreto.
- include: para indicar que el atributo de un elemento incluye un texto.

A todas las funciones se les puede pasar un json con el elemento timeout. Este elemento nos permite incluir un tiempo que nos ayudará a esperar a que el elemento termine de cargar en la página.

#### Buenas pŕacticas
Es importante que tengamos [buenas prácticas](https://docs.cypress.io/guides/references/best-practices.html) para testear sin problemas. Entre ellas el manejo de selectores óptimos para nuestros elementos de la web, como pueden ser selectores de web del tipo con selectores del tipo id como son: data-testid (mi preferido para usarlo también con JEST) o data-cy.


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
        <img src="https://i.imgur.com/U4Uiaef.png" 
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
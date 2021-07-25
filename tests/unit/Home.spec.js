import { nextTick } from 'vue';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

// Importamos el componente
import Home from '@/views/Home.vue';

// Mis datos de Mock
const dataSuccess = {
  status: 200,
  data:
  {
    name: 'Cazorla',
    weather: [
      {
        main: 'Soleado',
        description: 'Soleado y calor',
      },
    ],
    main: {
      temp: 26.3,
      temp_min: 23.8,
      temp_max: 38.6,
    },
  },
};

const dataFailure = {
  status: 404,
};

// Creamos un Mock de Axios con mis valores, hay dos formas,
// directa, ver aquí abajo, o usando el beforeEach con mockImplementationOnce
jest.mock('axios');
// jest.mock('axios', () => ({
//   get: () => Promise.resolve(dataSuccess),
// }));

// Espiamos la consola
global.console.log = jest.fn();

describe('Home.vue Test HTTP GET Satisfactoria', () => {
  // Antes de cada test
  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve(dataSuccess));
  });

  // Después de cada test
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  test('Renderiza subcomponentes, cuando el componente se ha creado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Home);
    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Home');

    // comprobamos si los subcompoentes iniciales se ha cargado como deben
    expect(wrapper.find('.header').exists()).toBeTruthy();
    expect(wrapper.find('.footer').exists()).toBeTruthy();
    expect(wrapper.find('.banner').exists()).toBeTruthy();
    expect(wrapper.find('.weather-search').exists()).toBeTruthy();
    expect(wrapper.find('.weather-results').exists()).toBeFalsy();

    // comprobamos que los valores iniciales son los que deben ser
    expect(wrapper.vm.weatherData.city).toMatch(/^$/);
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/);
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/);
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0);
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0);
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0);
    expect(wrapper.vm.validWeatherData).toBe(false);
  });

  test('Carga los datos ante una petición HTTP GET correcta', async () => {
    // Renderizado el componente
    const wrapper = shallowMount(Home);
    // Metemos el término a buscar
    wrapper.vm.searchCity('Cazorla');

    // Comprobamos si se ha llamado 1 vez
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Cazorla/));

    // Metemos el next tick, porque es asíncrono y debemos esperar que se resuelva
    // Si no usar flush-promises y await flushPromises();
    await flushPromises();
    // await nextTick();
    // Comprobamos que los datos están correctamente cargados
    expect(wrapper.vm.weatherData.city).toMatch('Cazorla');
    expect(wrapper.vm.weatherData.weatherSummary).toMatch('Soleado');
    expect(wrapper.vm.weatherData.weatherDescription).toMatch('Soleado y calor');
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(26.3);
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(23.8);
    expect(wrapper.vm.weatherData.highTemperature).toEqual(38.6);
    expect(wrapper.vm.validWeatherData).toBe(true);
  });

  test('Limpia o elimina el banner cuando clearMessage() es ejecutado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Home);

    // Metemos los datos del usuario
    wrapper.setData(
      {
        messageToDisplay: 'Great search results!',
        messageType: 'Success!!!',
      },
    );

    // Disparamos el método
    wrapper.vm.clearMessage();

    // comprobamos que el banner no está: tipo info, y mensaje vacío
    expect(wrapper.vm.messageToDisplay).toMatch(/^$/);
    expect(wrapper.vm.messageType).toMatch('Info');
  });
});

describe('Comportamiento de componentes ante una petición HTTP GET Satisfactoria', () => {
  // antes de cada test
  beforeEach(() => {
    // Mostramos una respuesta GET Satisfactoria
    axios.get.mockImplementationOnce(() => Promise.resolve(dataSuccess));
  });

  // Despues de cada test
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Iniciliza los dos botones como desabilitados cuando no hay datos cargados', () => {
    // Renderizado el componente con hijos
    const wrapper = mount(Home);

    // Comprobamos que los dos botones están deshabilitados
    const botones = wrapper.findAll('button');
    expect(botones.length).toEqual(2);
    expect(botones[0].text()).toMatch('Search');
    expect(botones[1].text()).toMatch('Clear');
    expect(botones[0].element.disabled).toBeTruthy();
    expect(botones[1].element.disabled).toBeTruthy();

    // Solo debe haber un h2
    const titulos = wrapper.findAll('h2');
    expect(titulos.length).toEqual(1);
    expect(titulos[0].text()).toMatch('Weather Search');

    // Debe haber el banner de mensaje
    const parrafos = wrapper.findAll('p');
    expect(parrafos.length).toEqual(1); // 1st element is the Banner Message
  });

  test('Mustra los datos para una búsqueda satisfactoria', async () => {
    // Renderizado el componente con hijos
    const wrapper = mount(Home);

    // Intrdoducimos los datos
    const inputs = wrapper.findAll('input');
    inputs[0].setValue('Cazorla');

    // Esperamos que se resuleva
    await nextTick();

    // Comprobamos que los dos botones están habilitados
    let botones = wrapper.findAll('button');
    expect(botones.length).toEqual(2);
    expect(botones[0].text()).toMatch('Search');
    expect(botones[1].text()).toMatch('Clear');
    expect(botones[0].element.disabled).toBeFalsy();
    expect(botones[1].element.disabled).toBeFalsy();

    // Disparamos el evento cuando el botón es pulsado
    botones[0].trigger('click');
    // Esperamos que se resuelva la llamada asíncrona
    await flushPromises();
    // await nextTick();

    // Comprobamos que se ha renderizado todo
    const titulos = wrapper.findAll('h2');
    expect(titulos.length).toEqual(3);
    expect(titulos[0].text()).toMatch('Weather Search');
    expect(titulos[1].text()).toMatch('Weather Summary');
    expect(titulos[2].text()).toMatch('Temperatures');

    // comprobamos los campos que se están mostrando
    const parrafos = wrapper.findAll('p');
    expect(parrafos.length).toEqual(7); // 1st element is the Banner Message
    expect(parrafos[1].text()).toMatch('City: Cazorla');
    expect(parrafos[2].text()).toMatch('Summary: Soleado');
    expect(parrafos[3].text()).toMatch('Details: Soleado y calor');
    expect(parrafos[4].text()).toMatch('Current: 26.3° C');
    expect(parrafos[5].text()).toMatch('High (Today): 38.6° C');
    expect(parrafos[6].text()).toMatch('Low (Today): 23.8° C');

    // Los tres botones deben estar visibles
    botones = wrapper.findAll('button');
    expect(botones.length).toEqual(3);
    expect(botones[0].text()).toMatch('Search');
    expect(botones[1].text()).toMatch('Clear');
    expect(botones[2].text()).toMatch('Clear Weather Data');
    expect(botones[0].element.disabled).toBeFalsy();
    expect(botones[1].element.disabled).toBeFalsy();
    expect(botones[2].element.disabled).toBeFalsy();
  });
});

// describe('Home.vue Test HTTP GET No Resuelta', () => {
//   // Antes de cada test
//   beforeEach(() => {
//     // Simulamos una petición que no se ha podido resolver
//     // axios.get.mockImplementationOnce(() => Promise.reject(new Error('BAD REQUEST')));
//     // axios.get.mockRejectedValueOnce(new Error('BAD REQUEST'));
//     // axios.get.mockImplementationOnce(() => Promise.resolve(dataFailure));
//     // axios.mockRejectedValueOnce(new Error(dataFailure));
//   });

//   // Despues de cada test
//   afterEach(() => {
//     jest.resetModules();
//     jest.clearAllMocks();
//   });

//   test('No Carga los datos ante una petición HTTP GET no resuelta', async () => {
//     // Renderizado el componente
//     const wrapper = shallowMount(Home);
//     // comprobamos el nombre del componente
//     expect(wrapper.vm.$options.name).toMatch('Home');

//     // Buscamos el lugar
//     wrapper.vm.searchCity('Cazorla');

//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toBeCalledWith(expect.stringMatching(/Cazorla/));

//     await flushPromises();
//     await nextTick();

//     expect(wrapper.vm.weatherData.city).toMatch(/^$/);
//     expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/);
//     expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/);
//     expect(wrapper.vm.weatherData.currentTemperature).toEqual(0);
//     expect(wrapper.vm.weatherData.lowTemperature).toEqual(0);
//     expect(wrapper.vm.weatherData.highTemperature).toEqual(0);
//     expect(wrapper.vm.validWeatherData).toBe(false);

//     // Comprobamos que el banner es de error
//     expect(wrapper.vm.messageToDisplay).toMatch('¡ERROR! No se ha podido conseguir información meteorológica de Cazorla!');
//     expect(wrapper.vm.messageType).toMatch('Error');

//     expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST');
//   });
// });

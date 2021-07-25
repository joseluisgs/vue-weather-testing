import { nextTick } from 'vue';
import { shallowMount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

// Importamos el componente
import Home from '@/views/Home.vue';

// Creamos un Mock de Axios con mis valores, hay dos formas,
// directa, ver aquí abajo, o usando el beforeEach con mockImplementationOnce

// Espiamos la consola
global.console.log = jest.fn();

jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(Promise.reject(new Error('error'))),
}));

describe('Home.vue Test HTTP GET No Resuelta', () => {
  // Antes de cada test
  // Despues de cada test
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('No Carga los datos ante una petición HTTP GET no resuelta', async () => {
    // Renderizado el componente
    const wrapper = shallowMount(Home);
    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Home');

    // Buscamos el lugar
    wrapper.vm.searchCity('Cazorla');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Cazorla/));
    await flushPromises();
    await nextTick();

    expect(wrapper.vm.weatherData.city).toMatch(/^$/);
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/);
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/);
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0);
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0);
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0);
    expect(wrapper.vm.validWeatherData).toBe(false);

    // Comprobamos que el banner es de error
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Can\'t find info from Cazorla');//
    expect(wrapper.vm.messageType).toMatch('Error');

    // expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST');
  });
});

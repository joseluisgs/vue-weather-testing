import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
// Importamos el
import Weather from '@/components/Weather.vue';

describe('Weather.vue Test', () => {
  const data = {
    city: '',
    weatherSummary: '',
    weatherDescription: '',
    currentTemperature: 0.0,
    lowTemperature: 0.0,
    highTemperature: 0.0,
  };

  test('Inicializa con los elementos correctos', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Weather, {
      propsData: data,
    });

    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Weather');

    // Comprobamos si el texto esta renderizado
    const textos = wrapper.findAll('h2');
    expect(textos.length).toEqual(2);
    expect(textos[0].text()).toMatch('Weather Summary');
    expect(textos[1].text()).toMatch('Temperatures');

    // comprobamos que los datos de la temperatura están renderizados
    const valores = wrapper.findAll('p');
    expect(valores.length).toEqual(6);
    expect(valores[0].text()).toMatch('City:');
    expect(valores[1].text()).toMatch('Summary:');
    expect(valores[2].text()).toMatch('Details:');
    expect(valores[3].text()).toMatch('Current: 0° C');
    expect(valores[4].text()).toMatch('High (Today): 0° C');
    expect(valores[5].text()).toMatch('Low (Today): 0° C');
  });

  test('Muestra los datos de una petición válida', async () => {
    // Renderizado el componente
    const wrapper = shallowMount(Weather, {
      propsData: {
        city: 'Cazorla',
        weatherSummary: 'Soleado',
        weatherDescription: 'Soleado con algunas nubes',
        currentTemperature: 33.6,
        lowTemperature: 18.2,
        highTemperature: 35.7,
      },
    });

    // Esperamos que actlice el DOM
    await nextTick();

    // Comprobamos que os datos son los mostrados
    expect(wrapper.vm.city).toMatch('Cazorla');
    expect(wrapper.vm.weatherSummary).toMatch('Soleado');
    expect(wrapper.vm.weatherDescription).toMatch('Soleado con algunas nubes');
    expect(wrapper.vm.currentTemperature).toEqual(33.6);
    expect(wrapper.vm.lowTemperature).toBeCloseTo(18.2);
    expect(wrapper.vm.highTemperature).toBe(35.7);

    // Comprobamos si el texto esta renderizado
    const textos = wrapper.findAll('h2');
    expect(textos.length).toEqual(2);
    expect(textos[0].text()).toMatch('Weather Summary');
    expect(textos[1].text()).toMatch('Temperatures');

    // comprobamos que los datos de la temperatura están renderizados
    const valores = wrapper.findAll('p');
    expect(valores.length).toEqual(6);
    expect(valores[0].text()).toMatch('City: Cazorla');
    expect(valores[1].text()).toMatch('Summary: Soleado');
    expect(valores[2].text()).toMatch('Details: Soleado con algunas nubes');
    expect(valores[3].text()).toMatch('Current: 33.6° C');
    expect(valores[4].text()).toMatch('High (Today): 35.7° C');
    expect(valores[5].text()).toMatch('Low (Today): 18.2° C');
  });

  test('Emite el evento de limpiar datos cuando el evento es recibido', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Weather, {
      propsData: data,
    });
    // disparamos o simulamos que hemos pulsado el botón
    wrapper.find('button').trigger('click');

    // comprobamos que el evento se ha emitido una sola vez
    expect(wrapper.emitted('clear-weather-data')).toBeTruthy();
    expect(wrapper.emitted('clear-weather-data').length).toBe(1);
  });
});

import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Search from '@/components/Search.vue';

describe('Search.vue Test', () => {
  test('Inicializa con los elementos correctos', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Search);

    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Search');

    // comprobamos el texto H2
    expect(wrapper.find('h2')).toBeDefined();
    expect(wrapper.find('h2').text()).toMatch('Weather Search');

    // comprobamos el label
    expect(wrapper.find('label')).toBeDefined();
    expect(wrapper.find('label').text()).toMatch('City:');

    // comprobamos que hay dos botones y no están habilitados
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].text()).toMatch('Search');
    expect(buttons[1].text()).toMatch('Clear');
    expect(buttons[0].element.disabled).toBeTruthy();
    expect(buttons[1].element.disabled).toBeTruthy();
  });

  test('Emite el evento cuando searchCity() se ha llamado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Search);

    // Introducimos el valor en el formulario
    wrapper.setData({ inputCity: 'Cazorla' });
    // Ejecutamos el método como si pulsásemos el botón
    wrapper.vm.searchCity();

    // Comprobamos que se ha ejecutado una vez
    expect(wrapper.emitted('search-city')).toBeTruthy();
    expect(wrapper.emitted('search-city').length).toBe(1);
    expect(wrapper.emitted('search-city')[0][0]).toMatch('Cazorla');

    // comprobamos que no se ha limpiado los datos una vez ejecutado el evento
    expect(wrapper.vm.inputCity).toMatch('Cazorla');
  });

  test('Inicializa con los dos botones desactivados', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Search);

    // comprobamos que los dos botones están desactivados
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].text()).toMatch('Search');
    expect(buttons[1].text()).toMatch('Clear');
    expect(buttons[0].element.disabled).toBeTruthy();
    expect(buttons[1].element.disabled).toBeTruthy();
  });

  test('Habilita los dos botones cuando introducimos una ciudad', async () => {
    // Renderizado el componente
    const wrapper = shallowMount(Search);

    // Introducimos el valor en el formulario
    wrapper.setData({ inputCity: 'Cazorla' });
    // Esperamos un tick de reloj para que repinten o actualicen los componentes
    await nextTick();

    // comprobamos que los dos botones están habilitados
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].text()).toMatch('Search');
    expect(buttons[1].text()).toMatch('Clear');
    expect(buttons[0].element.disabled).toBeFalsy();
    expect(buttons[1].element.disabled).toBeFalsy();
  });

  test('Limpia el input del formulario cuando clearCity() es ejecutado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Search);

    // Introducimos el valor en el formulario
    wrapper.setData({ inputCity: 'Cazorla' });
    // Ejecutamos el método como si pulsásemos el botón
    wrapper.vm.clearCity();

    // comprobamos que la entrada e vacía o esta en blanco
    expect(wrapper.vm.inputCity).toMatch(/^$/);
    expect(wrapper.vm.inputCity.length).toBe(0);
  });
});

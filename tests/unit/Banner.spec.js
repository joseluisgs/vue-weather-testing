import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Banner from '@/components/Banner.vue';

describe('Banner.vue Test', () => {
  test('Muestra el banner por defecto: Vacío y tipo Info', () => {
    // renderizamos el banner con sus propiedades
    const wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: '',
        bannerType: '',
      },
    });

    // comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Banner');

    // comprobamos si cada una de las propiedades es vacía y tiene el estilo Info: blue
    expect(wrapper.vm.bannerMessage).toMatch('');
    expect(wrapper.vm.bannerType).toMatch('');
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue');
  });

  test('Muestra el banner de Error con mensaje', () => {
    // renderizamos el banner con sus propiedades
    const wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error',
      },
    });

    // Comprobamos que se renderiza con el mensaje y el tipo y color adecuados Error: red
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 123');
    expect(wrapper.vm.bannerType).toMatch('Error');
    expect(wrapper.vm.bannerBackgroundColor).toMatch('red');
  });

  test('Muestra el banner de Éxito con mensaje', () => {
    // renderizamos el banner con sus propiedades
    const wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 456',
        bannerType: 'Success',
      },
    });

    // Comprobamos que se renderiza con el mensaje y el tipo y color adecuados Success: green
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 456');
    expect(wrapper.vm.bannerType).toMatch('Success');
    expect(wrapper.vm.bannerBackgroundColor).toMatch('green');
  });

  test('Muestrael banner de Información con mensaje', () => {
    // renderizamos el banner con sus propiedades
    const wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 789',
        bannerType: 'Info',
      },
    });

    // Comprobamos que se renderiza con el mensaje y el tipo y color adecuados Info: blue
    expect(wrapper.vm.bannerMessage).toMatch('Banner message 789');
    expect(wrapper.vm.bannerType).toMatch('Info');
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue');
  });

  test('Emite el evento clear-banner al ser pulsado span', () => {
    // renderizamos el componente
    const wrapper = shallowMount(Banner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error',
      },
    });

    // Dispara el evento cuando se hace clic en la etiqueta span
    wrapper.find('span').trigger('click');

    // compruebaque se ha emitido el evento clear-banner 1 vez
    expect(wrapper.emitted('clear-banner')).toBeTruthy();
    expect(wrapper.emitted('clear-banner').length).toBe(1);
  });
});

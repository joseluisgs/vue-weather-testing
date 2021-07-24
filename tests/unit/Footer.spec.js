/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Footer from '@/components/Footer.vue';

describe('Footer.vue Test', () => {
  it('Renderiza el mensaje si está creado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Footer, {
      propsData: {
        message: 'joseluisgs 2021',
      },
    });

    // Comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Footer');

    // Comprobamos que se ha renderizado el nombre indicado
    expect(wrapper.text()).toMatch('joseluisgs 2021');
  });
});

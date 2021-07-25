import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Footer from '@/components/Footer.vue';

describe('Footer.vue Test', () => {
  test('Renderiza el mensaje si está creado', () => {
    const expectedValue = 'joseluisgs 2021';
    // Renderizado el componente
    const wrapper = shallowMount(Footer, {
      props: {
        message: expectedValue,
      },
    });

    // Comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Footer');

    // Comprobamos que se ha renderizado el nombre indicado
    expect(wrapper.text()).toMatch(expectedValue);
  });
});

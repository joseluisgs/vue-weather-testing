import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Header from '@/components/Header.vue';

describe('Header.vue Test', () => {
  test('Renderiza el mensaje si está creado', () => {
    const expectedValue = 'Vue Project App';
    // Renderizado el componente
    const wrapper = shallowMount(Header, {
      props: {
        title: expectedValue,
      },
    });

    // Comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Header');

    // Comprobamos que se ha renderizado el nombre indicado
    expect(wrapper.text()).toMatch(expectedValue);
  });
});

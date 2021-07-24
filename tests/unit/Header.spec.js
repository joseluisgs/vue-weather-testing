/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
// Importamos el componente
import Header from '@/components/Header.vue';

describe('Header.vue Test', () => {
  it('Renderiza el mensaje si esta creado', () => {
    // Renderizado el componente
    const wrapper = shallowMount(Header, {
      propsData: {
        title: 'Vue Project',
      },
    });

    // Comprobamos el nombre del componente
    expect(wrapper.vm.$options.name).toMatch('Header');

    // Comprobamos que se ha renderizado el nombre indicado
    expect(wrapper.text()).toMatch('Vue Project');
  });
});

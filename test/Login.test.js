import { mount } from '@vue/test-utils';
import Login from '../src/views/Login.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
vi.mock('vue', async () => {
  const Vue = await vi.importActual('vue');
  return { ...Vue };
});

describe('Login.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Login);
  });

  it('renders the login form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('renders two input fields', () => {
    expect(wrapper.findAll('input').length).toBe(2);
  });

  it('renders a button for submission', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders the UIT logo', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes().src).toContain('uitLogo.svg');
  });
});

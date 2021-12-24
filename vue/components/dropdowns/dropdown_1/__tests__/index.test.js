import { describe, expect, it } from '@jest/globals'
import MOCK_DATA from './mockData'
import TestDropdownWrapper from './TestDropdownWrapper'
import { mount } from '@vue/test-utils'

describe('Dropdown Component', () => {
  it('All actions rendered', () => {
    const wrapper = mount(TestDropdownWrapper, { propsData: { actions: MOCK_DATA.actions }})

    expect(wrapper.findAll('.dropdown .dropdown__menu li').length === 4)
      .toBe(true)
  })

  it('The list is closed', () => {
    const wrapper = mount(TestDropdownWrapper, { propsData: { actions: MOCK_DATA.actions }})

    expect(wrapper.find('.dropdown .dropdown__menu')
      .attributes().style === 'display: none;')
      .toBe(true)
  })

  it('The list opens after clicking on trigger', async() => {
    const wrapper = mount(TestDropdownWrapper, { propsData: { actions: MOCK_DATA.actions }})

    await wrapper.find('.dropdown .dropdown__trigger')
      .trigger('click')

    expect(wrapper.find('.dropdown .dropdown__menu')
      .attributes().style === '')
      .toBe(true)
  })
})

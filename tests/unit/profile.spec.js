import { shallowMount } from '@vue/test-utils'
import ProfileCard from '../../src/components/ProfileCard.vue'

describe('ProfileCard.vue', () => {
  it('renders props when passed', () => {
    const user = {
      displayName: 'dimitris',
      email: 'dimitris@gmail.com',
    }
    const wrapper = shallowMount(ProfileCard, {
      propsData: {
        user: user,
        auth: true,
      },
    })
    expect(wrapper.props('user')).toBe(user)
    expect(wrapper.props('auth')).toBe(true)
  })
})

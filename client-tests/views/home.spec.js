import '../utils'
import home from '../../app/views/home.vue'

describe('home.vue', function () {

  afterEach(function() {
    mock.reset()
  });

  // asserting rendered result by actually rendering the vm
  it('should call the messages api and set the store on load', function (done) {
    mock.onGet(api.messages.url).reply(200, {
      data: "This came from the test"
    });
    spyOn(api.messages, 'find').and.callThrough();
    const vm = load(home, '/')
    expect(vm.$store.message).toBe('Welcome to Front-Vue')
    setTimeout(function() {
      expect(api.messages.find).toHaveBeenCalled();
      expect(vm.$store.message).toBe('This came from the test')
      done()
    })
  })
  
})

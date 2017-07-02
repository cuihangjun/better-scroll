function mockPixes() {
  var domain = 'http://dbtuneconsult.com/scroll6/'
  var ret = []

  var count = 10
  while (count--) {
    for (var i = 1; i <= 10; i++) {
      ret.push({src: domain + i + '.jpg'})
    }
  }
  return ret
}

function initPixDom(pixes) {
  var pixTpl = [
    '<ul>',
    '{{#each this}}',
    '<li class="pix">',
    '<img width="320" height="240" src="{{src}}">',
    '</li>',
    '{{/each}}',
    '</ul>'].join('')

  var pixHtml = window.Handlebars.compile(pixTpl)(pixes)
  var pixWrapper = document.getElementById('pix-wrapper')
  pixWrapper.innerHTML = pixHtml
}

function initScroll() {
  var wrapper = document.getElementById('wrapper')
  var scroll = new window.BScroll(wrapper, {
    autoScroll: {
      initialRate: 0.8,
      increase: 50,
      direction: 'vertical',
      stopEl: {
        top: '#top',
        bottom: '#bottom'
      }
    },
    flickLimitDistance: 400
  })
}

function init() {
  var pixes = mockPixes()

  initPixDom(pixes)

  initScroll()
}

init()
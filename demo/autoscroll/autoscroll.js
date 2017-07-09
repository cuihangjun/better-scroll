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
  return pixWrapper
}

function initScroll(heights, pixes) {
  var wrapper = document.getElementById('wrapper')
  var speed = document.getElementById('speed')
  var scroll = new window.BScroll(wrapper, {
    autoScroll: {
      initialRate: 0.8,
      increase: 50,
      maxSpeed: 600,
      direction: 'vertical',
      stopEl: {
        top: '#top',
        bottom: '#bottom'
      }
    },
    flickLimitDistance: 400,
    probeType: 3
  })

  scroll.on('scroll', function (pos) {
    speed.innerText = 'speed:' + this.speed
    for (var i = 0; i < heights.length; i++) {
      if (pos.y <= heights[i] && pos.y > heights[i + 1]) {
        if (!pixes[i].loaded) {
          this.stop()
          break
        }
      }
    }
  })

  var header = document.getElementById('fixed-header')
  header.addEventListener('click', function () {
    scroll.scrollTo(0, 0, 300)
  })
}

function init() {
  var pixes = mockPixes()

  var pixWrapper = initPixDom(pixes)

  var heights = calculateHeight(pixWrapper)

  preloadImage(pixes)

  initScroll(heights, pixes)
}

function calculateHeight(pixWrapper) {
  var images = pixWrapper.querySelectorAll('.pix')
  var heights = []
  for (var i = 0; i < images.length; i++) {
    heights.push(offset(images[i]).top)
  }
  heights.push(heights[heights.length - 1] - images[heights.length - 1].clientHeight)
  return heights
}

function preloadImage(pixes) {
  for (var i = 0; i < pixes.length; i++) {
    var img = new Image();
    (function (index) {
      img.onload = function () {
        pixes[index].loaded = true
        img.onload = null
      }
      img.src = pixes[i].src
    })(i)
  }
}

function offset(el) {
  var left = 0
  var top = 0

  while (el) {
    left -= el.offsetLeft
    top -= el.offsetTop
    el = el.offsetParent
  }

  return {
    left: left,
    top: top
  }
}

init()
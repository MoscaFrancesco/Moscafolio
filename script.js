

function initMagneticButtons() {
  //select all the elements with class magnetic
  const magnets = document.querySelectorAll(".magnetic");

  //for each add the two event listener to the closest parent with class OuterMagneticRange
  magnets.forEach((magnet) => {
    const OuterMagneticRange = magnet.closest(".OuterMagneticRange");
    OuterMagneticRange.addEventListener("mousemove", moveMagnet);
    OuterMagneticRange.addEventListener("mouseleave", resetMagnet);
  });

  function moveMagnet(event) {
    //now the event.currentTarget is the parent, we need to select the newbutton
    const magnetButton = event.currentTarget.querySelector(".magnetic");

    //we get dimensions ad apply the effect
    const bounding = magnetButton.getBoundingClientRect();
    const magnetsStrength = parseInt(magnetButton.dataset.strength, 10);

    gsap.to(magnetButton, 1, {
      x:
        ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
        magnetsStrength,
      y:
        ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
        magnetsStrength,
      rotate: "0.0001deg",
      ease: "Power4.out"
    });

  }

  function resetMagnet(event) {
    const magnetButton = event.currentTarget.querySelector(".magnetic");
    gsap.to(magnetButton, 1.5, {
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)"
    });
  }
}

  
let cursor
function initCursor(){
    cursor = new MouseFollower({
        speed: 0.3,
        skewing: 15, 
    });

const el = document.querySelector('[data-cursor-img]');

el.addEventListener('mouseenter', () => {
  cursor.setSkewing(1);
});

const e= document.querySelector('[data-cursor-stick]');

e.addEventListener('mouseenter', () => {
    cursor.setSkewing(3);
});

e.addEventListener('mouseleave', () => {
    cursor.removeSkewing();
});


}

function initTextAnim(){
  gsap.set('.about_text_p', {autoAlpha: 0, yPercent: 200});
  ScrollTrigger.batch(".about_text", {
  
    onEnter: batch => {
      batch.forEach((section) => {
        gsap.to(section.querySelectorAll(".about_text_p"), {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
          ease: "power1.inOut", 
          stagger: 0.08,
        });
      });
    },
    start: "top 100%",
  });

}

function InitFoto(){
  gsap.fromTo(document.querySelector(".FullSiteMokup"),{
    yPercent: 30,
    opacity:0
  },{
    yPercent: 0,
    opacity:1,
    delay: 0.6,
    duration:1.4,
    ease: "power1.inOut", 

  } )
}

function InitLenis(){
  const lenis = new Lenis({
    duration:0.8
  })

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

function InitParallax(){
  const image = document.getElementsByClassName('thumbnail');
  new simpleParallax(image, {
    delay: 0,
    orientation: 'down',
    scale: 1.5,
    overflow: true,

});
}

function InitBlob(){
  let canvas, ctx;
  let render, init;
  let blob;
  let BlobColor = "#2f66ed"
  let BlobRadius = 225
  
  class Blob {
    constructor() {
      this.points = [];
    }
    
    init() {
      for(let i = 0; i < this.numPoints; i++) {
        let point = new Point(this.divisional * ( i + 1 ), this);
        // point.acceleration = -1 + Math.random() * 2;
        this.push(point);
      }
    }
    
    render() {
      let canvas = this.canvas;
      let ctx = this.ctx;
      let position = this.position;
      let pointsArray = this.points;
      let radius = this.radius;
      let points = this.numPoints;
      let divisional = this.divisional;
      let center = this.center;
      
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      pointsArray[0].solveWith(pointsArray[points-1], pointsArray[1]);
  
      let p0 = pointsArray[points-1].position;
      let p1 = pointsArray[0].position;
      let _p2 = p1;
  
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.moveTo( (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 );
  
      for(let i = 1; i < points; i++) {
        
        pointsArray[i].solveWith(pointsArray[i-1], pointsArray[i+1] || pointsArray[0]);
  
        let p2 = pointsArray[i].position;
        var xc = (p1.x + p2.x) / 2;
        var yc = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        // ctx.lineTo(p2.x, p2.y);
  
        ctx.fillStyle = BlobColor;
        // ctx.fillRect(p1.x-2.5, p1.y-2.5, 5, 5);
  
        p1 = p2;
      }
  
      var xc = (p1.x + _p2.x) / 2;
      var yc = (p1.y + _p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      // ctx.lineTo(_p2.x, _p2.y);
  
      // ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = BlobColor;
      // ctx.stroke();
      
      requestAnimationFrame(this.render.bind(this));
    }
    
    push(item) {
      if(item instanceof Point) {
        this.points.push(item);
      }
    }
    
    set color(value) {
      this._color = value;
    }
    get color() {
      return this._color || BlobColor;
    }
    
    set canvas(value) {
      if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
        this._canvas = canvas;
        this.ctx = this._canvas.getContext('2d');
      }
    }
    get canvas() {
      return this._canvas;
    }
    
    set numPoints(value) {
      if(value > 2) {
        this._points = value;
      }
    }
    get numPoints() {
      return this._points || 32;
    }
    
    set radius(value) {
      if(value > 0) {
        this._radius = value;
      }
    }
    get radius() {
      return this._radius || 150;
    }
    
    set position(value) {
      if(typeof value == 'object' && value.x && value.y) {
        this._position = value;
      }
    }
    get position() {
      return this._position || { x: 0.5, y: 0.5 };
    }
    
    get divisional() {
      return Math.PI * 2 / this.numPoints;
    }
    
    get center() {
      return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
    }
    
    set running(value) {
      this._running = value === true;
    }
    get running() {
      return this.running !== false;
    }
  }
  
  class Point {
    constructor(azimuth, parent) {
      this.parent = parent;
      this.azimuth = Math.PI - azimuth;
      this._components = { 
        x: Math.cos(this.azimuth),
        y: Math.sin(this.azimuth)
      };
      
      this.acceleration = -0.3 + Math.random() * 0.6;
    }
    
    solveWith(leftPoint, rightPoint) {
      this.acceleration = (-0.3 * this.radialEffect + ( leftPoint.radialEffect - this.radialEffect ) + ( rightPoint.radialEffect - this.radialEffect )) * this.elasticity - this.speed * this.friction;
    }
    
    set acceleration(value) {
      if(typeof value == 'number') {
        this._acceleration = value;
        this.speed += this._acceleration * 2;
      }
    }
    get acceleration() {
      return this._acceleration || 0;
    }
    
    set speed(value) {
      if(typeof value == 'number') {
        this._speed = value;
        this.radialEffect += this._speed * 5;
      }
    }
    get speed() {
      return this._speed || 0;
    }
    
    set radialEffect(value) {
      if(typeof value == 'number') {
        this._radialEffect = value;
      }
    }
    get radialEffect() {
      return this._radialEffect || 0;
    }
    
    get position() {
      return { 
        x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect), 
        y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect) 
      }
    }
    
    get components() {
      return this._components;
    }
  
    set elasticity(value) {
      if(typeof value === 'number') {
        this._elasticity = value;
      }
    }
    get elasticity() {
      return this._elasticity || 0.001;
    }
    set friction(value) {
      if(typeof value === 'number') {
        this._friction = value;
      }
    }
    get friction() {
      return this._friction || 0.0085;
    }
  }
  
  blob = new Blob;
  
  init = function() {
 let canvasContainer = document.querySelector('.canvas-container'); // Seleziona il contenitore
  canvas = document.createElement('canvas');
  canvas.setAttribute('touch-action', 'none');
  canvasContainer.appendChild(canvas); // 
  
    let resize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    blob.radius = BlobRadius

    let oldMousePoint = { x: 0, y: 0};
    let hover = false;
    
    let mouseMove = function(e) {
      
      /* NON SO se va bene */
        hover ? cursor.hide() : cursor.show();
        hover ? canvas.style.cursor = "none" : canvas.style.cursor = "auto"
        let canvasContainer = document.querySelector('.canvas-container');
        let canvasContainerRect = canvasContainer.getBoundingClientRect();
        
        let pos = blob.center;
        let containerCenterX = canvasContainerRect.width / 2;
        let containerCenterY = canvasContainerRect.height / 2;
        
        let mouseX = e.clientX - canvasContainerRect.left; // Calcola la posizione X del mouse nel contenitore
        let mouseY = e.clientY - canvasContainerRect.top;  // Calcola la posizione Y del mouse nel contenitore
        
        //let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };

        let diff = { x: mouseX - containerCenterX, y: mouseY - containerCenterY };
        let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
        let angle = null;


      
      if(dist < blob.radius && hover === false) {
        let vector = { x: mouseX - containerCenterX, y: mouseY - containerCenterY };
        angle = Math.atan2(vector.y, vector.x);
        hover = true;
        blob.color = BlobColor;
      } else if(dist > blob.radius && hover === true){ 
        let vector = { x: mouseX - containerCenterX, y: mouseY - containerCenterY };
        angle = Math.atan2(vector.y, vector.x);
        hover = false;
        blob.color = null;
      }
      
      if(typeof angle == 'number') {
        
        let nearestPoint = null;
        let distanceFromPoint = 100;
        
        blob.points.forEach((point)=> {
          if(Math.abs(angle - point.azimuth) < distanceFromPoint) {
            // console.log(point.azimuth, angle, distanceFromPoint);
            nearestPoint = point;
            distanceFromPoint = Math.abs(angle - point.azimuth);
          }
          
        });
        
        if(nearestPoint) {
          let strength = { x: oldMousePoint.x - mouseX, y: oldMousePoint.y - mouseY };
          strength = Math.sqrt((strength.x * strength.x) + (strength.y * strength.y)) * 10;
          if(strength > 100) strength = 100;
          nearestPoint.acceleration = strength / 100 * (hover ? -1 : 1);
        }
      }
      
      oldMousePoint.x = mouseX;
      oldMousePoint.y = mouseY;
    }
    // window.addEventListener('mousemove', mouseMove);
    window.addEventListener('pointermove', mouseMove);
    
    blob.canvas = canvas;
    blob.init();
    blob.render();
    
  }
  
  init();
}

function InitDivisoreAnim() {
  gsap.set('.divider', { width: '0%' });
  ScrollTrigger.batch(".divider", {

    onEnter: (batch) => {
      batch.forEach((divisore) => {
        gsap.to(divisore, {
          width: '90%',
          duration: 2.5,
          ease:  "expo",
          delay: 0.8
        });
      });
    },
    start: "top 100%",
  });
}

function InitCardAnim(){
  const cardWrappers = document.querySelectorAll('.CardWraper');
  gsap.set(cardWrappers[0], {yPercent: 15});
  gsap.set(cardWrappers[1], {yPercent: 30});
  gsap.set(cardWrappers[2], {yPercent: 45});


gsap.timeline({
  scrollTrigger: {
    trigger: cardWrappers[0], 
    start: 'top 90%', 
    end: 'top 30%', 
    scrub: true, 
  },
})
  .to(cardWrappers,{
    yPercent: 0, 
  });
}

function InitScrollingPhrase(){

  let direction = 1; // 1 = forward, -1 = backward scroll
  
  const roll1 = roll(".rollingText", {duration: 30}),
        roll2 = roll(".rollingText02", {duration: 30}, true),
        scroll = ScrollTrigger.create({
          onUpdate(self) {
            if (self.direction !== direction) {
              direction *= -1;
              gsap.to([roll1, roll2], {timeScale: direction, overwrite: true});
            }
          }
        });
  
  // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
  function roll(targets, vars, reverse) {
    vars = vars || {};
    vars.ease || (vars.ease = "none");
    const tl = gsap.timeline({
            repeat: -1,
            onReverseComplete() { 
              this.totalTime(this.rawTime() + this.duration() * 80); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
            }
          }), 
          elements = gsap.utils.toArray(targets),
          clones = elements.map(el => {
            let clone = el.cloneNode(true);
            el.parentNode.appendChild(clone);
            return clone;
          }),
          positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)}));
    positionClones();
    elements.forEach((el, i) => tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0));
    window.addEventListener("resize", () => {
      let time = tl.totalTime(); // record the current time
      tl.totalTime(0); // rewind and clear out the timeline
      positionClones(); // reposition
      tl.totalTime(time); // jump back to the proper time
    });
    return tl;
  }
}

function InitAnimButtonWorks(){
  const btn = document.querySelector('.SeeMyWorks .OuterMagneticRange');
  gsap.set(btn, {x: -100});

gsap.timeline({
  scrollTrigger: {
    trigger: btn, 
    start: 'top 100%', 
    end: 'top 30%', 
    scrub: true, 

  },
})
  .to(btn,{
    x: 0, 
  });
}

function InitAnimArrow(){
  var i=0
  function InitAnimArrow(elementSelector,i) {
    const element = document.querySelector(elementSelector);
    const arrow = document.querySelectorAll(".arrow")
  
    gsap.set(element, { y:50 });
  
    gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 95%',
        end: 'bottom 50%',
        scrub: true,
        markers:true
      },
    }).to(element, {
      y: 0,
    })
    .to(arrow[i], {
      rotation: -45,
    },"<");
    i=i+1;
  }


  
  const elementsToAnimate = ['.SideDescription', '.SectionsDescription', '.AboutMeDescription'];
  elementsToAnimate.forEach(InitAnimArrow,i);
  
  }

function InitSwithcToDark(){
    const { to, set, from, fromTo } = gsap

const getVar = (key, elem = document.documentElement) => getComputedStyle(elem).getPropertyValue(key)

document.querySelectorAll('.switch').forEach(elem => {
    let svg = elem.querySelector('svg'),
        input = elem.querySelector('input')
        
    input.addEventListener('change', e => {
        let checked = input.checked
        let hide = checked ? 'default' : 'dot',
            show = checked ? 'dot' : 'default'
        fromTo(svg, {
            '--default-s': checked ? 1 : 0,
            '--default-x': checked ? '0px' : '8px',
            '--dot-s': checked ? 0 : 1,
            '--dot-x': checked ? '-8px' : '0px'
        }, {
            ['--' + hide + '-s']: 0,
            ['--' + hide + '-x']: checked ? '8px' : '-8px',
            duration: .25,
            delay: .15
        })
        fromTo(input, {
            '--input-background': getVar(checked ? '--c-default' : '--c-active'),
        }, {
            '--input-background': getVar(checked ? '--c-active' : '--c-default'),
            duration: .35,
            clearProps: true
        })
        to(svg, {
            keyframes: [{
                ['--' + show + '-x']: checked ? '2px' : '-2px',
                ['--' + show + '-s']: 1,
                duration: .25
            }, {
                ['--' + show + '-x']: '0px',
                duration: .2,
                clearProps: true
            }]
        })
    })
})

  }

function InitCheckbox(){

  const checkbox = document.querySelector('.switch');
  var body = document.querySelector("body");


  checkbox.addEventListener('change', function() {
    var primaryColor = getComputedStyle(body).getPropertyValue("--Primary-Color");
    var secondaryColor = getComputedStyle(body).getPropertyValue("--Secondary-Color");
    
    body.style.setProperty("--Primary-Color", secondaryColor);
    body.style.setProperty("--Secondary-Color", primaryColor);

    var urlParams = new URLSearchParams(window.location.search);
  
    // Leggi il valore del parametro "source"
    var source = urlParams.get("source");

    if (source !== "Dark"){
    var currentUrl = window.location.href;
    // Aggiungi ?source=dark all'URL
    var newUrl = currentUrl + "?source=Dark";
    // Reindirizza la pagina all'URL modificato
    window.location.href = newUrl;
    } else{
      var currentUrl = window.location.href;
      // Aggiungi ?source=dark all'URL
      var newUrl = currentUrl.split('?')[0];
      // Reindirizza la pagina all'URL modificato
      window.location.href = newUrl;
    }
  });
}

function Initheader(){

  gsap.to('header', {
    opacity:1,
    duration: 0.5,
  });


  const showAnim = gsap.from('header', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
}

function BarbaInit(){

  function BarbaPageTransition(){
    var tl = gsap.timeline();
    tl.to(".loading-screen" ,{
      duration:1.2,
      width:"100%",
      left:"0%",
      ease:"Expo.easeInOut"
    })
  
    tl.to(".loading-screen" ,{
      duration:1,
      width:"100%",
      left:"100%",
      ease:"Expo.easeInOut",
      delay:0.3
    })
  
    tl.set(".loading-screen", {left:"-100%"})
  
  }

  barba.init({
    sync:true,
    transitions:[
      {
        async leave(data){
          const done =this.async();
          BarbaPageTransition();
          setTimeout(function() {
            ScrollTrigger.refresh()
            done();
          }, 1000);        
        },

        async enter(data){
        },

        async once(data){
        },


        async afterEnter(data){
          initCursor()
          InitLenis()
          InitParallax()
          InitBlob()
          initMagneticButtons()
          Initheader()    
          InitFoto()
          initTextAnim()
        }

      }
    ]

  })


}

document.addEventListener("DOMContentLoaded", function () {

    
    window.scrollTo(0, 0);
    $('.checkbox').prop('checked', false);


    var urlParams = new URLSearchParams(window.location.search);
  
    // Leggi il valore del parametro "source"
    var source = urlParams.get("source");
    var body = document.querySelector("body");
    const checkbox = document.querySelector('.switch');


  
    if (source === "Dark") {
      $('.checkbox').prop('checked', true);
  

      var primaryColor = getComputedStyle(body).getPropertyValue("--Primary-Color");
      var secondaryColor = getComputedStyle(body).getPropertyValue("--Secondary-Color");
      
      body.style.setProperty("--Primary-Color", secondaryColor);
      body.style.setProperty("--Secondary-Color", primaryColor);
    }
      BarbaInit()
      initCursor()
      InitLenis()
      InitParallax()
      InitBlob()
      initMagneticButtons()
      Initheader()  
      InitFoto()
  
      InitCheckbox()

      initTextAnim()
      InitDivisoreAnim()
      InitCardAnim()
      InitScrollingPhrase()
      InitAnimButtonWorks()
      InitAnimArrow()

  });


  


/* -------------------------------- ToDo List ------------------------------- */
//- Riga 352, faccio sparire il curosre quando vado sul blob? lo faccio diventare più grande?
//- Il Button Explore (blob) lo faccio magnetico o fisso?
// lascio il cursore normale?
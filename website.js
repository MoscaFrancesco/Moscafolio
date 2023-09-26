


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
      const ButtonText = magnetButton.querySelector(".textblock");
      try{
      const hovercolor = magnetButton.querySelector(".hovercolor");
      hovercolor.style.height = "100%";
      hovercolor.style.top = "auto";
      }catch{}

  
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

      try{
        const magnetsStrengthText = parseInt(magnetButton.dataset.strengthText, 10);

      gsap.to(ButtonText, 1.5, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrengthText,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrengthText,
        rotate: "0.001deg",
        ease: "power4.out"
      });
        }catch{}




  }

  function resetMagnet(event) {



    const magnetButton = event.currentTarget.querySelector(".magnetic");
    const ButtonText = magnetButton.querySelector(".textblock");
    try{
        const hovercolor = magnetButton.querySelector(".hovercolor");
        hovercolor.style.height = "0%";
        hovercolor.style.top = "0%";
        }catch{}



    gsap.to(magnetButton, 1.5, {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)"
    });

    try{
    gsap.to(ButtonText, 1.5, {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)"
      });
    }catch{}

    }
    
}

let cursor
function initCursor(){
    cursor = new MouseFollower({
        speed: 0.3,
        skewing: 15, 
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
    gsap.to(document.querySelectorAll(".about_text_p"), {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.6,
        ease: "power1.inOut", 
        stagger: 0.1,
    });
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
  });
}

function Initheader(){

  gsap.to('header', {
    opacity:1,
    duration: 0.5,
  });
  
}

function showOnly(className,buddonIndex) {

    if ( document.querySelector(className) != document.querySelector(".content[style*='flex']") ) {
    gsap.to( document.querySelectorAll(".content[style*='flex'] .square"), {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut", 
        stagger: {
            from: "end",
            amount: 0.1
        },
    });


    setTimeout( ()=>{

    var content = document.querySelectorAll(".WebsiteContainer .content");
    var buttons = document.querySelectorAll(".changeButtons .magnetic")

    for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
    buttons[i].style.backgroundColor = "black";


    var squares = content[i].querySelectorAll(".square");
    for (var j = 0; j < squares.length; j++) {
        squares[j].style.opacity = 0;
    }
    
    }
    $(className).css({display:"flex"})
    buttons[buddonIndex].style.backgroundColor = "#2f66ed";

    gsap.to(document.querySelectorAll( className + " .square"), {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut", 
        stagger: {
            from: "start",
            amount: 0.1
        },

    });
}, 400)
}
}

function InitSites(){
    gsap.fromTo(document.querySelector(".WebsiteContainer"),{
      yPercent: 30,
      opacity:0
    },{
      yPercent: 0,
      opacity:1,
      delay: 0.6,
      duration:1.6,
      ease: "power4.inOut", 
  
    } )
  }

document.addEventListener("DOMContentLoaded", function () {
    initTextAnim()
    InitSwithcToDark()
    InitCheckbox()
    initMagneticButtons()
    Initheader() 
    initCursor()
    InitSites()
      
})
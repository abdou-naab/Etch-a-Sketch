let showText = function (target, message, index, interval) {   
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}
let left = document.querySelector('.left')
let right = document.querySelector('.right')
let welcomeString = ['ETCH', 'a', 'SKETCH'] 

function etch(i){
   if (i < welcomeString[0].length){
    let span = document.createElement('span')
    span.textContent = welcomeString[0][i]
    left.appendChild(span)
    setTimeout(()=>{
      etch(i+1);
    },300)
  } 
}
function sketch(i){
  if (i < welcomeString[2].length){
   let span = document.createElement('span')
   span.textContent = welcomeString[2][i]
   right.appendChild(span)
   setTimeout(()=>{
     sketch(i+1);
   },300)
 } 
}
function OnOffColor(divElement) {
  divElement.style.backgroundColor = "black";
  setTimeout(function() {
    divElement.style.backgroundColor = "white";
  }, 2400);
}
function wlcmA(i){
  let indexes = [37,36,35,34,44,54,64,65,66,57,47,68]
  if (i < indexes.length){
  let elm = document.querySelector(`.grid :nth-child(${indexes[i]})`)
  OnOffColor(elm)  
  setTimeout(()=>{
    wlcmA(i+1);
  },200)
}
}

function makeGrid(n){
  
  let colors = ['red','blue','white','black','green']
  
  let myGrid = document.querySelector('.grid');
  for(let i=0; i<=n**2-1; i++){
    let randomNumber = Math.floor(Math.random()*colors.length);
    let div = document.createElement('div')
    div.classList.add("divi")
    div.addEventListener('mouseover', ()=>{
      checkMix() ? div.style.backgroundColor = colors[randomNumber] : div.style.backgroundColor = `${currColor}`;
       /* could used this : ('#'+ Math.floor(Math.random()*16777215).toString(16))
        but i rather not reference the LG tv crap ideology in any way shape or form 
       */
    })
    myGrid.appendChild(div)
  }
  myGrid.style.cssText = 
  `  grid-template-columns: repeat(${n}, auto);
  grid-template-rows: repeat(${n}, auto);
  z-index:3;`
  
}



const slider = document.querySelector('input[name="slider"]');
const sliderValue = document.querySelector('.slider-value');
const myGrid = document.querySelector('.grid');
const divs = myGrid.children
const clear = document.querySelector('.clear-btn')
const fill = document.querySelector('.fill-btn')
const colorP = document.querySelector('input[type="color"]');
let checkbox = document.querySelector('input[type="checkbox"]')
let currColor = colorP.value

function checkMix(){
  let mix = false;
    if (checkbox.checked){
      mix = true ;
    } else {
      mix = false;
    }
  
  console.log(mix)
  return mix
}
window.onload =()=>{
  makeGrid(10)
  etch(0)
  setTimeout(()=>{
    wlcmA(0);
    setTimeout(()=>{sketch(0)},300*8)
  },300*4)
};


slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
    while (myGrid.firstChild) {
      myGrid.removeChild(myGrid.firstChild);
    }
    makeGrid(slider.value) 
});

clear.addEventListener('click', ()=>{
  document.querySelectorAll('.divi').forEach((element) => element.style.backgroundColor = 'white');
})
colorP.addEventListener('input', function(e) {
   currColor = this.value;
})
fill.addEventListener('click', ()=>{
  document.querySelectorAll('.divi').forEach((element) => element.style.backgroundColor = `${currColor}`);
})


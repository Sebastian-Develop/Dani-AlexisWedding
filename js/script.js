// scripts by steve

let scrollpos = window.scrollY
const header = document.querySelector(".header-background")
const headerHeight = header.offsetHeight
let headerStyleClass = "header--scroll"

const onScrollDown = () => header.classList.add(headerStyleClass)
const ronScrollUp = () => header.classList.remove(headerStyleClass)

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= headerHeight)
    { 
        onScrollDown() 
    } else { 
        ronScrollUp()
    }
})
document.getElementById('moutnain').style.width = String(window.innerWidth) + 'px'; 


window.addEventListener('resize', () => {
    document.getElementById('moutnain').style.width = String(windwo.innerWidth) + 'px';

});


window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
 
    if (scrollPos > 1090) { 
    document.querySelector('.arr').classList.add('invisible');
    document.querySelector('.icons').classList.add('invisible');
    } else {
       document.querySelector('.arr').classList.remove('invisible');
       document.querySelector('.icons').classList.remove('invisible');
    }
    
  });

 
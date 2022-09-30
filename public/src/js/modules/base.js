window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.navbar-toggler').addEventListener('click',() =>{
        // if menu is opening, close menu
        if(document.getElementById('navbar').classList.contains('show')) {
            document.querySelector('#navbar').classList.remove('show');
        } else {
          document.querySelector('#navbar').classList.add('show');
        }
    }) 
});

const NAVEGACION = document.querySelector('#NAVEGACION')


const crearNavHome = ()=>{
    NAVEGACION.innerHTML = `
    <section id="NAVEGACION" class="layout__menu">
               <header class="menu__navbar">
                   <div class="navbar__logo">
                       <a class="navbar__link-logo" href="/">
                           <img class="navbar__logo-claro" src="../img/logo1.png" alt="Logo Principial de la barra">
                           <!--Le puse logo calro, porque quiero colocarle modo oscuro-->
                       </a>
                   </div>
                   <!--NAVEGACION que usare con el nav que aprendi en el modulo 3-->
                   <nav class="navbar__nav">
                       <ul class="nav__lista">
                           <li class="nav__item">
                               <a href="/sesion" class="nav__titulo">INICIO</a>
                           </li>
                           <li class="nav__item">
                               <a href="#" class="nav__titulo">SERVICIOS
                                   <i class="fa-solid fa-chevron-down nav__icon"></i>
                               </a>
                               <ul class="nav__submenu">
                                   <li class="submenu__item">
                                       <a href="#servicios" class="submenu__titulo">Control-acceso</a>
                                   </li>
                                   <li class="submenu__item">
                                       <a href="#servicios" class="submenu__titulo">Control-asistencia</a>
                                   </li>
                                   <li class="submenu__item"> 
                                       <a href="#servicios" class="submenu__titulo">Administrativo</a>
                                   </li>
                               </ul>
                           </li>
                           <li class="nav__item"> 
                               <!--Este es un apartado que quiero hacer mas adelante de otras cosas-->
                               <a href="#" class="nav__titulo">BLOG
                                   <i class="fa-solid fa-chevron-down nav__icon"></i>
                               </a>
                               <ul class="nav__submenu">
                                   <li class="submenu__item">
                                       <a href="#" class="submenu__titulo">Control-acceso</a>
                                   </li>
                                   <li class="submenu__item">
                                       <a href="#" class="submenu__titulo">Control-asistencia</a>
                                   </li>
                                   <li class="submenu__item">
                                       <a href="#" class="submenu__titulo">NO SE OTRO XD</a>
                                   </li>
                                   <li class="submenu__item">
                                       <a href="#" class="submenu__titulo">NO SE OTRO XD</a>
                                   </li>
                                   <li class="submenu__item">
                                       <a href="#" class="submenu__titulo">NO SE OTRO XD</a>
                                   </li>
                               </ul>
                           </li>
                           <li class="nav__item">
                               <a href="#equipo" class="nav__titulo">EQUIPO</a>
                           </li>
                           <li class="nav__item">
                               <a href="#contacto" class="nav__titulo">CONTACTO</a>
                           </li>
                       </ul>
                   </nav>
               </header>
           </section>
   
   `
}

const crearNavRegistro = ()=>{
    NAVEGACION.innerHTML = `
    <section id="NAVEGACION" class="layout__menu">
               <header class="menu__navbar">
                   <div class="navbar__logo">
                       <a class="navbar__link-logo" href="/">
                           <img class="navbar__logo-claro" src="../img/logo2.png" alt="Logo Principial de la barra">
                           <!--Le puse logo calro, porque quiero colocarle modo oscuro-->
                       </a>
                   </div>
                   <!--NAVEGACION que usare con el nav que aprendi en el modulo 3-->
                   <nav class="navbar__nav">
                       <ul class="nav__lista">
                           <li class="nav__item">
                               <a href="/sesion" class="nav__titulo">INICIO</a>
                           </li>
                           
                       </ul>
                   </nav>
               </header>
           </section>
   
   `
} 
const crearNavLoginIniciar = ()=>{
    NAVEGACION.innerHTML = `
    <section id="NAVEGACION" class="layout__menu">
               <header class="menu__navbar">
                   <div class="navbar__logo">
                       <a class="navbar__link-logo" href="/">
                           <img class="navbar__logo-claro" src="../img/logo2.png" alt="Logo Principial de la barra">
                           <!--Le puse logo calro, porque quiero colocarle modo oscuro-->
                       </a>
                   </div>
                   <!--NAVEGACION que usare con el nav que aprendi en el modulo 3-->
                   <nav class="navbar__nav">
                       <ul class="nav__lista">
                          
                       </ul>
                   </nav>
               </header>
           </section>
   
   `
}



//crearNavHome();
//agregar validaciones para generar la barra
if(window.location.pathname === '/'){
    crearNavHome();
}else if(window.location.pathname === '/registro/'){
    crearNavRegistro();
}else if(window.location.pathname === '/sesion/'){
    crearNavLoginIniciar();
}



//PARA EL MENU, la parte del despliegue en movil y agg la x
/* 
const navBtn = navegacionn.children[0].children[1]
//console.log(navBtn)

navBtn.addEventListener('click', e=>{
    //console.log('click')
    const menuMobile = navegacionn.children[0].children[3]
    //console.log(menuMobile)
    //hacer una conexion de si el menu esta activo o no

    if(!navBtn.classList.contains('active')){
        //hay que negarlo porque no la tenemos definidas y traera false, entonces negarlo se vuelve true
        //menu cerrado y vamos a mostar el despliegue
        navBtn.classList.add('active')
        navBtn.innerHTML  = `  
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        
        ` //cambiar el boton
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');

    }else{
        navBtn.classList.remove('active')
        navBtn.innerHTML = `
         <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`
        menuMobile.classList.remove('flex')
        menuMobile.classList.add('hidden') //funcion de logo del svg del menu

    }
})

*/

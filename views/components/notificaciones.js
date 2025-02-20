const body = document.querySelector('body')
const div = document.querySelector('#notificacion');
//console.log('ENTRANDO')

export const createNotification = (isError,message)=>{
    //div.classList.add('fixed','top-20','right-0','left-0')
    
    if(isError){
        div.innerHTML = `
        <div class="flex justify-center max-w-7xl mx-auto px-4">
           <p class="bg-red-500 p-4 w-3/12 rounded-lg font-bold ">${message}</p>
       </div>
       `

    }else{
        div.innerHTML = `
         <div class="flex justify-center max-w-7xl mx-auto px-4">
            <p class="bg-green-500 p-4 w-3/12 rounded-lg font-bold ">${message}</p>
        </div>
        `
    }
    
    body.append(div)



}
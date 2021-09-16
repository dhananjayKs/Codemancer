import { update } from './posts.js'
async function getData(search){
    let apiKey='5TrTQNbHQr51qV7tg7AxdYi2SJOWWISx'
    let url=`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=10`
    try{
        let response= await fetch(url)
        if(response.ok){
            let data=await response.json()
            return data
        }
        throw new Error('Couldnt fetch data')
    }
    catch(e){
        console.log(e)
    }
    console.log(url)
}
function delGif(){                                                              //Function to remove selected gif
    this.parentElement.remove()
}
//data[0].
function onClickGif(){
    let container= document.getElementById('selected-gif')

    let gifContainer=document.createElement('div')
    gifContainer.className='gif-container'

    let delBtn=document.createElement('p')                                      //Creating Delete Button
    delBtn.innerHTML='X'
    delBtn.className='del-gif'
    delBtn.addEventListener('click',delGif)

    let gif=document.createElement('img')                                       //Creating a container and adding the gif to selected area
    gif.src=this.src
    gif.alt=this.alt
    gif.dataset.original=this.dataset.original                                  //Passing link to original sized gif using custom attributes
    gif.dataset.height=this.dataset.height                                      //Passing heiht and width of original gif
    gif.dataset.width=this.dataset.width

    gifContainer.appendChild(delBtn)
    gifContainer.appendChild(gif)
    container.appendChild(gifContainer)
}

function onSearch(){

    let search=document.getElementById('search').value
    let container=document.getElementById('gif-Display')                        

    let gifData= getData(search)                                                //Passing search value to fetch
    container.innerHTML=''
    gifData.then(ele=>{
        ele['data'].forEach(element => {                                        //Iterating over returned data array containig the links to the gifs
            
            let gif=document.createElement('img')
            gif.src=element.images.fixed_width.url                              //Using fixed width gif as display options to select
            gif.alt=element.title
            gif.dataset.original=element.images.original.url                    //Passing link to original sized gif using custom attributes
            gif.dataset.height=element.images.original.height                   //Passing heiht and width of original gif
            gif.dataset.width=element.images.original.width
            gif.addEventListener('click',onClickGif)                            //adding event listener to add gif to list of selected
            container.append(gif)
        });
        
    })
}

function addGif(e){
    let container=document.getElementById('gif-search')                         //Function to handle click of Add gif button
    container.classList.remove('display-none')
    
    
    
}

/* 
I have used local storage to store 
the data of the posts instead of sending to server
*/


function main(){
    let data=[]
    //localStorage.clear()
    if(localStorage.posts){
        data=JSON.parse(localStorage.getItem('posts'))                                      
        console.log(data)
    }else{
        localStorage.setItem('posts',JSON.stringify(Array()))
        data=[]
    }
    function post(){
        let obj={}
        let textContainer=document.getElementById('text')
        obj['text']=String(textContainer.value)
        let gifContainers= document.getElementsByClassName('gif-container')
        console.log(gifContainers)
        let gifs=[]                                                                         //creating array to store each gif as an Object
        for(let i=0;i< gifContainers.length; i++){                                          //Getting all the gif containers.
            let gifData={}
            gifData['src']=gifContainers[i].children[1].dataset.original                    //Storing the gif data and original url in a Object  
            gifData['alt']= gifContainers[i].children[1].alt                                
            gifData['width']=gifContainers[i].children[1].dataset.width
            gifData['height']=gifContainers[i].children[1].dataset.height
            gifs.push(gifData)                                                              //pushing gif data into array
        }
        obj['gifs']=gifs                                                                    //storing gifs in object
        obj['time']=String(Date.now())
        data.push(obj)
        localStorage.setItem('posts', JSON.stringify(data))                                 //Using local Storage to simulate fetch post to send data
        console.log(localStorage.getItem('posts'))
        document.getElementById('text').value=''
        document.getElementById('selected-gif').innerHTML=''
        update()                                                                           // calling update to create posts using data
    }
    document.getElementById('post').addEventListener('click', post)
    let gifBtn=document.getElementById('add-gif')
    gifBtn.addEventListener('click',addGif)
    document.getElementById('search-btn').addEventListener('click',onSearch)
    document.addEventListener('mouseup', (e)=>{
        let container=document.getElementById('gif-search')
        if(!container.contains(e.target)){
            container.classList.add('display-none')
        }
    })
    update()
}
main()
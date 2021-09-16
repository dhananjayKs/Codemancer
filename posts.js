export function update(){
    let data=JSON.parse(localStorage.getItem('posts'))                          //Using localStorage to simulate data sent from server
    let container=document.getElementById('entries')
    container.innerHTML=""
    if(data.length==0){                                                         //checks of data on posts is present to display empty
        let noPosts=document.createElement('div')
        noPosts.className='noPosts'
        let text=document.createElement('p')
        text.innerHTML='No Posts Here!!'
        noPosts.append(text)
        container.append(noPosts)
    }
    else{
        data.forEach(element => {                                              //creating dom object for each post data object
        let post=document.createElement('div')
        post.className='post'
        let text=document.createElement('p')
        text.className='text'
        text.innerText=element['text']
        let gifs=document.createElement('div')
        element['gifs'].forEach(gif=>{
            let gifContainer=document.createElement('div')
            gifContainer.className='post-Gifs'
            let img=document.createElement('img')
            img.src=gif.src
            img.alt=gif.alt
            
            gifContainer.append(img)
            
            gifContainer.append()
            gifs.append(gifContainer)
        })
        let time=document.createElement('p')
        time.className='time'
        time.innerHTML=new Date(element['time'] -0).toUTCString()
        post.append(text)
        post.append(gifs)
        post.append(time)
        container.prepend(post)
    });
}
    
}

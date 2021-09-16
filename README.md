# Codemancer
this is a project to demonstrate my skill as a front end developer.

In this app i have implemented the working of the input field on faceBook. 

gifs also can be inserted into the posts.

i have used the Ghipy API to get the gif data.

I jave used the browsers local Storage to simulate the posting and fetching the posts data from the server.

The app creates an Object that contains information that can be sent to the server.

The app creates the data in the following format:
[{
    "text": "text",
    "gifs": [
        {
            "src": "https://media4.giphy.com/media/MdqE46HziuFJTlIwjw/giphy.gif?cid=331ef925svhdc96xhrh901asi09bw97jlcq22ezhc8nr8qez&rid=giphy.gif&ct=g",
            "alt": "Happy Mood GIF by HBO Max",
            "width": "480",
            "height": "480"
        }
    ],
    "time": "1631804043996"
}]

The array holds each post as an object. the object contains the data like the the links to the original gis, its demensions and the description used at the source. it also holds the time of the creation of the post.

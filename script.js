console.log("Welcome to Cover");

//Initialize the variables
let songIndex = 0
let audioElement = new Audio('songs/OneVoice.mp3');
let masterplay = document.getElementById('masterPlay')
let myprogressbar = document.getElementById('myProgressBar')
let gif = document.getElementById('playingGif')
let mastersongname = document.getElementById('masterSongName')
let songitems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "One-Voice", filePath:"songs/1.mp3", coverPath:"Cover/songIconImage.png"},
    {songName: "Gurenge", filePath:"songs/2.mp3", coverPath:"Cover/DemonSlayer.jpg"},
    {songName: "Hikaru Nara", filePath:"songs/3.mp3", coverPath:"Cover/HikaruNara.jpeg"},
    {songName: "Kana Boon", filePath:"songs/4.mp3", coverPath:"Cover/KanaBoon.jpg"},
    {songName: "Baby You", filePath:"songs/5.mp3", coverPath:"Cover/BabyYou.jpg"}
]

songitems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
});
//audioElement.play();

// Song play|pause 
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }
    else{
        audioElement.pause()
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0
    }

})

//Adding eventListners
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myprogressbar.value = progress
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target)
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex+1}.mp3`
        mastersongname.innerText = songs[songIndex].songName 
        audioElement.currentTime = 0
        audioElement.play()
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=4) {
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    mastersongname.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    mastersongname.innerText = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})
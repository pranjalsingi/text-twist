var URL;
var wordsJson;
var words;
var random_word;
var score;
var words_made = [];
var letters_left = [];
var inter = [];

var showWordRandom = document.querySelector('#random');
var showWordCount = document.querySelector('#count');
var showLettersLeft = document.querySelector('#letters-left');
var showStatus = document.querySelector('#status');
var showInter = document.querySelector('#inter');
var showWordsMade = document.querySelector('#words-made');
var game = document.querySelector('#game');
var butt = document.querySelector('#butt');

var getWords = function(URL){  
    
    var xhr = new XMLHttpRequest();
      xhr.onload = function(){
        if (this.status == 200){
          wordsJson = JSON.parse(this.response);
        }
      };
    xhr.open("GET", URL);
    xhr.send();
}

var showStat = function(){
  
}

var wordCount = function(){
  return words.length;
}

var fetch = function(){
  for(var i in wordsJson){
    random_word = i;
    words = wordsJson[i];
  }
  random_word = random_word.split('');
  words = words.split('@@');
  //console.log(random_word);
  //console.log(words);
}

var updateLettersLeft = function(letter){
  console.log(letter);
  var i = false;
  letters_left = letters_left.filter(function(lett){
    if(i === false && letter === lett){
      i = true;
      return false;
    }
    else if(i === true && letter === lett){
      return true;
    }
    else{
      return true;
    }
  })
  console.log(letters_left);
}


var isWord = function(wrd){
  for(var i in words){
    if(words[i] === wrd){
      words = words.filter(function(ev){
        return !(ev === wrd);
      })
      words_made.push(wrd);
      return true;
    }
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function(ev){
    URL = "https://text-twist-pranjalsingi.c9users.io/randomWord.php";
    getWords(URL);
})

document.querySelector('#butt').addEventListener('click', function(ev){
  startGame();
});

var startGame = function(){
  fetch();
  letters_left = random_word;
  score = 0;
  words_made = [];
  inter = [];
  showWordRandom.innerHTML = "The Random Generated scrabble is : " + random_word.join('');
  showLettersLeft.innerHTML = "Letters left in your Pocket : <b>"+letters_left.join('')+"</b>";
  showWordCount.innerHTML = "Remaining words: " + wordCount() + "&emsp;&emsp;&emsp;Score: "+score;
  
  butt.style.display = 'none';
  game.style.display = 'inline';
  
}

document.querySelector('#new-game').addEventListener('click', function(ev){
  butt.style.display = 'inline';
  game.style.display = 'none';
  
  getWords(URL);
  showStatus.innerHTML = "";
  while (showWordsMade.hasChildNodes()) {   
    showWordsMade.removeChild(showWordsMade.firstChild);
  }
  startGame();
})

document.addEventListener('keypress', function(ev) {
    var code = ev.keyCode;
    if((code >= 65 && code <=90) || (code >= 97 && code <=122)){
      updateLettersLeft(String.fromCharCode(code).toUpperCase());
      inter.push(String.fromCharCode(code).toUpperCase());
      showLettersLeft.innerHTML = "Letters left in your Pocket : <b>"+letters_left.join('')+"</b>";
      showInter.innerHTML = "You made : "+inter.join('');
      console.log(inter);
    }
    else if(code == 13){
      var lastWord = inter.join('');
      var status = isWord(lastWord);
      letters_left = random_word;
      if(status){
        score = score + (lastWord.length * 10);
        showWordCount.innerHTML = "Remaining words: " + wordCount() + "&emsp;&emsp;&emsp;Score: "+score;
        showStatus.innerHTML = "You just now got one correct scrabble. <b>"+lastWord+"</b> it was...";
        showLettersLeft.innerHTML = "Letters left in your Pocket : <b>"+letters_left.join('')+"</b>";
        var div = document.createElement("div");
        div.id = "box";
        div.innerHTML = lastWord;
        showWordsMade.appendChild(div);
      }
      else{
        showWordCount.innerHTML = "Remaining words: " + wordCount() + "&emsp;&emsp;&emsp;Score: "+score;
        showStatus.innerHTML = "O Ooooooo .. ! You just missed that word. <b>"+lastWord+"</b> is not a scrabble word";
        showLettersLeft.innerHTML = "Letters left in your Pocket : <b>"+letters_left.join('')+"</b>";
      }
      inter = [];
      showInter.innerHTML = "";
      if(wordCount() === 0){
        alert("You guessed all the scrabbles\n\n Your final score is "+score);
      }
      console.log(words_made);
    }
    else if(code == 8){
      console.log("Hey there");
    }
})


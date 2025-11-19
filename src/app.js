import express from 'express'

const app = express()

const entries = [
   {"answer":"no","image":"https://yesno.wtf/assets/no/4-122be48db47678331dbef3dd6ac6ff56.gif"},
   {"answer":"yes","image":"https://yesno.wtf/assets/yes/12-e4f57c8f172c51fdd983c2837349f853.gif"},
   {"answer":"no","image":"https://yesno.wtf/assets/no/23-5fe6c1ca6c78e7bf9a7cf43e406fb8db.gif"},
   {"answer":"yes","image":"https://yesno.wtf/assets/yes/13-c3082a998e7758be8e582276f35d1336.gif"},
   {"answer":"no","image":"https://yesno.wtf/assets/no/26-34b31d1f0777f70c61488f67a36576a9.gif"},
   {"answer":"yes","image":"https://yesno.wtf/assets/yes/15-3d723ea13af91839a671d4791fc53dcc.gif"},
   {"answer":"yes","image":"https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif"},
   {"answer":"no","image":"https://yesno.wtf/assets/no/17-829284e9dd894ce9fb65fbe86d2e382c.gif"},
]

const randomInt = (count) => Math.floor(Math.random() * count);

// { answer, image }
function getAnswerImage() {
   const randIndex = randomInt(entries.length);
   return entries[randIndex];
}

app.get('/', function (request, response) {
   const { answer, image } = getAnswerImage();

   response.send(`
<html>
   <div class="white-large-text vertically-centered horizontally-centered">${answer.toUpperCase()}</div>
</html>

<style>
   html {
      background-image: url('${image}');
      background-size: cover;
   }
   .white-large-text {
      font-size: 72px;
      color: white;
   }
   .vertically-centered {
      display: flex;
      flex-direction: row;
      height: 100vh;
      align-items: center;
   }
   .horizontally-centered {
      display: flex;
      width: 100vw;
      justify-content: center;
   }
</style>
   `)
})

app.get('/api', function (request, response) {
   response.send(getAnswerImage())
})

app.listen(3000, function () {
  console.log('Server listening on port 3000')
})

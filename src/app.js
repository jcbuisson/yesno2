import express from 'express'
import fs from "node:fs/promises"

const app = express()

const randomInt = (count) => Math.floor(Math.random() * count);

async function getAnswerImage() {
   const answer = randomInt(2) === 0 ? 'yes' : 'no'
   const fileNames = await fs.readdir(`./images/${answer}`)
   const randIndex = randomInt(fileNames.length)
   const image = `images/${answer}/${fileNames[randIndex]}`
   return { answer, image }
}

app.get('/', async function (request, response) {
   const { answer, image } = await getAnswerImage();

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

app.get('/api', async function (request, response) {
   response.send(await getAnswerImage())
})

// won't be used in production - nginx will serve static files
app.use('/images', express.static('./images'))

app.listen(3034, function () {
  console.log('Server listening on port 3034')
})

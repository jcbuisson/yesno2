
module.exports = {
   apps : [

      {
         name: "yesno",
         script: "./src/app.js",
         watch: false,
         node_args: "--experimental-strip-types",
      },

   ]
}

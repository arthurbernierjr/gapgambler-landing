require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const schema = new mongoose.Schema({
	email: { type: String, required: true }
}, {
	timestamps: true
})
const Model = mongoose.model('User', schema)

const MONGODB_URI = process.env.MONGO_URI
const db = mongoose.connection

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.post('/api/addUser', async (req, res) => {
	try{
		const createdUser = await Model.create(req.body)
		res.status(200).json(createdUser)
	}catch(e){
		res.status(400).json({ msg: e.message })
	}
})

app.listen(PORT)





// const http = require('http'); // The node http module allow you to create servers
// const fs = require('fs'); // The node file system module allows you to create files and interact with file system
// const path = require('path'); // path allows you to get the path of a folder etc.
// const PORT = process.env.PORT || 8080;
// const public = __dirname + '/public'
// http.createServer(function (req, res) {
// 	let filePath = public + req.url;
// 	if (filePath == public + '/') {
// 	  filePath = public + '/index.html';
// 	}
//   filePath = filePath.split('?')[0]
// 	let extName = String(path.extname(filePath)).toLowerCase();
// 	const mimeTypes = {
// 	'.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.json': 'application/json',
//         '.png': 'image/png',
//         '.jpg': 'image/jpg',
//         '.gif': 'image/gif',
//         '.svg': 'image/svg+xml',
//         '.wav': 'audio/wav',
//         '.mp4': 'video/mp4',
//         '.woff': 'application/font-woff',
//         '.ttf': 'application/font-ttf',
//         '.eot': 'application/vnd.ms-fontobject',
//         '.otf': 'application/font-otf',
//         '.wasm': 'application/wasm'
// 	};
// 	let contentType = mimeTypes[extName] || 'application/octet-stream';
// 	fs.readFile(filePath, function(error, content) {
// 	if (error) {
// 	  if(error.code == 'ENOENT') {
// 	    fs.readFile(public + '/404.html', function(error, content) {
// 	      res.writeHead(404, {'Content-Type': 'text/html'});
// 	      res.end(content, 'utf-8');
// 	    });
// 	  }
// 	  else {
// 	    res.writeHead(500);
// 	    res.end('Sorry, you got an error bro here it is'+error.code+' ..\n');
// 	  }
// 	}
// 	else {
// 	   res.writeHead(200, { 'Content-Type': contentType });
// 	   res.end(content, 'utf-8');
// 	  }
// 	});
// }).listen(PORT);

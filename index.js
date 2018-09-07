const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
const bodyParser = require('body-parser');

const server = express();
server.use(cors());
const port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:admin1234@ds020208.mlab.com:20208/showcase', { useNewUrlParser: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const ProjectSchema = new Schema ({
  projectName: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  projectInfo: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

const Project = mongoose.model('ProjectSchema', ProjectSchema);


server.get('/', (req, res) => {
  res.send('hello');
});

server.post('/createProject', (req, res) => {
  const { projectName, createdBy, picture, projectInfo, link, github, tags } = req.body;
  console.log(req.body);
  if (!projectName || !createdBy || !picture || !projectInfo || !link || !github || !tags) {
    return res.status(500).send('input required fields');
  }
  const newProject = new Project();
  newProject.projectName = projectName;
  newProject.createdBy = createdBy;
  newProject.picture = picture;
  newProject.projectInfo = projectInfo;
  newProject.link = link;
  newProject.github = github;
  newProject.tags = tags;
  newProject.save();
  console.log('Success');
  res.status(200).json('Success');
});

server.get('/getProject', (req, res) => {
  Project.find({})
    .then((value, err) => {
      if (err) {
        return res.status(500).send('failed');
      }
      res.status(200).json(value);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

server.put('/getOne', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(500).send('failed');
  }
  Project.findById({ _id: id })
    .then((value, err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(value);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
})



server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});

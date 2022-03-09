import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "./db";
import Snippet from "./model/Snippet";

const storyRoutes = express.Router();


// get all 
storyRoutes.get("/stories", (req, res) => {
    console.log(getClient());
    getClient().then(client => {
        console.log(client);
        return client.db().collection('firststory').find().toArray().then(results => {
          res.json(results); // send JSON results
        });
      }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
      });
})

// get by id
storyRoutes.get("/stories/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Snippet>('firststory').findOne({ _id : new ObjectId(id) }).then(snippet => {
        if (snippet) {
          res.json(snippet);
        } else {
          res.status(404).json({message: "Not Found"});
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// add a snippet
storyRoutes.post("/stories", (req, res) => {
    const snippet = req.body as Snippet;
    getClient().then(client => {
      return client.db().collection<Snippet>('firststory').insertOne(snippet).then(result => {
        snippet._id = result.insertedId;
        res.status(201).json(snippet);
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// update by id
storyRoutes.put("/stories/:id", (req, res) => {
    const id = req.params.id;
    const snippet = req.body as Snippet;
    delete snippet._id;
    getClient().then(client => {
      return client.db().collection<Snippet>('firststory').replaceOne({ _id: new ObjectId(id) }, snippet).then(result => {
        if (result.modifiedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          snippet._id = new ObjectId(id);
          res.json(snippet);
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})

// delete by id
storyRoutes.delete("/stories/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Snippet>('firststory').deleteOne({ _id: new ObjectId(id) }).then(result => {
        if (result.deletedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          res.status(204).end();
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
})


export default storyRoutes;
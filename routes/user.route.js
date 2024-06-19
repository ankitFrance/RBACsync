const router = require('express').Router();
const { MongoClient } = require('mongodb');

//*********************************************************************************************************************** */

const renderGoogleProfile = (req, res, next, user) => {

  const GoogleUser = req.user;
  var GoogleUserIDinString = GoogleUser._id.toString();
//**************************************************************** */
  const uri = 'mongodb://127.0.0.1:27017';
  const dbName = 'GestDeUtil';
  const collectionName = 'reportables';
  
  async function getCollection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
 }

  async function main() {
  try {
    const collection = await getCollection();
    const documents = await collection.find({}).toArray();
    //console.log(documents);
    const filteredRecords = documents.filter(item => {
      return item.mongoIdStore.GoogleUserMongoID === GoogleUserIDinString;
    });
    const numberOfDocs = filteredRecords.length;
    console.log(numberOfDocs); 

    const recordsForConstatidSubmitted = [];
    documents.forEach(element => {
      if (element.mongoIdStore.GoogleUserMongoID === GoogleUserIDinString) {
        recordsForConstatidSubmitted.push(element._id);
       } 
        });
        console.log(recordsForConstatidSubmitted)

    res.render('profile', { GoogleUser, numberOfDocs,  recordsForConstatidSubmitted });
    
  } catch (error) {
   
    console.error('Error:', error);
  }
 }

main();
//**************************************************************** */
  
 
 };


 //*********************************************************************************************************************** */

const renderOrcidProfile = (req, res, next, user) => {

  const orcidUser = req.user;
  var OrcidUserIDinString = orcidUser._id.toString();
//**************************************************************** *
const uri = 'mongodb://127.0.0.1:27017';
  const dbName = 'GestDeUtil';
  const collectionName = 'reportables';
  
  async function getCollection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
 }

  async function main() {
  try {
    const collection = await getCollection();
    const documents = await collection.find({}).toArray();
    //console.log(documents);
    const filteredRecords = documents.filter(item => {
      return item.mongoIdStore.OrcidUserMongoID === OrcidUserIDinString;
    });
    const numberOfDocs = filteredRecords.length;
    console.log(numberOfDocs); 

    const recordsForConstatidSubmitted = [];
    documents.forEach(element => {
      if (element.mongoIdStore.OrcidUserMongoID === OrcidUserIDinString) {
        recordsForConstatidSubmitted.push(element._id);
       } 
        });
        console.log(recordsForConstatidSubmitted)

    res.render('profile', {  orcidUser, numberOfDocs, recordsForConstatidSubmitted}   );
    
  } catch (error) {
   
    console.error('Error:', error);
  }
 }

main();
//**************************************************************** *
  
 
 
 
};

//*********************************************************************************************************************** */



const renderNormalprofile = (req, res, next) => {
  const userData = req.session.FetchEmailForLogin;
  console.log(req.sessionID);
  var NormalUserIDinString = userData._id.toString();

  //**************************************************************** */
  const uri = 'mongodb://127.0.0.1:27017';
  const dbName = 'GestDeUtil';
  const collectionName = 'reportables';
  
  async function getCollection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
 }

  async function main() {
  try {
    const collection = await getCollection();
    const documents = await collection.find({}).toArray();
    //console.log(documents);
    const filteredRecords = documents.filter(item => {
      return item.mongoIdStore.NormalUserMongoID === NormalUserIDinString;
    });
    const numberOfDocs = filteredRecords.length;
    console.log(numberOfDocs); 

    const recordsForConstatidSubmitted = [];
    documents.forEach(element => {
      if (element.mongoIdStore.NormalUserMongoID === NormalUserIDinString) {
        recordsForConstatidSubmitted.push(element._id);
       } 
        });
        console.log(recordsForConstatidSubmitted)

        res.render('profile', { userData, numberOfDocs,  recordsForConstatidSubmitted });
    
  } catch (error) {
   
    console.error('Error:', error);
  }
 }

main();

  //**************************************************************** */


 
  
};

//*********************************************************************************************************************** */

const isAuthGoogleOrcid = (req, res, next) => {
  if (req.session.ISGOOGLEUSER) {
    // Google authentication successful
    renderGoogleProfile(req, res, next, req.user);
  } else if (req.session.ISORCIDUSER) {
    // Orcid authentication successful
    renderOrcidProfile(req, res, next, req.user);
  } else {
    req.session.ISGOOGLEUSER = false;
    req.session.ISORCIDUSER = false;
    next();
  }
};


//*********************************************************************************************************************** */

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.isAuthWithAdmin) {
      res.redirect('/admin/AllUsers');
    } else {
      renderNormalprofile(req, res, next);
    }
  } else {
    res.redirect('/auth/Login');
  }
};

//*********************************************************************************************************************** */


router.get('/Profile',  isAuthGoogleOrcid, isAuth );




//************************************************************************************************************************ */


module.exports = router;
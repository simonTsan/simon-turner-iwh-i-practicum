const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = "pat-eu1-943a997f-633d-44eb-b153-7f9b9fb5e5c2";

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get("/", async (req, res) => {
    const artists =
      "https://api.hubapi.com/crm/v3/objects/artists?properties=artist_name,artist_genre,artist_band";
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        "Content-Type": "application/json",
    };
    try {
        const resp = await axios.get(artists, { headers });
        const data = resp.data.results;
        res.render("homepage", {
        title: "Update Custom Object Form | Integrating With HubSpot I Practicum.",
        data,
        });
    } catch (error) {
        console.error(error);
    }

});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get("/update-cobj", async (req, res) => {
  const artists =
    "https://api.hubapi.com/crm/v3/objects/artists?properties=artist_name,artist_genre,artist_band";
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };
  try {
    const resp = await axios.get(artists, { headers });
    const data = resp.data.results;

    res.render("updates", {
      title:
        "Update Custom Object Form | Integrating With HubSpot I Practicum.",
      data,
    });
  } catch (error) {
    console.error(error);
  }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
    app.post("/update-cobj", async (req, res) => {
      const update = {
        properties: {
            "artist_name": req.body.artist_name,
            "artist_genre": req.body.artist_genre,
            "artist_band": req.body.artist_band,
        },
      };

      const updateArtist = `https://api.hubapi.com/crm/v3/objects/artists`;
      const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        "Content-Type": "application/json",
      };

      try {
        await axios.post(updateArtist, update, { headers });
        res.redirect("/");
      } catch (err) {
        console.error(err);
      }
    });

/**
* * This is sample code to give you a reference for how you should structure your calls.

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));

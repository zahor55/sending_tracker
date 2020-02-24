# sending_tracker

back(node js) with api and front(react native and redux) app to send tracking number for your store in hebrew

## front-react native(expo) with redux

app that send track number/item send(24/fast) to client(in hebrew)

##Installing

```
npm install

//to run
expo start
```

###Example

![first](front(react native)/src/1.jpeg)

![second](front(react native)/src/2.jpeg)

![third](front(react native)/src/3.jpeg)

![four](front(react native)/src/4.jpeg)


## Built With

* [React Native](https://reactnative.dev/) - Create native apps for Android and iOS using React
* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.
* [Expo](https://expo.io/) - Expo is an open-source platform for making universal native apps for Android, iOS

#back with api

server that handle request to send tracking details to costumers

##Installing

need to configure consts.js file with store details
```
npm install

//to run
node start
```

##api
```
#send with tracking number
https://trackebay.herokuapp.com/num/${trackNum}/${mail}/${clientName}/{const.id}
#trackNum=the tracking number
#mail=the customer mail
#clientName=the client name
#const.id=id from const file-the same in server and client for authentication

#send without tracking number
https://trackebay.herokuapp.com/noNum/${value}/${mail}/${clientName}/{const.id}
#value={24,express,regular}
#mail=the customer mail
#clientName=the client name
#const.id=id from const file-the same in server and client for authentication
```

## Built With

* [Node.js](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, JavaScript runtime environment
## Authors

* **Zahor Kalores**



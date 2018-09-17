Chatty, your very own tiny chat app.
=====================

A light-weight chat app built with the use of React.

### Install

Clone the boilerplate and create your own git repo.

```
git clone [REPO_GIT_ADDRESS]
cd chatty
npm i

# to start the server
cd chatty_server && npm start

# to start the client
cd ..
npm start

```

Install the dependencies and start the server.

open http://localhost:3000


## Screenshots
!["Empty chat"](https://github.com/maxnechaev/react-simple-boilerplate/blob/master/build/Chatty_Fig_1.png)
!["Different username colors"](https://github.com/maxnechaev/react-simple-boilerplate/blob/master/build/Chatty_Fig_2.png)
!["Anonymous user sends a message"](https://github.com/maxnechaev/react-simple-boilerplate/blob/master/build/Chatty_Fig_3.png)

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

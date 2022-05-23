### MoView Web Application ###
#### :link: visit app: https://moview-516e7.web.app/ ####
- - - -
#### Project developed for the Interaction Programming course (DH2642), held by KTH Royal Institute of Technology in 2020 ####
| ![picture alt](https://i.imgur.com/3PmUUiY.png "Homepage of MoView web app") |
| ------ |

#### Authors: ####
* Hui Zhang, huzh@kth.se
* August Ronne, aronne@kth.se / augustronne@yahoo.se

#### About the Course ####
[Visit course page at KTH.se](https://www.kth.se/student/kurser/kurs/DH2642)<br />
The course aims to teach students to develop interactive web applications, with the main focus being the application frontend and its user interactions.
The coursework consists of four labs and a more extensive project. Students work in pairs when developing the software required for passing the labs and the project.

Some of the course contents listed at its introductory page are:
* JavaScript for interaction programming, callbacks, synchronous and asynchronous code, functional programming.
* Web development interfaces (API): REST, JSON, AJAX, Fetch, Promises.
* Local data: cookies, local storage.
* User interfaces, appearance: HTML, CSS, DOM API, other tree based frameworks for user interfaces (e g Android).
* User interfaces, interaction: events, event levels, event propagation, event management.
* User interfaces, architectures: Model-View-Controller.
* User interfaces, frameworks: React, or Angular, or Vue (student's choice).

The learning outcomes are as follows:
* choose appropriate technical platforms or JavaScript frameworks to create useful data persistent interactive web applications or native applications
* program interactive web applications according to Model-View-Controller or related architectures
* program systems that read data from, and send data to, web interfaces with good use qualities
* assess and improve the usability of existing interactive web applications
* cooperate with others to implement interactive web applications.

#### About the Application ####
The MoView application helps its registered users to find movies and TV series either by searching for them by name or filtering by parameters such as year, genre etc. The user can also add media to their personal watchlist, as well as rate the media they have watched. Unregistered users can still access the app and use it to find movies and TV series, but they cannot access the watchlist or rate functionalities. 

The app gets all its movie and TV series data from The Movie Database (TMDb). You can visit their website on:
https://www.themoviedb.org <br />

#### Application Structure ####
The app is built using React, Redux, and React Redux along with Firebase Firestore, and Firebase Auth. Styling is implemented using Bootstrap and React Bootstrap.
Firebase is used to host the app, as well as authenticating and storing the app users. React -- unlike for example Angular -- is a library and not a framework, and is therefore very unopinionated. Since all coursework uses a simple Model-View-Controller architecture as a compromise in order to facilitate students with a diverse set of backgrounds, a similar architectural solutions was used for this project. 

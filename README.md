# Social-Network

## Description 
The Social-Network API is a RESTful API built with TypeScript, Express, and Mongoose for creating and managing a social network.
This application enables users to:

- Create users and thoughts.
- Add reactions to thoughts.
- Manage friendships between users.

- 
It simplifies social network management by offering a structured and scalable solution for CRUD operations on users, thoughts, and interactions.


## Table of Contents 
- [Description](#description)
- [Installation](#installation)
- [Usage](#installation)
- [License](#license)

 ## Installation
  - First, clone the repository.
  - Then make a new directory and cd into that directory.
  - Install the dependencies
      ```bash
      npm install
  -Create a .env file in the root directory and set the following variable:
    ```bash
      MONGO_URI=<your_mongodb_connection_string>
  -Build the TypeScript files:
    ```bash 
      npm run build
  -Seed the database (optional)
    ```bash
      npm run seed

## Usage
[Here is the link to a video walkthrough](https://drive.google.com/file/d/10xeKY_uE_eIQRKjNhaoyCJsx_8TQHjy3/view?usp=sharing)

- Start the server
  ```bash
    npm run start


## Users
- GET /api/users - Retrieve all users.
- POST /api/users - Create a new user.
- PUT /api/users/:id - Update a user by ID.
- DELETE /api/users/:id - Delete a user by ID.
- POST /api/users/:userId/friends/:friendId - Add a friend to a user.
- DELETE /api/users/:userId/friends/:friendId -Remove a friend from a user.

## Thoughts
- GET /api/thoughts - Retrieve all thoughts.
- POST /api/thoughts - Create a new thought.
- PUT /api/thoughts/:id - Update a thought by ID.
- DELETE /api/thoughts/:id - Delete a thought by ID.
- POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought.
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought.

## License
  - Please refer to this link for my license. [MIT License](https://github.com/yahye-mohamed101/Social-Network?tab=MIT-1-ov-file)

## Credits
- Starter code provided by the University of Minnesota Web Development BootCamp.
- Mongoose was used for database modeling and queries.
- Express was used for building the RESTful API.


## How to Contribute
  - Create a new branch:
    ```bash
    git checkout -b <feature/name>
  - Add your changes when ready:
    ```bash
    git add -A
  - Make your changes and commit them. Be sure to be descriptive in your message:
   ```bash
   git commit -m "Add a descriptive commit message"
  - Push your changes:
    ```bash
    git push origin <feature/name>
  - Go to the repository on GitHub and open a pull request. Make sure to compare your branch name to the main branch.



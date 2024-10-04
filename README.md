# the-secret-books
Backend project for a book store where you can buy or download books.

## Phase 1.

### What actions should be able to do at the end of the phase.

You should be able to save books to the DB. Individualy and grouped, this last one using a csv file.
Also you should have a way of getting a list of books and the information of specific books.

### Data base.

It should be a postgres DB

### Models

#### Book
The book data we need for now is this:
1. Id
2. ISBN
3. Name
4. Author
5. Link

### Important
Everything should be tested.
For the dabatase the project needs to include minimum a way create the tables you use. (It can be a sql script to run directly in the database)

#### Good practices
1. Make small commits that allow to follow the code easily and rollback if needed.
   
   For example.
   
   Add Book model (1 commit)
   
   Adds book creation endpoint (1 commit)

### Nice to have.
The nice to have will be things that are more complex and probably will take you more time but if you are able to make them work they would be a good learning.

#### Docker
Be able to run all the services needed in the project using a docker compose file. This will allow with one command to run the server and the database. Its nice to have because it also allows you to have development environment inside the project through a container making it easier to work everywhere without needing to configure many things.

#### Migrations
Migrations are a way to have a consistent state of the database. They allow to run a script that runs all the migrations setting the database to the needed state. This is something that all companies use.





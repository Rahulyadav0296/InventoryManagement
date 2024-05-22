
Inventory
Is an open source Inventory API

Language : Golang, ReactJs
Database : MySQL 8
Architecture : Simple MVC
Router : httprouter
SQL : database/sql

Disclaimer
The Backend only provides Inventory API, For front end ui i used 
ReactJs Framework with Context API and React Router DOM.

Get Started

Backend Code

git clone git@github.com:jacky-htg/inventory.git
cp .env.example .env
edit .env with your environment
create database (the database name must be match with your environment)
go mod init github.com/jacky-htg/inventory
go run cmd/main.go migrate
go run cmd/main.go seed
go run cmd/main.go scan-access
go test -v (To test all of API. For run this command, you need docker installed in your laptop)
go run main.go

API Testing
Open your postman application
Import file inventory.postman_collection.json
Import file inventory.postman_environment.json
Call GET /login request in auth directory. username: jackyhtg password:12345678
Edit current value of token on inventory environment with token in result of login
Test all request

Directory structure is :

> cmd
> controllers
> libraries
> middleware
> models
> payloads
    > request
    > response
> routing
> schema 

Front End Code 
git clone https://github.com/Rahulyadav0296/InventoryManagement.git
npm install 
npm run dev

Directory structure is :

> public
> src
    > assets
    > components
          > Brands
          > Customers 
          > Products
          > ProductCategory
          > Users
          Navbar.jsx
> pages
> utils
> App.js
> index.css
> Main.jsx

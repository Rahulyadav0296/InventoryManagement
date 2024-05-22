# Inventory

**Inventory** is an open-source Inventory API.

- **Language**: Golang, ReactJs
- **Database**: MySQL 8
- **Architecture**: Simple MVC
- **Router**: httprouter
- **SQL**: database/sql

## Disclaimer

The backend only provides the Inventory API. For the frontend UI, ReactJs framework with Context API and React Router DOM is utilized.

## Get Started

### Backend Setup

1. Clone the repository:
    ```sh
    git clone git@github.com:jacky-htg/inventory.git
    ```

2. Copy the example environment file and edit it with your environment details:
    ```sh
    cp .env.example .env
    # Edit the .env file to match your environment
    ```

3. Create the database (ensure the database name matches the one in your environment configuration).

4. Initialize the Go module:
    ```sh
    go mod init github.com/jacky-htg/inventory
    ```

5. Run the database migrations:
    ```sh
    go run cmd/main.go migrate
    ```

6. Seed the database:
    ```sh
    go run cmd/main.go seed
    ```

7. Scan access permissions:
    ```sh
    go run cmd/main.go scan-access
    ```

8. To test all APIs, ensure Docker is installed and run:
    ```sh
    go test -v
    ```

9. Start the application:
    ```sh
    go run main.go
    ```

### API Testing

1. Open your Postman application.
2. Import the Postman collection:
    - `inventory.postman_collection.json`
3. Import the Postman environment:
    - `inventory.postman_environment.json`
4. Call the `GET /login` request in the auth directory with the following credentials:
    - **Username**: jackyhtg
    - **Password**: 12345678
5. Edit the current value of the token in the inventory environment with the token obtained from the login result.
6. Test all requests.

### Directory Structure

- `cmd`
- `controllers`
- `libraries`
- `middleware`
- `models`
- `payloads`
    - `request`
    - `response`
- `routing`
- `schema`

### Frontend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Rahulyadav0296/InventoryManagement.git
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```

### Directory Structure

- `public`
- `src`
    - `assets`
    - `components`
        - `Brands`
        - `Customers`
        - `Products`
        - `ProductCategory`
        - `Users`
        - `Navbar.jsx`
    - `pages`
    - `utils`
    - `App.js`
    - `index.css`
    - `Main.jsx`

## Deployment

The frontend design can be accessed via the following link:
https://shiny-otter-22342d.netlify.app/

## Contact

For any inquiries, please contact [Rahul Yadav](mailto:rahulyadav0296@example.com).

# Simple Message System (SMS)

SMS is a full-stack application that facilitates group chat functionality,
allowing users to send and receive messages using their private accounts.
The backend is built with Java and Spring Boot,
while the frontend utilizes HTML, CSS, and JavaScript.

[src/main/java/edu/ryder_cichy/sms/](./src/main/java/edu/ryder_cichy/sms/)
[src/main/resources/application.properties](./src/main/resources/application.properties)

<p>
  <img src="https://github.com/user-attachments/assets/884ae105-d83b-4960-b799-1e4cdd32a38f" width="500"/>
  <img src="https://github.com/user-attachments/assets/6df2caae-9a00-4e79-b37c-90c871c6a060" width="500"/>
</p>

---
## Features
- **User Authentication**: Secure login and registration for users.
- **Real-time Messaging**: Send and receive messages in real-time.
- **Database stored History**: View past messages in the chat.
- **Responsive Design**: Optimized for desktop devices.

---
## Project Structure
- ### **Backend**:
    - [src/main/java/edu/ryder_cichy/sms/](./src/main/java/edu/ryder_cichy/sms/): Contains Java source files.
    - [src/main/resources/application.properties](./src/main/resources/application.properties): Contains application configuration files.

    Backend consists of two set of layers for:
    - AuthUser: Contains the user authentication logic.
    - Chat: Contains the chat messaging logic.
  
- ### **Api endpoints**:

    Authentication Endpoints
  - **POST** `/auth/register`: Registers a new user.
  - **POST** `/auth/login`: Authenticates a user and returns a JWT token.

  Chat Endpoints
    - **POST** `/app/messages`: Sends a new chat message.
    - **GET** `/chat_history`: Retrieves the chat history.

  WebSocket Endpoints
    - **/sms_ws**: Establishes a WebSocket connection using SockJS.
    - **/sms/chat**: Subscribes to the chat message broker for real-time messaging.



- ### **Frontend**:
    - [src/main/resources/static](./src/main/resources/static): Contains static resources like CSS, JS, and images.
    - [src/main/resources/templates](./src/main/resources/templates): Contains HTML templates.

---
## Problems encountered and gained experience

- **WebSockets**: Learned how to implement WebSockets for real-time messaging.
- **Spring Security**: Implemented user authentication and authorization using Spring Security.
- **Security Maintenance**: Learned how to secure the application from common security vulnerabilities.
Implemented hashing and special access classes.
- **Exception Handling**: Implemented exception handling for better error handling.
- **MongoDB**: Learned how to use MongoDB as a NoSQL database for storing user and chat data.
- **Thymeleaf**: Used Thymeleaf for server-side rendering of HTML templates.
- **Responsive project design**: Learned how to create a responsive design for the project.

---

## Technologies Used
- **Backend**:
    - Java 21
    - Spring Boot 3.3.5
    - MongoDB 8.0.3
- **Frontend**:
    - HTML
    - CSS
    - JavaScript
- **Build Tool**:
    - Gradle

## Setup and Installation
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/simple-message-system.git
   cd simple-message-system

2. Build the project:  
    ```sh
    ./gradlew build

3. Run the application:  
    ```sh
    ./gradlew bootRun

4. Access the application: Open your browser and navigate to http://localhost:8080.  

---
### Contributors

- Jan Cichy
- Maksymilian Ryder

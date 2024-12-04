# GreenShadow 🌿  

GreenShadow is a frontend for managing crops, fields, equipment, vehicles, staff, and logs. Designed as a web-based interface, it interacts with a robust backend API, providing seamless CRUD operations with JWT authentication.  

## Features  
- **User Authentication**: Secure login and signup using JWT tokens.  
- **Role Management**: Assign roles like ADMIN, MANAGER, SCIENTIST, and OTHER.  
- **Dynamic Tables**: View, sort, and filter data using DataTables.  
- **Modular Architecture**: Separate JavaScript files for different functionalities.  
- **AJAX Integration**: Asynchronous API requests for CRUD operations.  

## Technologies Used  
- **Frontend**:  
  - HTML5, CSS3, Bootstrap 5  
  - JavaScript (ES6)  
  - jQuery & AJAX  
  - DataTables  

- **Backend**:  
  A backend API to handle authentication, CRUD operations, and data management (not included in this repository).  

## Setup and Installation  

### Prerequisites  
1. A running instance of the backend API.  
2. A modern browser.  
3. A code editor (e.g., VS Code).  

### Steps to Run the Project  
1. Clone this repository:  
   ```bash  
   git clone https://github.com/ShenanVindinu/Green-Shadow-Front-End.git  
   ```  

2. Install required dependencies:  
   - Include the `node_modules` folder for Bootstrap, jQuery, and DataTables if missing.  

3. Update configurations:  
   - Set the API endpoint URLs in the JavaScript files (e.g., `AuthController.js` and other Controllers if needed, `default backend serverport is localhost 5050`).  

4. Open the `index.html` file in a browser to access the app.  

## File Structure  
```plaintext  
greenShadow/  
├── assets/  
│   ├── css/           # Custom styles  
│   ├── js/            # JavaScript files (e.g., login.js, signup.js, CRUD.js)  
│   └── images/        # Static images  
├── index.html         # Main entry point (Login page)  
├── pages/  
│   └── dashboard.html # Dashboard for CRUD operations  
├── README.md          # Project documentation  
└── package.json       # If using npm for dependencies (optional)  
```  

## Contributing  
Contributions are welcome! Fork the repository, make changes, and submit a pull request.  

## License  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---

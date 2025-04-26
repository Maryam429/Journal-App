/*const API_URL = "http://localhost:6000/api/users"; // Update this based on your backend

// Function to register a new user
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

// Function to fetch all users
export const getUsers = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Function to fetch a user by email (For Login)
export const getUserByEmail = async (email) => {
    try {
        const response = await fetch(`${API_URL}/${email}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

// Function to authenticate user (Login)
export const loginUser = async (email, password) => {
    try {
        const response = await fetch("http://localhost:6000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Network error, please try again later." };
    }
};*/

import mysql.connector

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="your_username",
        password="your_password"
    )
    print("Successfully connected to MySQL server")
except mysql.connector.Error as err:
    print(f"Error: {err}")

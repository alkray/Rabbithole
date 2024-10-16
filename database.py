import mysql.connector

try:
    connection = mysql.connector.connect(
        host="your-rds-endpoint.rds.amazonaws.com",
        user="your_username",
        password="your_password",
        database="your_database_name",
        port=3306
    )
    
    if connection.is_connected():
        print("Successfully connected to the RDS MySQL database")
        
        # Create a cursor object to execute SQL queries
        cursor = connection.cursor()
        
        # Example: Execute a simple query
        cursor.execute("SELECT VERSION()")
        db_version = cursor.fetchone()
        print(f"Database version: {db_version[0]}")

except mysql.connector.Error as e:
    print(f"Error connecting to MySQL database: {e}")

#user
cursor.execute("""
    CREATE TABLE IF NOT EXISTS user (
        user_id INT(255) NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        phone_number INT(255),
        PRIMARY KEY (user_id)
    )
""")

#login
cursor.execute("""
    CREATE TABLE IF NOT EXISTS login (
        login_id INT(255) NOT NULL AUTO_INCREMENT,
        user_id INT(255) NOT NULL,
        username VARCHAR(255),
        password VARCHAR(255),
        PRIMARY KEY (login_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    )
""")

#user preferences
cursor.execute("""
    CREATE TABLE IF NOT EXISTS userPreferences (
        preference_id INT(255) NOT NULL AUTO_INCREMENT,
        user_id INT(255) NOT NULL,
        notifications BOOL,
        summaries BOOL,
        bias_analysis BOOL,
        time_goal INT(255),
        PRIMARY KEY (preference_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    )
""")

#sources
cursor.execute("""
    CREATE TABLE IF NOT EXISTS sources (
        source_id INT(255) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        blocked BOOL,
        type VARCHAR(255),
        PRIMARY KEY (source_id)
    )
""")

#articles
cursor.execute("""
    CREATE TABLE IF NOT EXISTS articles (
        article_id INT(255) NOT NULL AUTO_INCREMENT,
        source_id INT(255) NOT NULL,
        name VARCHAR(255),
        author VARCHAR(255),
        bias VARCHAR(255),
        publish_date DATE,
        summary MEDIUMTEXT,
        PRIMARY KEY (article_id),
        FOREIGN KEY (source_id) REFERENCES sources(source_id)
    )
""")

#news feed
cursor.execute("""
    CREATE TABLE IF NOT EXISTS newsFeed (
        feed_id INT(255) NOT NULL AUTO_INCREMENT,
        source_id INT(255) NOT NULL,
        article_id INT(255) NOT NULL,
        user_id INT(255) NOT NULL,
        preference_id INT(255) NOT NULL,
        PRIMARY KEY (feed_id),
        FOREIGN KEY (source_id) REFERENCES sources(source_id)
        FOREIGN KEY (article_id) REFERENCES articles(article_id)
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        FOREIGN KEY (preference_id) REFERENCES userPreferences(preference_id)
    )
""")

#bookmarks
cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookmarks (
        bookmark_id INT(255) NOT NULL AUTO_INCREMENT,
        article_id INT(255) NOT NULL,
        user_id INT(255) NOT NULL,
        PRIMARY KEY (bookmark_id),
        FOREIGN KEY (article_id) REFERENCES articles(article_id)
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
""")

print("Tables created successfully")
finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection closed")

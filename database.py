import mysql.connector

connection = mysql.connector.connect(
    host="rabbithole-test-1.cx48um2o6kvm.us-east-2.rds.amazonaws.com",
    user="admin",
    password="Rabbithole1",
    database="rabbithole-test-1",
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

    # user table
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

    # login table
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

    # user preferences table
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

    # sources table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sources (
            source_id INT(255) NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            blocked BOOL,
            type VARCHAR(255),
            PRIMARY KEY (source_id)
        )
    """)

    # articles table
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

    # news feed table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS newsFeed (
            feed_id INT(255) NOT NULL AUTO_INCREMENT,
            source_id INT(255) NOT NULL,
            article_id INT(255) NOT NULL,
            user_id INT(255) NOT NULL,
            preference_id INT(255) NOT NULL,
            PRIMARY KEY (feed_id),
            FOREIGN KEY (source_id) REFERENCES sources(source_id),
            FOREIGN KEY (article_id) REFERENCES articles(article_id),
            FOREIGN KEY (user_id) REFERENCES user(user_id),
            FOREIGN KEY (preference_id) REFERENCES userPreferences(preference_id)
        )
    """)

    # bookmarks table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookmarks (
            bookmark_id INT(255) NOT NULL AUTO_INCREMENT,
            article_id INT(255) NOT NULL,
            user_id INT(255) NOT NULL,
            PRIMARY KEY (bookmark_id),
            FOREIGN KEY (article_id) REFERENCES articles(article_id),
            FOREIGN KEY (user_id) REFERENCES user(user_id)
        )
    """)

    print("Tables created successfully")

if 'connection' in locals() and connection.is_connected():
    cursor.close()
    connection.close()
    print("MySQL connection closed")

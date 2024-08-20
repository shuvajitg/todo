import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('todos.db');


db.serialize(() => {
    try {
        db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, issueDate TEXT, lastDateOfSubmission TEXT, isComplete NUMBER, status TEXT)',
            function(err) {
                if (err) {
                    console.error(err.message);
                }
                console.log('Table created successfully');
            }
        )
    } catch (error:any) {
        console.log("Failed to create table: ", error.message);
    }
});


export default db
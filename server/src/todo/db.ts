import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('todo.db');


db.serialize(() => {
    try {
        db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, issueDate TEXT, lastDateOfSubmission TEXT, isComplete BOOlEAN)',
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

//  inner table data

const todos = [
    { id: 1, title: 'Task 1', issueDate: '2022-01-01', lastDateOfSubmission: '2022-01-05', isComplete: false },
    { id: 2, title: 'Task 2', issueDate: '2022-01-02', lastDateOfSubmission: '2022-01-08', isComplete: true },
    { id: 3, title: 'Task 3', issueDate: '2022-01-03', lastDateOfSubmission: '2022-01-10', isComplete: false }
]

todos.forEach((todo) => {
    db.run('INSERT INTO todos (id, title, issueDate, lastDateOfSubmission, isComplete) VALUES (?,?,?,?,?)', [todo.id, todo.title, todo.issueDate, todo.lastDateOfSubmission, todo.isComplete],
        function(err) {
            if (err) {
                console.error(err.message);
            }
            console.log(`Inserted row with id ${this.lastID}`);
        }
    );
});

export default db
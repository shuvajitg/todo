import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT, issueDate TEXT, lastDateOfSubmission TEXT, isComplete BOOlEAN)');
});

export default db
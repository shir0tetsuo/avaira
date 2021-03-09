#!/bin/cat
(sqlite3) .mode insert
(sqlite3) .output avaira_dump.sql
(sqlite3) .dump
(sqlite3) .exit
(sqlite3) .read avaira_dump.sql
(sqlite3) .save avaira.db
(sqlite3) .dump
(sqlite3) .exit

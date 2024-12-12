Task 5: Linux:
You need to change the permissions of a file to ensure that only the owner
can read and write to it. How would you do that?
○ Provide a command example.

Through terminal, you can set access/permission to a file using command chmod.

Chmod can be used to define who can access the file/folder/program with what level or permission.

Below command can be used to set Read and Write access to Owner and deny any level of access to Other and Group

chmod u=rw,og= <file name>

Alternatively, we can use chmod 600 or chmod 700 ( if the file is executable) .

To test the file access , we can use ls – l <file name>. This will display the permissions defined for the file.

If a file is located in a different directory , we can use command cd <file path> to navigate and then chmod to set/reset accesses.

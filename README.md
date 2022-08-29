# Email Website
Online Email (simulator) platform to send and receive emails to other users

## Description
### Tech Stack
- Javascript
- Django
- HTML/CSS
- SQL
- Python

### Challenges
- Using a single route to display all the information and making calls to the database to receive mailbox info

### Requirements
1. Install Python (https://python.org/download/)
1. Install SetupTools ($ pip install setuptools)
1. Install pip ($ easy_install pip)
1. Install Django ($ pip install django)

### How to run
(Note: Emails can only be sent to accounts which have registered on the platform)
1. $ cd mail
1. $ python3 manage.py runserver

# Features
## Login Page
 ![login-page](https://user-images.githubusercontent.com/89746098/187107437-e58e4bc9-199c-4d1e-8a9e-019dd2494268.jpg)

## Register Page
![register-page](https://user-images.githubusercontent.com/89746098/187107481-23ac1410-c856-45b1-b9f9-f830c0f06b8e.jpg)

## Navbar
![mail-navbar](https://user-images.githubusercontent.com/89746098/187107519-8f425268-f299-4c39-a0e5-718a5294933e.jpg)

## Inbox
Mailbox to view all incoming emails - white emails are unread and gray emails have already been read.
![mail-inbox](https://user-images.githubusercontent.com/89746098/187107540-eb2a8c0d-901c-486d-aa3e-cbeafea78e25.jpg)

## Compose
Enter this mailbox to create an email to send to another user.
![compose-mail](https://user-images.githubusercontent.com/89746098/187107565-6fa1b12c-f6ab-415b-b87a-2a59e50881a2.jpg)

## Sent
Mailbox where all of your sent emails can be viewed.
![mail-sent](https://user-images.githubusercontent.com/89746098/187107675-1e43e95d-3a1d-409f-8fa6-dff4dbfc4a23.jpg)

## Archive
Click the archive button on the email to send the email to the archive mailbox. Click the unarchive button to undo action. 
![mail-archive](https://user-images.githubusercontent.com/89746098/187107584-069a9283-7eee-4e85-8978-20acefe81756.jpg)

## Email View
![mail-email](https://user-images.githubusercontent.com/89746098/187107623-8afd75de-801e-4108-809b-1767a2991e81.jpg)

## Reply
Click this button in the email view to directly reply to the sender in the same email thread.
![mail-reply](https://user-images.githubusercontent.com/89746098/187107715-99d69e9e-eb78-4493-9c2d-5ad906332979.jpg)

## Logout
Click this button in the navbar to logout of your email and return to the login/register route.


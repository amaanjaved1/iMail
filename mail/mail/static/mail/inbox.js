document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener("click", function(){
    load_mailbox('inbox')
  });
  document.querySelector('#sent').addEventListener("click", function(){
    load_mailbox('sent')
  });
  document.querySelector('#archived').addEventListener("click", function(){
    load_mailbox('archive')
  });
  document.querySelector('#compose').addEventListener("click", function(){
    compose_email("compose", "none", "none", "none", "none", "none")
  });
  document.querySelector('#compose-form').onsubmit = send_mail;

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email(action, recipient, subject, date, body, sender) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email').style.display = 'none';
  if (action === "compose"){
    console.log("Redirected: Compose");
    document.querySelector("#new_desc").innerHTML = "New Email";
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  } else {
    console.log("Redirected: Reply");
    document.querySelector("#new_desc").innerHTML = "Reply";
    document.querySelector('#compose-recipients').value = recipient;
    if (subject.includes("Re:") === true) {
      document.querySelector('#compose-subject').value = subject;
    } else {
      document.querySelector('#compose-subject').value = `Re: ${subject}`;
    }
    document.querySelector('#compose-body').value = `On ${date} ${sender} wrote: ${body}\n`; 
  }
 
  // Clear out composition fields
  
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email').style.display = 'none';
 
  console.log(`Redirected: ${mailbox}`)
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(mail => {
      // Print emails
      console.log(mail);
      // ... do something else with emails ...
      mail.forEach(email => display_mail(email, mailbox));
  });
}

function send_mail() { 
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
  });
  localStorage.clear();
  load_mailbox('sent');
  return false;
}

function display_mail(email, mailbox) {

  //create a div under which all of the html for a row is stored
  var email_i = document.createElement("div");
  email_i.style.border = "double";

  if (email.read === true) {
   email_i.style.background = "gray"; 
  }
  //get email username such that if you send the email, its the recipient and if you receieve an email, it the sender
  var user = document.createElement("div");
  user.addEventListener("click", function(){
    view_email(email.id, email)
  });
  if (mailbox === "sent"){
    user.innerHTML = `To: ${email.recipients}`;    
  } else {
    user.innerHTML = `From: ${email.sender}`;
  }
  email_i.appendChild(user);
  
  //get email subject
  var subject = document.createElement("div");
  subject.addEventListener("click", function(){
    view_email(email.id, email)
  });
  subject.innerHTML = `Subject: ${email.subject}`;
  email_i.appendChild(subject);

  //get email date
  var date = document.createElement("div");
  date.addEventListener("click", function(){
    view_email(email.id, email)
  });
  date.innerHTML = `Date: ${email.timestamp}`;
  email_i.appendChild(date);
  
  if (mailbox === "inbox") { //archive button for the inbox - adds to archive
    const archive = document.createElement("button");
    archive.innerText = "Archive";
    email_i.appendChild(archive);
    archive.addEventListener("click", () =>{
      archive_email(email.id, email.archived);
    })
  } else if (mailbox === "archive") { //archive button for the archive tab - unarchive removes archive
    const archived = document.createElement("button");
    archived.innerText = "Unarchive";
    email_i.appendChild(archived); 
    archived.addEventListener("click", () =>{
      archive_email(email.id, email.archived);
    })
  }
  element = document.getElementById("emails-view");
  element.appendChild(email_i);
}



function archive_email(email_id, action) {
  // check for use case of this function, if the email action is add - add to the archives, otherwise remove from archives
  if (action === false){ 
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })
    console.log("Email has been archived"); //give console action 
  } else if (action === true) {
    fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: false
      })
    })
    load_mailbox("inbox"); //if you unarchived the email, go back to the inbox
    console.log("Email has removed from archives"); //give console action
  }
  window.location.reload();
}



function view_email(email_id, email) { 
  // Hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email').style.display = 'block';

  //mark email as read 
  read_email(email_id);

  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
      console.log(email);
      create_email(email);
  }); 
}

function read_email(email_id) {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  })
  console.log("Email has been read"); //give console action 
} 

function create_email(email) {
  document.querySelector("#user_v").innerHTML = `Sent By: ${email.sender}`;
  document.querySelector("#subject_v").innerHTML =  `Subject: ${email.subject}`
  document.querySelector("#body_v").innerHTML =  `Body: ${email.body}`
  document.querySelector("#date_v").innerHTML = `Sent: ${email.timestamp}`
  document.querySelector("#receivers_v").innerHTML =  `Recipients: ${email.sender}`
  document.querySelector("#reply").addEventListener("click", () => {
    compose_email("reply", email.sender, email.subject, email.timestamp, email.body, email.sender);
  }) 
}

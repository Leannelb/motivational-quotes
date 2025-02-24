# Overview
The purpose of this app is to update myself each morning with a motivational quote! 
I love motivational quotes and I love motivation and self improvement in general so this was a fun, quick project to encapsulate some of that.

## Project structure
quotes/
│
├── .env                   # Environment variables
├── .gitignore             # Ignore sensitive files
├── node_modules/          # Node.js dependencies
├── package.json           # Project metadata and dependencies
├── server.js              # Main backend code

## Features
Fetches a random motivational quote from the ZenQuotes API.
Sends the quote to your WhatsApp using Twilio API.
Automatically sends the quote every day at 8 AM using node-cron. 

## Technologies Used
Node.js - Backend runtime environment
Express.js - Web framework for building the API
Axios - HTTP client for fetching quotes from the ZenQuotes API
Twilio API - API for sending WhatsApp messages
node-cron - Task scheduler to send the daily quote at 8 AM
dotenv - To manage environment variables securely

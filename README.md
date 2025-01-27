# Live IMMO
This project is a real estate website that utilizes real world data and images to create a fully functional website.

# Stack
<ul>
    <li>Next JS</li>
    <li>MongoDB</li>
    <li>Vercel for deployment</li>
    <li>Clerk authentication</li>
</ul>

All environment variables are stored in .env.local file.<br>
You can build this project yourself by linking your Clerk, MongoDB and NexJS variables in the .env.local file. <br>
The database is populated with real world data that I have collected from several websites with a Python script.

This project is deployed and available at:
https://next-estate-main-qrkx86lb5-erik-kostanyans-projects.vercel.app

## MongoDB
### MongoDB file structure
<ul>
    <li><em>src/lib</em> folder for the database models and schemas</li>
    <li><em>src/app/api</em> for the API endpoints. This is used for creating, updating and deleting listings.</li>
</ul>

## Clerk
Clerk authentication to handle Google, Github and email logins and signups.

### Clerk Files
<ul>
    <li><em>src/middleware.js</em></li>
    <li><em>app/sign-in/[[...sign-in]]/page.tsx</em></li>
    <li><em>app/sign-in/[[...sign-out]]/page.tsx</em></li>
</ul>



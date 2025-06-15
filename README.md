# Coldpen Calendar

Coldpen Calendar is a productivity tool that helps you generate tweet ideas with scheduled dates and times, and seamlessly add them to your Google Calendar. Powered by OpenAI's GPT-4o model and Firebase, it streamlines your social media planning workflow.

[🌐 Try it live at calendar.coldpen.io](https://calendar.coldpen.io)

## Features

- ✨ **AI-Powered Tweet Generation:** Generate creative tweet ideas using GPT-4o.
- 📅 **Calendar Integration:** Add tweets directly to your Google Calendar with date and time.
- 📝 **Edit & Modify:** Easily edit or reschedule your tweet ideas before posting.
- ☁️ **Cloud Sync:** Securely store and manage your tweet drafts with Firebase.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/coldpen-calendar.git
   cd coldpen-calendar
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Configure Firebase and Google Calendar API:**

   - Add your Firebase credentials to `.env` as given in env-example.txt
   - Set up Google Calendar API and add credentials.

4. **Run the app:**
   ```bash
   bun run dev
   ```

## Usage

1. Generate tweet ideas using the AI-powered interface.
2. Assign a date and time for each tweet.
3. Add tweets to your Google Calendar.
4. Edit or modify scheduled tweets anytime.

## Tech Stack

- [OpenAI GPT-4o](https://platform.openai.com/)
- [Firebase](https://firebase.google.com/)
- [Google Calendar API](https://developers.google.com/calendar)

## License

Apache 2.0

---

_Plan, generate, and schedule your tweets with ease!_

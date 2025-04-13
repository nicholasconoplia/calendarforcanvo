# Calendar for Canvo

This repository automatically generates an ICS calendar file from tasks in the Canvo app. The calendar is updated whenever tasks are synced from the app.

## Calendar Subscription URL

To subscribe to your Canvo tasks in your calendar app, use the following URL:

```
https://nicholasconoplia.github.io/calendarforcanvo/calendar.ics
```

## How to Subscribe

### Apple Calendar
1. Go to File > New Calendar Subscription
2. Paste the URL and click Subscribe
3. Choose refresh frequency and click OK

### Google Calendar
1. Click + next to "Other calendars"
2. Select "From URL"
3. Paste URL and click "Add Calendar"

### Outlook
1. Go to Calendar view
2. Click "Add calendar" > "From Internet"
3. Paste URL and click "OK"

## How It Works

1. The Canvo app syncs tasks with due dates to this repository
2. GitHub Actions automatically generates a calendar.ics file
3. GitHub Pages serves the calendar file for subscription
4. Your calendar app periodically checks for updates 
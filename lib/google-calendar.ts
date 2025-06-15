import { getAuth, signOut } from "firebase/auth";

interface CalendarEvent {
  id?: string;
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
}

function getAccessToken(): string {
  const accessToken = localStorage.getItem("googleAccessToken");
  if (!accessToken) {
    throw new Error("No Google access token found. Please sign in again.");
  }
  return accessToken;
}

function getTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function addToGoogleCalendar(
  event: CalendarEvent
): Promise<CalendarEvent> {
  const accessToken = getAccessToken();
  const calendarEvent = {
    summary: event.summary,
    description: event.description,
    start: {
      dateTime: event.startTime,
      timeZone: getTimeZone(),
    },
    end: {
      dateTime: event.endTime,
      timeZone: getTimeZone(),
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 15 },
        { method: "email", minutes: 60 },
      ],
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarEvent),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      localStorage.removeItem("googleAccessToken");
      alert("Your session has expired. Please sign in again.");
      await signOut(getAuth());
      window.location.href = "/auth";
    }
    throw new Error(
      `Failed to add event to Google Calendar: ${
        errorData.error?.message || response.statusText
      }`
    );
  }

  const data = await response.json();
  return {
    id: data.id,
    summary: data.summary,
    description: data.description,
    startTime: data.start?.dateTime,
    endTime: data.end?.dateTime,
  };
}

// Edit event: start and end times are NOT editable
export async function editGoogleCalendarEvent(
  eventId: string,
  event: Pick<CalendarEvent, "summary" | "description">
): Promise<void> {
  const accessToken = getAccessToken();
  const calendarEvent = {
    summary: event.summary,
    description: event.description,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 15 },
        { method: "email", minutes: 60 },
      ],
    },
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: "PATCH", // PATCH only updates provided fields
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarEvent),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      localStorage.removeItem("googleAccessToken");
      alert("Your session has expired. Please sign in again.");
      await signOut(getAuth());
      window.location.href = "/auth";
    }
    console.error("Error editing event:", errorData);
    throw new Error(
      `Failed to edit event: ${errorData.error?.message || response.statusText}`
    );
  }
}

export async function deleteGoogleCalendarEvent(
  eventId: string
): Promise<void> {
  const accessToken = getAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
      localStorage.removeItem("googleAccessToken");
      alert("Your session has expired. Please sign in again.");
      await signOut(getAuth());
      window.location.href = "/auth";
    }
    if (response.status === 410) {
      // Resource already deleted (Gone)
      return;
    }
    throw new Error(
      `Failed to delete event: ${
        errorData.error?.message || response.statusText
      }`
    );
  }
}

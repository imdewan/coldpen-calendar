"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Sparkles,
  Clock,
  LogOut,
  Loader2,
  CheckCircle,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { generateTweetSuggestions } from "@/lib/ai-suggestions";
import {
  addToGoogleCalendar,
  editGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
} from "@/lib/google-calendar";

interface TweetSuggestion {
  id: string;
  content: string;
  scheduledTime: string;
  category: string;
  added: boolean;
}

interface ScheduledTweet {
  id: string;
  content: string;
  scheduledTime: string;
  category: string;
  userId: string;
  createdAt: any;
  googleEventId?: string;
}

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [highlights, setHighlights] = useState("");
  const [suggestions, setSuggestions] = useState<TweetSuggestion[]>([]);
  const [scheduledTweets, setScheduledTweets] = useState<ScheduledTweet[]>([]);
  const [generatingIdeas, setGeneratingIdeas] = useState(false);
  const [addingToCalendar, setAddingToCalendar] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "scheduledTweets"),
        where("userId", "==", user.uid),
        orderBy("scheduledTime", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ScheduledTweet[];
        setScheduledTweets(tweets);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleGenerateIdeas = async () => {
    if (!highlights.trim()) return;

    setGeneratingIdeas(true);
    try {
      const newSuggestions = await generateTweetSuggestions(highlights);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setGeneratingIdeas(false);
    }
  };

  const handleAddToCalendar = async (suggestion: TweetSuggestion) => {
    if (!user) return;

    setAddingToCalendar(suggestion.id);
    try {
      // Add to Google Calendar first to get eventId
      const googleEvent = await addToGoogleCalendar({
        summary: `Tweet: ${suggestion.content.substring(0, 50)}...`,
        description: `Tweet Content: ${suggestion.content}\n\nCategory: ${suggestion.category}\n\nScheduled via Coldpen Calender`,
        startTime: suggestion.scheduledTime,
        endTime: new Date(
          new Date(suggestion.scheduledTime).getTime() + 15 * 60000
        ).toISOString(),
      });

      // Add to Firestore
      await addDoc(collection(db, "scheduledTweets"), {
        content: suggestion.content,
        scheduledTime: suggestion.scheduledTime,
        category: suggestion.category,
        userId: user.uid,
        createdAt: new Date(),
        googleEventId: googleEvent?.id || null,
      });

      // Mark as added
      setSuggestions((prev) =>
        prev.map((s) => (s.id === suggestion.id ? { ...s, added: true } : s))
      );
    } catch (error) {
      console.error("Error adding to calendar:", error);
      alert("Failed to add to calendar. Please try again.");
    } finally {
      setAddingToCalendar(null);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };

  // Edit handlers
  const startEdit = (tweet: ScheduledTweet) => {
    setEditingId(tweet.id);
    setEditContent(tweet.content);
    setEditCategory(tweet.category);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
    setEditCategory("");
  };

  const saveEdit = async (tweet: ScheduledTweet) => {
    setSavingEdit(true);
    try {
      // Update Firestore
      await updateDoc(doc(db, "scheduledTweets", tweet.id), {
        content: editContent,
        category: editCategory,
      });

      // Update Google Calendar if eventId exists
      if (tweet.googleEventId) {
        await editGoogleCalendarEvent(tweet.googleEventId, {
          summary: `Tweet: ${editContent.substring(0, 50)}...`,
          description: `Tweet Content: ${editContent}\n\nCategory: ${editCategory}\n\nScheduled via Coldpen Calender`,
        });
      }
      cancelEdit();
    } catch (error) {
      console.error("Error editing event:", error);
      alert("Failed to edit event. Please try again.");
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete handlers
  const handleDelete = async (tweet: ScheduledTweet) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(tweet.id);
    try {
      // Delete from Google Calendar if eventId exists
      if (tweet.googleEventId) {
        await deleteGoogleCalendarEvent(tweet.googleEventId);
      }
      // Delete from Firestore
      await deleteDoc(doc(db, "scheduledTweets", tweet.id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-white/20 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Logo and Title - always together */}
            <div className="flex items-center min-w-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 flex-shrink-0"
              />
              <div className="ml-2 flex flex-col min-w-0">
                <span className="flex items-center min-w-0">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-500 truncate">
                    Coldpen Calender
                  </span>
                  <span className="ml-2 text-xs text-gray-700 dark:text-gray-300 font-medium truncate flex-shrink-0">
                    by&nbsp;
                    <a
                      href="https://coldpen.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Coldpen
                    </a>
                  </span>
                </span>
              </div>
            </div>
            {/* User Info, Dark Mode Toggle, Sign Out */}
            <div className="flex items-center space-x-2 ml-auto">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome back,
                </p>
                <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">
                  {user.displayName}
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleSignOut}
                variant="ghost"
                className="text-red-600 hover:scale-105 hover:bg-transparent transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input and Suggestions */}
          <div className="space-y-6">
            {/* Highlights Input */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-lg mr-3">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  Share Your Highlights
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Tell us about your recent achievements, learnings, or
                  interesting experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What have you been working on? Any interesting insights, achievements, or experiences you'd like to share with your audience?"
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  rows={4}
                  className="border-gray-200 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-colors dark:bg-gray-950 dark:text-white"
                />
                <Button
                  onClick={handleGenerateIdeas}
                  disabled={!highlights.trim() || generatingIdeas}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300  group"
                  size="lg"
                >
                  {generatingIdeas ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  )}
                  {generatingIdeas
                    ? "Generating Ideas..."
                    : "Generate Tweet Ideas"}
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-200">
                <CardHeader>
                  <CardTitle className="text-xl">
                    AI-Generated Tweet Suggestions
                  </CardTitle>
                  <CardDescription>
                    Select the tweets you'd like to schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.id}
                      className={`border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:shadow-lg transition-all duration-300 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200"
                        >
                          {suggestion.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          {new Date(
                            suggestion.scheduledTime
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(
                            suggestion.scheduledTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
                        {suggestion.content}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCalendar(suggestion)}
                        disabled={
                          suggestion.added || addingToCalendar === suggestion.id
                        }
                        className={`w-full transition-all duration-300 ${
                          suggestion.added
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white"
                        }`}
                      >
                        {addingToCalendar === suggestion.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : suggestion.added ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {addingToCalendar === suggestion.id
                          ? "Adding..."
                          : suggestion.added
                          ? "Added to Calendar"
                          : "Add to Calendar"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Scheduled Tweets */}
          <div>
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-700 dark:to-emerald-900 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  Scheduled Tweets
                </CardTitle>
                <CardDescription>
                  Your upcoming tweets and calendar events
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scheduledTweets.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-10 w-10 opacity-50" />
                    </div>
                    <p className="text-lg font-medium mb-2">
                      No scheduled tweets yet
                    </p>
                    <p className="text-sm">
                      Generate some ideas to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {scheduledTweets.map((tweet, index) => (
                      <div
                        key={tweet.id}
                        className={`border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:shadow-md transition-all duration-300 animate-fade-in-up`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {editingId === tweet.id ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              saveEdit(tweet);
                            }}
                            className="space-y-2"
                          >
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                              <input
                                type="text"
                                value={editCategory}
                                onChange={(e) =>
                                  setEditCategory(e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm w-full sm:w-32 dark:bg-gray-950 dark:text-white dark:border-gray-700"
                                required
                              />
                              <input
                                type="text"
                                value={new Date(
                                  tweet.scheduledTime
                                ).toLocaleString([], {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                disabled
                                className="border rounded px-2 py-1 text-sm w-full sm:w-auto dark:bg-gray-950 dark:text-white dark:border-gray-700 opacity-70 cursor-not-allowed"
                                readOnly
                              />
                            </div>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-950 dark:text-white dark:border-gray-700"
                              rows={2}
                              required
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                size="sm"
                                type="submit"
                                disabled={savingEdit}
                                className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
                              >
                                {savingEdit ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <Save className="h-4 w-4 mr-2" />
                                )}
                                Save
                              </Button>
                              <Button
                                size="sm"
                                type="button"
                                variant="outline"
                                onClick={cancelEdit}
                                className="border-gray-300 dark:border-gray-700 w-full sm:w-auto"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30"
                              >
                                {tweet.category}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                {new Date(
                                  tweet.scheduledTime
                                ).toLocaleDateString()}{" "}
                                at{" "}
                                {new Date(
                                  tweet.scheduledTime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
                              {tweet.content}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEdit(tweet)}
                                className="border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 w-full sm:w-auto"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(tweet)}
                                disabled={deletingId === tweet.id}
                                className="border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 w-full sm:w-auto"
                              >
                                {deletingId === tweet.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 mr-1" />
                                )}
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

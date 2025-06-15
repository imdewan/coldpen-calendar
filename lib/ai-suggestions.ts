"use server";
import OpenAI from "openai";

interface TweetSuggestion {
  id: string;
  content: string;
  scheduledTime: string;
  category: string;
  added: boolean;
}

export async function generateTweetSuggestions(
  highlights: string
): Promise<TweetSuggestion[]> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `You are a social media expert who creates engaging Twitter content. Based on user highlights, generate 5 diverse tweet suggestions with optimal posting times.

Return a JSON array with this exact structure also do not include any additional text or formatting:
[
  {
    "content": "Tweet content (max 280 characters)",
    "category": "Category (e.g., Achievement, Insight, Tip, Question, Story)",
    "scheduledTime": "ISO date string for optimal posting time"
  }
]
Note: Today's date and time is ${
    new Date().toISOString().split("T")[0]
  }. make the time in a future date and within 7 days.
Guidelines:
- Make tweets engaging and authentic
- Vary the categories and styles
- Schedule at different optimal times (morning, afternoon, evening)
- Include relevant hashtags when appropriate
- Keep under 280 characters
- Make them conversation-starting when possible
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create tweet suggestions based on these highlights: ${highlights}`,
        },
      ],
      temperature: 0.6,
    });

    const text = response.choices[0]?.message?.content ?? "[]";
    console.log("Generated suggestions:", text);
    const suggestions = JSON.parse(text);

    return suggestions.map((suggestion: any, index: number) => ({
      id: `suggestion-${Date.now()}-${index}`,
      content: suggestion.content,
      scheduledTime: suggestion.scheduledTime,
      category: suggestion.category,
      added: false,
    }));
  } catch (error) {
    console.error("Error generating suggestions:", error);
    // Return fallback suggestions
    return [
      {
        id: `fallback-${Date.now()}`,
        content:
          "Excited to share some recent insights! What's been inspiring you lately? 🚀",
        scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        category: "Question",
        added: false,
      },
    ];
  }
}

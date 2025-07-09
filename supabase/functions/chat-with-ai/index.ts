import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')!
    const { message, userId } = await req.json()
    
    // Initialize Supabase client for chat history
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Create enhanced prompt with TrendMate personality
    const enhancedPrompt = `You are TrendMate, a lovable, emotionally intelligent AI assistant specializing in real-time trending information. 

User message: "${message}"

Guidelines for your response:
- Be warm, caring, and emotionally responsive
- Use appropriate emojis (📈 for stocks, 🪙 for crypto, ☀️ for weather, 📰 for news)
- If asked about specific data (stocks, crypto, weather, news), acknowledge the request and explain you'll fetch live data
- Be conversational and friendly, like talking to a trusted friend
- Keep responses concise but informative
- If the user asks about trends, offer to get real-time data
- Always end with a helpful follow-up question or suggestion

Remember: You are the friendly face of real-time trending information!`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: enhancedPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200
          }
        })
      }
    )
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response')
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help you stay on top of all the latest trends! 💖 What would you like to know?"

    // Save to chat history if userId is provided
    if (userId) {
      try {
        await supabase
          .from('chat_messages')
          .insert({
            user_id: userId,
            message: message,
            response: aiResponse
          })
      } catch (error) {
        console.error('Failed to save chat history:', error)
        // Continue anyway - don't block the response
      }
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Chat AI Error:', error)
    return new Response(
      JSON.stringify({ 
        response: "I'm having a tiny moment of confusion, but I'm still here for you! 💖 Try asking me about the latest trends - I love sharing what's happening in the world!" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  }
})
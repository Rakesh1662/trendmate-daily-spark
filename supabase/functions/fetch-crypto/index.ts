import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Using CoinGecko free API as it's more reliable than Gemini for price data
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana&vs_currencies=usd&include_24hr_change=true'
    )
    
    const data = await response.json()
    
    const cryptoData = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin?.usd || 0,
        change: (data.bitcoin?.usd_24h_change || 0).toFixed(2),
        changePercent: (data.bitcoin?.usd_24h_change || 0).toFixed(2)
      },
      {
        symbol: 'ETH', 
        name: 'Ethereum',
        price: data.ethereum?.usd || 0,
        change: (data.ethereum?.usd_24h_change || 0).toFixed(2),
        changePercent: (data.ethereum?.usd_24h_change || 0).toFixed(2)
      },
      {
        symbol: 'ADA',
        name: 'Cardano', 
        price: data.cardano?.usd || 0,
        change: (data.cardano?.usd_24h_change || 0).toFixed(2),
        changePercent: (data.cardano?.usd_24h_change || 0).toFixed(2)
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: data.solana?.usd || 0,
        change: (data.solana?.usd_24h_change || 0).toFixed(2),
        changePercent: (data.solana?.usd_24h_change || 0).toFixed(2)
      }
    ]

    return new Response(
      JSON.stringify({ crypto: cryptoData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
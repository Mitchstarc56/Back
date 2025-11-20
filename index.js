const STREAMS = {
  "st": {
    mpd: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/bcj3iscpd6/out/v1/fcd137b391214f7cb99dd4d7be90ca87/cenc.mpd",
    clearkeys: "7e9239c1982d984a002df3ed049d0756:1b8a17598129a3618535c8fb05f103fe"
  },
  "ssn1": {
    mpd: "https://dice-live-oc.akamaized.net/hdntl=exp=1763699291~acl=%2F*~id=b04a267c-3278-4378-a231-8792e3a783d1~data=hdntl,dWlkPXNWa2pnc3w2ZjZmZTIwMS02NWUyLTRmNWMtOWY3OC01MTBlNDU0NzY0YWUmaXA9MjAzLjk2LjIxOC4yNCZleHA9MTc2MzY5OTMyMCZlaWQ9MjE5MDI4JmNpZD1kY2Uuc2t5bnomb2lkPTMxOCZ0eXBlPUxJVkU~hmac=9dc279c9571fe1c1bde4a9daf1d386d95e7faa2ee2d09eac05fde1e9c79a09fa/dash/live/2093664/219028-311264/manifest-d.mpd", 
    clearkeys: "2e2636daa74141b68cc14882ea3ff82b:0961f48287324adbb4b7ff3c9d82b3c9"
  },
  "ssn2": {
    mpd: "https://example.com/third/manifest.mpd",
    clearkeys: "keyid2:keyvalue2"
  }
  // Add more streams as needed
};

const ALLOWED_DOMAINS = [
  "https://criccentral.pages.dev",
  "https://cricentral.pages.dev",
  "https://criccentral.netlify.app",
  "http://cricentral.netlify.app" // for local development
];

export default {
  async fetch(request, env, ctx) {
    const referer = request.headers.get('referer') || '';
    const origin = request.headers.get('origin') || '';
    
    let isAllowed = false;
    for (let domain of ALLOWED_DOMAINS) {
      if (referer.startsWith(domain) || origin.startsWith(domain)) {
        isAllowed = true;
        break;
      }
    }

    if (!isAllowed) {
      return new Response(JSON.stringify({
        success: false,
        message: "Unauthorized request"
      }), {
        status: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const streamId = path.split('/').pop();

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // Return all streams
    if (!streamId || streamId === 'streams') {
      return new Response(JSON.stringify({
        success: true,
        streams: STREAMS,
        count: Object.keys(STREAMS).length
      }), { headers });
    }

    // Return specific stream
    if (STREAMS[streamId]) {
      // Parse clearkeys into object format
      const clearkeys = {};
      const keyPairs = STREAMS[streamId].clearkeys.split(':');
      if (keyPairs.length === 2) {
        clearkeys[keyPairs[0]] = keyPairs[1];
      }

      return new Response(JSON.stringify({
        success: true,
        id: streamId,
        mpd: STREAMS[streamId].mpd,
        clearkeys: clearkeys,
        clearkeys_string: STREAMS[streamId].clearkeys // Also return as string for convenience
      }), { headers });
    }

    // Stream not found
    return new Response(JSON.stringify({
      success: false,
      message: "Stream not found",
      available_streams: Object.keys(STREAMS)
    }), {
      status: 404,
      headers
    });
  }
}

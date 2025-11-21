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
  
};

const ALLOWED_DOMAINS = [
  "https://criccentral.pages.dev",
  "https://cricentral.pages.dev",
  "https://criccentral.netlify.app",
  "http://cricentral.netlify.app" // dev
];

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // change to exact origin(s) for stricter security
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Player-Fetch, Authorization'
  };
}

export default {
  async fetch(request, env, ctx) {
    // Always handle OPTIONS preflight quickly
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    const referer = request.headers.get('referer') || '';
    const origin = request.headers.get('origin') || '';
    const secFetchMode = request.headers.get('sec-fetch-mode') || '';
    const playerHeader = request.headers.get('x-player-fetch') || '';

    // domain allowlist check
    let isAllowedDomain = false;
    for (let domain of ALLOWED_DOMAINS) {
      if (referer.startsWith(domain) || origin.startsWith(domain)) {
        isAllowedDomain = true;
        break;
      }
    }

    // Require: allowed domain + JS fetch mode + custom header
    if (!(isAllowedDomain && secFetchMode === 'cors' && playerHeader === '1')) {
      return new Response(JSON.stringify({
        success: false,
        message: "Unauthorized request"
      }), {
        status: 403,
        headers: corsHeaders()
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const streamId = path.split('/').pop();

    const headers = corsHeaders();

    // Return whole list
    if (!streamId || streamId === 'streams') {
      return new Response(JSON.stringify({
        success: true,
        streams: STREAMS,
        count: Object.keys(STREAMS).length
      }), { headers });
    }

    // Return specific stream
    if (STREAMS[streamId]) {
      // Parse clearkeys string into an object: "keyid:keyvalue"
      const clearkeysObj = {};
      const ck = STREAMS[streamId].clearkeys || '';
      const parts = ck.split(':');
      if (parts.length === 2 && parts[0]) {
        clearkeysObj[parts[0]] = parts[1];
      }

      return new Response(JSON.stringify({
        success: true,
        id: streamId,
        mpd: STREAMS[streamId].mpd,
        clearkeys: clearkeysObj,
        clearkeys_string: ck
      }), { headers });
    }

    // Not found
    return new Response(JSON.stringify({
      success: false,
      message: "Stream not found",
      available_streams: Object.keys(STREAMS)
    }), {
      status: 404,
      headers
    });
  }
};

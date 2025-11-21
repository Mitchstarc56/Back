// Worker: paste this as your worker entry file
const STREAMS = {
  "t1": {
    mpd: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    clearkeys: "d0f2e5c39e70c18f29bf77768a1ad89a:d6853c51fcf37a18905f0609972395d7"
  },
  "ssn1": {
    mpd: "https://abbbmftaaaaaaaamgdshloqn26zka.otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/7tql9fsdjo/out/v1/46b477f97cd742b087401526419edc67/cenc.mpd",
    clearkeys: "8ca5d080818584785c022021b8fe8179:60261514a077c36fa5e5933fb6049880"
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

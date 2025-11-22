// Worker: paste this as your worker entry file
const STREAMS = {
  "sn4": {
    mpd: "https://dice-live-oc.akamaized.net/hdntl=exp=1763869290~acl=%2f*~id=2a3ad11e-3904-4a68-8017-0f8ff38f7e18~data=hdntl,dWlkPTMxMDczN3xkY2Uuc2t5bnomaXA9MTE0LjIzLjExOC44MiZleHA9MTc2Mzg2OTMxOCZlaWQ9MjE5MDI5JmNpZD1kY2Uuc2t5bnomb2lkPTMxOCZ0eXBlPUxJVkU~hmac=e35af710300a90903b974ea7d5a6e3f240391b96d1a3962c4bdaef96b2b64cf7/dash/live/2093660/219029-311256/manifest-d.mpd",
    clearkeys: "278b8746b7c7410e901af0aa3774f037:15e1142d647b474ebbd49e41efa2a9d7"
  },
  "wc": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/mitifmm4g9/out/v1/a62499aa43894024a5e9870e16a56732/cenc.mpd",
    clearkeys: "942b3db5d08871706ddeb9302c4e2a29:d7c25442d9a7b0da9fda160c9dbe1e04"
  },
  "wca": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/hx6mmf5xx2/out/v1/28e92a81848f42c7ba84dc42feb210de/cenc.mpd",
    clearkeys: "97b5f6443d609b8fdca598393297483b:5d1ede61175a2286360acda28f038e6c"
  },
  "sn1": {
    mpd: "https://dice-live-oc.akamaized.net/hdntl=exp=1763862928~acl=%2f*~id=6547d31b-5e65-4866-b89e-8e97e579d216~data=hdntl,dWlkPXNWa2pnc3w2ZjZmZTIwMS02NWUyLTRmNWMtOWY3OC01MTBlNDU0NzY0YWUmaXA9MTIzLjI1NS40OC4xNzImZXhwPTE3NjM4NjI5NTgmZWlkPTIxOTAyNiZjaWQ9ZGNlLnNreW56Jm9pZD0zMTgmdHlwZT1MSVZF~hmac=966e94d7554df8f38acd24879faecb3f5ad533e2a1c4376df1ec47f6af4c5f75/dash/live/2093662/219026-311262/manifest-d.mpd",
    clearkeys: "aefc2c8d1c8840f1b6981f856c9269ba:cf8ea114c45b4d6596b2748258ab74d6"
  },
  "asc": {
    mpd: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash-sd/enc/unphwrnhdm/out/v1/b099c32d36304e01834cc9df1b600a30/cenc-sd.mpd",
    clearkeys: "7478fc940c1a5f18056cd8dd1e32786c:54aeadaa13fa9ef051d68990894ceec4"
  },
  "t1": {
    mpd: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    clearkeys: "d0f2e5c39e70c18f29bf77768a1ad89a:d6853c51fcf37a18905f0609972395d7"
  },
  "t2": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/irplqtcjlv/out/v1/f8fa17f087564f51aa4d5c700be43ec4/cenc.mpd",
    clearkeys: "0d9efa8287a52a2497a281f7a9012211:e4f832d372943014fe5c30928a90e547|"
  },
  "t3": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/lsdasbvglv/out/v1/bb548a3626cd4708afbb94a58d71dce9/cenc.mpd",
    clearkeys: "a93c1cbfdccd23233bac13540c693e7f:2f6ab2e6693eb847eff3c9da8f9d01fc"
  },
  "t4": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro/live/dash/enc/i2pcjr4pe5/out/v1/912e9db56d75403b8a9ac0a719110f36/cenc.mpd",
    clearkeys: "192b1115da041585c77200128549efa1:634e10efe4abbb14be400a3ccbac0258"
  },
  "ws": {
    mpd: "https://otte.live.cf.ww.aiv-cdn.net/lhr-nitro//live/clients/dash/enc/f60kqesunw/out/v1/a435ed7a00f947deb4369b46d8f2fb70/cenc.mpd",
    clearkeys: "1779c27b9d077a3ba0c9cc1bb9a94b9f":"cc5cf3b7928fb9e0a1ee6a8b566f0a8e"
  },
  "f1": {
    mpd: "https://a166aivottlinear-a.akamaihd.net/OTTB/sin-nitro/live/clients/dash/enc/inpyms8ezu/out/v1/1084d5c9a97a4c5b9f9554c88f486646/cenc.mpd",
    clearkeys: "065051b99bf5cf8d9a3bde5cbde6aaf9:214bd176832872339ce184338320f9a2"
  },
  "f2": {
    mpd: "https://a204aivottepl-a.akamaihd.net/sin-nitro/live/clients/dash/enc/fdb3pubmek/out/v1/aefca6420f944a9482e117f315de535f/cenc.mpd",
    clearkeys: "7e9239c1982d984a002df3ed049d0756:1b8a17598129a3618535c8fb05f103fe"
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
